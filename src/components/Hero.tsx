import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  ChevronDown,
  ArrowDown,
  Compass,
  BedDouble,
  Sparkles,
  CarTaxiFront,
  UtensilsCrossed,
  Play,
  Pause,
} from "lucide-react";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { HERO_IMAGE, TRIPS } from "../data/trips";

const ease = [0.22, 1, 0.36, 1] as const;

const SCENES = [
  {
    id: "japan",
    image: HERO_IMAGE,
    thumb: TRIPS[0].image,
    place: { en: "Mt. Fuji & Kyoto, Japan", ja: "富士山・京都（日本）" },
    tag: { en: "Cultural & Ryokan", ja: "文化と老舗旅館" },
    coords: "35°39'N · 138°43'E",
    weather: { en: "18°C · Crisp Clear Sky", ja: "18°C · 快晴・紅葉シーズン" },
    priceUsd: 1280,
    rating: "4.9",
    reviews: 482,
    bookedPct: 82,
    query: "Kyoto",
  },
  {
    id: "santorini",
    image: TRIPS[1].image,
    thumb: TRIPS[1].image,
    place: { en: "Oia Caldera, Santorini", ja: "サントリーニ島・イア" },
    tag: { en: "Cliffside Villas & Sunset", ja: "断崖ヴィラと夕陽" },
    coords: "36°27'N · 25°22'E",
    weather: { en: "25°C · Golden Aegean Breeze", ja: "25°C · エーゲ海の心地よい風" },
    priceUsd: 1850,
    rating: "4.8",
    reviews: 356,
    bookedPct: 76,
    query: "Santorini",
  },
  {
    id: "iceland",
    image: TRIPS[5].image,
    thumb: TRIPS[5].image,
    place: { en: "South Coast, Iceland", ja: "アイスランド・オーロラ" },
    tag: { en: "Glass Lodge & Aurora", ja: "硝子ロッジ＆オーロラ観賞" },
    coords: "63°25'N · 19°00'W",
    weather: { en: "-1°C · High Aurora Activity", ja: "-1°C · オーロラ高確率" },
    priceUsd: 2100,
    rating: "4.9",
    reviews: 341,
    bookedPct: 88,
    query: "Iceland",
  },
  {
    id: "maldives",
    image: TRIPS[4].image,
    thumb: TRIPS[4].image,
    place: { en: "North Malé Lagoon, Maldives", ja: "モルディブ・北マーレ環礁" },
    tag: { en: "Overwater Villa & Cruise", ja: "水上ヴィラ＆ラグーン" },
    coords: "04°10'N · 73°30'E",
    weather: { en: "28°C · Warm Turquoise Lagoon", ja: "28°C · 穏やかなターコイズの海" },
    priceUsd: 2950,
    rating: "5.0",
    reviews: 198,
    bookedPct: 71,
    query: "Maldives",
  },
];

const QUICK_TAGS = [
  { en: "Kyoto", ja: "京都" },
  { en: "Santorini", ja: "サントリーニ" },
  { en: "Bali", ja: "バリ島" },
  { en: "Swiss Alps", ja: "スイス" },
  { en: "Maldives", ja: "モルディブ" },
  { en: "Tokyo", ja: "東京" },
];

type SearchMode = "trips" | "stays" | "plan";

