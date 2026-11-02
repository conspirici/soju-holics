import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Sojuholics handles the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

const updated = "November 2, 2026";

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-20 sm:px-8 md:py-28">
      <p className="eyebrow text-berry">Legal</p>
      <h1 className="type-display-tight mt-5 text-5xl">Privacy notice</h1>
      <p className="mt-4 text-sm text-muted">Last updated {updated}</p>

      <div className="mt-12 grid gap-10 leading-relaxed text-ink-soft [&_h2]:type-display-tight [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-ink">
        <section>
          <h2>The short version</h2>
          <p>
            This is an informational website. We don’t sell anything here, we don’t run advertising trackers, and
            we never sell or rent your personal information.
          </p>
        </section>

        <section>
          <h2>What we collect</h2>
          <p>
            When you use the contact form, we receive your first and last name, email address, the topic you
            choose, and your message. We use this only to read and reply to your inquiry.
          </p>
          <p className="mt-4">
            When you confirm your age, a small note is saved in your browser’s local storage so we don’t ask again.
            It never leaves your device.
          </p>
        </section>

        <section>
          <h2>Who helps us run the site</h2>
          <p>
            The site is hosted by Vercel, which processes standard server logs (such as IP address and browser
            type) to deliver and secure the site. Contact form messages are delivered to our inbox through Resend,
            an email delivery service. Both act on our behalf and only for these purposes.
          </p>
        </section>

        <section>
          <h2>How long we keep it</h2>
          <p>
            We keep your messages for as long as needed to respond and for ordinary business records, then delete
            them.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            You can ask us to access, correct, or delete the information you’ve sent us at any time. California
            residents have these rights under the CCPA/CPRA. Email{" "}
            <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
              {site.email}
            </a>{" "}
            and we’ll take care of it.
          </p>
        </section>

        <section>
          <h2>Age requirement</h2>
          <p>
            This site is intended for people of legal drinking age (21+ in the United States). We do not knowingly
            collect information from anyone under 21.
          </p>
        </section>
      </div>
    </article>
  );
}
