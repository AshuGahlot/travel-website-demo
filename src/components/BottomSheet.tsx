import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function BottomSheet({ open, onClose, title, children, footer }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
            className="fixed inset-x-0 bottom-0 z-[90] mx-auto flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-[2rem] bg-sand shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-center pt-3">
              <span className="h-1.5 w-12 rounded-full bg-line" />
            </div>
            <div className="flex items-center justify-between px-6 pb-3 pt-2">
              <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink-2 hover:text-ink"
              >
                <X size={17} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 pb-4">{children}</div>
            {footer && <div className="border-t border-line px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
