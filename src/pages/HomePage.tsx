import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  CarTaxiFront,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import Hero from "../components/Hero";
import TrustMarquee from "../components/TrustMarquee";
import SignatureSpotlight from "../components/SignatureSpotlight";
import SeasonalShowcase from "../components/SeasonalShowcase";
import TravelJournal from "../components/TravelJournal";
import Destinations from "../components/Destinations";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import TripCard from "../components/TripCard";
import { AMENITY_ICON } from "../components/HotelCard";
import HotelBookingModal from "../components/HotelBookingModal";
import { ScrollReveal } from "../components/ScrollReveal";
import { useApp } from "../context/AppContext";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { extra } from "../i18n/extra";
import { stay } from "../i18n/stay";
import { TRIPS } from "../data/trips";
import { HOTELS, type Hotel } from "../data/hotels";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  const { lang } = useLanguage();
  const { go, setQuery, saved, toggleSave, setExploreTab } = useApp();
  const f = extra[lang].featured;
  const sh = stay[lang].hotels;

  const tripsTrackRef = useRef<HTMLDivElement | null>(null);
  const staysTrackRef = useRef<HTMLDivElement | null>(null);
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);

  const openTrips = () => {
    setExploreTab("trips");
    go("explore");
  };

  const openStays = () => {
    setExploreTab("stays");
    go("explore");
  };

  const scrollTrack = (ref: React.RefObject<HTMLDivElement | null>, dir: -1 | 1) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const trendingTrips = [...TRIPS].sort((a, b) => b.reviews * b.rating - a.reviews * a.rating);

  return (
    <>
      <Hero
        onSearch={(q) => {
          setExploreTab("trips");
          setQuery(q);
          go("explore");
        }}
      />

      {/* Press accolades & live travel-promise ticker */}
      <ScrollReveal direction="up" distance={28}>
        <TrustMarquee />
      </ScrollReveal>

      {/* =====================================================================
          1. FEATURED — TRENDING THIS SEASON (Horizontal Scroll + Full Page Button)
         ===================================================================== */}
      <section id="trips" className="relative scroll-mt-20 overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand">
                <Compass size={13} /> {f.eyebrow}
              </span>
              <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                {f.title}
              </h2>
              <p className="mt-2 max-w-lg text-sm text-ink-2">
                {lang === "ja"
                  ? "横にスワイプして人気の旅をチェック、または一覧ページですべてのツアーを比較できます。"
                  : "Swipe horizontally through our most-booked journeys, or open the full trips page to filter & compare."}
              </p>
            </div>

            {/* Carousel Controls + Always-Visible Full Page Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollTrack(tripsTrackRef, -1)}
                  aria-label="Scroll left"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all hover:border-brand hover:text-brand active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(tripsTrackRef, 1)}
                  aria-label="Scroll right"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all hover:border-brand hover:text-brand active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={openTrips}
                className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-brand sm:text-sm"
              >
                <Compass size={15} />
                <span>{f.seeAll}</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal Snap Carousel Track */}
        <div
          ref={tripsTrackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 pt-2 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {trendingTrips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.3), ease }}
              className="w-[295px] shrink-0 snap-start sm:w-[330px]"
            >
              <TripCard
                trip={trip}
                index={0}
                saved={saved.includes(trip.id)}
                onToggleSave={toggleSave}
              />
            </motion.div>
          ))}

          {/* End-of-track Full Page Card */}
          <motion.button
            type="button"
            onClick={openTrips}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group flex w-[260px] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-brand/35 bg-gradient-to-br from-white via-cream/60 to-brand/10 p-8 text-center shadow-sm transition-all hover:border-brand hover:shadow-xl sm:w-[290px]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-110">
              <ArrowRight size={24} />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold text-ink">{f.seeAll}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-2">
                {lang === "ja"
                  ? `全${TRIPS.length}件のツアーを予算・期間・カテゴリで絞り込み`
                  : `Browse & filter all ${TRIPS.length} hand-crafted journeys on the full page`}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white transition-colors group-hover:bg-brand">
              {lang === "ja" ? "一覧ページを開く" : "Open full trips page"}
              <ArrowRight size={13} />
            </span>
          </motion.button>
        </div>

        {/* Bottom Full-Page Action Pill */}
        <ScrollReveal direction="up" delay={0.1} className="mx-auto mt-3 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={openTrips}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-xs font-bold text-ink shadow-sm transition-all hover:border-brand hover:bg-brand hover:text-white sm:text-sm"
          >
            <span>
              {lang === "ja"
                ? `すべての旅を見る（全${TRIPS.length}件・フィルター付き）`
                : `${f.seeAll} (${TRIPS.length} trips with full filters)`}
            </span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </ScrollReveal>
      </section>

      {/* Dark-ink Signature All-Inclusive Journeys (Stay + Pickup/Drop + Meals) */}
      <ScrollReveal direction="up" distance={48}>
        <SignatureSpotlight />
      </ScrollReveal>

      {/* Interactive 4-Season Travel Almanac Bento Grid */}
      <ScrollReveal direction="up" distance={48}>
        <SeasonalShowcase />
      </ScrollReveal>

      {/* =====================================================================
          2. STAYS & HOTELS (Horizontal Scroll + Full Page Button + Quick Book)
         ===================================================================== */}
      <section className="relative overflow-hidden border-y border-line bg-cream/55 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand">
                <BedDouble size={14} /> {sh.title}
              </span>
              <h2 className="mt-1.5 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
                {sh.subtitle}
              </h2>
            </div>

            {/* Carousel Controls + Always-Visible Full Page Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollTrack(staysTrackRef, -1)}
                  aria-label="Scroll stays left"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all hover:border-brand hover:text-brand active:scale-95"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack(staysTrackRef, 1)}
                  aria-label="Scroll stays right"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all hover:border-brand hover:text-brand active:scale-95"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={openStays}
                className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-brand sm:text-sm"
              >
                <BedDouble size={15} />
                <span>
                  {lang === "ja" ? "すべてのホテルを見る" : "Explore all hotels"}
                </span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal Snap Carousel Track of All Hotels */}
        <div
          ref={staysTrackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 pt-2 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {HOTELS.map((h, i) => (
            <motion.article
              key={h.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease }}
              whileHover={{ y: -8 }}
              className="group flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_16px_rgba(19,27,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(19,27,46,0.14)] sm:w-[340px]"
            >
              {/* Hotel image */}
              <div className="relative h-52 shrink-0 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name[lang]}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />

                {h.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink shadow">
                    {h.tag[lang]}
                  </span>
                )}

                <span className="absolute right-3 top-3 rounded-xl bg-ink/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                  {h.rating.toFixed(1)} ★
                </span>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-sea/95 px-2.5 py-1 text-[10px] font-bold text-white shadow backdrop-blur">
                    <CarTaxiFront size={11} /> {sh.transferBadge}
                  </span>
                  <span className="flex items-center gap-0.5 rounded-full bg-ink/60 px-2.5 py-1 backdrop-blur">
                    {Array.from({ length: h.stars }).map((_, sIdx) => (
                      <Star key={sIdx} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                </div>
              </div>

              {/* Hotel body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1 text-xs font-semibold text-ink-2">
                  <MapPin size={11} className="text-brand" />
                  <span className="truncate">{h.area[lang]}</span>
                  <span>·</span>
                  <span className="truncate">{sh.distance(h.distanceKm)}</span>
                </p>

                <h3 className="mt-1.5 truncate font-display text-xl font-semibold text-ink">
                  {h.name[lang]}
                </h3>
                <p className="mt-1 line-clamp-1 text-xs font-medium text-ink-2">
                  {h.roomType[lang]}
                </p>

                {/* Amenity chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.amenities.slice(0, 3).map((a) => {
                    const Icon = AMENITY_ICON[a];
                    return (
                      <span
                        key={a}
                        className="flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-[10px] font-semibold text-ink-2"
                      >
                        <Icon size={10} className="text-brand" /> {sh.amenity[a]}
                      </span>
                    );
                  })}
                </div>

                {h.freeCancel && (
                  <p className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-leaf">
                    <ShieldCheck size={12} /> {sh.freeCancel}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                  <div>
                    <span className="text-lg font-bold text-ink">
                      {formatPrice(h.pricePerNight, lang)}
                    </span>
                    <span className="text-[11px] font-medium text-ink-2"> / {sh.night}</span>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setBookingHotel(h)}
                    className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-brand"
                  >
                    {sh.book}
                    <ArrowRight size={13} />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}

          {/* End-of-track Full Page Hotels Card */}
          <motion.button
            type="button"
            onClick={openStays}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group flex w-[260px] shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-brand/35 bg-white/90 p-8 text-center shadow-sm transition-all hover:border-brand hover:shadow-xl sm:w-[290px]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-110">
              <BedDouble size={24} />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold text-ink">
                {lang === "ja" ? "すべてのホテルを見る" : "All Stays & Hotels"}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-2">
                {lang === "ja"
                  ? `全${HOTELS.length}軒の旅館・ヴィラ・ホテルと空港送迎プランを見る`
                  : `Compare all ${HOTELS.length} ryokans, villas & hotels with airport pickup options`}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold text-white transition-colors group-hover:bg-brand">
              {lang === "ja" ? "ホテル一覧ページへ" : "Open full hotels page"}
              <ArrowRight size={13} />
            </span>
          </motion.button>
        </div>

        {/* Bottom Full-Page Hotels Button */}
        <ScrollReveal direction="up" delay={0.1} className="mx-auto mt-3 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={openStays}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-xs font-bold text-ink shadow-sm transition-all hover:border-brand hover:bg-brand hover:text-white sm:text-sm"
          >
            <BedDouble size={15} />
            <span>
              {lang === "ja"
                ? `すべての宿泊・ホテルページを開く（全${HOTELS.length}軒＋空港送迎）`
                : `View all ${HOTELS.length} stays & hotels with airport pickup & drop-off`}
            </span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </ScrollReveal>
      </section>

      {/* Editorial Field Notes & Travel Stories Magazine Grid */}
      <ScrollReveal direction="up" distance={48}>
        <TravelJournal />
      </ScrollReveal>

      <ScrollReveal direction="up" distance={44}>
        <Destinations />
      </ScrollReveal>

      <ScrollReveal direction="up" distance={44}>
        <Features />
      </ScrollReveal>

      <ScrollReveal direction="up" distance={44}>
        <Testimonials />
      </ScrollReveal>

      {/* Direct Hotel + Pickup/Drop Booking Modal on Home Page */}
      <HotelBookingModal hotel={bookingHotel} onClose={() => setBookingHotel(null)} />
    </>
  );
}
