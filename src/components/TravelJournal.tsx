import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Clock, ArrowUpRight, X, Sparkles, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { homeShowcase } from "../i18n/homeShowcase";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TravelJournal() {
  const { lang } = useLanguage();
  const { go, setQuery, setExploreTab } = useApp();
  const j = homeShowcase[lang].journal;
  const [openId, setOpenId] = useState<number | null>(null);

  const [lead, ...rest] = j.stories;
  const activeStory = j.stories.find((st) => st.id === openId) ?? null;

  const jumpToTrips = (q: string) => {
    setOpenId(null);
    setExploreTab("trips");
    setQuery(q);
    go("explore");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
        className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-brand">
            <BookOpen size={13} /> {j.eyebrow}
          </span>
          <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {j.title}
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink-2">{j.subtitle}</p>
      </motion.div>

      {/* Editorial Magazine Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Lead Story (7 cols) */}
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease }}
          onClick={() => setOpenId(lead.id)}
          className="group relative flex min-h-[420px] cursor-pointer flex-col justify-end overflow-hidden rounded-[2.2rem] border border-line bg-ink p-6 shadow-md sm:p-8 lg:col-span-7"
        >
          <img
            src={lead.image}
            alt={lead.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />

          <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/85">
              <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
                {lead.tag}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                <Clock size={11} /> {lead.readTime}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
              {lead.title}
            </h3>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/80">
              {lead.excerpt}
            </p>
            <p className="mt-4 text-xs font-semibold text-[#ffb59d]">{lead.author}</p>
          </div>
        </motion.article>

        {/* Secondary Stacked Dispatches (5 cols) */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {rest.map((story, idx) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease }}
              whileHover={{ y: -4 }}
              onClick={() => setOpenId(story.id)}
              className="group flex flex-1 cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm transition-shadow hover:shadow-xl sm:flex-row"
            >
              <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-44">
                <img
                  src={story.image}
                  alt={story.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-brand">
                  <span>{story.tag}</span>
                  <span className="flex items-center gap-1 font-medium text-ink-2">
                    <Clock size={11} /> {story.readTime}
                  </span>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
                  {story.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-2">
                  {story.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3 text-xs font-bold text-ink">
                  <span className="truncate text-[11px] font-medium text-ink-2">{story.author}</span>
                  <span className="flex shrink-0 items-center gap-1 text-brand">
                    {j.readStory} <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Interactive Story Reader Modal */}
      <AnimatePresence>
        {activeStory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenId(null)}
              className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 32 }}
              className="fixed inset-x-4 bottom-4 top-16 z-[90] mx-auto flex max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-sand shadow-2xl sm:inset-y-12"
              role="dialog"
              aria-modal="true"
            >
              <div className="relative h-52 shrink-0 sm:h-64">
                <img src={activeStory.image} alt={activeStory.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <button
                  onClick={() => setOpenId(null)}
                  aria-label={j.closeStory}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition-colors hover:bg-white"
                >
                  <X size={17} />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white">
                    {activeStory.tag}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
                    {activeStory.title}
                  </h3>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-2">
                  <span>{activeStory.author}</span>
                  <span>{activeStory.readTime}</span>
                </div>
                {activeStory.body.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink sm:text-base">
                    {para}
                  </p>
                ))}
                <div className="rounded-2xl border border-brand/25 bg-brand/5 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                    <Sparkles size={13} /> {j.proTipLabel}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink">
                    {activeStory.tip}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-line bg-white px-6 py-4">
                <button
                  onClick={() => setOpenId(null)}
                  className="rounded-full border border-line px-5 py-2.5 text-xs font-bold text-ink-2 hover:text-ink"
                >
                  {j.closeStory}
                </button>
                <button
                  onClick={() => jumpToTrips(activeStory.query)}
                  className="flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white hover:bg-brand"
                >
                  <Compass size={14} /> {j.planThis}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
