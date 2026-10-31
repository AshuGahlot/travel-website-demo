import { motion } from "framer-motion";
import { Search, X, Compass, BedDouble } from "lucide-react";
import PageHeader from "../components/PageHeader";
import TripsSection from "../components/TripsSection";
import StaysSection from "../components/StaysSection";
import { useApp } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import { extra } from "../i18n/extra";
import { stay } from "../i18n/stay";
import { TRIPS } from "../data/trips";

export default function ExplorePage() {
  const { lang } = useLanguage();
  const { query, setQuery, exploreTab, setExploreTab } = useApp();
  const e = extra[lang].explore;
  const s = stay[lang];
  const isStays = exploreTab === "stays";

  const tabs = [
    { k: "trips" as const, label: s.tabs.trips, icon: Compass },
    { k: "stays" as const, label: s.tabs.stays, icon: BedDouble },
  ];

  return (
    <>
      <PageHeader
        eyebrow={extra[lang].nav.explore}
        title={isStays ? s.hotels.title : e.title}
        subtitle={isStays ? s.hotels.subtitle : e.subtitle}
        image={isStays ? TRIPS[4].image : TRIPS[3].image}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex w-fit gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur">
            {tabs.map((tab) => (
              <button key={tab.k} onClick={() => setExploreTab(tab.k)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${exploreTab === tab.k ? "text-ink" : "text-white/80"}`}>
                {exploreTab === tab.k && <motion.span layoutId="explore-tab" className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 450, damping: 36 }} />}
                <span className="relative flex items-center gap-1.5"><tab.icon size={15} />{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-full bg-white px-5 py-3 shadow-xl sm:max-w-md">
            <Search size={18} className="text-brand" />
            <input value={query} onChange={(ev) => setQuery(ev.target.value)} placeholder={e.search}
              className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink-2/60" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear" className="text-ink-2 hover:text-ink"><X size={16} /></button>}
          </div>
        </div>
      </PageHeader>

      <motion.div key={exploreTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {isStays ? <StaysSection /> : <TripsSection />}
      </motion.div>
    </>
  );
}
