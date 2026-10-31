import { motion } from "framer-motion";
import { Home, Compass, Sparkles, Tag, Ticket } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useApp, type Page } from "../context/AppContext";
import { extra } from "../i18n/extra";

export default function BottomNav() {
  const { lang } = useLanguage();
  const { page, go } = useApp();
  const n = extra[lang].nav;

  const side: { key: Page; label: string; icon: typeof Home; badge?: string }[][] = [
    [
      { key: "home", label: n.home, icon: Home },
      { key: "explore", label: n.explore, icon: Compass },
    ],
    [
      { key: "deals", label: n.deals, icon: Tag, badge: "%" },
      { key: "bookings", label: n.bookings, icon: Ticket },
    ],
  ];

  const Item = ({ item }: { item: (typeof side)[0][0] }) => {
    const active = page === item.key;
    const Icon = item.icon;
    return (
      <button
        onClick={() => go(item.key)}
        className="relative flex flex-1 flex-col items-center gap-1 py-2"
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
      >
        {active && (
          <motion.span
            layoutId="bn-indicator"
            className="absolute -top-2 h-1 w-8 rounded-full bg-brand"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <motion.span
          animate={{ y: active ? -2 : 0, scale: active ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className={`relative flex h-9 w-12 items-center justify-center rounded-2xl transition-colors ${
            active ? "bg-brand/10 text-brand" : "text-ink-2"
          }`}
        >
          <Icon size={21} strokeWidth={active ? 2.5 : 2} />
          {item.badge && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-white ring-2 ring-white">
              {item.badge}
            </span>
          )}
        </motion.span>
        <span className={`text-[10px] font-semibold ${active ? "text-ink" : "text-ink-2/80"}`}>{item.label}</span>
      </button>
    );
  };

  const planActive = page === "plan";

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 26 }}
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      aria-label="Bottom navigation"
    >
      <div className="relative mx-auto flex max-w-xl items-end rounded-[28px] border border-white bg-white/90 px-2 pt-2 shadow-[0_-4px_40px_rgba(19,27,46,0.16)] backdrop-blur-xl">
        {side[0].map((it) => <Item key={it.key} item={it} />)}

        {/* Center action */}
        <div className="flex flex-1 flex-col items-center pb-2">
          <motion.button
            onClick={() => go("plan")}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            aria-label={n.plan}
            className={`-mt-9 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl ring-[6px] ring-sand transition-colors ${
              planActive ? "bg-ink shadow-ink/40" : "bg-gradient-to-br from-[#ff7a50] to-brand-2 shadow-brand/50"
            }`}
          >
            <motion.span animate={{ rotate: planActive ? 180 : 0 }} transition={{ type: "spring", stiffness: 200 }}>
              <Sparkles size={24} strokeWidth={2.3} />
            </motion.span>
          </motion.button>
          <span className={`mt-1 text-[10px] font-bold ${planActive ? "text-ink" : "text-brand"}`}>{n.plan}</span>
        </div>

        {side[1].map((it) => <Item key={it.key} item={it} />)}
      </div>
    </motion.nav>
  );
}
