import { motion, useScroll, useSpring } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 44,
  once = true,
}: RevealProps) {
  const initial =
    direction === "up"
      ? { opacity: 0, y: distance, scale: 0.98 }
      : direction === "down"
        ? { opacity: 0, y: -distance, scale: 0.98 }
        : direction === "left"
          ? { opacity: 0, x: distance, scale: 0.98 }
          : direction === "right"
            ? { opacity: 0, x: -distance, scale: 0.98 }
            : { opacity: 0, scale: 0.92, y: 20 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.14, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Smooth top scroll progress bar */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#ff7a50] via-brand to-amber-400"
    />
  );
}
