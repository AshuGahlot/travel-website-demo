import { motion } from "framer-motion";
import { MapPin, Star, Heart, Clock, ArrowUpRight } from "lucide-react";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import type { Trip } from "../data/trips";

interface Props {
  trip: Trip;
  saved: boolean;
  onToggleSave: (id: number) => void;
  index: number;
}

export default function TripCard({ trip, saved, onToggleSave, index }: Props) {
  const { t, lang } = useLanguage();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_2px_16px_rgba(19,27,46,0.05)] transition-shadow duration-300 hover:shadow-[0_24px_50px_rgba(19,27,46,0.14)]"
    >
      {/* Image */}
      <div className="relative h-56 shrink-0 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10" />

        {/* Badge */}
        {trip.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold tracking-wide text-ink shadow-md backdrop-blur">
            {trip.badge[lang]}
          </span>
        )}

        {/* Save button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onToggleSave(trip.id)}
          aria-label={saved ? t.card.saved : t.card.save}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors duration-200 ${
            saved
              ? "bg-brand text-white shadow-lg shadow-brand/40"
              : "bg-white/90 text-ink hover:bg-white"
          }`}
        >
          <Heart size={16} className={saved ? "fill-current" : ""} />
        </motion.button>

        {/* Bottom overlay info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-ink/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
            <MapPin size={11} />
            {trip.country[lang]}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-ink shadow-sm">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {trip.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-sea">
          <Clock size={12} />
          {t.card.days(trip.days)}
          <span className="text-line">•</span>
          <span className="text-ink-2 normal-case tracking-normal">
            {t.card.reviews(trip.reviews)}
          </span>
        </div>

        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
          {trip.title[lang]}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-2">
          {trip.summary[lang]}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-ink">
              {formatPrice(trip.price, lang)}
            </span>
            <span className="text-[11px] font-medium text-ink-2">{t.card.perPerson}</span>
          </div>
          <motion.a
            href="#footer"
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white transition-colors duration-200 group-hover:bg-brand"
          >
            {t.card.book}
            <ArrowUpRight size={13} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
