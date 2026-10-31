import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  CarTaxiFront,
  UtensilsCrossed,
  Sparkles,
  ArrowRight,
  Plane,
  ThermometerSun,
  Clock,
  MapPin,
} from "lucide-react";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { homeShowcase } from "../i18n/homeShowcase";
import { HOTELS, type Hotel } from "../data/hotels";
import HotelBookingModal from "./HotelBookingModal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SignatureSpotlight() {
  const { lang } = useLanguage();
  const { go } = useApp();
  const sp = homeShowcase[lang].spotlight;
  const [activeIdx, setActiveIdx] = useState(0);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);

  const edition = sp.editions[activeIdx];
  const matchedHotel = HOTELS.find((h) => h.id === edition.hotelId) ?? HOTELS[0];

  const pillars = [
    { icon: BedDouble, label: sp.pillStay, color: "text-[#ffb59d] bg-brand/20" },
    { icon: CarTaxiFront, label: sp.pillTransfer, color: "text-cyan-300 bg-sea/30" },
    { icon: UtensilsCrossed, label: sp.pillMeals, color: "text-amber-300 bg-amber-500/20" },
  ];

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full bg-brand/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-sea/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + Edition Switcher */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#ffb59d]">
              <Sparkles size={13} /> {sp.eyebrow}
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              {sp.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              {sp.subtitle}
            </p>
          </motion.div>

          {/* Edition switcher tabs */}
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            {sp.editions.map((ed, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={ed.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold tracking-wide transition-colors sm:text-sm ${
                    active
                      ? "border-transparent text-ink"
                      : "border-white/15 bg-white/5 text-white/75 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="sig-edition-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-lg"
                      transition={{ type: "spring", stiffness: 460, damping: 36 }}
                    />
                  )}
                  <span className={`relative z-10 font-mono text-[11px] ${active ? "text-brand" : "text-[#ffb59d]"}`}>
                    {ed.code}
                  </span>
                  <span className="relative z-10">{ed.tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${edition.id}-${lang}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease }}
            className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12"
          >
            {/* Left: Layered Editorial Visual Collage */}
            <div className="relative lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
                <div className="h-[360px] sm:h-[460px]">
                  <img
                    src={edition.mainImage}
                    alt={edition.headline}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/65 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <MapPin size={12} className="text-[#ffb59d]" /> {edition.place}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/65 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                    <ThermometerSun size={13} className="text-amber-300" /> {edition.climate}
                  </span>
                </div>

                {/* Animated transfer route strip */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-ink/80 p-3.5 backdrop-blur-xl sm:right-52">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffb59d]">
                    {sp.routeLabel}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{edition.route}</span>
                    <motion.span
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white"
                    >
                      <Plane size={13} />
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Overlapping Suite Inset Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease }}
                className="mt-4 flex items-center gap-3 rounded-3xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-xl sm:absolute sm:-bottom-5 sm:right-4 sm:mt-0 sm:w-52 sm:flex-col sm:items-start sm:bg-ink/90 sm:p-3 sm:shadow-2xl"
              >
                <img
                  src={edition.insetImage}
                  alt={edition.insetCaption}
                  className="h-16 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-full"
                />
                <p className="px-1 text-[11px] font-semibold leading-snug text-white/90">
                  {edition.insetCaption}
                </p>
              </motion.div>
            </div>

            {/* Right: Story, Inclusions, Timeline & Booking */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-white/90">
                <Clock size={12} className="text-[#ffb59d]" /> {edition.nights}
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-white sm:text-4xl">
                {edition.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                {edition.story}
              </p>

              {/* 3 Included Pillars */}
              <div className="mt-6">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                  {sp.includedTitle}
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {pillars.map((p) => (
                    <div
                      key={p.label}
                      className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-3"
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${p.color}`}>
                        <p.icon size={15} />
                      </span>
                      <span className="text-xs font-semibold leading-tight text-white">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Moment Mini Timeline */}
              <ol className="mt-6 space-y-2.5 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                {edition.moments.map((m, i) => (
                  <li key={m.time} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/25 text-[11px] font-bold text-[#ffb59d]">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] font-bold text-[#ffb59d]">{m.time}</span>
                      <span className="block text-xs font-medium text-white/90 sm:text-sm">{m.title}</span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Price + Dual CTAs */}
              <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-white/55">
                    {sp.fromLabel}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-semibold text-white">
                      {formatPrice(edition.price, lang)}
                    </span>
                    <span className="text-xs text-white/60">/ {sp.perPerson}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setBookingHotel(matchedHotel)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-bold text-white shadow-xl shadow-brand/30 transition-colors hover:bg-brand-2 sm:flex-initial sm:text-sm"
                  >
                    <BedDouble size={15} />
                    {sp.bookStayBtn}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => go("plan")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-white hover:text-ink sm:flex-initial sm:text-sm"
                  >
                    {sp.customizeBtn}
                    <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <HotelBookingModal hotel={bookingHotel} onClose={() => setBookingHotel(null)} />
    </section>
  );
}
