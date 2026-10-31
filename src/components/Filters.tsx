import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid, Palmtree, Mountain, Building2, Landmark, Tent, ArrowUpDown, RotateCcw,
  SlidersHorizontal, Check, ChevronDown, Sparkles, TrendingDown, TrendingUp, Star, Timer,
} from "lucide-react";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { extra } from "../i18n/extra";
import type { Category } from "../data/trips";
import BottomSheet from "./BottomSheet";

export type SortKey = "recommended" | "priceLow" | "priceHigh" | "rating" | "duration";
export type DurationKey = "any" | "short" | "medium" | "long";

const CATEGORY_ICONS: Record<Category, typeof LayoutGrid> = {
  all: LayoutGrid, beach: Palmtree, mountain: Mountain, city: Building2, culture: Landmark, adventure: Tent,
};
const SORT_ICONS: Record<SortKey, typeof Star> = {
  recommended: Sparkles, priceLow: TrendingDown, priceHigh: TrendingUp, rating: Star, duration: Timer,
};
const CATEGORIES: Category[] = ["all", "beach", "mountain", "city", "culture", "adventure"];
export const MAX_BUDGET = 3000;

interface Props {
  category: Category; onCategory: (c: Category) => void;
  sort: SortKey; onSort: (s: SortKey) => void;
  budget: number; onBudget: (b: number) => void;
  duration: DurationKey; onDuration: (d: DurationKey) => void;
  resultCount: number; onClear: () => void;
}

