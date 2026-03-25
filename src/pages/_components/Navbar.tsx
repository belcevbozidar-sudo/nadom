import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { SignInButton } from "@/components/ui/signin.tsx";
import { toast } from "sonner";

type NavLink = {
  label: string;
  hash?: string;
  href?: string;
  comingSoon?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: "Начало", hash: "#начало" },
  { label: "Домоуправител", comingSoon: true },
  { label: "Ел. Касиер", comingSoon: true },
  { label: "Имоти", hash: "#имоти" },
  { label: "Контакти", hash: "#контакти" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleNavClick = useCallback(
    (link: NavLink) => {
      setMobileOpen(false);

      if (link.comingSoon) {
        toast.info("Тази страница ще бъде налична скоро!");
        return;
      }

      if (link.href) {
        navigate(link.href);
        return;
      }

      if (link.hash) {
        if (isHomePage) {
          const el = document.querySelector(link.hash);
          el?.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/");
          setTimeout(() => {
            const el = document.querySelector(link.hash!);
            el?.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    },
    [isHomePage, navigate],
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 bg-[oklch(0.30_0.12_250/0.55)] backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - always navigates to home */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                NADOM<span className="text-white/70">.BG</span>
              </span>
              <span className="hidden md:block text-[10px] text-white/50 uppercase tracking-[0.2em] leading-tight border-l border-white/20 pl-3">
                Агенция
                <br />
                Домоуправител
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link)}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full cursor-pointer px-3 py-2"
              >
                {link.label}
              </motion.button>
            ))}

            {/* Separator */}
            <div className="w-px h-5 bg-white/20 mx-2" />

            <motion.a
              href="tel:070020215"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors px-3"
            >
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <Phone className="size-3 text-white" />
              </div>
              0700 20 215
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.7,
                type: "spring",
                stiffness: 200,
              }}
              className="ml-2"
            >
              <SignInButton
                signInText="Вход"
                signOutText="Изход"
                size="sm"
                className="bg-white/15 text-white border-white/20 hover:bg-white/25"
              />
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={mobileOpen ? "Затвори менюто" : "Отвори менюто"}
            whileTap={{ scale: 0.85, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pb-6 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="block w-full text-left text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors py-3 px-3 rounded-lg"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.a
                  href="tel:070020215"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center gap-2 text-sm font-semibold text-white py-3 px-3"
                >
                  <Phone className="size-4 text-white/70" />
                  0700 20 215
                </motion.a>
                <motion.div
                  className="px-3 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.36 }}
                >
                  <SignInButton
                    signInText="Вход"
                    signOutText="Изход"
                    size="sm"
                    className="w-full bg-white/15 text-white border-white/20 hover:bg-white/25"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
