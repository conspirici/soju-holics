"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact } from "@/app/actions/contact";
import { ArrowIcon } from "@/components/icons";
import {
  topics,
  validateContact,
  type ContactFields,
  type ContactState,
  type FieldErrors,
} from "@/lib/contact-schema";

const initial: ContactState = { status: "idle" };

type Checked = Exclude<keyof ContactFields, "topic">;
type FieldElement = HTMLInputElement | HTMLTextAreaElement;
const CHECKED: Checked[] = ["firstName", "lastName", "email", "message"];

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);

  // What the browser has checked so far. "" means checked and fine.
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  // A new server response starts a clean slate so its own errors show.
  const [seenState, setSeenState] = useState(state);
  if (seenState !== state) {
    setSeenState(state);
    setClientErrors({});
  }

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="animate-rise border border-line bg-white p-8 outline-none sm:p-10"
      >
        <svg viewBox="0 0 48 48" className="draw-check size-12 text-bottle" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" pathLength={1} />
          <path d="M15 24.5l6 6 12-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" pathLength={1} />
        </svg>
        <p className="font-hangul mt-6 text-2xl text-berry" aria-hidden="true">
          감사합니다
        </p>
        <h3 className="type-display-tight mt-2 text-3xl">Thanks, message received.</h3>
        <p className="mt-3 max-w-md text-muted">
          A real person on our team reads every note. We’ll reply to the email you gave us, usually within a
          couple of business days.
        </p>
      </div>
    );
  }

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values: Partial<ContactFields> = state.status === "error" ? (state.values ?? {}) : {};
  // Re-key after a server error so defaultValues refresh with what the visitor typed.
  const formKey = state.status === "error" ? JSON.stringify(values) : "fresh";

  const errorFor = (name: Checked) => (name in clientErrors ? clientErrors[name] : serverErrors[name]) || undefined;
  const validFor = (name: Checked) => clientErrors[name] === "";

  function read(form: HTMLFormElement): ContactFields {
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    return {
      firstName: get("firstName"),
      lastName: get("lastName"),
      email: get("email"),
      topic: get("topic"),
      message: get("message"),
    };
  }

  function check(name: Checked, form: HTMLFormElement) {
    const errors = validateContact(read(form));
    setClientErrors((prev) => ({ ...prev, [name]: errors[name] ?? "" }));
  }

  // Judge a field once the visitor leaves it, but don't scold an untouched empty one.
  function handleBlur(name: Checked, field: FieldElement) {
    if (field.form && (field.value.trim() || name in clientErrors)) check(name, field.form);
  }

  // While typing, only update a field that's already been judged, so errors clear the moment it's fixed.
  function handleInput(name: Checked, field: FieldElement) {
    if (field.form && name in clientErrors) check(name, field.form);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const errors = validateContact(read(form));
    const bad = CHECKED.filter((name) => errors[name]);
    setClientErrors(Object.fromEntries(CHECKED.map((name) => [name, errors[name] ?? ""])));
    if (bad.length === 0) return;

    e.preventDefault();
    for (const name of bad) {
      const el = form.elements.namedItem(name) as HTMLElement | null;
      if (!el) continue;
      // Restart the shake even if it played last time.
      el.classList.remove("animate-shake");
      void el.offsetWidth;
      el.classList.add("animate-shake");
      el.addEventListener("animationend", () => el.classList.remove("animate-shake"), { once: true });
    }
    (form.elements.namedItem(bad[0]) as HTMLElement | null)?.focus();
  }

  const fieldProps = (name: Checked) => ({
    name,
    error: errorFor(name),
    valid: validFor(name),
    onBlur: handleBlur,
    onInput: handleInput,
    defaultValue: values[name],
  });

  return (
    <form key={formKey} action={action} onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" autoComplete="given-name" maxLength={60} {...fieldProps("firstName")} />
        <Field label="Last name" autoComplete="family-name" maxLength={60} {...fieldProps("lastName")} />
      </div>
      <Field type="email" label="Email" autoComplete="email" inputMode="email" maxLength={254} {...fieldProps("email")} />

      <div className="grid gap-2">
        <label htmlFor="topic" className="text-sm font-medium">
          What’s it about?
        </label>
        <select
          id="topic"
          name="topic"
          className="field appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%3E%3Cpath%20d=%22M1%201.5l5%205%205-5%22%20fill=%22none%22%20stroke=%22%2315120f%22%20stroke-width=%221.5%22/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat pr-10"
          defaultValue={values.topic || "general"}
        >
          {Object.entries(topics).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <Field
        multiline
        label="Message"
        maxLength={4000}
        placeholder="Tell us a little about your venue, event, or question."
        {...fieldProps("message")}
      />

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
        <button type="submit" disabled={pending} aria-busy={pending} className="btn btn-primary min-w-44 shrink-0 disabled:opacity-80">
          {pending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowIcon />
            </>
          )}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === "error" && (
          <p className="animate-rise flex items-start gap-3 border-l-2 border-berry bg-white px-4 py-3 text-sm">
            <AlertIcon className="mt-0.5 size-4 shrink-0 text-berry" />
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  valid,
  onBlur,
  onInput,
  multiline,
  type = "text",
  ...rest
}: {
  name: Checked;
  label: string;
  error?: string;
  valid: boolean;
  onBlur: (name: Checked, field: FieldElement) => void;
  onInput: (name: Checked, field: FieldElement) => void;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "email";
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
}) {
  const errorId = `${name}-error`;
  // Keep the last message on screen while it animates closed.
  const [shown, setShown] = useState(error);
  if (error && error !== shown) setShown(error);

  const shared = {
    id: name,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "data-valid": valid || undefined,
    onBlur: (e: React.FocusEvent<FieldElement>) => onBlur(name, e.currentTarget),
    onInput: (e: React.FormEvent<FieldElement>) => onInput(name, e.currentTarget),
    ...rest,
  };

  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea rows={5} className="field resize-none pr-11" {...shared} />
        ) : (
          <input type={type} className="field pr-11" {...shared} />
        )}
        <span
          className={`field-tick pointer-events-none absolute right-3.5 text-bottle ${multiline ? "top-3.5" : "top-1/2 -mt-2.5"}`}
          data-show={valid}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-5">
            <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </span>
      </div>
      <div className="field-msg" data-show={Boolean(error)}>
        <div>
          <p id={error ? errorId : undefined} className="flex items-center gap-1.5 pt-0.5 text-sm text-berry">
            <AlertIcon className="size-4 shrink-0" />
            {shown}
          </p>
        </div>
      </div>
    </div>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v4.75h-1.5V4.5ZM8 12.1a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9Z" />
    </svg>
  );
}