export default function Hero({ onSearch }: { onSearch: (query: string) => void }) {
  const { t, lang } = useLanguage();
  const { go, setExploreTab, setQuery } = useApp();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(2);
  const [mode, setMode] = useState<SearchMode>("trips");
  const [sceneIdx, setSceneIdx] = useState(0);
  const [playing, setPlaying] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % SCENES.length);
    }, 6500);
    return () => clearInterval(id);
  }, [playing]);

  const activeScene = SCENES[sceneIdx];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "plan") {
      go("plan");
      return;
    }
    if (mode === "stays") {
      setExploreTab("stays");
      setQuery(destination);
      go("explore");
      return;
    }
    onSearch(destination);
  };

  const handleQuickTag = (tagText: string) => {
    setDestination(tagText);
    if (mode === "stays") {
      setExploreTab("stays");
      setQuery(tagText);
      go("explore");
    } else {
      onSearch(tagText);
    }
  };

  const modeLabels: { key: SearchMode; label: string; icon: typeof Compass }[] = [
    {
      key: "trips",
      label: lang === "ja" ? "ツアー・旅" : "Trips & Tours",
      icon: Compass,
    },
    {
      key: "stays",
      label: lang === "ja" ? "ホテル＋空港送迎" : "Hotels + Pickup",
      icon: BedDouble,
    },
    {
      key: "plan",
      label: lang === "ja" ? "フル旅程を作成" : "Custom Itinerary",
      icon: Sparkles,
    },
  ];

  return (
    <section ref={sectionRef} id="top" className="relative min-h-screen overflow-hidden">
      {/* Crossfading parallax background scene */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeScene.id}
            src={activeScene.image}
            alt={activeScene.place[lang]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-sand" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/20 to-transparent" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-44 pt-28 sm:px-6 lg:px-8"
      >
        {/* Top Row: Trust Rating Badge + Live Scene Telemetry Pill */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease }}
          className="mb-6 flex flex-wrap items-center gap-2.5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {t.hero.badge}
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={activeScene.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35 }}
              className="hidden items-center gap-2 rounded-full border border-white/20 bg-ink/45 px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-md sm:inline-flex"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-semibold">{activeScene.place[lang]}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/75">{activeScene.weather[lang]}</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Headline */}
        <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease }}
          >
            {t.hero.titleA}
            <span className="relative inline-block italic text-[#ffb59d]">
              {t.hero.titleHighlight}
              <svg viewBox="0 0 220 12" className="absolute -bottom-1 left-0 w-full">
                <motion.path
                  d="M4 8 C 60 2, 160 2, 216 7"
                  fill="none"
                  stroke="#e8562e"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.7, ease }}
                />
              </svg>
            </span>
            {t.hero.titleB}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Included Feature Chips */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease }}
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {[
            {
              icon: BedDouble,
              label: lang === "ja" ? "5★ 旅館・ホテル予約" : "5★ Stays & Ryokans",
            },
            {
              icon: CarTaxiFront,
              label: lang === "ja" ? "空港⇄ホテル専用送迎" : "Airport Pickup & Drop-off",
            },
            {
              icon: UtensilsCrossed,
              label: lang === "ja" ? "朝・昼・夕食つき旅程" : "Full Itinerary with Meals",
            },
          ].map((pill) => (
            <span
              key={pill.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-md"
            >
              <pill.icon size={13} className="text-[#ffb59d]" />
              {pill.label}
            </span>
          ))}
        </motion.div>

        {/* Multi-mode Search Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease }}
          className="mt-8 w-full max-w-3xl"
        >
          {/* Mode selector tabs */}
          <div className="mb-2.5 inline-flex gap-1 rounded-full border border-white/25 bg-ink/55 p-1 backdrop-blur-xl">
            {modeLabels.map((m) => {
              const active = mode === m.key;
              const Icon = m.icon;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMode(m.key)}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    active ? "text-ink" : "text-white/80 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="hero-mode-pill"
                      className="absolute inset-0 rounded-full bg-white shadow"
                      transition={{ type: "spring", stiffness: 460, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon size={13} className={active ? "text-brand" : "text-[#ffb59d]"} />
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-2 rounded-3xl border border-white/45 bg-white/95 p-2 shadow-[0_24px_70px_rgba(19,27,46,0.32)] backdrop-blur-xl sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:rounded-full">
            <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-cream/70 sm:rounded-full">
              <MapPin size={18} className="shrink-0 text-brand" />
              <span className="flex w-full flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">
                  {t.hero.searchDestination}
                </span>
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={t.hero.searchDestinationPlaceholder}
                  className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-normal placeholder:text-ink-2/60"
                />
              </span>
            </label>

            <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-cream/70 sm:rounded-full">
              <Calendar size={18} className="shrink-0 text-brand" />
              <span className="flex w-full flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">
                  {t.hero.searchDate}
                </span>
                <input
                  type="date"
                  className="w-full bg-transparent text-sm font-semibold text-ink outline-none"
                />
              </span>
            </label>

            <label className="relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-cream/70 sm:rounded-full">
              <Users size={18} className="shrink-0 text-brand" />
              <span className="flex w-full flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">
                  {t.hero.searchGuests}
                </span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-ink outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {t.hero.guestsOption(n)}
                    </option>
                  ))}
                </select>
              </span>
              <ChevronDown size={14} className="pointer-events-none absolute right-4 text-ink-2" />
            </label>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/40 transition-colors hover:bg-brand-2 sm:rounded-full"
            >
              <Search size={16} strokeWidth={2.6} />
              {mode === "stays"
                ? lang === "ja"
                  ? "ホテルを検索"
                  : "Find Stays"
                : mode === "plan"
                  ? lang === "ja"
                    ? "旅程を作成"
                    : "Plan Trip"
                  : t.hero.searchButton}
            </motion.button>
          </div>

          {/* Quick Popular Destination Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-white/75">
              {lang === "ja" ? "人気:" : "Popular:"}
            </span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag.en}
                type="button"
                onClick={() => handleQuickTag(tag[lang])}
                className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md transition-all hover:border-white/50 hover:bg-white hover:text-ink"
              >
                {tag[lang]}
              </button>
            ))}
          </div>
        </motion.form>

        {/* Bottom Row: Stats + Interactive Scene Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease }}
          className="mt-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {[
              { value: "190+", label: t.hero.statDestinations },
              { value: "50k+", label: t.hero.statTravelers },
              { value: "4.9", label: t.hero.statRating, star: true },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  {stat.value}
                  {stat.star && (
                    <Star size={16} className="ml-1 inline fill-amber-400 text-amber-400" />
                  )}
                </span>
                <span className="max-w-[90px] text-xs font-medium leading-snug text-white/75">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Hero Scene Switcher */}
          <div className="flex items-center gap-2 self-start rounded-full border border-white/25 bg-ink/55 p-1.5 backdrop-blur-xl lg:self-auto">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              {playing ? <Pause size={13} /> : <Play size={13} />}
            </button>
            {SCENES.map((sc, idx) => {
              const active = idx === sceneIdx;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSceneIdx(idx)}
                  className={`group relative flex items-center gap-2 rounded-full pr-2.5 transition-all ${
                    active ? "bg-white text-ink py-1 pl-1" : "py-1 pl-1 text-white/75 hover:text-white"
                  }`}
                >
                  <img
                    src={sc.thumb}
                    alt={sc.place[lang]}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-white/40"
                  />
                  <span className={`text-xs font-bold ${active ? "inline" : "hidden sm:inline"}`}>
                    {sc.place[lang].split(/[&,・]/)[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Dynamic Trip & Transfer Card (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.25, duration: 0.9, ease }}
        className="absolute right-8 top-[24%] z-10 hidden xl:flex xl:flex-col xl:gap-3"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.45, ease }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => onSearch(activeScene.query)}
              className="w-72 cursor-pointer overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-[0_24px_70px_rgba(19,27,46,0.4)] backdrop-blur-xl transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-36">
                <img
                  src={activeScene.thumb}
                  alt={activeScene.place[lang]}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink shadow backdrop-blur">
                  {activeScene.place[lang]}
                </span>
                <span className="absolute bottom-2.5 left-3 font-mono text-[10px] font-semibold text-white/90">
                  {activeScene.coords}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand">
                  {activeScene.tag[lang]}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-base font-bold text-ink">
                    {formatPrice(activeScene.priceUsd, lang)}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-ink-2">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {activeScene.rating} · {activeScene.reviews}
                  </span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${activeScene.bookedPct}%` }}
                    transition={{ duration: 1, ease }}
                    className="h-full rounded-full bg-brand"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-ink-2">
                  <span>
                    {activeScene.bookedPct}% {lang === "ja" ? "予約済み" : "booked this week"}
                  </span>
                  <span className="font-bold text-sea">
                    {lang === "ja" ? "送迎つき" : "+ Pickup"}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Secondary floating glass badge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          onClick={() => {
            setExploreTab("stays");
            go("explore");
          }}
          className="flex w-72 cursor-pointer items-center gap-3 rounded-2xl border border-white/30 bg-ink/80 p-3.5 text-white shadow-2xl backdrop-blur-xl transition-colors hover:bg-ink"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
            <CarTaxiFront size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold">
              {lang === "ja" ? "空港お迎え＆お送り対応" : "Door-to-Door Airport Pickup"}
            </p>
            <p className="truncate text-[11px] text-white/70">
              {lang === "ja"
                ? "ホテル予約と一緒にワンタップ手配"
                : "Included with 5★ stays & full itineraries"}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#trips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-28 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/75 transition-colors hover:text-white sm:flex lg:bottom-10"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
          {t.hero.scrollCue}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
