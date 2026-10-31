import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Flower2,
  Sun,
  Leaf,
  Snowflake,
  Calendar,
  Thermometer,
  UtensilsCrossed,
  ArrowRight,
  Copy,
  Check,
  Tag,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { homeShowcase } from "../i18n/homeShowcase";

const SEASON_ICONS = [Flower2, Sun, Leaf, Snowflake];
const ease = [0.22, 1, 0.36, 1] as const;

export default function SeasonalShowcase() {
  const { lang } = useLanguage();
  const { go, setQuery, setExploreTab } = useApp();
  const s = homeShowcase[lang].seasonal;
  const [seasonIdx, setSeasonIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = s.seasons[seasonIdx];

  const handleCopy = () => {
    navigator.clipboard?.writeText("TABI15").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const exploreSeason = (q: string) => {
    setExploreTab("trips");
    setQuery(q);
    go("explore");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header + 4-Season Selector */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {s.eyebrow}
          </span>
          <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {s.title}
          </h2>
          <p className="mt-2.5 text-sm text-ink-2 sm:text-base">{s.subtitle}</p>
        </motion.div>

        {/* Season Tabs */}
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {s.seasons.map((item, idx) => {
            const Icon = SEASON_ICONS[idx];
            const isSelected = idx === seasonIdx;
            return (
              <button
                key={item.id}
                onClick={() => setSeasonIdx(idx)}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-2.5 text-left transition-colors ${
                  isSelected
                    ? "border-transparent text-white"
                    : "border-line bg-white text-ink-2 hover:border-brand/40 hover:text-ink"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="season-tab-pill"
                    className="absolute inset-0 rounded-2xl bg-ink shadow-lg shadow-ink/20"
                    transition={{ type: "spring", stiffness: 460, damping: 36 }}
                  />
                )}
                <span className={`relative z-10 ${isSelected ? "text-[#ffb59d]" : "text-brand"}`}>
                  <Icon size={17} strokeWidth={2.2} />
                </span>
                <span className="relative z-10">
                  <span className="block text-xs font-bold leading-none">{item.label}</span>
                  <span
                    className={`mt-0.5 block text-[10px] ${
                      isSelected ? "text-white/70" : "text-ink-2"
                    }`}
                  >
                    {item.sub}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 cols: Crossfading Seasonal Hero Feature */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.id}-${lang}`}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.4, ease }}
              className="group relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[2.2rem] border border-line shadow-md sm:min-h-[500px]"
            >
              <img
                src={active.image}
                alt={active.headline}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/15" />

              {/* Top pills */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-ink shadow">
                    <Calendar size={12} className="text-brand" /> {s.bestMonths}: {active.months}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-ink/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Thermometer size={12} className="text-[#ffb59d]" /> {active.temp}
                  </span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white shadow">
                  <MapPin size={11} /> {active.spot}
                </span>
              </div>

              {/* Bottom editorial copy */}
              <div className="relative z-10 p-6 sm:p-8">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-amber-200 backdrop-blur-md">
                  <UtensilsCrossed size={11} /> {active.dish}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-white sm:text-4xl">
                  {active.headline}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">
                  {active.desc}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => exploreSeason(active.query)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-ink shadow-lg transition-colors hover:bg-brand hover:text-white sm:text-sm"
                >
                  {s.exploreSeason}
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right 5 cols: Stacked Culinary & Member Deal Cards */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Culinary Dining Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            onClick={() => go("plan")}
            className="group relative flex flex-1 cursor-pointer flex-col justify-end overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-xl min-h-[240px]"
          >
            <img
              src="https://images.pexels.com/photos/15198279/pexels-photo-15198279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt={s.culinaryTitle}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-200 backdrop-blur">
                <UtensilsCrossed size={11} /> {s.culinaryEyebrow}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                {s.culinaryTitle}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/80 sm:text-sm">
                {s.culinaryDesc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#ffb59d]">
                {s.culinaryTag} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.div>

          {/* Interactive Boarding-Coupon Member Perk Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="relative overflow-hidden rounded-[2rem] border border-brand/20 bg-gradient-to-br from-[#fff5f0] via-white to-cream p-6 shadow-sm"
          >
            <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand/10 blur-2xl" />
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              <Tag size={13} /> {s.passEyebrow}
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
              {s.passTitle}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-2 sm:text-sm">
              {s.passDesc}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? s.copied : s.copyCode}
              </button>
              <button
                onClick={() => go("deals")}
                className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {s.viewDeals}
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
