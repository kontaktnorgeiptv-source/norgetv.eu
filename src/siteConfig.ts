/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file to edit when spinning up a new website.
 *
 *  This is a blank Sweden (SV-first, Nordic) website template. Every
 *  brand-specific value lives here. Change the values below and the whole site
 *  updates: footer, pricing CTAs, blog links, structured data, etc.
 *
 *  After editing this file, also do a project-wide find & replace of the
 *  placeholder text "NORGE TV" (and "BRAND") inside the content/blog strings,
 *  which are plain prose and intentionally not wired to variables.
 *
 *  NOTE: the HEADER/LOGO wordmark is "IPTV NORDIC" (see Header.tsx and
 *  public/logo-wordmark.svg) — it is deliberately separate from BRAND_NAME,
 *  which is the market/content brand used in copy and structured data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Public brand / product name shown across the content & structured data. */
export const BRAND_NAME = "NORGE TV";

/** Canonical site origin, no trailing slash. Used in SEO, sitemap, blog links. */
export const SITE_URL = "https://www.norgetv.eu";

/** Bare domain (no protocol), e.g. for display and meta text. */
export const SITE_DOMAIN = "www.norgetv.eu";

/**
 * WhatsApp contact number in wa.me form (international, digits only, no + or spaces).
 * PER-SITE VALUE — this is the previous site's number; replace it with the
 * WhatsApp number for THIS brand before going live.
 */
export const WA_NUMBER = "447462229301";

/** Primary social / Instagram profile URL. Replace with this brand's account. */
export const INSTAGRAM_URL = "https://www.instagram.com/yourbrand/";

/** Support e-mail address. */
export const SUPPORT_EMAIL = "support@example.com";
