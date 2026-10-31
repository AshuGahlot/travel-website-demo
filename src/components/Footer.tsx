import { useState } from "react";
import { Compass, Send, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const columns = [
    { title: t.footer.company, links: [t.footer.about, t.footer.careers, t.footer.press, t.footer.blog] },
    { title: t.footer.support, links: [t.footer.help, t.footer.cancellation, t.footer.safety, t.footer.contact] },
    { title: t.footer.legal, links: [t.footer.privacy, t.footer.terms, t.footer.cookies] },
  ];

  return (
    <footer id="footer" className="scroll-mt-20 bg-ink pb-32 pt-16 text-white lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
                <Compass size={19} strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">{t.brand}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {t.footer.tagline}
            </p>

            <div className="mt-7 max-w-sm">
              <h3 className="text-sm font-bold">{t.footer.newsletterTitle}</h3>
              <p className="mt-1 text-xs text-white/55">{t.footer.newsletterDesc}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
                className="mt-3 flex overflow-hidden rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
                    subscribed ? "bg-leaf text-white" : "bg-brand text-white hover:bg-brand-2"
                  }`}
                >
                  {subscribed ? <Check size={14} /> : <Send size={13} />}
                  {subscribed ? t.footer.newsletterSuccess : t.footer.newsletterButton}
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="text-sm text-white/70 transition-colors hover:text-brand"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <span>{t.footer.rights}</span>
          <span className="flex items-center gap-1.5">
            {t.profile.version}
          </span>
        </div>
      </div>
    </footer>
  );
}
