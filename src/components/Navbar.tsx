import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Compass, Heart, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import { extra } from "../i18n/extra";
import { stay } from "../i18n/stay";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
  const { lang } = useLanguage();
  const { page, go, saved, exploreTab, setExploreTab } = useApp();
  const n = extra[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || page !== "home";
  const desktopItems: { id: string; label: string; active: boolean; onClick: () => void }[] = [
    { id: "home", label: n.home, active: page === "home", onClick: () => go("home") },
    {
      id: "explore",
      label: n.explore,
      active: page === "explore" && exploreTab === "trips",
      onClick: () => { setExploreTab("trips"); go("explore"); },
    },
    {
      id: "stays",
      label: stay[lang].tabs.stays,
      active: page === "explore" && exploreTab === "stays",
      onClick: () => { setExploreTab("stays"); go("explore"); },
    },
    { id: "deals", label: n.deals, active: page === "deals", onClick: () => go("deals") },
    { id: "bookings", label: n.bookings, active: page === "bookings", onClick: () => go("bookings") },
    { id: "plan", label: n.plan, active: page === "plan", onClick: () => go("plan") },
  ];

  const iconBtn = (active: boolean) =>
    `relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 ${
      active
        ? "border-brand bg-brand text-white"
        : solid
          ? "border-line bg-white text-ink hover:border-brand/50 hover:text-brand"
          : "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
    }`;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-line bg-sand/85 shadow-[0_4px_24px_rgba(19,27,46,0.06)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/40">
            <Compass size={19} strokeWidth={2.4} />
          </span>
          <span className={`hidden font-display text-xl font-semibold tracking-tight min-[400px]:inline ${solid ? "text-ink" : "text-white"}`}>
            TabiGo
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {desktopItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={item.onClick}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? solid ? "text-ink" : "text-white"
                    : solid ? "text-ink-2 hover:text-ink" : "text-white/75 hover:text-white"
                }`}
              >
                {item.active && (
                  <motion.span
                    layoutId="top-nav-pill"
                    className={`absolute inset-0 rounded-full ${solid ? "bg-cream" : "bg-white/15"}`}
                    transition={{ type: "spring", stiffness: 450, damping: 36 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle onDark={!solid} />
          <button onClick={() => go("saved")} aria-label={n.saved} className={iconBtn(page === "saved")}>
            <Heart size={17} className={page === "saved" ? "fill-current" : ""} />
            {saved.length > 0 && (
              <motion.span
                key={saved.length}
                initial={{ scale: 0.3 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white ring-2 ring-sand"
              >
                {saved.length}
              </motion.span>
            )}
          </button>
          <button onClick={() => go("profile")} aria-label={n.profile} className={iconBtn(page === "profile")}>
            <User size={17} />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-leaf ring-2 ring-sand" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
