import { motion } from "motion/react";
import {
  Scale,
  Users,
  FileText,
  Wrench,
  BarChart3,
  FileSignature,
  MapPinned,
  Landmark,
  GitFork,
  BadgeDollarSign,
  ArrowRight,
  Building2,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const EASE = [0.16, 1, 0.3, 1] as const;

const DOMOUPRAVITEL_SERVICES = [
  { icon: Scale, label: "Legal Representation" },
  { icon: Users, label: "General Meetings" },
  { icon: FileText, label: "Documentation & Minutes" },
  { icon: Wrench, label: "Facility Maintenance" },
  { icon: BarChart3, label: "Financial Management" },
];

const ADMIN_SERVICES = [
  { icon: FileSignature, label: "Document Preparation" },
  { icon: MapPinned, label: "Surveys & Certificates" },
  { icon: Landmark, label: "Institutional Representation" },
  { icon: GitFork, label: "Divisions & Sales" },
  { icon: BadgeDollarSign, label: "Wills & Donations" },
];

const inputClass =
  "bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 h-11 rounded-xl focus-visible:ring-white/30 text-sm";

type ServicePanelProps = {
  title: string;
  icon: React.ElementType;
  services: { icon: React.ElementType; label: string }[];
  href: string;
  direction: "left" | "right";
  delay: number;
};

function ServicePanel({
  title,
  icon: HeaderIcon,
  services,
  href,
  direction,
  delay,
}: ServicePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <Link to={href} className="block group">
        <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/25 h-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <HeaderIcon className="size-4.5 text-white" />
            </div>
            <h3 className="text-xs lg:text-sm font-bold text-white uppercase tracking-wide leading-tight">
              {title}
            </h3>
          </div>

          <ul className="space-y-2">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: delay + 0.15 + i * 0.08,
                    ease: EASE,
                  }}
                  className="flex items-center gap-3 rounded-lg bg-white/[0.05] px-3 py-2 transition-colors group-hover:bg-white/[0.08]"
                >
                  <Icon className="size-3.5 text-white/50 shrink-0" />
                  <span className="text-xs lg:text-sm font-medium text-white/75 group-hover:text-white/90 transition-colors">
                    {s.label}
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-4 flex items-center gap-2 text-white/45 group-hover:text-white/80 text-xs font-semibold transition-colors">
            Learn more
            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HeroSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thank you! We will contact you soon.");
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Background image with zoom animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: EASE }}
      >
        <img
          src="https://images.unsplash.com/photo-1757780993465-7f1923296763?w=1920&q=80"
          alt="Modern residential building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.04_255/0.96)] via-[oklch(0.10_0.04_255/0.88)] to-[oklch(0.10_0.04_255/0.70)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        {/* 3-column layout */}
        <div className="grid lg:grid-cols-[1fr_1.15fr_1fr] gap-5 lg:gap-6 items-start">
          {/* Left - Професионален Домоуправител */}
          <div className="hidden lg:block">
            <ServicePanel
              title="Professional Property Manager"
              icon={Building2}
              services={DOMOUPRAVITEL_SERVICES}
              href="/domoupravitel"
              direction="left"
              delay={0.3}
            />
          </div>

          {/* Center - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <motion.div
              className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-6 lg:p-7 shadow-2xl"
              whileHover={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-2xl lg:text-3xl font-extrabold text-white mb-1 tracking-tight text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Get a Quote
              </motion.h2>
              <motion.p
                className="text-white/50 mb-5 text-xs text-center leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Fill in the details and we will send you a quote
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                >
                  <Input
                    placeholder="Full Name"
                    type="text"
                    aria-label="Full Name"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Input
                    placeholder="Service"
                    type="text"
                    aria-label="Service"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.65 }}
                >
                  <Input
                    placeholder="Address"
                    type="text"
                    aria-label="Address"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <Input
                    placeholder="Region"
                    type="text"
                    aria-label="Region"
                    className={inputClass}
                  />
                  <Input
                    placeholder="Building Type"
                    type="text"
                    aria-label="Building Type"
                    className={inputClass}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.75 }}
                >
                  <Textarea
                    placeholder="Message"
                    aria-label="Message"
                    rows={3}
                    className="bg-white/[0.08] border-white/15 text-white placeholder:text-white/40 rounded-xl focus-visible:ring-white/30 text-sm min-h-[72px]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-sm font-bold h-12 rounded-xl mt-1"
                  >
                    GET A QUOTE
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Right - Административни Услуги */}
          <div className="hidden lg:block">
            <ServicePanel
              title="Administrative Services"
              icon={Briefcase}
              services={ADMIN_SERVICES}
              href="/administrativni-uslugi"
              direction="right"
              delay={0.3}
            />
          </div>

          {/* Mobile: Show both panels below form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:hidden">
            <ServicePanel
              title="Professional Property Manager"
              icon={Building2}
              services={DOMOUPRAVITEL_SERVICES}
              href="/domoupravitel"
              direction="left"
              delay={0.5}
            />
            <ServicePanel
              title="Administrative Services"
              icon={Briefcase}
              services={ADMIN_SERVICES}
              href="/administrativni-uslugi"
              direction="right"
              delay={0.6}
            />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(0.42_0.16_250)] to-transparent" />
    </section>
  );
}
