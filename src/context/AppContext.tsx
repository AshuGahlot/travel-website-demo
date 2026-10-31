import { createContext, useContext, useState, type ReactNode } from "react";
import type { VehicleId } from "../data/hotels";

export type Page = "home" | "explore" | "plan" | "deals" | "bookings" | "saved" | "profile";

export interface HotelBooking {
  ref: string;
  hotelId: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  guests: number;
  pickup: boolean;
  drop: boolean;
  vehicle: VehicleId;
  pickupTime: string;
  flight: string;
  total: number;
}

interface AppCtx {
  page: Page;
  go: (p: Page) => void;
  saved: number[];
  toggleSave: (id: number) => void;
  query: string;
  setQuery: (q: string) => void;
  exploreTab: "trips" | "stays";
  setExploreTab: (t: "trips" | "stays") => void;
  hotelBookings: HotelBooking[];
  addHotelBooking: (b: HotelBooking) => void;
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("home");
  const [saved, setSaved] = useState<number[]>([1, 5]);
  const [query, setQuery] = useState("");
  const [exploreTab, setExploreTab] = useState<"trips" | "stays">("trips");
  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>([]);

  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };
  const toggleSave = (id: number) =>
    setSaved((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  const addHotelBooking = (b: HotelBooking) => setHotelBookings((prev) => [b, ...prev]);

  return (
    <Ctx.Provider
      value={{ page, go, saved, toggleSave, query, setQuery, exploreTab, setExploreTab, hotelBookings, addHotelBooking }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
