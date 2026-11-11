import { KW_PILLARS } from "./kwPillars";
import { SITE_URL as SITE, BRAND_NAME, WA_NUMBER } from "../siteConfig";
import type { LangCode } from "../i18n";
// SEO keyword landing pages. Single source of truth shared by the SPA router
// (src/App.tsx) and the post-build prerenderer (scripts/prerender.ts) so the
// client-rendered page and the crawlable static HTML can never drift apart.
//
// Each page is a home-style landing (it reuses the Pricing packages) optimized
// for one principal SWEDISH keyword, served at the root path `/<slug>` to match
// the domain.com/KEYWORD pattern. A small set of English pages targets the
// "IPTV Sweden" / "Swedish IPTV" queries. The target keyword set for this site
// is: IPTV köpa, IPTV Sverige, IPTV abonnemang, IPTV leverantör, bästa IPTV.
//
// PORTING: change the constants below (SITE, BRAND via siteConfig, WA) and the
// slugs/keywords/copy. Pages default to Swedish (`lang: "sv"`); set `lang: "en"`
// on an English page.
//
// PITFALL: never put a straight ASCII double quote (") inside these strings — in
// a double-quoted FAQ string it terminates the string and breaks the build. Use
// the typographic marks ” ” (or none). Swedish letters å ä ö are fine.

const BRAND = BRAND_NAME;
const WA = `https://wa.me/${WA_NUMBER}`;

export interface KeywordFaq {
  q: string;
  a: string;
}

export interface KeywordPage {
  /** Root-level path segment, e.g. "iptv-kopa" → https://www.example.com/iptv-kopa */
  slug: string;
  /** Principal keyword this page targets. */
  keyword: string;
  /** <title> (kept ≤ ~60 chars where possible). */
  title: string;
  /** Meta description (≤ 160 chars). */
  description: string;
  /** On-page H1. */
  h1: string;
  /** Intro paragraphs rendered above the packages. [label](url) markdown links allowed. */
  lead: string[];
  /** FAQ block (rendered on-page and emitted as FAQPage JSON-LD). */
  faq: KeywordFaq[];
  /** Page language. Defaults to Swedish; English pages set this to "en" so the
   *  prerenderer emits the right <html lang>, breadcrumb, CTA and canonical. */
  lang?: LangCode;
}

// Shared closing CTA paragraph, woven with internal links to the core money
// pages so every landing page passes link equity to IPTV köpa / Sverige /
// leverantör.
const CORE_LINKS_SV =
  `Mer om detta: [IPTV köpa](${SITE}/iptv-kopa), [IPTV Sverige](${SITE}/iptv-sverige) och [IPTV leverantör](${SITE}/iptv-leverantor).`;
const GUARANTEE_SV =
  `Varje ${BRAND}-abonnemang innehåller hela kanal- och VOD-katalogen, 15 dagars återbetalningsgaranti och support dygnet runt via [WhatsApp](${WA}).`;

