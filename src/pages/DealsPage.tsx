import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Copy, Check, Clock, Star, MapPin, Heart } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useApp } from "../context/AppContext";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { extra } from "../i18n/extra";
import { TRIPS } from "../data/trips";

const DISCOUNTS: Record<number, number> = { 3: 35, 7: 25, 2: 20, 6: 30, 8: 15, 4: 10 };
const CODES = [
  { code: "TABI15", pct: 15, key: "code1" as const, color: "from-[#ff7a50] to-brand-2" },
  { code: "GROUP20", pct: 20, key: "code2" as const, color: "from-sea to-[#155e75]" },
  { code: "EARLY10", pct: 10, key: "code3" as const, color: "from-leaf to-[#166534]" },
];

function useCountdown(ms: number) {
  const [end] = useState(() => Date.now() + ms);
  const [left, setLeft] = useState(ms);
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(id);
  }, [end]);
  const s = Math.floor(left / 1000);
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60];
}

export default function DealsPage() {
  const { lang, t } = useLanguage();
  const { saved, toggleSave } = useApp();
  const d = extra[lang].deals;
  const [h, m, s] = useCountdown(5 * 3600 + 23 * 60);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 1600);
  };

  const deals = TRIPS.filter((tr) => DISCOUNTS[tr.id]).sort((a, b) => DISCOUNTS[b.id] - DISCOUNTS[a.id]);

  return (
    <>
      <PageHeader eyebrow={d.flash} title={d.title} subtitle={d.subtitle} image={TRIPS[2].image}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2 text-sm font-bold text-white">
            <Zap size={16} className="fill-amber-400 text-amber-400" /> {d.flashTitle}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="mr-1 text-xs text-white/60">{d.endsIn}</span>
            {[[h, d.h], [m, d.m], [s, d.s]].map(([v, u], i) => (
              <motion.span key={i} className="flex min-w-[52px] items-baseline justify-center gap-0.5 rounded-xl bg-white/10 px-2 py-1.5 font-bold text-white backdrop-blur">
                <motion.span key={String(v)} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-lg tabular-nums">
                  {String(v).padStart(2, "0")}
                </motion.span>
                <span className="text-[10px] text-white/60">{u}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-2">{d.codesTitle}</h2>
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
          {CODES.map((c, i) => (
            <motion.div key={c.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`relative w-72 shrink-0 snap-start overflow-hidden rounded-3xl bg-gradient-to-br ${c.color} p-5 text-white shadow-lg sm:w-auto`}>
              <span className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-sand" />
              <span className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-sand" />
              <p className="font-display text-4xl font-semibold">{c.pct}% <span className="text-base">{d.off}</span></p>
              <p className="mt-1 text-xs text-white/80">{d[c.key]}</p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-white/50 bg-white/10 py-2 pl-4 pr-2">
                <span className="font-mono text-sm font-bold tracking-widest">{c.code}</span>
                <button onClick={() => copy(c.code)} className="flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold text-ink">
                  {copied === c.code ? <Check size={12} /> : <Copy size={12} />}
                  {copied === c.code ? d.copied : d.copy}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="mb-4 mt-10 font-display text-2xl font-semibold text-ink sm:text-3xl">{d.hot}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {deals.map((trip, i) => {
            const pct = DISCOUNTS[trip.id];
            const now = Math.round((trip.price * (100 - pct)) / 100);
            const isSaved = saved.includes(trip.id);
            return (
              <motion.article key={trip.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08 }} whileHover={{ y: -4 }}
                className="group flex gap-4 overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-sm hover:shadow-lg">
                <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl sm:w-40">
                  <img src={trip.image} alt={trip.title[lang]} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute left-2 top-2 rounded-full bg-brand px-2 py-1 text-[11px] font-bold text-white shadow">-{pct}%</span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex items-center gap-1 truncate text-[11px] font-semibold text-ink-2"><MapPin size={10} />{trip.country[lang]}</span>
                    <button onClick={() => toggleSave(trip.id)} aria-label="save" className={isSaved ? "text-brand" : "text-ink-2"}>
                      <Heart size={16} className={isSaved ? "fill-current" : ""} />
                    </button>
                  </div>
                  <h3 className="mt-0.5 line-clamp-1 font-display text-lg font-semibold text-ink">{trip.title[lang]}</h3>
                  <span className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-ink-2">
                    <Star size={11} className="fill-amber-400 text-amber-400" />{trip.rating.toFixed(1)}
                    <Clock size={11} className="ml-1" />{t.card.days(trip.days)}
                  </span>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="block text-[11px] text-ink-2 line-through">{d.was} {formatPrice(trip.price, lang)}</span>
                      <span className="text-lg font-bold text-brand">{formatPrice(now, lang)}</span>
                    </div>
                    <button className="rounded-full bg-ink px-4 py-2 text-[11px] font-bold text-white group-hover:bg-brand">
                      {lang === "ja" ? "予約" : "Book"}
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </>
  );
}
