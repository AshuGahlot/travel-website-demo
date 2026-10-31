import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider } from "./context/LanguageContext";
import { AppProvider, useApp, type Page } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import { ScrollProgressBar } from "./components/ScrollReveal";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import DealsPage from "./pages/DealsPage";
import BookingsPage from "./pages/BookingsPage";
import PlanPage from "./pages/PlanPage";
import SavedPage from "./pages/SavedPage";
import ProfilePage from "./pages/ProfilePage";

const PAGES: Record<Page, () => React.JSX.Element> = {
  home: HomePage,
  explore: ExplorePage,
  deals: DealsPage,
  bookings: BookingsPage,
  plan: PlanPage,
  saved: SavedPage,
  profile: ProfilePage,
};

function Site() {
  const { page } = useApp();
  const Current = PAGES[page];

  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Current />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <Site />
      </AppProvider>
    </LanguageProvider>
  );
}
