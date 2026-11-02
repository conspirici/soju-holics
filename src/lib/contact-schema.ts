// Dependency-free on purpose: this runs in the browser for instant feedback and
// on the server as the real check, so it should stay small and identical in both.

export const topics = {
  general: "General question",
  wholesale: "Wholesale & distribution",
  events: "Events & partnerships",
  press: "Press & media",
} as const;

export type Topic = keyof typeof topics;

/** Raw, unvalidated form values as strings. */
export type ContactFields = Record<"firstName" | "lastName" | "email" | "topic" | "message", string>;
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;
export type CleanContact = Omit<ContactFields, "topic"> & { topic: Topic };

// Same shape of check Zod uses: no leading/double dots, a real-looking domain and TLD.
const EMAIL = /^(?!\.)(?!.*\.\.)[A-Za-z0-9_'+\-.]*[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9-]*\.)+[A-Za-z]{2,}$/;

// Collapse control characters (incl. CR/LF) so names can't smuggle extra email headers.
const singleLine = (v: string) => v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

export function cleanContact(raw: ContactFields): CleanContact {
  return {
    firstName: singleLine(raw.firstName),
    lastName: singleLine(raw.lastName),
    email: raw.email.trim(),
    topic: raw.topic in topics ? (raw.topic as Topic) : "general",
    message: raw.message.trim(),
  };
}

/** First problem per field, or an empty object when everything is valid. */
export function validateContact(raw: ContactFields): FieldErrors {
  const v = cleanContact(raw);
  const errors: FieldErrors = {};

  if (!v.firstName) errors.firstName = "Please enter your first name";
  else if (v.firstName.length > 60) errors.firstName = "Keep it under 60 characters";

  if (!v.lastName) errors.lastName = "Please enter your last name";
  else if (v.lastName.length > 60) errors.lastName = "Keep it under 60 characters";

  if (!v.email) errors.email = "Please enter your email";
  else if (v.email.length > 254) errors.email = "That email looks too long";
  else if (!EMAIL.test(v.email)) errors.email = "That email doesn’t look quite right";

  if (!v.message) errors.message = "Please write us a short message";
  else if (v.message.length < 10) errors.message = "A few more words, please (10 characters or more)";
  else if (v.message.length > 4000) errors.message = "Keep it under 4,000 characters";

  return errors;
}

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: FieldErrors;
      values?: Partial<ContactFields>;
    };
