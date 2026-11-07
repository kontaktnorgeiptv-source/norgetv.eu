import { useState, useEffect } from "react";
import { Search, User, Menu, X, Tv } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthModal from "./AuthModal";

const loginLabel: Record<string, string> = { sv: "Logga in", en: "Login", de: "Anmelden", nl: "Inloggen" };

interface HeaderProps {
  langPrefix: string;
  onPricingClick: () => void;
  onReviewsClick: () => void;
  onMoviesClick: () => void;
  onChannelsClick: () => void;
  onPaymentsClick: () => void;
}

export default function Header({ langPrefix, onPricingClick, onReviewsClick, onMoviesClick, onChannelsClick, onPaymentsClick }: HeaderProps) {
  const { t, lang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        {/* Main navigation */}
        <header className="w-full border-b border-black/10" style={{ background: "#ffffff" }}>
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 xl:gap-5">
              <a href={langPrefix} aria-label={BRAND_NAME} className="shrink-0 select-none flex items-center no-underline cursor-pointer hover:opacity-80 transition-opacity">
                {/* Two-colour text wordmark: "IPTV" in the accent colour, "NORDIC"
                    in the header foreground. The header ground is white, so the second
                    word uses the dark text colour (not white) to stay legible. */}
                <span className="font-extrabold text-xl md:text-2xl tracking-tight leading-none whitespace-nowrap">
                  <span style={{ color: "#38bdf8" }}>{BRAND_NAME.split(" ")[0]}</span>{BRAND_NAME.split(" ").length > 1 && (<span className="text-black"> {BRAND_NAME.split(" ").slice(1).join(" ")}</span>)}
                </span>
              </a>

              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                <a href={langPrefix} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors no-underline">{t.nav.home}</a>
                <button onClick={onMoviesClick} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors">{t.nav.movies}</button>
                <button onClick={onChannelsClick} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors">{t.nav.channels}</button>
                <button onClick={onPricingClick} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors">{t.nav.pricing}</button>
                <button onClick={onReviewsClick} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors">{t.nav.reviews}</button>
                <a href={`${langPrefix}/blog`} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors no-underline">{t.nav.blog}</a>
                <button onClick={onPaymentsClick} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors">{t.nav.payments}</button>
                <a href={`${langPrefix}/villkor`} className="px-2.5 xl:px-3 py-1.5 text-sm font-bold whitespace-nowrap text-black hover:text-black/70 transition-colors no-underline">{t.nav.terms}</a>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button onClick={onChannelsClick} className="hidden sm:flex p-2.5 text-black/70 hover:text-black transition-colors" aria-label="TV Guide">
                <Tv className="w-5 h-5" />
              </button>
              <button onClick={onReviewsClick} className="hidden sm:flex p-2.5 text-black/70 hover:text-black transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setAuthOpen(true)} className="hidden sm:flex p-2.5 text-black/70 hover:text-black transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setAuthOpen(true)} className="hidden sm:flex text-black text-sm font-medium hover:text-black/70 transition-colors pl-1">
                {loginLabel[lang] ?? loginLabel.en}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-black/75 hover:text-black transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-black/10 px-4 py-4 flex flex-col gap-1" style={{ background: "#ffffff" }}>
              <a href={langPrefix} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-black border-b border-black/10">{t.nav.home}</a>
              <button onClick={() => { onMoviesClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-black/75 border-b border-black/10">{t.nav.movies}</button>
              <button onClick={() => { onChannelsClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-black/75 border-b border-black/10">{t.nav.channels}</button>
              <button onClick={() => { onPricingClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-black/75 border-b border-black/10">{t.nav.pricing}</button>
              <button onClick={() => { onReviewsClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-black/75 border-b border-black/10">{t.nav.reviews}</button>
              <a href={`${langPrefix}/blog`} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-black/75 border-b border-black/10">{t.nav.blog}</a>
              <button onClick={() => { onPaymentsClick(); setMobileMenuOpen(false); }} className="text-left py-3 text-sm font-semibold text-black/75 border-b border-black/10">{t.nav.payments}</button>
              <a href={`${langPrefix}/villkor`} onClick={() => setMobileMenuOpen(false)} className="py-3 text-sm font-semibold text-black/75">{t.nav.terms}</a>

              <button
                onClick={() => { onPricingClick(); setMobileMenuOpen(false); }}
                className="w-full text-center py-3 rounded-lg text-sm font-bold text-black mt-3"
                style={{ background: "#38bdf8" }}
              >
                {t.nav.mobileSubscribe}
              </button>
            </div>
          )}
        </header>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
