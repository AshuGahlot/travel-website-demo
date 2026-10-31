import { motion } from "framer-motion";
import { Sparkles, CarTaxiFront, BedDouble, UtensilsCrossed, ShieldCheck, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { homeShowcase } from "../i18n/homeShowcase";

const PRESS = [
  "Condé Nast Traveler",
  "Travel + Leisure",
  "National Geographic",
  "AFAR Magazine",
  "Japan Tourism Awards",
];

const ICONS = [CarTaxiFront, BedDouble, UtensilsCrossed, ShieldCheck, Globe, Sparkles];

export default function TrustMarquee() {
  const { lang } = useLanguage();
  const m = homeShowcase[lang].marquee;
  const doubled = [...m.items, ...m.items];

  return (
    <section aria-label={m.featuredIn} className="relative border-b border-line bg-cream/65">
      {/* Press bar */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-b border-line/70 px-4 py-4 sm:px-6 lg:justify-between lg:px-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink-2">
          {m.featuredIn}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {PRESS.map((name) => (
            <span
              key={name}
              className="font-display text-sm font-medium italic tracking-tight text-ink/60 transition-colors hover:text-ink sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Infinite promise ticker */}
      <div className="relative overflow-hidden py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f4efe5] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f4efe5] to-transparent" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center gap-8"
        >
          {doubled.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <span
                key={`${item}-${idx}`}
                className="flex shrink-0 items-center gap-2 text-xs font-semibold tracking-wide text-ink"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/12 text-brand">
                  <Icon size={13} strokeWidth={2.2} />
                </span>
                {item}
                <span className="ml-4 text-line">✦</span>
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
