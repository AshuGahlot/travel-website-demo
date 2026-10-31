import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { DESTINATION_IMAGES } from "../data/trips";

export default function Destinations() {
  const { t, lang } = useLanguage();
  const { go, setQuery, setExploreTab } = useApp();
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: -1 | 1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const openDestination = (name: string) => {
    setExploreTab("trips");
    setQuery(name);
    go("explore");
  };

  return (
    <section id="destinations" className="scroll-mt-20 border-y border-line bg-cream/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
              {t.destinations.title}
            </span>
            <h2 className="mt-2 max-w-md font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t.destinations.subtitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Scroll left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all hover:border-brand hover:text-brand active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Scroll right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-all hover:border-brand hover:text-brand active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setExploreTab("trips");
                setQuery("");
                go("explore");
              }}
              className="group flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {t.destinations.viewAll}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll carousel */}
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {DESTINATION_IMAGES.map((dest, i) => (
          <motion.button
            key={dest.name.en}
            type="button"
            onClick={() => openDestination(dest.name[lang])}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative w-64 shrink-0 snap-start overflow-hidden rounded-3xl text-left shadow-md sm:w-72"
          >
            <div className="h-80 sm:h-96">
              <img
                src={dest.image}
                alt={dest.name[lang]}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                <MapPin size={10} />
                {t.destinations.trips(dest.trips)}
              </span>
              <h3 className="font-display text-2xl font-semibold text-white">{dest.name[lang]}</h3>
            </div>
            <span className="absolute right-4 top-4 flex h-10 w-10 -translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowRight size={17} />
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
