import { z } from "zod";

export const topics = {
  general: "General question",
  wholesale: "Wholesale & distribution",
  events: "Events & partnerships",
  press: "Press & media",
} as const;

export type Topic = keyof typeof topics;

// Collapse control characters (incl. CR/LF) so names can't smuggle extra email headers.
const singleLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim())
    .pipe(z.string().min(1, "Required").max(max, `Keep it under ${max} characters`));

export const contactSchema = z.object({
  firstName: singleLine(60),
  lastName: singleLine(60),
  email: z.string().trim().max(254, "That email looks too long").pipe(z.email("Enter a valid email address")),
  topic: z.enum(Object.keys(topics) as [Topic, ...Topic[]]).catch("general"),
  message: z
    .string()
    .trim()
    .min(10, "A few more words, please")
    .max(4000, "Keep it under 4,000 characters"),
});

/** Raw, unvalidated form values as strings. */
export type ContactFields = Record<keyof z.input<typeof contactSchema>, string>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFields, string>>;
      values?: Partial<ContactFields>;
    };