export default function Filters(p: Props) {
  const { t, lang } = useLanguage();
  const x = extra[lang].sort;
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "recommended", label: t.filters.sortRecommended },
    { key: "priceLow", label: t.filters.sortPriceLow },
    { key: "priceHigh", label: t.filters.sortPriceHigh },
    { key: "rating", label: t.filters.sortRating },
    { key: "duration", label: t.filters.sortDuration },
  ];
  const durationOptions: { key: DurationKey; label: string }[] = [
    { key: "any", label: t.filters.anyDuration },
    { key: "short", label: t.filters.dShort },
    { key: "medium", label: t.filters.dMedium },
    { key: "long", label: t.filters.dLong },
  ];
  const activeFilterCount = (p.duration !== "any" ? 1 : 0) + (p.budget < MAX_BUDGET ? 1 : 0);
  const currentSort = sortOptions.find((o) => o.key === p.sort)!;

  const DurationPills = ({ id }: { id: string }) => (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-cream p-1 sm:flex sm:rounded-full">
      {durationOptions.map((o) => (
        <button
          key={o.key}
          onClick={() => p.onDuration(o.key)}
          className={`relative flex-1 whitespace-nowrap rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors sm:rounded-full sm:py-1.5 ${
            p.duration === o.key ? "text-white" : "text-ink-2 hover:text-ink"
          }`}
        >
          {p.duration === o.key && (
            <motion.span layoutId={`duration-${id}`} className="absolute inset-0 rounded-xl bg-ink sm:rounded-full"
              transition={{ type: "spring", stiffness: 480, damping: 38 }} />
          )}
          <span className="relative z-10">{o.label}</span>
        </button>
      ))}
    </div>
  );

  const BudgetSlider = () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">{t.filters.maxBudget}</span>
        <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">
          {t.filters.upTo} {formatPrice(p.budget, lang)}
        </span>
      </div>
      <input type="range" min={900} max={MAX_BUDGET} step={50} value={p.budget}
        onChange={(e) => p.onBudget(Number(e.target.value))} className="w-full" aria-label={t.filters.maxBudget} />
      <div className="flex justify-between text-[10px] font-medium text-ink-2">
        <span>{formatPrice(900, lang)}</span><span>{formatPrice(MAX_BUDGET, lang)}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Category pills */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat];
          const active = p.category === cat;
          return (
            <button key={cat} onClick={() => p.onCategory(cat)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                active ? "border-transparent text-white" : "border-line bg-white text-ink-2 hover:border-brand/40 hover:text-ink"
              }`}>
              {active && <motion.span layoutId="category-pill" className="absolute inset-0 rounded-full bg-ink shadow-lg shadow-ink/25"
                transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
              <span className={`relative z-10 ${active ? "text-[#ffb59d]" : "text-brand"}`}><Icon size={16} /></span>
              <span className="relative z-10">{t.filters[cat]}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- MOBILE: sticky sort / filter bar ---------- */}
      <div className="sticky top-16 z-30 -mx-4 bg-sand/90 px-4 py-2 backdrop-blur-lg md:hidden">
        <div className="flex items-center gap-2">
          <button onClick={() => setSortOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-line bg-white px-3 py-2.5 text-left shadow-sm active:scale-[0.98]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cream text-ink"><ArrowUpDown size={15} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-2">{x.button}</span>
              <span className="block truncate text-xs font-semibold text-ink">{currentSort.label}</span>
            </span>
            <ChevronDown size={15} className="text-ink-2" />
          </button>
          <button onClick={() => setFilterOpen(true)}
            className="relative flex items-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-xs font-bold text-white shadow-md active:scale-[0.98]">
            <SlidersHorizontal size={15} />
            {x.filters}
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px]">{activeFilterCount}</span>
            )}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-ink-2">{t.filters.tripsFound(p.resultCount)}</span>
          {(activeFilterCount > 0 || p.category !== "all" || p.sort !== "recommended") && (
            <button onClick={p.onClear} className="flex items-center gap-1 text-xs font-bold text-brand">
              <RotateCcw size={12} />{t.filters.clear}
            </button>
          )}
        </div>
      </div>

      {/* Sort sheet */}
      <BottomSheet open={sortOpen} onClose={() => setSortOpen(false)} title={x.sheetTitle}>
        <ul className="space-y-2 pb-2">
          {sortOptions.map((o, i) => {
            const active = p.sort === o.key;
            const Icon = SORT_ICONS[o.key];
            return (
              <motion.li key={o.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <button
                  onClick={() => { p.onSort(o.key); setTimeout(() => setSortOpen(false), 180); }}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-colors ${
                    active ? "border-brand bg-brand/5" : "border-transparent bg-white"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? "bg-brand text-white" : "bg-cream text-ink-2"}`}>
                    <Icon size={17} />
                  </span>
                  <span className={`flex-1 text-sm font-semibold ${active ? "text-ink" : "text-ink-2"}`}>{o.label}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${active ? "border-brand bg-brand text-white" : "border-line"}`}>
                    {active && <Check size={13} strokeWidth={3} />}
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </BottomSheet>

      {/* Filter sheet */}
      <BottomSheet open={filterOpen} onClose={() => setFilterOpen(false)} title={x.filterTitle}
        footer={
          <div className="flex gap-3">
            <button onClick={() => { p.onDuration("any"); p.onBudget(MAX_BUDGET); }}
              className="rounded-full border border-line px-5 py-3 text-sm font-bold text-ink-2">{x.reset}</button>
            <button onClick={() => setFilterOpen(false)}
              className="flex-1 rounded-full bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-brand/30">{x.show(p.resultCount)}</button>
          </div>
        }>
        <div className="space-y-6 pb-2">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-2">{x.duration}</p>
            <DurationPills id="sheet" />
          </div>
          <BudgetSlider />
        </div>
      </BottomSheet>

      {/* ---------- DESKTOP / TABLET panel ---------- */}
      <div className="hidden flex-col gap-4 rounded-3xl border border-line bg-white p-5 shadow-sm md:flex lg:flex-row lg:items-center lg:gap-8">
        <div className="flex items-center gap-3 lg:min-w-[220px]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cream text-ink"><ArrowUpDown size={17} /></span>
          <label className="flex w-full flex-col gap-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">{t.filters.sortBy}</span>
            <select value={p.sort} onChange={(e) => p.onSort(e.target.value as SortKey)}
              className="w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-ink outline-none">
              {sortOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </label>
        </div>
        <div className="hidden h-10 w-px bg-line lg:block" />
        <div className="flex flex-col gap-2 lg:min-w-[260px]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">{x.duration}</span>
          <DurationPills id="desk" />
        </div>
        <div className="hidden h-10 w-px bg-line lg:block" />
        <div className="flex-1 lg:min-w-[200px]"><BudgetSlider /></div>
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4 lg:border-0 lg:pt-0">
          <span className="whitespace-nowrap text-sm font-semibold text-ink">{t.filters.tripsFound(p.resultCount)}</span>
          <button onClick={p.onClear}
            className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-semibold text-ink-2 hover:border-brand/40 hover:text-brand">
            <RotateCcw size={13} />{t.filters.clear}
          </button>
        </div>
      </div>
    </div>
  );
}
