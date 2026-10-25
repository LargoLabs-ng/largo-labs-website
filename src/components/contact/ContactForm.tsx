"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { enquiryTypes } from "@/content/services";
import { LIMITS, validateContact, type ContactInput, type FieldErrors } from "@/lib/contact-schema";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; code?: string };

const empty: ContactInput = { name: "", email: "", enquiryType: "", message: "" };

/** Reads ?enquiry=... (set by service-page buttons) to pre-select the enquiry type. */
export function ContactFormWithParams({ fallbackEmail }: { fallbackEmail: string | null }) {
  const pre = useSearchParams().get("enquiry") ?? "";
  const initial = (enquiryTypes as readonly string[]).includes(pre) ? pre : "";
  return <ContactForm key={initial} fallbackEmail={fallbackEmail} initialEnquiry={initial} />;
}

export function ContactForm({
  fallbackEmail,
  initialEnquiry = "",
}: {
  fallbackEmail: string | null;
  initialEnquiry?: string;
}) {
  const [values, setValues] = useState<ContactInput>({ ...empty, enquiryType: initialEnquiry });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  // Record when the form was first shown (used by the server's spam timing check).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "success" || status.state === "error") statusRef.current?.focus();
  }, [status]);

  const update = (field: keyof ContactInput, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) {
      const v = validateContact(trimAll(next));
      setErrors((e) => ({ ...e, [field]: v[field] }));
    }
  };

  const blur = (field: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const v = validateContact(trimAll(values));
    setErrors((e) => ({ ...e, [field]: v[field] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;

    const data = trimAll(values);
    const v = validateContact(data);
    setErrors(v);
    setTouched({ name: true, email: true, enquiryType: true, message: true });
    if (Object.keys(v).length > 0) {
      const first = (Object.keys(v) as (keyof ContactInput)[])[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        code?: string;
        errors?: FieldErrors;
      };
      if (res.ok && body.ok) {
        setStatus({ state: "success" });
        setValues(empty);
        setTouched({});
        return;
      }
      if (body.errors) setErrors(body.errors);
      setStatus({
        state: "error",
        code: body.code,
        message: body.message ?? "Something went wrong. Your message has not been sent.",
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "We couldn't reach our server — please check your connection. Your message has not been sent.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-card)] border border-signal-500/30 bg-signal-400/10 p-8 outline-none"
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal-700">Message sent</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">
          Thank you — we&apos;ve received your enquiry.
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          We&apos;ll reply to the email address you gave us. If you need to add anything, you can
          send another message.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus({ state: "idle" });
          }}
          className="mt-6 rounded-full bg-ink-900 px-5 py-3 text-sm font-medium text-white hover:bg-ink-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass = (err?: string) =>
    `mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900 shadow-sm transition-colors placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-offset-0 ${
      err
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
        : "border-line focus:border-signal-500 focus:ring-signal-500/20"
    }`;

  const submitting = status.state === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={`${id}-privacy`}>
      {status.state === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800 outline-none"
        >
          <p className="font-semibold">{status.message}</p>
          {(status.code === "not_configured" || status.code === "delivery_failed") && fallbackEmail && (
            <p className="mt-1">
              You can email us directly at{" "}
              <a className="font-medium underline" href={`mailto:${fallbackEmail}`}>
                {fallbackEmail}
              </a>
              . Your message is still in the form below so you can copy it.
            </p>
          )}
          {(status.code === "not_configured" || status.code === "delivery_failed") && !fallbackEmail && (
            <p className="mt-1">Your message is still in the form below, so you can try again later without retyping it.</p>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink-900">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name.max}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink-900">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email.max}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
            className={fieldClass(errors.email)}
          />
          {errors.email && (
            <p id={`${id}-email-err`} className="mt-1.5 text-sm text-red-700">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-type`} className="text-sm font-medium text-ink-900">
          Enquiry type
        </label>
        <select
          id={`${id}-type`}
          name="enquiryType"
          required
          value={values.enquiryType}
          onChange={(e) => {
            update("enquiryType", e.target.value);
            setTouched((t) => ({ ...t, enquiryType: true }));
            setErrors((er) => ({ ...er, enquiryType: e.target.value ? undefined : er.enquiryType }));
          }}
          onBlur={() => blur("enquiryType")}
          aria-invalid={!!errors.enquiryType}
          aria-describedby={errors.enquiryType ? `${id}-type-err` : undefined}
          className={`${fieldClass(errors.enquiryType)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20fill='none'%3E%3Cpath%20d='m4%206%204%204%204-4'%20stroke='%234a5468'%20stroke-width='1.6'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E")] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {enquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p id={`${id}-type-err`} className="mt-1.5 text-sm text-red-700">
            {errors.enquiryType}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor={`${id}-message`} className="text-sm font-medium text-ink-900">
            Message
          </label>
          <span className="text-xs text-subtle" aria-hidden="true">
            {values.message.length}/{LIMITS.message.max}
          </span>
        </div>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message.max}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={`${id}-message-hint${errors.message ? ` ${id}-message-err` : ""}`}
          placeholder="What do you need, and what would a good result look like?"
          className={`${fieldClass(errors.message)} resize-y`}
        />
        <p id={`${id}-message-hint`} className="mt-1.5 text-xs text-subtle">
          Please don&apos;t include passwords, bank details or other sensitive information.
        </p>
        {errors.message && (
          <p id={`${id}-message-err`} className="mt-1 text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input ref={honeypot} id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-privacy`} className="max-w-sm text-xs leading-relaxed text-muted">
          We use your details only to respond to your enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-ink-700 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {submitting ? "Sending…" : "Send enquiry"}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function trimAll(v: ContactInput): ContactInput {
  return {
    name: v.name.trim(),
    email: v.email.trim(),
    enquiryType: v.enquiryType,
    message: v.message.trim(),
  };
}
