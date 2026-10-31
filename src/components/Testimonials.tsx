import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;
const AVATAR_COLORS = ["bg-brand", "bg-sea", "bg-leaf"];

export default function Testimonials() {
  const { t } = useLanguage();

  const items = [
    { name: t.testimonials.t1Name, role: t.testimonials.t1Role, text: t.testimonials.t1Text },
    { name: t.testimonials.t2Name, role: t.testimonials.t2Role, text: t.testimonials.t2Text },
    { name: t.testimonials.t3Name, role: t.testimonials.t3Role, text: t.testimonials.t3Text },
  ];

  return (
    <section className="border-t border-line bg-cream/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto mb-12 max-w-lg text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
            {t.testimonials.title}
          </span>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {t.testimonials.subtitle}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="relative flex flex-col rounded-3xl border border-line bg-white p-7 shadow-sm"
            >
              <Quote size={34} className="absolute right-6 top-6 text-brand/15" />
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-ink-2">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${AVATAR_COLORS[i % 3]}`}
                >
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{item.name}</span>
                  <span className="block text-xs text-ink-2">{item.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
