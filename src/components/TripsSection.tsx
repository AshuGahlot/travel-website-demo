import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { TRIPS, type Category } from "../data/trips";
import Filters, { MAX_BUDGET, type SortKey, type DurationKey } from "./Filters";
import TripCard from "./TripCard";

export default function TripsSection() {
  const { t } = useLanguage();
  const { query, saved, toggleSave } = useApp();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [budget, setBudget] = useState(MAX_BUDGET);
  const [duration, setDuration] = useState<DurationKey>("any");

  const filtered = useMemo(() => {
    let list = TRIPS.filter((tr) => (category === "all" || tr.category === category) && tr.price <= budget);
    if (duration === "short") list = list.filter((tr) => tr.days <= 3);
    else if (duration === "medium") list = list.filter((tr) => tr.days >= 4 && tr.days <= 7);
    else if (duration === "long") list = list.filter((tr) => tr.days >= 8);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((tr) =>
        [tr.country.en, tr.title.en].some((s) => s.toLowerCase().includes(q)) ||
        [tr.country.ja, tr.title.ja].some((s) => s.includes(q)));
    }
    const sorters: Record<SortKey, (a: (typeof TRIPS)[0], b: (typeof TRIPS)[0]) => number> = {
      priceLow: (a, b) => a.price - b.price,
      priceHigh: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      duration: (a, b) => a.days - b.days,
      recommended: (a, b) => b.reviews * b.rating - a.reviews * a.rating,
    };
    return [...list].sort(sorters[sort]);
  }, [category, sort, budget, duration, query]);

  const clearAll = () => { setCategory("all"); setSort("recommended"); setBudget(MAX_BUDGET); setDuration("any"); };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <Filters category={category} onCategory={setCategory} sort={sort} onSort={setSort}
        budget={budget} onBudget={setBudget} duration={duration} onDuration={setDuration}
        resultCount={filtered.length} onClear={clearAll} />

      {filtered.length > 0 ? (
        <motion.div layout className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((trip, i) => (
              <TripCard key={trip.id} trip={trip} index={i} saved={saved.includes(trip.id)} onToggleSave={toggleSave} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line bg-white/60 px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-ink-2"><SearchX size={26} /></span>
          <h3 className="font-display text-xl font-semibold text-ink">{t.filters.noResults}</h3>
          <p className="max-w-xs text-sm text-ink-2">{t.filters.noResultsDesc}</p>
          <button onClick={clearAll} className="mt-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-brand">{t.filters.clear}</button>
        </motion.div>
      )}
    </section>
  );
}
