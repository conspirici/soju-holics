import { ContactForm } from "@/components/contact-form";
import { InstagramIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-paper">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-12 lg:gap-24 lg:px-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted">Contact us</p>
          <h2 id="contact-title" className="type-display-tight mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            Say hello.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Questions, wholesale, or an event idea? Send us a note.
          </p>

          <dl className="mt-12 grid gap-7">
            <div>
              <dt className="eyebrow text-muted">Email</dt>
              <dd className="mt-2 text-lg">
                <a href={`mailto:${site.email}`} className="underline decoration-line underline-offset-4 hover:decoration-bottle">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Based in</dt>
              <dd className="mt-2 text-lg">
                {site.address.locality}, California {site.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-muted">Instagram</dt>
              <dd className="mt-2 text-lg">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline decoration-line underline-offset-4 hover:decoration-bottle"
                >
                  <InstagramIcon />
                  {site.instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
