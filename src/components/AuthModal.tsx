import { useState, FormEvent } from "react";
import { X, User, Mail, Phone, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { WA_NUMBER } from "../types";
import { useLanguage } from "../LanguageContext";
import emailjs from "@emailjs/browser";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from "../emailConfig";

interface AuthModalProps {
  onClose: () => void;
}

type FormStatus = "idle" | "sending" | "success" | "error";

const authTexts: Record<string, {
  successTitle: string;
  successDesc: string;
  whatsappBtn: string;
  closeBtn: string;
  intro: string;
  errorMsg: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  planLabel: string;
  planDefault: string;
  plans: string[];
  messageLabel: string;
  messagePlaceholder: string;
  sending: string;
  submitBtn: string;
  disclaimer: string;
  waHeader: string;
  noPhone: string;
  noPlan: string;
  noMessage: string;
}> = {
  sv: {
    successTitle: "Registreringen lyckades!",
    successDesc: "Vi har tagit emot din förfrågan och kontaktar dig inom kort. För snabbare hantering kan du också nå oss direkt via WhatsApp.",
    whatsappBtn: "Kontakta direkt på WhatsApp",
    closeBtn: "Stäng",
    intro: "Skapa konto — vi skickar dina inloggningsuppgifter via WhatsApp eller e-post.",
    errorMsg: "Det gick inte att skicka. Försök igen.",
    nameLabel: "Fullständigt namn *",
    namePlaceholder: "t.ex. Anna Andersson",
    emailLabel: "E-postadress *",
    emailPlaceholder: "t.ex. anna@exempel.se",
    phoneLabel: "Telefonnummer",
    phonePlaceholder: "t.ex. +46 70 123 45 67",
    planLabel: "Önskat paket",
    planDefault: "Välj paket (valfritt)",
    plans: [
      "3 månader / 1 enhet — 399,99 €",
      "6 månader / 1 enhet — 599,99 €",
      "12 + 3 månader / 1 enhet — 899,99 €",
      "24 + 6 månader / 1 enhet — 1499,99 €",
      "3 månader / 2 enheter — 599,99 €",
      "6 månader / 2 enheter — 899,99 €",
      "12 + 3 månader / 2 enheter — 1499,99 €",
      "24 + 6 månader / 2 enheter — 2599,99 €",
    ],
    messageLabel: "Meddelande",
    messagePlaceholder: "Frågor eller kommentarer (valfritt)",
    sending: "Skickar...",
    submitBtn: "Skicka registrering",
    disclaimer: "Dina uppgifter skickas säkert. Du får dina inloggningsuppgifter efter behandling via WhatsApp.",
    waHeader: "Ny kundregistrering - NORGE TV",
    noPhone: "Ej angivet",
    noPlan: "Ej valt",
    noMessage: "Inget meddelande",
  },
  de: {
    successTitle: "Registrierung erfolgreich!",
    successDesc: "Wir haben Ihre Anfrage erhalten und werden Sie in Kürze kontaktieren. Für eine schnellere Bearbeitung können Sie uns auch direkt über WhatsApp erreichen.",
    whatsappBtn: "Direkt auf WhatsApp kontaktieren",
    closeBtn: "Schließen",
    intro: "Konto erstellen — wir senden Ihnen Ihre Zugangsdaten per WhatsApp oder E-Mail.",
    errorMsg: "Fehler beim Senden. Bitte versuchen Sie es erneut.",
    nameLabel: "Vollständiger Name *",
    namePlaceholder: "z.B. Max Mustermann",
    emailLabel: "E-Mail-Adresse *",
    emailPlaceholder: "z.B. max@beispiel.de",
    phoneLabel: "Telefonnummer",
    phonePlaceholder: "z.B. +49 170 1234567",
    planLabel: "Gewünschtes Paket",
    planDefault: "Paket auswählen (optional)",
    plans: [
      "1 Monat / 1 Gerät — 12,99€",
      "3 Monate / 1 Gerät — 34,99€",
      "6 Monate / 1 Gerät — 49,99€",
      "12 Monate / 1 Gerät — 74,99€",
      "24 Monate / 1 Gerät — 134,99€",
      "1 Monat / 2 Geräte — 19,99€",
      "3 Monate / 2 Geräte — 49,99€",
      "6 Monate / 2 Geräte — 74,99€",
      "12 Monate / 2 Geräte — 134,99€",
      "24 Monate / 2 Geräte — 229,99€",
    ],
    messageLabel: "Nachricht",
    messagePlaceholder: "Fragen oder Anmerkungen (optional)",
    sending: "Wird gesendet...",
    submitBtn: "Registrierung absenden",
    disclaimer: "Ihre Daten werden sicher übermittelt. Sie erhalten Ihre Zugangsdaten nach Bearbeitung per WhatsApp.",
    waHeader: "Neue Kundenregistrierung - NORGE TV",
    noPhone: "Nicht angegeben",
    noPlan: "Nicht ausgewählt",
    noMessage: "Keine Nachricht",
  },
  en: {
    successTitle: "Registration successful!",
    successDesc: "We have received your request and will contact you shortly. For faster processing, you can also reach us directly via WhatsApp.",
    whatsappBtn: "Contact via WhatsApp",
    closeBtn: "Close",
    intro: "Create account — we'll send your credentials via WhatsApp or email.",
    errorMsg: "Error sending. Please try again.",
    nameLabel: "Full name *",
    namePlaceholder: "e.g. John Smith",
    emailLabel: "Email address *",
    emailPlaceholder: "e.g. john@example.com",
    phoneLabel: "Phone number",
    phonePlaceholder: "e.g. +44 7911 123456",
    planLabel: "Desired plan",
    planDefault: "Select plan (optional)",
    plans: [
      "3 Months / 1 Device — 399.99 €",
      "6 Months / 1 Device — 599.99 €",
      "12 + 3 Months / 1 Device — 899.99 €",
      "24 + 6 Months / 1 Device — 1499.99 €",
      "3 Months / 2 Devices — 599.99 €",
      "6 Months / 2 Devices — 899.99 €",
      "12 + 3 Months / 2 Devices — 1499.99 €",
      "24 + 6 Months / 2 Devices — 2599.99 €",
    ],
    messageLabel: "Message",
    messagePlaceholder: "Questions or comments (optional)",
    sending: "Sending...",
    submitBtn: "Submit registration",
    disclaimer: "Your data is transmitted securely. You will receive your credentials after processing via WhatsApp.",
    waHeader: "New customer registration - NORGE TV",
    noPhone: "Not specified",
    noPlan: "Not selected",
    noMessage: "No message",
  },
  nl: {
    successTitle: "Registratie geslaagd!",
    successDesc: "Wij hebben uw aanvraag ontvangen en nemen spoedig contact met u op. Voor snellere verwerking kunt u ons ook direct bereiken via WhatsApp.",
    whatsappBtn: "Direct contact via WhatsApp",
    closeBtn: "Sluiten",
    intro: "Account aanmaken — wij sturen uw inloggegevens via WhatsApp of e-mail.",
    errorMsg: "Fout bij het verzenden. Probeer het opnieuw.",
    nameLabel: "Volledige naam *",
    namePlaceholder: "bijv. Jan Jansen",
    emailLabel: "E-mailadres *",
    emailPlaceholder: "bijv. jan@voorbeeld.nl",
    phoneLabel: "Telefoonnummer",
    phonePlaceholder: "bijv. +31 6 12345678",
    planLabel: "Gewenst pakket",
    planDefault: "Pakket kiezen (optioneel)",
    plans: [
      "1 Maand / 1 Apparaat — €12,99",
      "3 Maanden / 1 Apparaat — €34,99",
      "6 Maanden / 1 Apparaat — €49,99",
      "12 Maanden / 1 Apparaat — €74,99",
      "24 Maanden / 1 Apparaat — €134,99",
      "1 Maand / 2 Apparaten — €19,99",
      "3 Maanden / 2 Apparaten — €49,99",
      "6 Maanden / 2 Apparaten — €74,99",
      "12 Maanden / 2 Apparaten — €134,99",
      "24 Maanden / 2 Apparaten — €229,99",
    ],
    messageLabel: "Bericht",
    messagePlaceholder: "Vragen of opmerkingen (optioneel)",
    sending: "Wordt verzonden...",
    submitBtn: "Registratie verzenden",
    disclaimer: "Uw gegevens worden veilig verzonden. U ontvangt uw inloggegevens na verwerking via WhatsApp.",
    waHeader: "Nieuwe klantregistratie - NORGE TV",
    noPhone: "Niet opgegeven",
    noPlan: "Niet geselecteerd",
    noMessage: "Geen bericht",
  },
};

export default function AuthModal({ onClose }: AuthModalProps) {
  const { lang } = useLanguage();
  const at = authTexts[lang] ?? authTexts.en;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const sendWhatsAppNotification = () => {
    const lines = [
      at.waHeader,
      "",
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `${at.phoneLabel.replace(" *", "")}: ${phone}` : "",
      plan ? `${at.planLabel}: ${plan}` : "",
      message ? `${at.messageLabel}: ${message}` : "",
      "",
      `${new Date().toLocaleString(lang === "sv" ? "sv-SE" : lang === "de" ? "de-DE" : lang === "nl" ? "nl-NL" : "en-GB")}`,
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone || at.noPhone,
      plan: plan || at.noPlan,
      message: message || at.noMessage,
      timestamp: new Date().toLocaleString(lang === "sv" ? "sv-SE" : lang === "de" ? "de-DE" : lang === "nl" ? "nl-NL" : "en-GB"),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
    } catch {
      sendWhatsAppNotification();
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-neutral-50 border border-black/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative text-left">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-black/60" />
          </button>
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-[#38bdf8] mx-auto mb-4" />
            <h3 className="text-black text-xl font-bold mb-2">{at.successTitle}</h3>
            <p className="text-black/60 text-sm mb-6">
              {at.successDesc}
            </p>
            <button
              onClick={() => {
                sendWhatsAppNotification();
                onClose();
              }}
              className="w-full bg-[#25D366] hover:bg-[#1fb855] text-black py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{at.whatsappBtn}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full mt-3 bg-black/10 hover:bg-black/15 text-black py-3 rounded-xl text-sm font-medium transition-colors"
            >
              {at.closeBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-50 border border-black/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-black/60" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <img src="/logo-wordmark.svg" alt="IPTV NORDIC" width={196} height={36} className="h-9 w-auto" />
          </div>
          <p className="text-black/50 text-sm mb-6">
            {at.intro}
          </p>

          {status === "error" && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-red-300 text-xs">{at.errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-black/70 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{at.nameLabel}</span>
              </label>
              <input
                type="text"
                required
                placeholder={at.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/5 border border-black/15 rounded-xl py-2.5 px-3.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black/70 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{at.emailLabel}</span>
              </label>
              <input
                type="email"
                required
                placeholder={at.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/5 border border-black/15 rounded-xl py-2.5 px-3.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black/70 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{at.phoneLabel}</span>
              </label>
              <input
                type="tel"
                placeholder={at.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/5 border border-black/15 rounded-xl py-2.5 px-3.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black/70 mb-1.5 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 text-[#38bdf8] font-black text-xs leading-none flex items-center justify-center">TV</span>
                <span>{at.planLabel}</span>
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full bg-black/5 border border-black/15 rounded-xl py-2.5 px-3.5 text-sm text-black focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors appearance-none"
              >
                <option value="" className="bg-neutral-50">{at.planDefault}</option>
                {at.plans.map(p => (
                  <option key={p} value={p} className="bg-neutral-50">{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-black/70 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{at.messageLabel}</span>
              </label>
              <textarea
                rows={2}
                placeholder={at.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/5 border border-black/15 rounded-xl py-2.5 px-3.5 text-sm text-black placeholder-black/30 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#38bdf8] hover:bg-[#0284c7] disabled:bg-[#38bdf8]/50 text-black py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-white rounded-full animate-spin" />
                  <span>{at.sending}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{at.submitBtn}</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-black/30 text-xs mt-4">
            {at.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
