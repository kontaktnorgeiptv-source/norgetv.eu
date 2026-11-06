# SV/Nordic Website Template (IPTV Sverige)

A blank, reusable **Sweden-first (Nordic)** website template for launching new IPTV
sites quickly. Vite + React 19 + Tailwind 4 SPA with a prerendered multilingual blog.

All site-specific identity has been stripped and replaced with neutral
placeholders (`https://www.example.com`, `NORGE TV`, `@your-handle`). The
design, page structure, components and service copy are kept intact — fill in the
placeholders to turn it into a real site.

The published default language is **Swedish** (`SITE_LANG` in `src/i18n.ts`) and the
default market is Sweden/Nordics (the geo-redirect in `src/App.tsx` sends English
markets to `/en` and everything else — including Sweden and the Nordics — to `/sv`).
The header language switcher offers **Svenska first**, then English and the wider
Nordic/EU set as author/alternate languages; Swedish is the default and the language
every page is canonicalised in.

> **Header logo vs. content brand:** the header/logo wordmark is **IPTV NORDIC**
> (`src/components/Header.tsx` + `public/logo-wordmark.svg`), kept deliberately
> separate from `BRAND_NAME` (**NORGE TV**), which is the market/content brand
> used in copy and structured data.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

The dev server listens on <http://localhost:3000> (it falls back to the next free
port, e.g. 3001/3002, if 3000 is taken).

## Build

```bash
npm run build
```

This runs `vite build` and then `scripts/prerender.ts`, which writes a real static
HTML file per route into `dist/` (own `<title>`, meta description, canonical,
Open Graph tags, JSON-LD and the text baked in) so every page is crawlable. It
also regenerates `dist/sitemap*.xml` and appends the `Sitemap:` lines to
`dist/robots.txt`.

> **Build anchor warning:** the prerenderer patches `dist/index.html` on three
> exact-match anchor strings — `TPL_HTML_TAG` (`<html lang="sv">`), `TPL_CANONICAL`
> and `TPL_TITLE` in `scripts/prerender.ts`. These must stay byte-for-byte equal to
> the matching lines in `index.html`, or `npm run build` throws. If you change the
> homepage `<title>`, the `<html lang>` or the canonical in `index.html`, update the
> corresponding constant in `scripts/prerender.ts` too. **Avoid an `&`/entity in the
> `<title>`** — a literal `&` can be re-encoded by Vite and break the anchor match;
> use a plain separator (`|` or `—`) instead.

> **Quote pitfall:** in the blog/keyword content strings, never put a straight ASCII
> double quote (`"`) inside a double-quoted JS string — it terminates the string and
> breaks the build. Use the typographic marks `” ”` (or none). Swedish letters
> `å ä ö` are fine.

## SEO keyword targeting

- **Swedish pages** (`/sv`, root `/`, and the Swedish keyword landing pages) target
  **IPTV köpa, IPTV Sverige, IPTV abonnemang, IPTV leverantör, bästa IPTV**.
- **English pages** (`/en`) target **IPTV Sweden, Swedish IPTV**.
- The homepage title/description/H1 live in two places that must agree:
  `index.html` (the SPA shell / root `/`) and the `HOME_TITLE` / `HOME_DESC` /
  `HOME_BODY` constants in `scripts/prerender.ts` (the prerendered `/sv` and `/en`
  pages). `HOME_LANGS` is `["sv","en"]` and the sitemap x-default resolves to `/sv`.
- Keyword landing pages live in `src/data/keywordPages.ts` (default `lang: "sv"`; set
  `lang: "en"` on an English page). The blog corpus is `src/data/svBlogPosts1.ts`,
  wired through `src/data/allPosts.ts`.

## Template setup checklist

1. **`src/siteConfig.ts`** — the single source of brand info. Set `BRAND_NAME`,
   `SITE_URL`, `SITE_DOMAIN`, `WA_NUMBER` (per-site WhatsApp number — currently the
   previous site's), `INSTAGRAM_URL`, `SUPPORT_EMAIL`.
2. **Domain** — replace every `https://www.example.com` / `example.com` with your
   real domain across `src/`, `scripts/prerender.ts` (the `SITE` constant) and
   `index.html` (canonical, Open Graph, Twitter, JSON-LD).
3. **Brand name** — project-wide find & replace of the placeholder `NORGE TV`
   (and the standalone `BRAND`) inside the content/blog prose, which is plain text
   and intentionally not wired to variables. The **logo** wordmark `IPTV NORDIC` is
   separate — edit `src/components/Header.tsx` and `public/logo-wordmark.svg`.
4. **`index.html`** — update `<title>`, meta description/keywords, Open Graph &
   Twitter tags, canonical URL and the JSON-LD (Organization/WebSite/Product +
   Swedish reviews, `inLanguage` `sv-SE`). Keep `<title>`, `<html lang>` and the
   canonical in sync with `scripts/prerender.ts` (see the build-anchor warning).
5. **Verification tokens** — add your Google Search Console and Bing Webmaster
   tokens in the commented block near the top of `index.html` (per-site values —
   the old tokens have been removed).
6. **`metadata.json`** — update `name` and `description`.
7. **Logos / favicons** — replace `public/favicon.svg` and
   `public/logo-wordmark.svg`, drop new source art in `assets/brand/`, then run
   `npm run brand` to regenerate every derived icon and the hero plate. The header
   renders a two-colour **text** wordmark (`src/components/Header.tsx`).
8. **Social links** — fill in URLs in `src/socialLinks.ts` (empty = hidden, never a
   dead link). The footer config ships empty.
9. **Network mesh** — `src/networkSites.ts` ships neutral `example.*` placeholders;
   replace with the real sibling sites in your Nordic network (an entry equal to
   `SITE_URL` is auto-filtered from the footer).
10. **Email notifications** — set the EmailJS IDs in `src/emailConfig.ts`.
11. **Ads tracking** — set `ADS_CONVERSION_SEND_TO` in `src/analytics.ts` (optional).
12. **Pricing** — plans live in `src/types.ts` (`SUBSCRIPTION_PLANS`), priced in
    **SEK** and rendered as `kr`. The Product JSON-LD `priceCurrency`/`lowPrice`/
    `highPrice` in `index.html` must match the plan range.
13. **Brand colors** — defined in `src/index.css` (accent is `#facc15`).
14. **Language & market** — `SITE_LANG` in `src/i18n.ts` and the geo-redirect
    fallbacks in `src/App.tsx` set the default market (currently Swedish / Nordic).
    Keep the `HOME_LANGS` list in `src/App.tsx`, `src/components/LanguageSwitcher.tsx`
    and `scripts/prerender.ts` in agreement.
