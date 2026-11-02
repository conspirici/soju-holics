"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

const KEY = "sh-age";

function isVerified() {
  try {
    return localStorage.getItem(KEY) === "ok";
  } catch {
    return false;
  }
}

/**
 * Rendered for everyone and hidden by CSS once `html[data-age="ok"]` is set
 * (by the inline script in the layout), so the static HTML stays crawlable and
 * there's no flash for returning visitors.
 */
export function AgeGate() {
  const [declined, setDeclined] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const site = document.getElementById("site");
    if (isVerified()) {
      // Strict Mode's dev remount strips attributes the inline script set; put it back.
      document.documentElement.dataset.age = "ok";
      return;
    }
    site?.setAttribute("inert", "");
    yesRef.current?.focus();
    return () => site?.removeAttribute("inert");
  }, []);

  function confirm() {
    try {
      localStorage.setItem(KEY, "ok");
    } catch {
      // Private mode etc. They'll be asked again next visit, which is fine.
    }
    document.documentElement.dataset.age = "ok";
    document.getElementById("site")?.removeAttribute("inert");
  }

  return (
    <div
      className="age-gate fixed inset-0 z-50 grid place-items-center bg-forest/75 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
      aria-describedby="age-desc"
    >
      <div className="w-full max-w-md bg-paper px-7 py-9 text-center sm:px-10 sm:py-11">
        <Logo size={56} className="mx-auto size-14" />
        {declined ? (
          <>
            <h2 id="age-title" className="type-display-tight mt-7 text-3xl">
              Come back soon
            </h2>
            <p id="age-desc" className="mt-3 text-muted">
              You need to be of legal drinking age to visit this site. We’ll save you a glass.
            </p>
            <a
              href="https://www.responsibility.org/"
              rel="noopener noreferrer"
              className="mt-7 inline-block text-sm underline underline-offset-4"
            >
              Learn about responsible drinking
            </a>
          </>
        ) : (
          <>
            <p className="font-hangul mt-6 text-berry" aria-hidden="true">
              건배
            </p>
            <h2 id="age-title" className="type-display-tight mt-2 text-3xl">
              Are you 21 or older?
            </h2>
            <p id="age-desc" className="mt-3 text-muted">
              You must be of legal drinking age to enter.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button ref={yesRef} type="button" onClick={confirm} className="btn btn-primary">
                Yes, I’m 21+
              </button>
              <button type="button" onClick={() => setDeclined(true)} className="btn btn-outline">
                No
              </button>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              By entering you agree to enjoy Sojuholics responsibly.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
