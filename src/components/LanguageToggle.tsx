import { useId } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import type { Lang } from "../i18n/translations";

const OPTIONS: { value: Lang; label: string; short: string }[] = [
  { value: "en", label: "EN", short: "EN" },
  { value: "ja", label: "日本語", short: "JP" },
];

interface Props {
  compact?: boolean;
  onDark?: boolean;
}

export default function LanguageToggle({ compact = false, onDark = false }: Props) {
  const { lang, setLang } = useLanguage();
  const pillId = useId();

  return (
    <div
      className={`relative inline-flex w-max shrink-0 items-center gap-1 whitespace-nowrap rounded-full border p-1 shadow-sm backdrop-blur-md transition-colors duration-300 ${
        onDark ? "border-white/25 bg-white/10" : "border-line bg-white/80"
      } ${compact ? "scale-[0.92]" : ""}`}
      role="group"
      aria-label="Language selector"
    >
      {/* Reserve icon space instead of overlapping the language labels. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none hidden shrink-0 items-center pl-1 pr-1 sm:flex ${
          onDark ? "text-white/80" : "text-ink-2"
        }`}
      >
        <Languages size={15} strokeWidth={2.2} />
      </span>
      {OPTIONS.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            className={`relative inline-flex h-8 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 text-xs font-semibold leading-none tracking-wide transition-colors duration-200 ${
              !compact ? "sm:px-4" : ""
            } ${
              opt.value === "ja" && !compact
                ? "min-w-12 sm:min-w-[68px]"
                : "min-w-11"
            } ${
              active
                ? "text-white"
                : onDark
                  ? "text-white/70 hover:text-white"
                  : "text-ink-2 hover:text-ink"
            }`}
            aria-pressed={active}
            aria-label={opt.value === "en" ? "Switch to English" : "日本語に切り替え"}
          >
            {active && (
              <motion.span
                layoutId={`language-pill-${pillId}`}
                className="absolute inset-0 rounded-full bg-brand shadow-md"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 block whitespace-nowrap leading-none">
              {compact ? (
                opt.short
              ) : (
                <>
                  <span className="sm:hidden">{opt.short}</span>
                  <span className="hidden sm:inline">{opt.label}</span>
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
