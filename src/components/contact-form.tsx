"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/app/actions/contact";
import { ArrowIcon } from "@/components/icons";
import { topics, type ContactFields, type ContactState } from "@/lib/contact-schema";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-white p-8 outline-none sm:p-10">
        <p className="font-hangul text-2xl text-berry" aria-hidden="true">
          감사합니다
        </p>
        <h3 className="type-display-tight mt-3 text-3xl">Thanks, message received.</h3>
        <p className="mt-3 max-w-md text-muted">
          A real person on our team reads every note. We’ll reply to the email you gave us, usually within a
          couple of business days.
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values: Partial<ContactFields> = state.status === "error" ? (state.values ?? {}) : {};
  // Re-key after an error so defaultValues refresh with what the visitor typed.
  const formKey = state.status === "error" ? JSON.stringify(values) : "fresh";

  return (
    <form key={formKey} action={action} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="firstName" label="First name" autoComplete="given-name" error={errors.firstName} defaultValue={values.firstName} maxLength={60} />
        <Field name="lastName" label="Last name" autoComplete="family-name" error={errors.lastName} defaultValue={values.lastName} maxLength={60} />
      </div>
      <Field name="email" type="email" label="Email" autoComplete="email" error={errors.email} defaultValue={values.email} maxLength={254} />

      <div className="grid gap-2">
        <label htmlFor="topic" className="text-sm font-medium">
          What’s it about?
        </label>
        <select id="topic" name="topic" className="field appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%3E%3Cpath%20d=%22M1%201.5l5%205%205-5%22%20fill=%22none%22%20stroke=%22%2315120f%22%20stroke-width=%221.5%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10" defaultValue={values.topic || "general"}>
          {Object.entries(topics).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4000}
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell us a little about your venue, event, or question."
          className="field resize-none"
        />
        {errors.message && <ErrorText id="message-error">{errors.message}</ErrorText>}
      </div>

      {/* Spam traps: a field people never see, and when the form was opened. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input
        type="hidden"
        name="startedAt"
        ref={(el) => {
          // First time the form appears; kept across re-renders after a validation error.
          if (!el) return;
          startedAt.current ||= Date.now();
          el.value = String(startedAt.current);
        }}
      />

      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          We only use your details to reply. See our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-ink">
            privacy notice
          </a>
          .
        </p>
        <button type="submit" disabled={pending} className="btn btn-primary shrink-0 disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
          {!pending && <ArrowIcon />}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === "error" && (
          <p className="border-l-2 border-berry bg-white px-4 py-3 text-sm">{state.message}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  type = "text",
  ...rest
}: {
  name: keyof ContactFields;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  maxLength?: number;
}) {
  const errorId = `${name}-error`;
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field"
        {...rest}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-sm text-berry">
      {children}
    </p>
  );
}
