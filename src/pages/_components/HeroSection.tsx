import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "sonner";

const FEATURES = [
  "Професионален домоуправител",
  "Електронен касиер",
  "Почистване на жилищни сгради",
  "Общи събрания",
  "Технически паспорт и енергийна ефективност",
];

export default function HeroSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Благодарим! Ще се свържем с вас скоро.");
  };

  return (
    <section
      id="начало"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1757780993465-7f1923296763?w=1920&q=80"
          alt="Модерна жилищна сграда"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.05_255/0.95)] via-[oklch(0.12_0.05_255/0.80)] to-[oklch(0.12_0.05_255/0.55)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-8 lg:p-10 shadow-2xl">
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                Вземете оферта
              </h2>
              <p className="text-white/60 mb-8 text-sm leading-relaxed">
                Офертата ще Ви бъде отправена след попълване на съответните данни.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Име и фамилия"
                    aria-label="Име и фамилия"
                    className="bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-white/30"
                  />
                  <Input
                    placeholder="Е-поща"
                    type="email"
                    aria-label="Е-поща"
                    className="bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-white/30"
                  />
                  <Input
                    placeholder="Телефонен номер"
                    type="tel"
                    aria-label="Телефонен номер"
                    className="bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-white/30"
                  />
                  <Input
                    placeholder="Област"
                    aria-label="Област"
                    className="bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-white/30"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base font-bold h-13 rounded-xl mt-2"
                >
                  ВЗЕМЕТЕ ОФЕРТА
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Brand + features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="space-y-10"
          >
            <div>
              <p className="text-white/50 text-xs uppercase tracking-[0.25em] mb-3 font-semibold">
                Национална Агенция
              </p>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-none">
                ДОМО
                <br />
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  УПРАВИТЕЛ
                </span>
              </h1>
            </div>

            <div className="space-y-4">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3.5"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  </div>
                  <span className="text-white/85 text-base lg:text-lg font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
