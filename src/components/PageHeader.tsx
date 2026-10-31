import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle: string;
  image?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, subtitle, image, children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-6 pt-20 sm:px-6 lg:px-8 lg:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-8 sm:px-10 sm:py-12"
      >
        {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative">
          {eyebrow && <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#ffb59d]">{eyebrow}</span>}
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-2 max-w-lg text-sm text-white/70 sm:text-base">{subtitle}</p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </motion.div>
    </div>
  );
}
