import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Minus, Plus, PlaneLanding, PlaneTakeoff, Check, Users, Briefcase, CalendarDays, CheckCircle2, Clock, Ticket,
} from "lucide-react";
import { useLanguage, formatPrice } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { stay } from "../i18n/stay";
import { VEHICLES, type Hotel, type VehicleId } from "../data/hotels";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };

function Stepper({ value, set, min, max }: { value: number; set: (n: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => set(Math.max(min, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream text-ink active:scale-90"><Minus size={15} /></button>
      <motion.span key={value} initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="w-7 text-center font-display text-lg font-semibold text-ink">{value}</motion.span>
      <button onClick={() => set(Math.min(max, value + 1))} className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-white active:scale-90"><Plus size={15} /></button>
    </div>
  );
}

export default function HotelBookingModal({ hotel, onClose }: { hotel: Hotel | null; onClose: () => void }) {
  const { lang } = useLanguage();
  const { addHotelBooking, go } = useApp();
  const b = stay[lang].booking;

  const [checkIn, setCheckIn] = useState(addDays(14));
  const [checkOut, setCheckOut] = useState(addDays(17));
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [pickup, setPickup] = useState(true);
  const [drop, setDrop] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleId>("sedan");
  const [pickupTime, setPickupTime] = useState("11:00");
  const [flight, setFlight] = useState("");
  const [done, setDone] = useState<string | null>(null);

  const nights = useMemo(() => {
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.round(ms / 86400000));
  }, [checkIn, checkOut]);

  const v = VEHICLES.find((x) => x.id === vehicle)!;
  const roomTotal = (hotel?.pricePerNight ?? 0) * nights * rooms;
  const transferTotal = (pickup ? v.price : 0) + (drop ? v.price : 0);
  const taxes = Math.round((roomTotal + transferTotal) * 0.12);
  const total = roomTotal + transferTotal + taxes;

  const confirm = () => {
    if (!hotel) return;
    const ref = `TBG-H${Math.floor(1000 + Math.random() * 8999)}`;
    addHotelBooking({ ref, hotelId: hotel.id, checkIn, checkOut, nights, rooms, guests, pickup, drop, vehicle, pickupTime, flight, total });
    setDone(ref);
  };

  const close = () => { setDone(null); onClose(); };
  const label = "mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink-2";

  return (
    <AnimatePresence>
      {hotel && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
            className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-sm" />
          <motion.div
            initial={{ y: "100%", opacity: 0.6 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-[90] mx-auto flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[2rem] bg-sand shadow-2xl sm:bottom-4 sm:max-h-[88vh] sm:rounded-[2rem]"
            role="dialog" aria-modal="true"
          >
            {done ? (
              <div className="flex flex-col items-center px-8 py-12 text-center">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                  <CheckCircle2 size={40} />
                </motion.span>
                <h2 className="mt-5 font-display text-2xl font-semibold text-ink">{b.confirmed}</h2>
                <p className="mt-2 max-w-sm text-sm text-ink-2">{b.confirmedDesc}</p>
                <p className="mt-4 rounded-full bg-white px-4 py-2 font-mono text-sm font-bold tracking-widest text-ink shadow-sm">{done}</p>
                <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
                  <button onClick={close} className="flex-1 rounded-full border border-line py-3 text-sm font-bold text-ink-2">{b.close}</button>
                  <button onClick={() => { close(); go("bookings"); }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white shadow-lg shadow-brand/30">
                    <Ticket size={15} /> {b.viewTrips}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="relative h-28 shrink-0 sm:h-32">
                  <img src={hotel.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/20" />
                  <button onClick={close} aria-label="Close"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink"><X size={17} /></button>
                  <div className="absolute bottom-3 left-5 right-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#ffb59d]">{b.title}</p>
                    <h2 className="truncate font-display text-xl font-semibold text-white">{hotel.name[lang]}</h2>
                  </div>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
                  {/* Stay details */}
                  <section>
                    <h3 className="mb-3 font-display text-base font-semibold text-ink">{b.stayDetails}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="rounded-2xl border border-line bg-white p-3">
                        <span className={label}><CalendarDays size={11} className="mr-1 inline" />{b.checkIn}</span>
                        <input type="date" value={checkIn} max={checkOut}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-transparent text-sm font-semibold text-ink outline-none" />
                      </label>
                      <label className="rounded-2xl border border-line bg-white p-3">
                        <span className={label}><CalendarDays size={11} className="mr-1 inline" />{b.checkOut}</span>
                        <input type="date" value={checkOut} min={checkIn}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-transparent text-sm font-semibold text-ink outline-none" />
                      </label>
                    </div>
                    <p className="mt-2 text-center text-xs font-bold text-brand">{b.nights(nights)}</p>
                    <div className="mt-3 space-y-2">
                      {[
                        { l: b.rooms, v: rooms, set: setRooms, min: 1, max: 4 },
                        { l: b.guests, v: guests, set: setGuests, min: 1, max: 8 },
                      ].map((row) => (
                        <div key={row.l} className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-2.5">
                          <span className="text-sm font-semibold text-ink">{row.l}</span>
                          <Stepper value={row.v} set={row.set} min={row.min} max={row.max} />
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Transfers */}
                  <section>
                    <h3 className="font-display text-base font-semibold text-ink">{b.transfers}</h3>
                    <p className="mb-3 text-xs text-ink-2">{b.transfersDesc}</p>
                    <div className="space-y-2">
                      {[
                        { on: pickup, set: setPickup, icon: PlaneLanding, t: b.pickup, d: b.pickupDesc },
                        { on: drop, set: setDrop, icon: PlaneTakeoff, t: b.drop, d: b.dropDesc },
                      ].map((row) => (
                        <button key={row.t} onClick={() => row.set(!row.on)}
                          className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${row.on ? "border-brand bg-brand/5" : "border-line bg-white"}`}>
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${row.on ? "bg-brand text-white" : "bg-cream text-ink-2"}`}>
                            <row.icon size={18} />
                          </span>
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
                          <p className={`${label} mt-4`}>{b.vehicle}</p>
                          <div className="space-y-2">
                            {VEHICLES.map((veh) => {
                              const on = vehicle === veh.id;
                              return (
                                <button key={veh.id} onClick={() => setVehicle(veh.id)}
                                  className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${on ? "border-ink bg-white" : "border-transparent bg-white/70"}`}>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-bold text-ink">{veh.name[lang]}</span>
                                    <span className="block text-[11px] text-ink-2">{veh.desc[lang]}</span>
                                    <span className="mt-1 flex gap-3 text-[10px] font-semibold text-ink-2">
                                      <span className="flex items-center gap-1"><Users size={10} />{b.seats(veh.seats)}</span>
                                      <span className="flex items-center gap-1"><Briefcase size={10} />{b.bags(veh.bags)}</span>
                                    </span>
                                  </span>
                                  <span className="shrink-0 text-right">
                                    <span className="block text-sm font-bold text-brand">{formatPrice(veh.price, lang)}</span>
                                    <span className="block text-[10px] text-ink-2">{b.eachWay}</span>
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <label className="rounded-2xl border border-line bg-white p-3">
                              <span className={label}><Clock size={11} className="mr-1 inline" />{pickup ? b.pickupTime : b.dropTime}</span>
                              <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)}
                                className="w-full bg-transparent text-sm font-semibold text-ink outline-none" />
                            </label>
                            <label className="rounded-2xl border border-line bg-white p-3">
                              <span className={label}>{b.flight}</span>
                              <input value={flight} onChange={(e) => setFlight(e.target.value)} placeholder={b.flightPh}
                                className="w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-normal placeholder:text-ink-2/50" />
                            </label>
                          </div>
                          <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-leaf"><Check size={12} />{b.meet}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  {/* Summary */}
                  <section className="rounded-3xl border border-line bg-white p-4">
                    <h3 className="mb-3 font-display text-base font-semibold text-ink">{b.summary}</h3>
                    <dl className="space-y-2 text-sm">
                      {[
                        { k: b.roomLine(rooms, nights), v: roomTotal },
                        ...(pickup ? [{ k: `${b.pickupLine} · ${v.name[lang]}`, v: v.price }] : []),
                        ...(drop ? [{ k: `${b.dropLine} · ${v.name[lang]}`, v: v.price }] : []),
                        { k: b.taxes, v: taxes },
                      ].map((row) => (
                        <div key={row.k} className="flex justify-between gap-3">
                          <dt className="truncate text-ink-2">{row.k}</dt>
                          <dd className="shrink-0 font-semibold text-ink">{formatPrice(row.v, lang)}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                      <span className="font-display text-base font-semibold text-ink">{b.total}</span>
                      <motion.span key={total} initial={{ scale: 0.9, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-bold text-brand">{formatPrice(total, lang)}</motion.span>
                    </div>
                    {hotel.freeCancel && <p className="mt-2 text-[11px] text-leaf">{b.cancelFree}</p>}
                  </section>
                </div>

                <div className="shrink-0 border-t border-line bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={confirm}
                    className="w-full rounded-full bg-gradient-to-r from-[#ff7a50] to-brand-2 py-4 text-base font-bold text-white shadow-xl shadow-brand/30">
                    {b.confirm} · {formatPrice(total, lang)}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
