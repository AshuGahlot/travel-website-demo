import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, SearchX } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { stay } from "../i18n/stay";
import { HOTELS, type Hotel } from "../data/hotels";
import HotelCard from "./HotelCard";
import HotelBookingModal from "./HotelBookingModal";

type HSort = "price" | "rating" | "stars";

export default function StaysSection() {
  const { t, lang } = useLanguage();
  const { query } = useApp();
  const s = stay[lang].hotels;
  const [sort, setSort] = useState<HSort>("rating");
  const [active, setActive] = useState<Hotel | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? HOTELS.filter((h) =>
          [h.name.en, h.area.en].some((x) => x.toLowerCase().includes(q)) ||
          [h.name.ja, h.area.ja].some((x) => x.includes(q)))
      : HOTELS;
    const sorters: Record<HSort, (a: Hotel, b: Hotel) => number> = {
      price: (a, b) => a.pricePerNight - b.pricePerNight,
      rating: (a, b) => b.rating - a.rating,
      stars: (a, b) => b.stars - a.stars || b.rating - a.rating,
    };
    return [...filtered].sort(sorters[sort]);
  }, [query, sort]);

  const options: { k: HSort; l: string }[] = [
    { k: "rating", l: s.sortRating },
    { k: "price", l: s.sortPrice },
    { k: "stars", l: s.sortStars },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-2">
          <ArrowUpDown size={13} /> {t.filters.sortBy}
        </span>
        <div className="flex gap-1 rounded-full bg-cream p-1">
          {options.map((o) => (
            <button key={o.k} onClick={() => setSort(o.k)}
              className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${sort === o.k ? "text-white" : "text-ink-2 hover:text-ink"}`}>
              {sort === o.k && <motion.span layoutId="hotel-sort" className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
              <span className="relative z-10">{o.l}</span>
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm font-semibold text-ink">{t.filters.tripsFound(list.length)}</span>
      </div>

      {list.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} onBook={setActive} />)}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line bg-white/60 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-ink-2"><SearchX size={26} /></span>
          <h3 className="font-display text-xl font-semibold text-ink">{t.filters.noResults}</h3>
          <p className="max-w-xs text-sm text-ink-2">{t.filters.noResultsDesc}</p>
        </div>
      )}

      <HotelBookingModal hotel={active} onClose={() => setActive(null)} />
    </section>
  );
}
