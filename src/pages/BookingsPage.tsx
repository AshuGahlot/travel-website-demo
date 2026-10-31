import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plane, QrCode, Star, CalendarDays, Users, BedDouble, PlaneLanding, PlaneTakeoff, CarTaxiFront, MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { extra } from "../i18n/extra";
import { stay } from "../i18n/stay";
import { TRIPS } from "../data/trips";
import { HOTELS, VEHICLES } from "../data/hotels";

const TRIP_BOOKINGS = {
  upcoming: [
    { trip: TRIPS[0], ref: "TBG-48K2Q", date: new Date(2025, 9, 14), guests: 2, from: "NRT", to: "KIX", daysLeft: 18 },
    { trip: TRIPS[4], ref: "TBG-91MZ7", date: new Date(2025, 11, 22), guests: 2, from: "HND", to: "MLE", daysLeft: 87 },
  ],
  past: [
    { trip: TRIPS[7], ref: "TBG-22PA9", date: new Date(2025, 3, 3), guests: 1, from: "HND", to: "CDG", daysLeft: 0 },
    { trip: TRIPS[5], ref: "TBG-07IC4", date: new Date(2024, 11, 10), guests: 3, from: "NRT", to: "KEF", daysLeft: 0 },
  ],
};

export default function BookingsPage() {
  const { lang } = useLanguage();
  const { hotelBookings } = useApp();
  const b = extra[lang].bookings;
  const sb = stay[lang].booking;
  const sh = stay[lang].hotels;
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const fmt = (d: Date) => d.toLocaleDateString(lang === "ja" ? "ja-JP" : "en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      <PageHeader eyebrow={extra[lang].nav.bookings} title={b.title} subtitle={b.subtitle} image={TRIPS[1].image} />
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex rounded-full border border-line bg-white p-1 shadow-sm">
          {(["upcoming", "past"] as const).map((k) => (
            <button key={k} onClick={() => setTab(k)}
              className={`relative flex-1 rounded-full py-2.5 text-sm font-bold ${tab === k ? "text-white" : "text-ink-2"}`}>
              {tab === k && <motion.span layoutId="bk-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 450, damping: 36 }} />}
              <span className="relative">{b[k]} ({TRIP_BOOKINGS[k].length + (k === "upcoming" ? hotelBookings.length : 0)})</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
            {/* Hotel + transfer bookings */}
            {tab === "upcoming" && hotelBookings.map((hb, i) => {
              const hotel = HOTELS.find((h) => h.id === hb.hotelId)!;
              const veh = VEHICLES.find((v) => v.id === hb.vehicle)!;
              return (
                <motion.article key={hb.ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="overflow-hidden rounded-3xl border-2 border-brand/30 bg-white shadow-sm">
                  <div className="flex gap-4 p-4">
                    <img src={hotel.image} alt="" className="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-36" />
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2.5 py-1 text-[10px] font-bold text-leaf">
                        <BedDouble size={11} /> {sh.title}
                      </span>
                      <h3 className="mt-1 truncate font-display text-lg font-semibold text-ink">{hotel.name[lang]}</h3>
                      <p className="flex items-center gap-1 truncate text-[11px] text-ink-2"><MapPin size={10} />{hotel.area[lang]}</p>
                      <p className="mt-1 text-xs font-semibold text-ink-2">
                        {hb.checkIn} → {hb.checkOut} · {sb.nights(hb.nights)}
                      </p>
                    </div>
                  </div>

                  <div className="mx-4 grid grid-cols-2 gap-2 border-t border-dashed border-line py-3 sm:grid-cols-4">
                    {[
                      { l: sb.rooms, v: String(hb.rooms) },
                      { l: sb.guests, v: String(hb.guests) },
                      { l: b.ref, v: hb.ref },
                      { l: sb.total, v: formatPrice(hb.total, lang) },
                    ].map((f) => (
                      <div key={f.l}>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-ink-2">{f.l}</p>
                        <p className="truncate text-xs font-bold text-ink">{f.v}</p>
                      </div>
                    ))}
                  </div>

                  {(hb.pickup || hb.drop) && (
                    <div className="space-y-2 bg-cream/60 p-4">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-2">
                        <CarTaxiFront size={12} /> {sb.transfers} · {veh.name[lang]}
                      </p>
                      {hb.pickup && (
                        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                          <PlaneLanding size={15} className="shrink-0 text-sea" />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">{sb.pickup}</span>
                          <span className="shrink-0 text-xs font-bold text-ink-2">{hb.pickupTime}{hb.flight && ` · ${hb.flight}`}</span>
                        </div>
                      )}
                      {hb.drop && (
                        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
                          <PlaneTakeoff size={15} className="shrink-0 text-brand" />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">{sb.drop}</span>
                          <span className="shrink-0 text-xs font-bold text-ink-2">{veh.name[lang]}</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.article>
              );
            })}

            {/* Trip bookings */}
            {TRIP_BOOKINGS[tab].map((bk, i) => (
              <motion.article key={bk.ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`overflow-hidden rounded-3xl border border-line bg-white shadow-sm ${tab === "past" ? "opacity-90" : ""}`}>
                <div className="relative h-36 sm:h-44">
                  <img src={bk.trip.image} alt={bk.trip.title[lang]} className={`h-full w-full object-cover ${tab === "past" ? "grayscale-[40%]" : ""}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold text-white ${tab === "upcoming" ? "bg-leaf" : "bg-ink/70"}`}>
                    {tab === "upcoming" ? b.confirmed : b.completed}
                  </span>
                  {tab === "upcoming" && (
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-brand">{b.daysLeft(bk.daysLeft)}</span>
                  )}
                  <h3 className="absolute bottom-4 left-5 font-display text-2xl font-semibold text-white">{bk.trip.title[lang]}</h3>
                </div>

                <div className="flex items-center gap-3 px-5 pt-5">
                  <span className="font-display text-2xl font-semibold text-ink">{bk.from}</span>
                  <div className="relative flex flex-1 items-center">
                    <span className="h-px flex-1 border-t-2 border-dashed border-line" />
                    <motion.span animate={{ x: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3 }}
                      className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand"><Plane size={15} /></motion.span>
                    <span className="h-px flex-1 border-t-2 border-dashed border-line" />
                  </div>
                  <span className="font-display text-2xl font-semibold text-ink">{bk.to}</span>
                </div>

                <div className="relative my-4 flex items-center">
                  <span className="-ml-3 h-6 w-6 rounded-full bg-sand" />
                  <span className="flex-1 border-t-2 border-dashed border-line" />
                  <span className="-mr-3 h-6 w-6 rounded-full bg-sand" />
                </div>

                <div className="grid grid-cols-3 gap-2 px-5 text-center sm:text-left">
                  {[
                    { icon: CalendarDays, l: b.depart, v: fmt(bk.date) },
                    { icon: Users, l: b.travelers, v: b.guests(bk.guests) },
                    { icon: QrCode, l: b.ref, v: bk.ref },
                  ].map((f) => (
                    <div key={f.l}>
                      <p className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-ink-2 sm:justify-start"><f.icon size={11} />{f.l}</p>
                      <p className="mt-0.5 text-xs font-bold text-ink sm:text-sm">{f.v}</p>
                    </div>
                  ))}
                </div>
                <div className="p-5">
                  <button className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold ${
                    tab === "upcoming" ? "bg-ink text-white hover:bg-brand" : "border-2 border-brand text-brand hover:bg-brand hover:text-white"}`}>
                    {tab === "upcoming" ? <><QrCode size={15} />{b.ticket}</> : <><Star size={15} />{b.rate}</>}
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