const RAW_KEYWORD_PAGES: KeywordPage[] = [...KW_PILLARS, 
  // ── Core intent ───────────────────────────────────────────────────────────
  {
    slug: "iptv-kopa",
    keyword: "IPTV köpa",
    title: `IPTV köpa — premium IPTV abonnemang | ${BRAND}`,
    description: `Köp IPTV hos ${BRAND}: premium IPTV abonnemang med 69 000+ livekanaler och 220 000+ filmer i upp till 8K. Aktivt direkt, utan bindningstid, 15 dagars garanti.`,
    h1: "IPTV köpa — kom igång direkt med ett premium IPTV abonnemang",
    lead: [
      `Vill du [köpa IPTV](${SITE}/iptv-kopa)? Hos [${BRAND}](${SITE}) får du ett premium IPTV abonnemang med över 69 000 livekanaler och 220 000+ filmer och serier i upp till 8K Ultra HD — aktivt direkt efter köpet, helt utan bindningstid.`,
      `## Varför köpa IPTV hos ${BRAND}?`,
      `En bra [IPTV leverantör](${SITE}/iptv-leverantor) visar sina paket och priser öppet och håller kanalerna stabilt online. ${BRAND} levererar Allsvenskan, SHL, UEFA Champions League och internationell sport, ett VOD-bibliotek som uppdateras varje vecka och inloggningsuppgifter som fungerar i IPTV Smarters Pro, TiviMate och alla Xtream-spelare — du är aldrig låst till en app.`,
      `## Välj IPTV abonnemang och aktivera`,
      `Välj ett paket nedan, betala säkert och få dina inloggningsuppgifter oftast inom några minuter. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Hur köper jag IPTV?", a: `Välj ett paket hos ${BRAND}, betala säkert och få dina inloggningsuppgifter oftast inom några minuter via e-post.` },
      { q: "Behöver jag binda mig?", a: `Nej. Varje ${BRAND}-abonnemang löper utan bindningstid och utan automatisk förnyelse, med längder från en månad upp till ett år.` },
      { q: "Vilka enheter fungerar det på?", a: "Smart TV, Android, Fire TV Stick, MAG-box, mobil och surfplatta — via IPTV Smarters Pro, TiviMate eller valfri Xtream-kompatibel spelare." },
      { q: "Finns det någon garanti?", a: `Ja. Varje ${BRAND}-abonnemang har 15 dagars återbetalningsgaranti och support dygnet runt via WhatsApp.` },
    ],
  },
  {
    slug: "iptv-sverige",
    keyword: "IPTV Sverige",
    title: `IPTV Sverige — premium IPTV | ${BRAND}`,
    description: `IPTV Sverige från ${BRAND}: 69 000+ livekanaler inkl. Allsvenskan, SHL och Champions League, 220 000+ filmer i upp till 8K. Köp IPTV för Smart TV och Fire TV.`,
    h1: "IPTV Sverige — premium IPTV för Smart TV, Android och Fire TV",
    lead: [
      `[IPTV Sverige](${SITE}/iptv-sverige) från [${BRAND}](${SITE}) är ett premium IPTV abonnemang för Sverige och Norden: över 69 000 livekanaler från Sverige, Norden och hela Europa, plus 220 000+ filmer och serier on demand i upp till 8K Ultra HD.`,
      `## Alla svenska kanaler och mer`,
      `Du får de stora svenska kanalerna, Allsvenskan, SHL och UEFA Champions League, internationella kanaler och ett djupt VOD-bibliotek som växer varje vecka. Tack vare EPG-programguide och catch-up ser du det du missat, och med barnlåset håller du allt familjevänligt.`,
      `## Köpa IPTV i Sverige`,
      `Välj ett paket, betala säkert och kom igång oftast inom några minuter. För stabil 4K rekommenderar vi runt 25 Mbit/s, för HD räcker ~16 Mbit/s. ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Vad är IPTV Sverige?", a: `${BRAND} är ett premium IPTV abonnemang för Sverige med 69 000+ livekanaler och 220 000+ filmer och serier i upp till 8K, på Smart TV, Android, Fire TV, MAG och mer.` },
      { q: "Fungerar det i hela Norden?", a: `Ja. ${BRAND} fungerar i Sverige, Norge, Danmark och Finland på vilken internetanslutning som helst — på svenska och engelska.` },
      { q: "Ingår svenska kanaler?", a: "Ja, de stora svenska kanalerna ingår, plus Allsvenskan, SHL, Champions League och internationella kanaler." },
      { q: "Finns det någon garanti?", a: `Varje ${BRAND}-abonnemang har 15 dagars återbetalningsgaranti och support dygnet runt via WhatsApp.` },
    ],
  },
  {
    slug: "iptv-leverantor",
    keyword: "IPTV leverantör",
    title: `IPTV leverantör — bästa premium IPTV | ${BRAND}`,
    description: `${BRAND} är din pålitliga IPTV leverantör: 69 000+ livekanaler, 220 000+ filmer i upp till 8K, öppna priser, support dygnet runt och 15 dagars garanti.`,
    h1: "IPTV leverantör — pålitlig, transparent, med äkta support",
    lead: [
      `Letar du efter en seriös [IPTV leverantör](${SITE}/iptv-leverantor)? [${BRAND}](${SITE}) visar paket och priser öppet, sköter katalogen dagligen och håller kanalerna stabilt online — till skillnad från de anonyma återförsäljarna bakom många sökresultat.`,
      `## Så känner du igen en bra IPTV leverantör`,
      `En bra leverantör bevisar kvalitet i stället för att bara lova den: stabila streams även under kvällstoppen, ett VOD-bibliotek som uppdateras varje vecka, fritt appval (IPTV Smarters Pro, TiviMate, alla Xtream-spelare) och en support som faktiskt svarar.`,
      `## Köp nu hos den bästa IPTV leverantören`,
      `Välj ett paket nedan och aktivera inom några minuter. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Varför välja en premium IPTV leverantör?", a: `En premium-leverantör som ${BRAND} håller kanalerna stabila, uppdaterar VOD varje vecka och erbjuder äkta support dygnet runt — i stället för billiga, instabila återförsäljarströmmar.` },
      { q: "Är leverantören pålitlig?", a: `${BRAND} visar priser öppet, sköter katalogen dagligen och ger 15 dagars återbetalningsgaranti så att du kan testa riskfritt.` },
      { q: "Erbjuder leverantören support?", a: "Ja, support dygnet runt via WhatsApp — oftast med svar inom några minuter." },
      { q: "Vilken app är jag låst till?", a: "Ingen. Dina inloggningsuppgifter fungerar i IPTV Smarters Pro, TiviMate och alla Xtream-kompatibla spelare." },
    ],
  },
  {
    slug: "iptv-abonnemang",
    keyword: "IPTV abonnemang",
    title: `IPTV abonnemang — premium utan bindningstid | ${BRAND}`,
    description: `IPTV abonnemang hos ${BRAND}: 69 000+ kanaler och 220 000+ filmer i upp till 8K, utan bindningstid. Längder från 1 månad till 1 år, 15 dagars garanti.`,
    h1: "IPTV abonnemang — flexibelt, utan bindningstid, i upp till 8K",
    lead: [
      `Ett [IPTV abonnemang](${SITE}/iptv-abonnemang) hos [${BRAND}](${SITE}) ger dig över 69 000 livekanaler och 220 000+ filmer och serier i upp till 8K — utan bindningstid och utan automatisk förnyelse. Du betalar en gång och förnyar manuellt när du vill.`,
      `## Vad ingår i abonnemanget?`,
      `Hela kanalutbudet, sport, nyheter och barnkanaler, plus ett VOD-bibliotek som uppdateras varje vecka. EPG-programguide, catch-up och barnlås ingår. Dina uppgifter fungerar i valfri Xtream- eller M3U-spelare.`,
      `## Välj längd och kom igång`,
      `Välj mellan en månad och ett år. Längre längder sänker månadspriset och kan inkludera gratis bonusmånader. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Vilka längder finns?", a: `${BRAND} erbjuder abonnemang på 3, 6, 12 och 24 månader — alla utan bindningstid och utan automatisk förnyelse.` },
      { q: "Förnyas abonnemanget automatiskt?", a: "Nej. Det finns ingen automatisk förnyelse. Du förnyar manuellt när perioden är slut." },
      { q: "Kan jag uppgradera senare?", a: "Ja, du kan förlänga eller uppgradera när som helst — kontakta supporten via WhatsApp så hjälper de dig." },
      { q: "Finns det någon garanti?", a: `Ja, 15 dagars återbetalningsgaranti på varje ${BRAND}-abonnemang.` },
    ],
  },
  {
    slug: "basta-iptv",
    keyword: "bästa IPTV",
    title: `Bästa IPTV i Sverige — köpråd | ${BRAND}`,
    description: `Letar du efter bästa IPTV? ${BRAND} erbjuder 69 000+ kanaler, 220 000+ filmer i upp till 8K, stabila streams, öppna priser och 15 dagars garanti.`,
    h1: "Bästa IPTV i Sverige — så väljer du rätt",
    lead: [
      `Vad gör den [bästa IPTV](${SITE}/basta-iptv)-tjänsten bäst? Stabilitet, katalogdjup, fritt appval, öppet pris och äkta support. [${BRAND}](${SITE}) levererar på alla fem punkter.`,
      `## Det som skiljer bra från dåligt`,
      `De flesta anonyma erbjudanden lovar allt och levererar instabila streams. En seriös tjänst som ${BRAND} bevisar kvaliteten: buffringsfria streams under kvällstoppen, ett VOD-bibliotek som uppdateras varje vecka och en support som svarar inom minuter.`,
      `## Testa den bästa IPTV riskfritt`,
      `Välj ett paket nedan och se själv. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Vilken är bästa IPTV i Sverige?", a: `${BRAND} rankas högt tack vare stabila streams, ett djupt VOD-bibliotek, fritt appval och support dygnet runt — med öppna priser och 15 dagars garanti.` },
      { q: "Hur testar jag utan risk?", a: "Välj valfritt paket och utnyttja 15 dagars återbetalningsgaranti om du inte är nöjd." },
      { q: "Vad avgör kvaliteten?", a: "Serverstabilitet under kvällstoppen, katalogdjup, uppdateringsfrekvens och supportens svarstid." },
      { q: "Är billig alltid sämre?", a: `Inte nödvändigtvis, men extremt billiga återförsäljare är ofta instabila. ${BRAND} ger premiumkvalitet till ett rimligt pris.` },
    ],
  },
  // ── Trial / price / terms ───────────────────────────────────────────────
  {
    slug: "iptv-test",
    keyword: "IPTV test",
    title: `IPTV test — testa riskfritt | ${BRAND}`,
    description: `IPTV test hos ${BRAND}: testa premium IPTV riskfritt med 15 dagars återbetalningsgaranti. 69 000+ kanaler och 220 000+ filmer i upp till 8K.`,
    h1: "IPTV test — testa premium IPTV riskfritt",
    lead: [
      `Vill du göra ett [IPTV test](${SITE}/iptv-test) innan du binder dig? Hos [${BRAND}](${SITE}) testar du hela premiumtjänsten riskfritt tack vare 15 dagars återbetalningsgaranti — i stället för en kort gratis testlänk som sällan visar den verkliga kvaliteten.`,
      `## Varför garanti slår gratis test`,
      `Gratis testlänkar körs ofta på reservservrar och säger inget om hur tjänsten presterar en fullsatt sportkväll. Med [${BRAND}](${SITE}) testar du den riktiga tjänsten i upp till 15 dagar och får pengarna tillbaka om du inte är nöjd.`,
      `## Starta ditt IPTV test`,
      `Välj ett kort paket nedan och kom igång inom några minuter. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Finns det gratis IPTV test?", a: `${BRAND} erbjuder i stället 15 dagars återbetalningsgaranti så att du kan testa hela den riktiga tjänsten riskfritt — mer tillförlitligt än en kort gratislänk.` },
      { q: "Hur fungerar garantin?", a: "Är du inte nöjd inom 15 dagar får du full återbetalning. Kontakta supporten via WhatsApp." },
      { q: "Hur snabbt aktiveras testet?", a: "Oftast inom några minuter efter betalning — du får dina inloggningsuppgifter via e-post och WhatsApp." },
      { q: "Vilket paket passar för test?", a: "3-månaderspaketet är ett bra och billigt sätt att testa tjänsten på riktigt." },
    ],
  },
  {
    slug: "iptv-billigt",
    keyword: "IPTV billigt",
    title: `IPTV billigt — utan kvalitetsförlust | ${BRAND}`,
    description: `Billigt IPTV hos ${BRAND} utan att tumma på kvaliteten: 69 000+ kanaler och 220 000+ filmer i upp till 8K, stabila streams och 15 dagars garanti.`,
    h1: "IPTV billigt — lågt pris, premiumkvalitet",
    lead: [
      `[Billigt IPTV](${SITE}/iptv-billigt) behöver inte betyda dålig kvalitet. Hos [${BRAND}](${SITE}) sänker längre abonnemang månadspriset rejält — utan att streams eller katalog blir sämre.`,
      `## Lågt pris utan fällor`,
      `Extremt billiga återförsäljare är ofta instabila och försvinner snabbt. ${BRAND} erbjuder ett rimligt pris, öppna villkor och stabila servrar — plus gratis bonusmånader på längre abonnemang.`,
      `## Så får du bäst pris`,
      `Välj ett 12- eller 24-månaderspaket för lägst månadskostnad. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Hur får jag billigast IPTV?", a: `Välj ett längre abonnemang hos ${BRAND} — 12 eller 24 månader ger lägst månadspris och ibland gratis bonusmånader.` },
      { q: "Är billigt IPTV sämre?", a: `Inte hos ${BRAND}. Du får samma premiumkvalitet och katalog oavsett abonnemangslängd.` },
      { q: "Finns dolda avgifter?", a: "Nej. Inga installationsavgifter, inga dolda kostnader och ingen automatisk förnyelse." },
      { q: "Finns det garanti?", a: "Ja, 15 dagars återbetalningsgaranti på alla paket." },
    ],
  },
  {
    slug: "iptv-utan-bindningstid",
    keyword: "IPTV utan bindningstid",
    title: `IPTV utan bindningstid — flexibelt | ${BRAND}`,
    description: `IPTV utan bindningstid hos ${BRAND}: inga kontrakt, ingen automatisk förnyelse. 69 000+ kanaler och 220 000+ filmer i upp till 8K, 15 dagars garanti.`,
    h1: "IPTV utan bindningstid — inga kontrakt, ingen automatisk förnyelse",
    lead: [
      `[IPTV utan bindningstid](${SITE}/iptv-utan-bindningstid) ger dig full frihet. Hos [${BRAND}](${SITE}) betalar du för en period och förnyar bara om du vill — inga kontrakt, ingen automatisk dragning.`,
      `## Full kontroll över ditt abonnemang`,
      `Du väljer längd från en månad upp till ett år. När perioden är slut tar tjänsten slut — om du inte förnyar manuellt. Inga överraskningar på kontoutdraget.`,
      `## Kom igång utan bindningstid`,
      `Välj ett paket nedan och aktivera inom några minuter. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Har IPTV bindningstid?", a: `Inte hos ${BRAND}. Alla abonnemang är utan bindningstid och utan automatisk förnyelse.` },
      { q: "Dras pengar automatiskt?", a: "Nej. Du betalar en gång per period och förnyar manuellt när du själv vill." },
      { q: "Kan jag avsluta när som helst?", a: "Det finns inget att avsluta — abonnemanget löper bara under den period du betalat för." },
      { q: "Finns det garanti?", a: "Ja, 15 dagars återbetalningsgaranti på varje abonnemang." },
    ],
  },
  // ── Devices ────────────────────────────────────────────────────────────
  {
    slug: "iptv-firestick",
    keyword: "IPTV Firestick",
    title: `IPTV på Firestick — installera enkelt | ${BRAND}`,
    description: `IPTV på Amazon Fire TV Stick: installera IPTV Smarters eller TiviMate och streama 69 000+ kanaler i upp till 4K. ${BRAND}, utan bindningstid.`,
    h1: "IPTV på Firestick — så kommer du igång",
    lead: [
      `Vill du köra [IPTV på Firestick](${SITE}/iptv-firestick)? Amazon Fire TV Stick är ett av de enklaste och billigaste sätten att streama [${BRAND}](${SITE}) — ladda bara ner en IPTV-app och logga in.`,
      `## Installera på några minuter`,
      `Sök efter IPTV Smarters Pro eller TiviMate i Amazon Appstore, installera appen och ange dina Xtream-koder eller M3U-länk från ${BRAND}. Programguiden laddas automatiskt.`,
      `## Bästa inställningen för Firestick`,
      `För stabil HD räcker ~16 Mbit/s, för 4K rekommenderar vi ~25 Mbit/s. En Fire TV Stick 4K Max ger den jämnaste uppspelningen. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Vilken app ska jag använda på Firestick?", a: "IPTV Smarters Pro och TiviMate är båda utmärkta och finns i Amazon Appstore." },
      { q: "Behöver jag en dator för att installera?", a: "Nej, du installerar allt direkt på din Fire TV Stick via Amazon Appstore." },
      { q: "Vilken Firestick är bäst?", a: "Fire TV Stick 4K eller 4K Max ger bäst prestanda, men även vanliga modeller fungerar." },
      { q: "Fungerar det med mitt abonnemang?", a: `Ja, dina ${BRAND}-uppgifter fungerar i valfri Xtream- eller M3U-spelare på Firestick.` },
    ],
  },
  {
    slug: "iptv-smart-tv",
    keyword: "IPTV Smart TV",
    title: `IPTV på Smart TV — Samsung, LG och fler | ${BRAND}`,
    description: `IPTV på Smart TV: streama 69 000+ kanaler och 220 000+ filmer i upp till 8K på Samsung, LG, Sony och Philips. ${BRAND}, utan bindningstid.`,
    h1: "IPTV på Smart TV — streama utan extra box",
    lead: [
      `Med [IPTV på Smart TV](${SITE}/iptv-smart-tv) streamar du direkt på tv:n utan extra hårdvara. [${BRAND}](${SITE}) fungerar på [Samsung](${SITE}/iptv-samsung), [LG](${SITE}/iptv-lg), Sony och Philips.`,
      `## Installera en IPTV-app`,
      `På Samsung (Tizen) och LG (webOS) installerar du en app som IPTV Smarters eller en M3U-spelare från tv:ns appbutik, och anger sedan dina uppgifter från ${BRAND}.`,
      `## Bästa bildkvalitet`,
      `Smart-TV-apparna stöder upp till 4K och 8K på lämpligt innehåll. För stabil 4K rekommenderar vi ~25 Mbit/s. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Fungerar IPTV på min Smart TV?", a: `Ja, ${BRAND} fungerar på Samsung, LG, Sony, Philips och de flesta Android TV-apparater via en IPTV-app.` },
      { q: "Behöver jag en extra box?", a: "Nej, om din Smart TV stöder IPTV-appar. Annars kan en Fire TV Stick eller Android-box läggas till." },
      { q: "Vilken app ska jag använda?", a: "IPTV Smarters eller en M3U-spelare från tv:ns appbutik fungerar bra." },
      { q: "Stöds 4K?", a: "Ja, upp till 4K och 8K på lämpligt innehåll med tillräcklig bandbredd." },
    ],
  },
  {
    slug: "iptv-samsung",
    keyword: "IPTV Samsung",
    title: `IPTV på Samsung TV — installera | ${BRAND}`,
    description: `IPTV på Samsung Smart TV (Tizen): installera en IPTV-app och streama 69 000+ kanaler i upp till 8K. ${BRAND}, utan bindningstid, 15 dagars garanti.`,
    h1: "IPTV på Samsung Smart TV (Tizen)",
    lead: [
      `[IPTV på Samsung](${SITE}/iptv-samsung) Smart TV körs direkt i Tizen-operativsystemet. Med [${BRAND}](${SITE}) streamar du 69 000+ kanaler utan extra box.`,
      `## Så installerar du på Samsung`,
      `Öppna appbutiken på din Samsung-tv, installera en IPTV-spelare (t.ex. en M3U- eller Xtream-app) och ange dina uppgifter från ${BRAND}. Programguiden laddas automatiskt.`,
      `## Tips för bästa resultat`,
      `Använd kabelanslutning om möjligt och se till att tv:ns mjukvara är uppdaterad. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Vilken app fungerar på Samsung Tizen?", a: "Flera M3U- och Xtream-spelare finns i Samsungs appbutik och fungerar med dina uppgifter." },
      { q: "Behöver jag en Android-box?", a: "Nej, moderna Samsung-tv:ar kör IPTV-appar direkt i Tizen." },
      { q: "Stöds 4K på Samsung?", a: "Ja, på 4K/8K-modeller med tillräcklig bandbredd." },
      { q: "Finns det garanti?", a: `Ja, 15 dagars återbetalningsgaranti på varje ${BRAND}-abonnemang.` },
    ],
  },
  {
    slug: "iptv-lg",
    keyword: "IPTV LG",
    title: `IPTV på LG TV (webOS) — installera | ${BRAND}`,
    description: `IPTV på LG Smart TV (webOS): installera en IPTV-app och streama 69 000+ kanaler i upp till 8K. ${BRAND}, utan bindningstid, 15 dagars garanti.`,
    h1: "IPTV på LG Smart TV (webOS)",
    lead: [
      `[IPTV på LG](${SITE}/iptv-lg) Smart TV körs i webOS. Med [${BRAND}](${SITE}) streamar du 69 000+ kanaler och 220 000+ filmer direkt på tv:n.`,
      `## Så installerar du på LG`,
      `Öppna LG Content Store, installera en IPTV-spelare och ange dina Xtream-koder eller M3U-länk från ${BRAND}. EPG-guiden laddas automatiskt.`,
      `## Bästa inställningen`,
      `Uppdatera webOS till senaste versionen och använd kabel om möjligt för jämnast uppspelning. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Vilken app fungerar på LG webOS?", a: "IPTV-spelare i LG Content Store fungerar med dina Xtream- eller M3U-uppgifter." },
      { q: "Behöver jag extra hårdvara?", a: "Nej, moderna LG-tv:ar kör IPTV-appar direkt i webOS." },
      { q: "Stöds 4K på LG?", a: "Ja, på 4K/8K-modeller med tillräcklig bandbredd." },
      { q: "Finns det garanti?", a: "Ja, 15 dagars återbetalningsgaranti på alla abonnemang." },
    ],
  },
  {
    slug: "iptv-android",
    keyword: "IPTV Android",
    title: `IPTV på Android — box, mobil & TV | ${BRAND}`,
    description: `IPTV på Android: installera IPTV Smarters eller TiviMate på Android-box, mobil eller Android TV. 69 000+ kanaler. ${BRAND}, utan bindningstid.`,
    h1: "IPTV på Android — box, mobil och Android TV",
    lead: [
      `[IPTV på Android](${SITE}/iptv-android) är bland det enklaste som finns. [${BRAND}](${SITE}) fungerar på Android-box, mobil, surfplatta och Android TV via IPTV Smarters Pro eller [TiviMate](${SITE}/iptv-tivimate).`,
      `## Installera från Google Play`,
      `Ladda ner IPTV Smarters Pro eller TiviMate från Google Play, ange dina Xtream-koder eller M3U-länk från ${BRAND} och börja streama direkt.`,
      `## Bästa appen för Android`,
      `TiviMate ger den bästa upplevelsen på Android TV och boxar, medan IPTV Smarters passar bra på mobil. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Vilken app är bäst på Android?", a: "TiviMate för Android TV och boxar, IPTV Smarters Pro på mobil och surfplatta." },
      { q: "Fungerar det på Android-box?", a: `Ja, ${BRAND} fungerar på alla Android-boxar via en IPTV-app från Google Play.` },
      { q: "Kan jag se IPTV på mobilen?", a: "Ja, installera IPTV Smarters Pro på din Android-telefon och logga in." },
      { q: "Behöver jag root?", a: "Nej, ingen root €ävs. Vanliga appar från Google Play räcker." },
    ],
  },
  {
    slug: "iptv-apple-tv",
    keyword: "IPTV Apple TV",
    title: `IPTV på Apple TV — installera | ${BRAND}`,
    description: `IPTV på Apple TV: installera en IPTV-app från App Store och streama 69 000+ kanaler i upp till 4K. ${BRAND}, utan bindningstid, 15 dagars garanti.`,
    h1: "IPTV på Apple TV — streama i upp till 4K",
    lead: [
      `[IPTV på Apple TV](${SITE}/iptv-apple-tv) ger en snabb och polerad upplevelse. Med [${BRAND}](${SITE}) streamar du 69 000+ kanaler via en IPTV-app från App Store.`,
      `## Installera från App Store`,
      `Ladda ner en IPTV-spelare (t.ex. en Xtream- eller M3U-app) från App Store på din Apple TV och ange dina uppgifter från ${BRAND}.`,
      `## Bästa resultat på tvOS`,
      `Apple TV 4K ger den jämnaste uppspelningen. För stabil 4K rekommenderar vi ~25 Mbit/s. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Vilken app fungerar på Apple TV?", a: "Flera Xtream- och M3U-spelare finns i App Store och fungerar med dina uppgifter." },
      { q: "Vilken Apple TV behöver jag?", a: "Apple TV HD och 4K fungerar båda; 4K-modellen ger bäst bild." },
      { q: "Stöds 4K?", a: "Ja, på Apple TV 4K med tillräcklig bandbredd." },
      { q: "Finns det garanti?", a: "Ja, 15 dagars återbetalningsgaranti på alla abonnemang." },
    ],
  },
  // ── Apps ──────────────────────────────────────────────────────────────
  {
    slug: "iptv-smarters-pro",
    keyword: "IPTV Smarters Pro",
    title: `IPTV Smarters Pro — guide & inställning | ${BRAND}`,
    description: `IPTV Smarters Pro: så installerar och ställer du in appen på Firestick, Android, Smart TV och iOS med dina ${BRAND}-uppgifter. Utan bindningstid.`,
    h1: "IPTV Smarters Pro — installera och ställ in",
    lead: [
      `[IPTV Smarters Pro](${SITE}/iptv-smarters-pro) är en av de populäraste IPTV-apparna. Den fungerar med dina [${BRAND}](${SITE})-uppgifter på nästan alla enheter.`,
      `## Så ställer du in appen`,
      `Installera IPTV Smarters Pro, välj inloggning med Xtream-koder (användarnamn, lösenord och server-URL) eller M3U-länk, och appen laddar hela kanallistan och EPG-guiden automatiskt.`,
      `## Tips för bästa upplevelse`,
      `Aktivera EPG och lägg till favoriter för snabb navigering. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Är IPTV Smarters Pro gratis?", a: "Appen är gratis; du behöver ett abonnemang med inloggningsuppgifter för att streama innehåll." },
      { q: "Vilka enheter stöds?", a: "Firestick, Android, Android TV, Smart TV, iOS och Windows." },
      { q: "Xtream eller M3U?", a: "Xtream-koder rekommenderas eftersom EPG-guiden laddas automatiskt." },
      { q: "Fungerar det med mitt abonnemang?", a: `Ja, dina ${BRAND}-uppgifter fungerar direkt i IPTV Smarters Pro.` },
    ],
  },
  {
    slug: "iptv-tivimate",
    keyword: "IPTV TiviMate",
    title: `TiviMate — bästa IPTV-appen för Android | ${BRAND}`,
    description: `TiviMate: så ställer du in den populära IPTV-spelaren på Android TV och boxar med dina ${BRAND}-uppgifter. EPG, favoriter och inspelning.`,
    h1: "TiviMate — IPTV-spelaren för Android TV",
    lead: [
      `[TiviMate](${SITE}/iptv-tivimate) är många entusiasters favoritspelare på Android TV och boxar. Den fungerar perfekt med dina [${BRAND}](${SITE})-uppgifter.`,
      `## Så ställer du in TiviMate`,
      `Installera TiviMate från Google Play, lägg till en spellista med dina Xtream-koder eller M3U-länk från ${BRAND}, och appen bygger en snygg programguide med favoriter.`,
      `## Varför välja TiviMate`,
      `TiviMate har en av de bästa EPG-guiderna, mjuk navigering och (i premiumversionen) inspelning och flera spellistor. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Är TiviMate gratis?", a: "Grundversionen är gratis; premium låser upp inspelning, flera spellistor och mer." },
      { q: "Vilka enheter stöds?", a: "Android TV, Android-boxar och Fire TV (via sideload eller Appstore)." },
      { q: "Fungerar det på iPhone?", a: "TiviMate är för Android; på iOS använder du en Xtream-spelare från App Store." },
      { q: "Fungerar det med mitt abonnemang?", a: `Ja, lägg bara till dina ${BRAND}-uppgifter som en spellista.` },
    ],
  },
  // ── Sport ──────────────────────────────────────────────────────────────
  {
    slug: "iptv-sport",
    keyword: "IPTV sport",
    title: `IPTV sport — all sport live | ${BRAND}`,
    description: `IPTV sport hos ${BRAND}: Allsvenskan, SHL, Champions League, Premier League, F1 och UFC live i upp till 4K. Utan geoblockering, utan bindningstid.`,
    h1: "IPTV sport — se all sport live i hög kvalitet",
    lead: [
      `Med [IPTV sport](${SITE}/iptv-sport) från [${BRAND}](${SITE}) ser du [fotboll](${SITE}/iptv-fotboll), [hockey](${SITE}/iptv-hockey-shl), Champions League, F1, tennis och UFC live — utan geoblockering och utan VPN.`,
      `## All sport i ett abonnemang`,
      `Ett abonnemang ersätter flera dyra sportpaket: Allsvenskan, SHL, Premier League, UEFA Champions League, Formel 1 och mycket mer, i upp till 4K.`,
      `## Stabilt även under kvällstoppen`,
      `Ett bra relänätverk håller bilden mjuk även en fullsatt matchkväll. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Vilken sport ingår?", a: "Allsvenskan, SHL, Premier League, Champions League, F1, tennis, UFC och mycket mer." },
      { q: "Behöver jag VPN?", a: `Nej, ${BRAND} fungerar utan geoblockering eller VPN i hela Europa.` },
      { q: "Vilken kvalitet har sporten?", a: "Upp till 4K på lämpliga kanaler med tillräcklig bandbredd." },
      { q: "Fungerar det under kvällstoppen?", a: "Ja, relänätverket är byggt för att hålla streams stabila även vid hög belastning." },
    ],
  },
  {
    slug: "iptv-fotboll",
    keyword: "IPTV fotboll",
    title: `IPTV fotboll — Allsvenskan & mer live | ${BRAND}`,
    description: `IPTV fotboll hos ${BRAND}: Allsvenskan, Premier League, La Liga, Serie A och Champions League live i upp till 4K. Utan geoblockering, utan bindningstid.`,
    h1: "IPTV fotboll — alla ligor live",
    lead: [
      `Med [IPTV fotboll](${SITE}/iptv-fotboll) från [${BRAND}](${SITE}) ser du [Allsvenskan](${SITE}/iptv-allsvenskan), Premier League, La Liga, Serie A, Bundesliga och [Champions League](${SITE}/iptv-champions-league) live.`,
      `## Alla stora ligor`,
      `Ett abonnemang täcker svensk och internationell fotboll i upp till 4K — inklusive de kvällar då matcherna krockar och vanliga paket tvingar dig att välja.`,
      `## Se varje match`,
      `Fler samtidiga kanaler betyder att du aldrig missar ett mål. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Ingår Allsvenskan?", a: "Ja, Allsvenskan ingår tillsammans med de stora europeiska ligorna." },
      { q: "Vilka internationella ligor ingår?", a: "Premier League, La Liga, Serie A, Bundesliga, Ligue 1 och Champions League." },
      { q: "Vilken kvalitet?", a: "Upp till 4K på lämpliga kanaler med tillräcklig bandbredd." },
      { q: "Behöver jag VPN?", a: `Nej, ${BRAND} fungerar utan geoblockering eller VPN.` },
    ],
  },
  {
    slug: "iptv-allsvenskan",
    keyword: "IPTV Allsvenskan",
    title: `IPTV Allsvenskan — alla matcher live | ${BRAND}`,
    description: `Se Allsvenskan live med IPTV från ${BRAND}: alla omgångar i hög kvalitet, plus internationell fotboll. Utan geoblockering, utan bindningstid.`,
    h1: "IPTV Allsvenskan — se alla matcher live",
    lead: [
      `Med [IPTV Allsvenskan](${SITE}/iptv-allsvenskan) från [${BRAND}](${SITE}) ser du varje omgång live, plus resten av den europeiska [fotbollen](${SITE}/iptv-fotboll) i samma abonnemang.`,
      `## Hela säsongen i hög kvalitet`,
      `Följ din klubb genom hela säsongen med stabila streams i upp till 4K, även under de fullsatta kvällsomgångarna.`,
      `## Mer än bara Allsvenskan`,
      `Samma abonnemang ger dig Champions League, Premier League och mycket mer. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Kan jag se alla Allsvenskan-matcher?", a: "Ja, med flera samtidiga kanaler kan du följa alla omgångar." },
      { q: "Vilken kvalitet har matcherna?", a: "Upp till 4K på lämpliga kanaler med tillräcklig bandbredd." },
      { q: "Ingår annan fotboll?", a: "Ja, de stora europeiska ligorna och Champions League ingår." },
      { q: "Behöver jag VPN?", a: `Nej, ${BRAND} fungerar utan geoblockering eller VPN i Sverige.` },
    ],
  },
  {
    slug: "iptv-champions-league",
    keyword: "IPTV Champions League",
    title: `IPTV Champions League — live i 4K | ${BRAND}`,
    description: `Se UEFA Champions League live med IPTV från ${BRAND}: alla matcher i upp till 4K, utan geoblockering. Plus Allsvenskan och internationell fotboll.`,
    h1: "IPTV Champions League — alla matchkvällar live",
    lead: [
      `Med [IPTV Champions League](${SITE}/iptv-champions-league) från [${BRAND}](${SITE}) ser du varje matchkväll live i upp till 4K — alla matcher samtidigt, inte bara en.`,
      `## Varje match, varje kväll`,
      `Till skillnad från vanliga paket som visar en enda match ger IPTV dig alla samtidiga matcher, så att du kan hoppa mellan mål och dramatik.`,
      `## Mer europeisk fotboll`,
      `Samma abonnemang ger dig Premier League, La Liga och [Allsvenskan](${SITE}/iptv-allsvenskan). ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Kan jag se alla Champions League-matcher?", a: "Ja, med flera samtidiga kanaler kan du se alla matcher en matchkväll." },
      { q: "Vilken kvalitet?", a: "Upp till 4K på lämpliga kanaler med tillräcklig bandbredd." },
      { q: "Behöver jag VPN?", a: `Nej, ${BRAND} fungerar utan geoblockering eller VPN.` },
      { q: "Ingår andra ligor?", a: "Ja, Premier League, La Liga, Serie A, Bundesliga och Allsvenskan." },
    ],
  },
  {
    slug: "iptv-hockey-shl",
    keyword: "IPTV hockey SHL",
    title: `IPTV hockey — SHL live | ${BRAND}`,
    description: `Se SHL och hockey live med IPTV från ${BRAND}: alla matcher i hög kvalitet, plus NHL och internationell hockey. Utan geoblockering, utan bindningstid.`,
    h1: "IPTV hockey — SHL och mer live",
    lead: [
      `Med [IPTV hockey](${SITE}/iptv-hockey-shl) från [${BRAND}](${SITE}) ser du SHL, NHL och internationell hockey live i hög kvalitet — hela säsongen.`,
      `## SHL hela säsongen`,
      `Följ ditt lag genom grundserien och slutspelet med stabila streams, även under de kvällar då flera matcher spelas samtidigt.`,
      `## Mer än bara SHL`,
      `Samma abonnemang ger dig NHL, landslagshockey och all annan [sport](${SITE}/iptv-sport). ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Kan jag se alla SHL-matcher?", a: "Ja, med flera samtidiga kanaler kan du följa alla matcher." },
      { q: "Ingår NHL?", a: "Ja, NHL och internationell hockey ingår." },
      { q: "Vilken kvalitet?", a: "Hög kvalitet, upp till 4K på lämpliga kanaler." },
      { q: "Behöver jag VPN?", a: `Nej, ${BRAND} fungerar utan geoblockering eller VPN i Sverige.` },
    ],
  },
  // ── VOD / quality ────────────────────────────────────────────────────────
  {
    slug: "iptv-film-och-serier",
    keyword: "IPTV film och serier",
    title: `IPTV film och serier — 220 000+ titlar | ${BRAND}`,
    description: `IPTV film och serier hos ${BRAND}: 220 000+ titlar som VOD i upp till 8K, uppdaterat varje vecka. Nya premiärer, klassiker och serier i ett abonnemang.`,
    h1: "IPTV film och serier — ett enormt VOD-bibliotek",
    lead: [
      `Med [IPTV film och serier](${SITE}/iptv-film-och-serier) från [${BRAND}](${SITE}) får du 220 000+ titlar som video-on-demand i upp till [8K/4K](${SITE}/iptv-4k) — nya premiärer, klassiker och hela serier.`,
      `## Uppdateras varje vecka`,
      `Biblioteket växer varje vecka med nya filmer och avsnitt. Du hittar det som annars ligger utspritt över Netflix, HBO, Viaplay och Disney+ samlat i ett abonnemang.`,
      `## Se när du vill`,
      `VOD betyder att du startar, pausar och spolar precis som du vill. ${GUARANTEE_SV}`,
    ],
    faq: [
      { q: "Hur många titlar finns?", a: "Över 220 000 filmer och serier som VOD, uppdaterat varje vecka." },
      { q: "Finns nya premiärer?", a: "Ja, nya filmer och avsnitt läggs till löpande varje vecka." },
      { q: "Vilken kvalitet?", a: "Upp till 8K på lämpligt innehåll, annars 4K och Full HD." },
      { q: "Kan jag pausa och spola?", a: "Ja, VOD-innehåll kan startas, pausas och spolas fritt." },
    ],
  },
  {
    slug: "iptv-4k",
    keyword: "IPTV 4K",
    title: `IPTV 4K — streama i Ultra HD | ${BRAND}`,
    description: `IPTV 4K hos ${BRAND}: streama kanaler och VOD i upp till 4K och 8K Ultra HD. 69 000+ kanaler och 220 000+ filmer, stabilt och utan bindningstid.`,
    h1: "IPTV 4K — streama i skarp Ultra HD",
    lead: [
      `Med [IPTV 4K](${SITE}/iptv-4k) från [${BRAND}](${SITE}) streamar du kanaler och [film och serier](${SITE}/iptv-film-och-serier) i upp till 4K och 8K Ultra HD.`,
      `## Vad du behöver för 4K`,
      `För stabil 4K rekommenderar vi runt 25 Mbit/s och en 4K-kapabel enhet (Smart TV, Fire TV Stick 4K, Apple TV 4K eller en 4K-box). Innehåll i 8K €äver mer bandbredd.`,
      `## Skarp bild utan buffring`,
      `Ett bra relänätverk håller 4K-bilden mjuk även under kvällstoppen. ${GUARANTEE_SV} ${CORE_LINKS_SV}`,
    ],
    faq: [
      { q: "Vilken hastighet behövs för 4K?", a: "Runt 25 Mbit/s för stabil 4K; mer för 8K-innehåll." },
      { q: "Vilka enheter stöder 4K?", a: "4K Smart TV, Fire TV Stick 4K, Apple TV 4K och 4K-boxar." },
      { q: "Är allt innehåll i 4K?", a: "Lämpligt innehåll streamas i 4K/8K; resten i Full HD." },
      { q: "Finns det garanti?", a: "Ja, 15 dagars återbetalningsgaranti på alla abonnemang." },
    ],
  },
  // ── English pages ─────────────────────────────────────────────────────────
  {
    slug: "iptv-sweden",
    keyword: "IPTV Sweden",
    lang: "en",
    title: `IPTV Sweden — Premium Swedish IPTV | ${BRAND}`,
    description: `IPTV Sweden from ${BRAND}: 69,000+ live channels incl. Allsvenskan, SHL and Champions League, 220,000+ movies in up to 8K. Buy IPTV for Smart TV and Fire TV.`,
    h1: "IPTV Sweden — premium IPTV for Smart TV, Android and Fire TV",
    lead: [
      `[IPTV Sweden](${SITE}/iptv-sweden) from [${BRAND}](${SITE}) is a premium IPTV subscription for Sweden and the Nordics: 69,000+ live channels and 220,000+ movies and series on demand in up to 8K Ultra HD.`,
      `## Swedish and international channels`,
      `Get the major Swedish channels, Allsvenskan, SHL and UEFA Champions League, international channels and a weekly-updated VOD library — with EPG, catch-up and parental controls.`,
      `## Get started in minutes`,
      `Choose a plan, pay securely and start within minutes. Every ${BRAND} plan includes a 15-day money-back guarantee and 24/7 support via [WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "What is IPTV Sweden?", a: `${BRAND} is a premium IPTV service for Sweden with 69,000+ live channels and 220,000+ movies and series in up to 8K.` },
      { q: "Does it work across the Nordics?", a: `Yes, ${BRAND} works in Sweden, Norway, Denmark and Finland on any internet connection.` },
      { q: "Which devices are supported?", a: "Smart TV, Android, Fire TV Stick, MAG box, phone and tablet via IPTV Smarters Pro, TiviMate or any Xtream player." },
      { q: "Is there a guarantee?", a: "Yes, a 15-day money-back guarantee and 24/7 WhatsApp support on every plan." },
    ],
  },
  {
    slug: "swedish-iptv",
    keyword: "Swedish IPTV",
    lang: "en",
    title: `Swedish IPTV — reliable premium provider | ${BRAND}`,
    description: `Swedish IPTV from ${BRAND}: 69,000+ live channels, 220,000+ movies and series in up to 8K. Reliable premium IPTV Sweden provider, no contract, 15-day guarantee.`,
    h1: "Swedish IPTV — a reliable premium provider, no contract",
    lead: [
      `Looking for reliable [Swedish IPTV](${SITE}/swedish-iptv)? [${BRAND}](${SITE}) is a premium [IPTV Sweden](${SITE}/iptv-sweden) provider with open pricing, a daily-maintained line-up and 24/7 support — not an anonymous reseller.`,
      `## Why choose this Swedish IPTV provider`,
      `A good provider proves quality instead of advertising it: buffer-free streams even at peak evening hours, a weekly-updated VOD library, free app choice and support that actually replies.`,
      `## Get started with Swedish IPTV`,
      `Choose a plan below and activate in minutes. Every ${BRAND} plan includes the full catalog, a 15-day money-back guarantee and 24/7 WhatsApp support via [WhatsApp](${WA}).`,
    ],
    faq: [
      { q: "What is Swedish IPTV?", a: `Swedish IPTV streams Swedish and international TV over the internet. ${BRAND} offers 69,000+ live channels and 220,000+ VOD titles in up to 8K.` },
      { q: "Is this provider reliable?", a: `${BRAND} shows prices openly, maintains the catalog daily and offers a 15-day money-back guarantee so you can test risk-free.` },
      { q: "Which devices are supported?", a: "Smart TV, Android, Fire TV Stick, MAG box, phone and tablet, via IPTV Smarters Pro, TiviMate or any Xtream-compatible player." },
      { q: "Do you offer support?", a: "Yes, 24/7 support over WhatsApp, usually replying within minutes." },
    ],
  },
];

// Default every page to Swedish unless it declares its own language, then dedupe
// by slug (first occurrence wins) so the prerenderer never double-writes a dir
// or lists the same <loc> in the sitemap twice.
export const KEYWORD_PAGES: KeywordPage[] = RAW_KEYWORD_PAGES
  .map((p) => ({ ...p, lang: p.lang ?? ("sv" as LangCode) }))
  .filter((p, i, a) => a.findIndex((x) => x.slug === p.slug) === i);

export function getKeywordPage(slug: string): KeywordPage | undefined {
  return KEYWORD_PAGES.find((p) => p.slug === slug);
}
