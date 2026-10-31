import { stay } from "../i18n/stay";
import type { Lang } from "../i18n/translations";

export type SlotKind = "transfer" | "checkin" | "checkout" | "activity" | "meal" | "stay";

export interface Slot {
  time: string;
  kind: SlotKind;
  label: string;
  title: string;
  note?: string;
}

export interface ItineraryDay {
  day: number;
  slots: Slot[];
  meals: { b: boolean; l: boolean; d: boolean };
}

interface Options {
  days: number;
  lang: Lang;
  hotelName: string;
  pickup: boolean;
  drop: boolean;
  seed?: number;
}

/** Builds a complete day-by-day itinerary including meals, transfers and overnight stays. */
export function buildItinerary({ days, lang, hotelName, pickup, drop, seed = 0 }: Options): ItineraryDay[] {
  const it = stay[lang].it;
  const pick = <T,>(arr: T[], i: number) => arr[(i + seed) % arr.length];

  return Array.from({ length: days }).map((_, idx) => {
    const day = idx + 1;
    const first = day === 1;
    const last = day === days;
    const slots: Slot[] = [];
    const meals = { b: !first, l: true, d: !last };

    if (first) {
      if (pickup) {
        slots.push({ time: "11:00", kind: "transfer", label: it.pickup, title: it.pickup, note: it.pickupDesc });
      }
      slots.push({ time: "14:00", kind: "checkin", label: it.checkIn, title: `${it.checkIn} — ${hotelName}` });
    } else {
      slots.push({ time: "08:00", kind: "meal", label: it.breakfast, title: pick(it.breakfasts, idx) });
    }

    if (!last) {
      slots.push({ time: first ? "16:00" : "09:30", kind: "activity", label: it.morning, title: pick(it.morningActs, idx) });
    }

    slots.push({ time: "12:30", kind: "meal", label: it.lunch, title: pick(it.lunches, idx) });

    if (last) {
      slots.push({ time: "10:30", kind: "checkout", label: it.checkOut, title: it.checkOut });
      if (drop) {
        slots.push({ time: "15:00", kind: "transfer", label: it.drop, title: it.drop, note: it.dropDesc });
      }
    } else {
      slots.push({ time: "14:30", kind: "activity", label: it.afternoon, title: pick(it.afternoonActs, idx) });
      slots.push({ time: "19:00", kind: "meal", label: it.dinner, title: pick(it.dinners, idx) });
      slots.push({ time: "21:00", kind: "activity", label: it.evening, title: pick(it.eveningActs, idx) });
      slots.push({ time: "22:30", kind: "stay", label: it.overnight, title: `${it.overnight} ${hotelName}` });
    }

    // keep the timeline chronological
    slots.sort((a, b) => a.time.localeCompare(b.time));
    return { day, slots, meals };
  });
}

export const countMeals = (days: ItineraryDay[]) =>
  days.reduce(
    (acc, d) => ({ b: acc.b + (d.meals.b ? 1 : 0), l: acc.l + (d.meals.l ? 1 : 0), d: acc.d + (d.meals.d ? 1 : 0) }),
    { b: 0, l: 0, d: 0 }
  );
