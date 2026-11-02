"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, topics, type ContactFields, type ContactState } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

const MIN_FILL_MS = 2500; // humans don't fill four fields in under 2.5s
const MAX_FORM_AGE_MS = 1000 * 60 * 60 * 12;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const asString = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw: ContactFields = {
    firstName: asString(formData.get("firstName")),
    lastName: asString(formData.get("lastName")),
    email: asString(formData.get("email")),
    topic: asString(formData.get("topic")),
    message: asString(formData.get("message")),
  };

  // Honeypot + timing trap. Bots get a fake success so they don't adapt.
  const honeypot = asString(formData.get("website"));
  const startedAt = Number(asString(formData.get("startedAt")));
  const elapsed = Date.now() - startedAt;
  if (honeypot || !Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS) {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFields, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFields;
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw };
  }

  // Only sends count toward the limit, so a few typos never lock anyone out.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 1000 * 60 * 15).ok) {
    return {
      status: "error",
      message: "You’ve sent a few messages already. Please wait a little while and try again.",
      values: raw,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (!apiKey || !from) {
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
    return {
      status: "error",
      message: `We couldn’t send that right now. Please email us at ${site.email}.`,
      values: raw,
    };
  }

  const { firstName, lastName, email, topic, message } = parsed.data;
  const name = `${firstName} ${lastName}`;
  const topicLabel = topics[topic];

  const text = [
    `New message from the ${site.name} website`,
    "",
    `Name:  ${name}`,
    `Email: ${email}`,
    `Topic: ${topicLabel}`,
    "",
    message,
  ].join("\n");

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.55;color:#15120f">
  <p style="margin:0 0 16px;color:#5e5650">New message from the ${escapeHtml(site.name)} website</p>
  <table cellpadding="0" cellspacing="0" style="margin:0 0 20px">
    <tr><td style="padding:2px 16px 2px 0;color:#5e5650">Name</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="padding:2px 16px 2px 0;color:#5e5650">Email</td><td>${escapeHtml(email)}</td></tr>
    <tr><td style="padding:2px 16px 2px 0;color:#5e5650">Topic</td><td>${escapeHtml(topicLabel)}</td></tr>
  </table>
  <div style="white-space:pre-wrap;border-top:1px solid #e6dfd6;padding-top:16px">${escapeHtml(message)}</div>
</div>`;

  // Same content within a day collapses to one email if someone double-submits.
  const idempotencyKey = createHash("sha256")
    .update([email, topic, message, new Date().toISOString().slice(0, 10)].join("|"))
    .digest("hex");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      {
        from,
        to,
        replyTo: email,
        subject: `${topicLabel}: ${name}`.slice(0, 150),
        text,
        html,
        tags: [{ name: "source", value: "website_contact" }],
      },
      { idempotencyKey },
    );
    if (error) {
      console.error("[contact] Resend rejected the message:", error.name, error.message);
      throw new Error("send failed");
    }
  } catch {
    return {
      status: "error",
      message: `Something went wrong on our end. Please try again, or email us at ${site.email}.`,
      values: raw,
    };
  }

  return { status: "success" };
}
