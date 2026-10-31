import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import PageHeader from "../components/PageHeader";
import TripCard from "../components/TripCard";
import { useApp } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import { TRIPS } from "../data/trips";

export default function SavedPage() {
  const { t } = useLanguage();
  const { saved, toggleSave, go } = useApp();
  const trips = TRIPS.filter((tr) => saved.includes(tr.id));

  return (
    <>
      <PageHeader title={t.saved.title} subtitle={trips.length ? t.saved.count(trips.length) : t.saved.emptyDesc} image={TRIPS[4].image} />
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {trips.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line bg-white/60 py-16 text-center">
            <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Heart size={28} />
            </motion.span>
            <h3 className="font-display text-xl font-semibold text-ink">{t.saved.emptyTitle}</h3>
            <p className="max-w-xs text-sm text-ink-2">{t.saved.emptyDesc}</p>
            <button onClick={() => go("explore")} className="mt-2 rounded-full bg-ink px-6 py-3 text-xs font-bold text-white hover:bg-brand">{t.saved.browse}</button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {trips.map((trip, i) => (
                <TripCard key={trip.id} trip={trip} index={i} saved onToggleSave={toggleSave} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  );
}
