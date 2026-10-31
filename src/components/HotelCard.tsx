import { motion } from "framer-motion";
import {
  Star, MapPin, Wifi, Waves, Flower2, Coffee, Dumbbell, UtensilsCrossed, Palmtree, Droplets, CarFront, CarTaxiFront, ShieldCheck,
} from "lucide-react";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { stay } from "../i18n/stay";
import type { Amenity, Hotel } from "../data/hotels";

export const AMENITY_ICON: Record<Amenity, typeof Wifi> = {
  wifi: Wifi, pool: Waves, spa: Flower2, breakfast: Coffee, gym: Dumbbell,
  restaurant: UtensilsCrossed, beach: Palmtree, onsen: Droplets, parking: CarFront,
};

export default function HotelCard({ hotel, index, onBook }: { hotel: Hotel; index: number; onBook: (h: Hotel) => void }) {
  const { lang } = useLanguage();
  const s = stay[lang].hotels;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition-shadow hover:shadow-[0_22px_46px_rgba(19,27,46,0.13)] sm:flex-row"
    >
      <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-60">
        <img src={hotel.image} alt={hotel.name[lang]} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent sm:bg-gradient-to-r" />
        {hotel.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-ink shadow">{hotel.tag[lang]}</span>
        )}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-sea/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
          <CarTaxiFront size={11} /> {s.transferBadge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h3 className="mt-1 truncate font-display text-xl font-semibold text-ink">{hotel.name[lang]}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-2">
              <MapPin size={11} /> {hotel.area[lang]} · {s.distance(hotel.distanceKm)}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-xl bg-ink px-2.5 py-1.5 text-xs font-bold text-white">
            {hotel.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-2 text-sm font-medium text-ink-2">{hotel.roomType[lang]}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.slice(0, 5).map((a) => {
            const Icon = AMENITY_ICON[a];
            return (
              <span key={a} className="flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold text-ink-2">
                <Icon size={11} className="text-brand" /> {s.amenity[a]}
              </span>
            );
          })}
        </div>

        {hotel.freeCancel && (
          <p className="mt-3 flex items-center gap-1 text-[11px] font-bold text-leaf">
            <ShieldCheck size={12} /> {s.freeCancel}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <span className="text-[11px] text-ink-2">{s.reviews(hotel.reviews)}</span>
            <p>
              <span className="text-xl font-bold text-ink">{formatPrice(hotel.pricePerNight, lang)}</span>
              <span className="text-[11px] font-medium text-ink-2"> / {s.night}</span>
            </p>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => onBook(hotel)}
            className="rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-brand">
            {s.book}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
