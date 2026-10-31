import { useState } from "react";
import { motion } from "framer-motion";
import { User, Globe, DollarSign, Bell, LogOut, ChevronRight, Heart, Ticket, ShieldCheck, Crown } from "lucide-react";
import LanguageToggle from "../components/LanguageToggle";
import { useApp } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import { extra } from "../i18n/extra";

export default function ProfilePage() {
  const { t, lang } = useLanguage();
  const { go, saved } = useApp();
  const x = extra[lang];
  const [notif, setNotifState] = useState(true);
  const setNotif = () => setNotifState((v) => !v);

  const stats = [
    { v: 12, l: x.profile.trips },
    { v: 9, l: x.profile.countries },
    { v: 27, l: x.profile.reviews },
  ];
  const quick = [
    { icon: Ticket, label: x.nav.bookings, onClick: () => go("bookings") },
    { icon: Heart, label: `${x.nav.saved} (${saved.length})`, onClick: () => go("saved") },
  ];
  const rows = [
    { icon: Globe, title: t.profile.language, desc: t.profile.languageDesc, right: <LanguageToggle compact /> },
    { icon: DollarSign, title: t.profile.currency, desc: lang === "ja" ? "JPY — 日本円" : t.profile.currencyValue, right: <ChevronRight size={16} className="text-ink-2" /> },
    { icon: Bell, title: t.profile.notifications, desc: t.profile.notificationsDesc,
      right: <button onClick={setNotif} className={`flex h-6 w-11 items-center rounded-full p-0.5 ${notif ? "justify-end bg-leaf" : "bg-line"}`}><span className="h-5 w-5 rounded-full bg-white shadow" /></button> },
    { icon: ShieldCheck, title: t.footer.privacy, desc: "", right: <ChevronRight size={16} className="text-ink-2" /> },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-20 sm:px-6 lg:pt-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7a50] to-brand-2 ring-4 ring-white/10">
            <User size={28} />
          </span>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-semibold">{t.profile.guest}</h1>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
              <Crown size={11} /> {x.profile.member}
            </span>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/5">
          {stats.map((s) => (
            <div key={s.l} className="py-4 text-center">
              <p className="font-display text-2xl font-semibold">{s.v}</p>
              <p className="text-[11px] text-white/60">{s.l}</p>
            </div>
          ))}
        </div>
        <button className="relative mt-5 w-full rounded-full bg-white py-3 text-sm font-bold text-ink hover:bg-brand hover:text-white">
          {t.profile.signIn}
        </button>
      </motion.div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {quick.map((q, i) => (
          <motion.button key={q.label} onClick={q.onClick} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 rounded-3xl border border-line bg-white p-4 text-left shadow-sm hover:border-brand/40">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/10 text-brand"><q.icon size={18} /></span>
            <span className="text-sm font-bold text-ink">{q.label}</span>
          </motion.button>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-xs font-bold uppercase tracking-[0.2em] text-ink-2">{t.profile.settings}</h2>
      <motion.ul initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
        {rows.map((row, i) => (
          <li key={row.title} className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-line" : ""}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cream text-ink"><row.icon size={18} /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-ink">{row.title}</span>
              {row.desc && <span className="block text-xs text-ink-2">{row.desc}</span>}
            </span>
            {row.right}
          </li>
        ))}
      </motion.ul>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-red-500 hover:bg-red-50">
        <LogOut size={15} /> {t.profile.signOut}
      </button>
      <p className="mt-2 text-center text-[11px] text-ink-2">{t.profile.version}</p>
    </div>
  );
}
