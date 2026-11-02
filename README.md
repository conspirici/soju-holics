# Sojuholics website

Marketing site for Sojuholics Korean flavored soju. Next.js 16 (App Router), Tailwind CSS 4, statically
rendered, with a contact form that delivers to your inbox through [Resend](https://resend.com).

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                   # http://localhost:3000
```

`npm run build && npm start` runs the production build locally.

## Environment variables

| Name | Required | What it's for |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key. Server-only. |
| `CONTACT_FROM_EMAIL` | yes | Sender, on a domain verified in Resend, e.g. `Sojuholics Website <website@soju-holics.com>` |
| `CONTACT_TO_EMAIL` | no | Where messages land. Defaults to `info@soju-holics.com`. |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical URL for SEO. Defaults to `https://www.soju-holics.com`. |

Without the Resend variables the form still works, but it shows visitors the email address
instead of sending.

## Deploying to Vercel

1. Push this folder to a GitHub repo and import it in Vercel (framework is detected automatically).
2. In Resend: **Domains → Add domain** `soju-holics.com`, then add the DNS records it gives you.
3. In Vercel: **Settings → Environment Variables**, add the variables above for Production (and Preview if you
   want the form working on preview links).
4. In Vercel: **Settings → Domains**, add `www.soju-holics.com` and `soju-holics.com` (redirecting to www).
5. Recommended: **Firewall → Rate limiting**, add a rule for `POST` requests to `/`, e.g. 10 per minute per IP.
   The app has its own limiter, but a WAF rule is enforced across all instances.

## Where things live

- `src/lib/flavors.ts`: flavor copy, ABV, pairings, colors and images
- `src/lib/site.ts`: name, email, address, Instagram, nav
- `src/components/sections/*`: each homepage section
- `src/app/actions/contact.ts`: contact form handler (validation, spam traps, rate limit, Resend)
- `public/media/`: hero video (WebM + MP4) and poster
- `src/app/icon.png`, `apple-icon.png`, `favicon.ico`, `opengraph-image.jpg`: generated from the logo/hero

## Security notes

- Strict security headers (CSP, HSTS, frame denial, nosniff, referrer and permissions policies) in `next.config.ts`.
- Contact form: server-side Zod validation, header-injection-safe subject, HTML-escaped email body,
  honeypot + timing trap, per-IP rate limit, idempotent sends, no auto-reply (so it can't be used to spam
  third parties), and the API key never reaches the browser.
- Preview deployments are `noindex` via `robots.txt`.
