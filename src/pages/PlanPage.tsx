import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Minus, Plus, Sparkles, Check, Loader2, CarTaxiFront, PlaneLanding, PlaneTakeoff, BedDouble,
  LogOut, Moon, UtensilsCrossed, Coffee, MapPin, Star, Users, Briefcase, CheckCircle2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { extra } from "../i18n/extra";
import { stay } from "../i18n/stay";
import { TRIPS } from "../data/trips";
import { VEHICLES, hotelsForTrip, type VehicleId } from "../data/hotels";
import { buildItinerary, countMeals, type SlotKind } from "../data/itinerary";

const KIND_STYLE: Record<SlotKind, { icon: typeof MapPin; cls: string }> = {
  transfer: { icon: CarTaxiFront, cls: "bg-sea text-white" },
  checkin: { icon: BedDouble, cls: "bg-leaf text-white" },
  checkout: { icon: LogOut, cls: "bg-ink text-white" },
  activity: { icon: MapPin, cls: "bg-brand/10 text-brand" },
  meal: { icon: UtensilsCrossed, cls: "bg-amber-500/15 text-amber-600" },
  stay: { icon: Moon, cls: "bg-cream text-ink-2" },
};

function Stepper({ value, onChange, min, max }: { value: number; onChange: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-2">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-ink active:scale-90"><Minus size={16} /></button>
      <motion.span key={value} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 text-center font-display text-2xl font-semibold text-ink">{value}</motion.span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white active:scale-90"><Plus size={16} /></button>
    </div>
  );
}

