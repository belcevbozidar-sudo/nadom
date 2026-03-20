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

// Smooth entrance ease
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

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
      {/* Background image with zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: EASE_OUT_EXPO }}
      >
        <img
          src="https://images.unsplash.com/photo-1757780993465-7f1923296763?w=1920&q=80"
          alt="Модерна жилищна сграда"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.05_255/0.95)] via-[oklch(0.12_0.05_255/0.80)] to-[oklch(0.12_0.05_255/0.55)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Form card - slides in from left with spring */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: 8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: EASE_OUT_EXPO,
            }}
          >
            <motion.div
              className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-8 lg:p-10 shadow-2xl"
              whileHover={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-3xl font-extrabold text-white mb-2 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Вземете оферта
              </motion.h2>
              <motion.p
                className="text-white/60 mb-8 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Офертата ще Ви бъде отправена след попълване на съответните данни.
              </motion.p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { placeholder: "Име и фамилия", type: "text", delay: 0.65 },
                    { placeholder: "Е-поща", type: "email", delay: 0.72 },
                    { placeholder: "Телефонен номер", type: "tel", delay: 0.79 },
                    { placeholder: "Област", type: "text", delay: 0.86 },
                  ].map((input) => (
                    <motion.div
                      key={input.placeholder}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: input.delay }}
                    >
                      <Input
                        placeholder={input.placeholder}
                        type={input.type}
                        aria-label={input.placeholder}
                        className="bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 h-12 rounded-xl focus-visible:ring-white/30"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.95 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base font-bold h-13 rounded-xl mt-2"
                  >
                    ВЗЕМЕТЕ ОФЕРТА
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Brand + features - slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="space-y-10"
          >
            <div>
              <motion.p
                className="text-white/50 text-xs uppercase tracking-[0.25em] mb-3 font-semibold"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.25em" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Национална Агенция
              </motion.p>
              <motion.h1
                className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-none"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
              >
                ДОМО
                <br />
                <motion.span
                  className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent inline-block"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
                >
                  УПРАВИТЕЛ
                </motion.span>
              </motion.h1>
            </div>

            <div className="space-y-4">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7 + i * 0.12,
                    ease: EASE_OUT_EXPO,
                  }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3.5"
                >
                  <motion.div
                    className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: 0.8 + i * 0.12,
                    }}
                  >
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  </motion.div>
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.42_0.16_250)] to-transparent" />
    </section>
  );
}
