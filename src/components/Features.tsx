import { motion } from "framer-motion";
import { ShieldCheck, Headset, CalendarCheck2, BadgeCheck, ArrowRight, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  const { t } = useLanguage();

  const items = [
    { icon: ShieldCheck, title: t.features.f1Title, desc: t.features.f1Desc, color: "bg-brand/10 text-brand" },
    { icon: Headset, title: t.features.f2Title, desc: t.features.f2Desc, color: "bg-sea/10 text-sea" },
    { icon: CalendarCheck2, title: t.features.f3Title, desc: t.features.f3Desc, color: "bg-leaf/10 text-leaf" },
    { icon: BadgeCheck, title: t.features.f4Title, desc: t.features.f4Desc, color: "bg-amber-500/10 text-amber-600" },
  ];

  return (
    <section id="why-us" className="relative scroll-mt-20 overflow-hidden py-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-14 max-w-lg text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {t.nav.whyUs}
          </span>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t.features.title}
          </h2>
          <p className="mt-3 text-sm text-ink-2">{t.features.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(19,27,46,0.10)]"
            >
              <span
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
              >
                <item.icon size={22} strokeWidth={2.1} />
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mt-16 overflow-hidden rounded-[2.5rem] bg-ink px-8 py-14 text-center sm:px-14"
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-sea/25 blur-3xl" />
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute right-10 top-8 text-white/10"
          >
            <Compass size={90} strokeWidth={1} />
          </motion.span>
          <h2 className="relative mx-auto max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
            {t.features.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-white/70">{t.features.ctaDesc}</p>
          <motion.a
            href="#trips"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand/30 transition-colors hover:bg-brand-2"
          >
            {t.features.ctaButton}
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