export default function PlanPage() {
  const { lang } = useLanguage();
  const { addHotelBooking, go } = useApp();
  const p = extra[lang].plan;
  const sp = stay[lang].plan;
  const si = stay[lang].it;
  const sb = stay[lang].booking;

  const [dest, setDest] = useState(TRIPS[0].id);
  const [days, setDays] = useState(5);
  const [people, setPeople] = useState(2);
  const [interests, setInterests] = useState<number[]>([0, 1]);
  const [hotelId, setHotelId] = useState(hotelsForTrip(TRIPS[0].id)[0].id);
  const [pickup, setPickup] = useState(true);
  const [drop, setDrop] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleId>("sedan");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [booked, setBooked] = useState(false);

  const trip = TRIPS.find((t) => t.id === dest)!;
  const hotels = hotelsForTrip(dest);
  const hotel = hotels.find((h) => h.id === hotelId) ?? hotels[0];
  const veh = VEHICLES.find((v) => v.id === vehicle)!;

  const nights = Math.max(1, days - 1);
  const rooms = Math.ceil(people / 2);
  const activityCost = Math.round((trip.price / trip.days) * days * people);
  const hotelCost = hotel.pricePerNight * nights * rooms;
  const transferCost = ((pickup ? 1 : 0) + (drop ? 1 : 0)) * veh.price;
  const total = activityCost + hotelCost + transferCost;

  const itinerary = useMemo(
    () => buildItinerary({ days, lang, hotelName: hotel.name[lang], pickup, drop, seed: dest }),
    [days, lang, hotel, pickup, drop, dest]
  );
  const meals = countMeals(itinerary);

  const reset = () => { setState("idle"); setBooked(false); };
  const pickDest = (id: number) => { setDest(id); setHotelId(hotelsForTrip(id)[0].id); reset(); };

  const generate = () => {
    setState("loading");
    setTimeout(() => {
      setState("done");
      setTimeout(() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }, 1100);
  };

  const bookAll = () => {
    const start = new Date(); start.setDate(start.getDate() + 21);
    const end = new Date(start); end.setDate(end.getDate() + nights);
    addHotelBooking({
      ref: `TBG-P${Math.floor(1000 + Math.random() * 8999)}`, hotelId: hotel.id,
      checkIn: start.toISOString().slice(0, 10), checkOut: end.toISOString().slice(0, 10),
      nights, rooms, guests: people, pickup, drop, vehicle, pickupTime: "11:00", flight: "", total,
    });
    setBooked(true);
  };

  const label = "mb-3 text-[11px] font-bold uppercase tracking-wider text-ink-2";

  return (
    <>
      <PageHeader eyebrow={extra[lang].nav.plan} title={p.title} subtitle={p.subtitle} image={TRIPS[5].image} />
      <section className="mx-auto max-w-4xl space-y-8 px-4 pb-16 sm:px-6 lg:px-8">
        {/* Destination */}
        <div>
          <p className={label}>{p.where}</p>
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0">
            {TRIPS.map((t) => {
              const active = dest === t.id;
              return (
                <motion.button key={t.id} whileTap={{ scale: 0.95 }} onClick={() => pickDest(t.id)}
                  className={`relative h-28 w-32 shrink-0 overflow-hidden rounded-2xl ring-offset-2 ring-offset-sand transition-all sm:w-auto ${active ? "ring-[3px] ring-brand" : ""}`}>
                  <img src={t.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute bottom-2 left-3 right-3 truncate text-left text-xs font-bold text-white">{t.country[lang].split(/[,、]/)[0]}</span>
                  {active && <motion.span layoutId="dest-check" className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white"><Check size={13} strokeWidth={3} /></motion.span>}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div><p className={label}>{p.days}</p><Stepper value={days} onChange={(n) => { setDays(n); reset(); }} min={2} max={8} /></div>
          <div><p className={label}>{p.travelers}</p><Stepper value={people} onChange={(n) => { setPeople(n); reset(); }} min={1} max={8} /></div>
        </div>

        {/* Interests */}
        <div>
          <p className={label}>{p.interests}</p>
          <div className="flex flex-wrap gap-2">
            {p.i.map((name, idx) => {
              const on = interests.includes(idx);
              return (
                <motion.button key={name} whileTap={{ scale: 0.92 }}
                  onClick={() => setInterests((prev) => (on ? prev.filter((x) => x !== idx) : [...prev, idx]))}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink-2"}`}>
                  {on && <Check size={13} strokeWidth={3} />}{name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Hotel */}
        <div>
          <p className={label}>{sp.stayStep}</p>
          <div className="space-y-3">
            {hotels.map((h) => {
              const on = hotel.id === h.id;
              return (
                <motion.button key={h.id} whileTap={{ scale: 0.99 }} onClick={() => { setHotelId(h.id); reset(); }}
                  className={`flex w-full items-center gap-3 overflow-hidden rounded-3xl border-2 p-2 text-left transition-colors ${on ? "border-brand bg-brand/5" : "border-line bg-white"}`}>
                  <img src={h.image} alt="" className="h-20 w-24 shrink-0 rounded-2xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1">
                      {Array.from({ length: h.stars }).map((_, i) => <Star key={i} size={9} className="fill-amber-400 text-amber-400" />)}
                    </span>
                    <span className="block truncate font-display text-base font-semibold text-ink">{h.name[lang]}</span>
                    <span className="block truncate text-[11px] text-ink-2">{h.area[lang]} · {h.rating.toFixed(1)}★</span>
                  </span>
                  <span className="shrink-0 pr-2 text-right">
                    <span className="block text-sm font-bold text-ink">{formatPrice(h.pricePerNight, lang)}</span>
                    <span className="block text-[10px] text-ink-2">/ {stay[lang].hotels.night}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Transfers */}
        <div>
          <p className={label}>{sp.transferStep}</p>
          <p className="-mt-2 mb-3 text-xs text-ink-2">{sp.transferHint}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { on: pickup, set: setPickup, icon: PlaneLanding, t: sp.includePickup, d: sb.pickupDesc },
              { on: drop, set: setDrop, icon: PlaneTakeoff, t: sp.includeDrop, d: sb.dropDesc },
            ].map((row) => (
              <button key={row.t} onClick={() => { row.set(!row.on); reset(); }}
                className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${row.on ? "border-brand bg-brand/5" : "border-line bg-white"}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${row.on ? "bg-brand text-white" : "bg-cream text-ink-2"}`}><row.icon size={18} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-ink">{row.t}</span>
                  <span className="block text-[11px] leading-snug text-ink-2">{row.d}</span>
                </span>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${row.on ? "border-brand bg-brand text-white" : "border-line"}`}>
                  {row.on && <Check size={13} strokeWidth={3} />}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {(pickup || drop) && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden">
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                  {VEHICLES.map((v) => {
                    const on = vehicle === v.id;
                    return (
                      <button key={v.id} onClick={() => { setVehicle(v.id); reset(); }}
                        className={`w-44 shrink-0 rounded-2xl border-2 p-3 text-left transition-colors ${on ? "border-ink bg-white" : "border-line bg-white/60"}`}>
                        <span className="block text-sm font-bold text-ink">{v.name[lang]}</span>
                        <span className="mt-1 flex gap-2 text-[10px] font-semibold text-ink-2">
                          <span className="flex items-center gap-0.5"><Users size={9} />{v.seats}</span>
                          <span className="flex items-center gap-0.5"><Briefcase size={9} />{v.bags}</span>
                        </span>
                        <span className="mt-1 block text-sm font-bold text-brand">{formatPrice(v.price, lang)}
                          <span className="text-[10px] font-medium text-ink-2"> {sb.eachWay}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={generate} disabled={state === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff7a50] to-brand-2 py-4 text-base font-bold text-white shadow-xl shadow-brand/30">
          {state === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {p.generate}
        </motion.button>

        {/* Itinerary */}
        <AnimatePresence>
          {state === "done" && (
            <motion.div id="itinerary" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="scroll-mt-24 space-y-5">
              {/* Summary card */}
              <div className="rounded-[2rem] border border-line bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-brand">{p.result}</p>
                    <h3 className="font-display text-2xl font-semibold text-ink">{trip.title[lang]}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-2"><BedDouble size={12} />{hotel.name[lang]} · {sb.nights(nights)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-ink-2">{p.estimate}</p>
                    <p className="text-2xl font-bold text-ink">{formatPrice(total, lang)}</p>
                    <p className="text-[11px] text-ink-2">{formatPrice(Math.round(total / people), lang)} {sp.perPerson}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-[11px] font-bold text-amber-700">
                    <UtensilsCrossed size={12} /> {si.meals(meals.b, meals.l, meals.d)}
                  </span>
                  {(pickup || drop) && (
                    <span className="flex items-center gap-1.5 rounded-full bg-sea/10 px-3 py-1.5 text-[11px] font-bold text-sea">
                      <CarTaxiFront size={12} /> {veh.name[lang]}
                    </span>
                  )}
                </div>

                <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-2">{sp.breakdown}</p>
                  {[
                    { k: `${sp.activitiesLine} · ${people}×`, v: activityCost },
                    { k: `${sp.hotelLine} · ${sb.roomLine(rooms, nights)}`, v: hotelCost },
                    ...(transferCost ? [{ k: `${sp.transferLine} · ${veh.name[lang]}`, v: transferCost }] : []),
                  ].map((row) => (
                    <div key={row.k} className="flex justify-between gap-3">
                      <dt className="truncate text-ink-2">{row.k}</dt>
                      <dd className="shrink-0 font-semibold text-ink">{formatPrice(row.v, lang)}</dd>
                    </div>
                  ))}
                </dl>

                {booked ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-5 flex flex-col items-center gap-3 rounded-2xl bg-leaf/10 p-4 text-center sm:flex-row sm:text-left">
                    <CheckCircle2 size={26} className="shrink-0 text-leaf" />
                    <p className="flex-1 text-sm font-bold text-ink">{sp.booked}</p>
                    <button onClick={() => go("bookings")} className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">{sb.viewTrips}</button>
                  </motion.div>
                ) : (
                  <motion.button whileTap={{ scale: 0.97 }} onClick={bookAll}
                    className="mt-5 w-full rounded-full bg-ink py-3.5 text-sm font-bold text-white hover:bg-brand">
                    {sp.bookAll}
                  </motion.button>
                )}
              </div>

              {/* Day-by-day */}
              <div className="rounded-[2rem] border border-line bg-white p-5 shadow-sm sm:p-7">
                <h3 className="mb-5 font-display text-xl font-semibold text-ink">{sp.fullItinerary}</h3>
                <div className="space-y-6">
                  {itinerary.map((d, di) => (
                    <motion.div key={d.day} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: di * 0.07 }}>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{d.day}</span>
                        <h4 className="font-display text-lg font-semibold text-ink">
                          {lang === "ja" ? `${d.day}${si.day}` : `${si.day} ${d.day}`}
                        </h4>
                        <span className="ml-auto flex gap-1">
                          {d.meals.b && <Coffee size={13} className="text-amber-600" />}
                          {d.meals.l && <UtensilsCrossed size={13} className="text-amber-600" />}
                          {d.meals.d && <Moon size={13} className="text-amber-600" />}
                        </span>
                      </div>
                      <ol className="space-y-2.5 border-l-2 border-dashed border-line pl-5">
                        {d.slots.map((slot, si2) => {
                          const st = KIND_STYLE[slot.kind];
                          const Icon = slot.kind === "meal" && slot.label === si.breakfast ? Coffee : st.icon;
                          return (
                            <li key={si2} className="relative">
                              <span className={`absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-white ${st.cls}`}>
                                <Icon size={12} />
                              </span>
                              <div className="flex flex-wrap items-baseline gap-x-2 rounded-2xl bg-cream/60 px-3 py-2">
                                <span className="font-mono text-[11px] font-bold text-brand">{slot.time}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-2">{slot.label}</span>
                                <span className="w-full text-sm font-semibold text-ink">{slot.title}</span>
                                {slot.note && <span className="w-full text-[11px] text-ink-2">{slot.note}</span>}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
