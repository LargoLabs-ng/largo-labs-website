import { enquiryTypes } from "@/content/services";

/** Shared validation used by both the browser form and the server route. */

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 5000 },
} as const;

export type ContactInput = {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

/** Removes control characters (except newlines/tabs) and trims. */
export function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (input.name.length > LIMITS.name.max) errors.name = "Name is too long.";

  if (!input.email) errors.email = "Please enter your email address.";
  else if (input.email.length > LIMITS.email.max || !EMAIL_RE.test(input.email))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";

  if (!(enquiryTypes as readonly string[]).includes(input.enquiryType))
    errors.enquiryType = "Please choose an enquiry type.";

  if (input.message.length < LIMITS.message.min)
    errors.message = `Please add a little more detail (at least ${LIMITS.message.min} characters).`;
  else if (input.message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;

  return errors;
}
