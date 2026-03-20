import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { SignInButton } from "@/components/ui/signin.tsx";

const NAV_LINKS = [
  { label: "Начало", href: "#начало" },
  { label: "Услуги", href: "#услуги" },
  { label: "Имоти", href: "#имоти" },
  { label: "Контакти", href: "#контакти" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[oklch(0.30_0.12_250/0.55)] backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#начало" className="flex items-center gap-3">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              NADOM<span className="text-white/70">.BG</span>
            </span>
            <span className="hidden md:block text-[10px] text-white/50 uppercase tracking-[0.2em] leading-tight border-l border-white/20 pl-3">
              Агенция
              <br />
              Домоуправител
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:070020215"
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                <Phone className="size-3.5 text-white" />
              </div>
              0700 20 215
            </a>
            <SignInButton
              signInText="Вход"
              signOutText="Изход"
              size="sm"
              className="bg-white/15 text-white border-white/20 hover:bg-white/25"
            />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label={mobileOpen ? "Затвори менюто" : "Отвори менюто"}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden pb-6 space-y-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors py-3 px-3 rounded-lg"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:070020215"
              className="flex items-center gap-2 text-sm font-semibold text-white py-3 px-3"
            >
              <Phone className="size-4 text-white/70" />
              0700 20 215
            </a>
            <div className="px-3 pt-2">
              <SignInButton
                signInText="Вход"
                signOutText="Изход"
                size="sm"
                className="w-full bg-white/15 text-white border-white/20 hover:bg-white/25"
              />
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
