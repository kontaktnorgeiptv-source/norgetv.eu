/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NETWORK & RESOURCE LINKS  (internal/external links)
 *
 *  NETWORK_SITES lists sibling IPTV sites in the network. The <SiteLinks> footer
 *  renders them as cross-links and automatically filters out the current site
 *  (matched by domain against SITE_URL), so this one list can be shared verbatim
 *  across every site.
 *
 *  TEMPLATE: these are neutral placeholders. Replace them with the real sibling
 *  domains for THIS network before going live (or leave as-is to ship no network
 *  mesh — an entry that equals SITE_URL is filtered out automatically).
 *
 *  AUTHORITY_LINKS are external reference pages (rendered rel="nofollow").
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface NetworkSite {
  /** Visible anchor text. */
  name: string;
  /** Full https:// URL, no trailing slash. */
  url: string;
}

export const NETWORK_SITES: NetworkSite[] = [
  // TODO: add your own site network here once sites go live, e.g.
  // { name: "My Other Site", url: "https://www.example.com" },
];

export interface AuthorityLink {
  name: string;
  url: string;
}

export const AUTHORITY_LINKS: AuthorityLink[] = [
  { name: "Vad är IPTV? — Wikipedia", url: "https://sv.wikipedia.org/wiki/IPTV" },
  { name: "Streaming — Wikipedia", url: "https://sv.wikipedia.org/wiki/Direktuppspelning" },
  { name: "Smart-TV — Wikipedia", url: "https://sv.wikipedia.org/wiki/Smart-tv" },
  { name: "Kodi mediaspelare — Wikipedia", url: "https://sv.wikipedia.org/wiki/Kodi" },
];
