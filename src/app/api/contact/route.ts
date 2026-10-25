import { LIMITS, sanitize, validateContact, type ContactInput } from "@/lib/contact-schema";
import { site } from "@/config/site";

/**
 * POST /api/contact
 * Validates an enquiry on the server and forwards it to Formspree, which
 * emails it to the company inbox. The Formspree form ID is read from the
 * FORMSPREE_FORM_ID environment variable and never sent to the browser.
 *
 * Responses always reflect what really happened — the browser only shows
 * "sent" when Formspree has accepted the message.
 */

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 2_500; // faster than this is almost certainly a bot
const RATE_LIMIT = { windowMs: 10 * 60_000, max: 5 };

// Best-effort, per-instance rate limiting. On serverless hosting each instance
// keeps its own counter; Formspree applies its own spam filtering as well.
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const now = Date.now();

  // Same-origin check: browsers send Origin on cross-site POSTs.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, code: "forbidden", message: "Request not allowed." });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, code: "bad_request", message: "Unsupported request format." });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { ok: false, code: "too_large", message: "Your message is too long." });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, code: "bad_request", message: "Invalid request." });
  }

  // Honeypot: a hidden field real visitors never fill in.
  if (typeof body.website === "string" && body.website.length > 0) {
    return json(200, { ok: true });
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS) {
    return json(400, {
      ok: false,
      code: "too_fast",
      message: "That was quicker than expected. Please wait a moment and try again.",
    });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip, now)) {
    return json(429, {
      ok: false,
      code: "rate_limited",
      message: "You've sent several messages in a short time. Please try again in a few minutes.",
    });
  }

  const input: ContactInput = {
    name: sanitize(body.name, LIMITS.name.max + 1),
    email: sanitize(body.email, LIMITS.email.max + 1).toLowerCase(),
    enquiryType: sanitize(body.enquiryType, 100),
    message: sanitize(body.message, LIMITS.message.max + 1),
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return json(422, { ok: false, code: "invalid", message: "Please check the highlighted fields.", errors });
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  if (!formId || !/^[A-Za-z0-9]+$/.test(formId)) {
    console.error("[contact] FORMSPREE_FORM_ID is not set — enquiry was NOT delivered.");
    return json(503, {
      ok: false,
      code: "not_configured",
      message: "Our contact form isn't accepting messages at the moment. Your message has not been sent.",
    });
  }

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        enquiryType: input.enquiryType,
        message: input.message,
        _subject: `[${site.shortName} website] ${input.enquiryType} — ${input.name}`,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[contact] Formspree rejected the enquiry (${res.status}): ${detail.slice(0, 500)}`);
      return json(502, {
        ok: false,
        code: "delivery_failed",
        message: "We couldn't deliver your message just now. It has not been sent — please try again shortly.",
      });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("[contact] Could not reach Formspree:", err);
    return json(502, {
      ok: false,
      code: "delivery_failed",
      message: "We couldn't deliver your message just now. It has not been sent — please try again shortly.",
    });
  }
}
