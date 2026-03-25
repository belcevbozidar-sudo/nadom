import { motion } from "motion/react";
import {
  UserCheck,
  Calculator,
  ShieldCheck,
  Wrench,
  Truck,
  KeyRound,
  Info,
  FileCheck,
  Building2,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";

const SERVICE_CARDS = [
  {
    title: "Проф. домоуправител",
    description: "Професионално управление на вашата жилищна сграда",
    image:
      "https://images.unsplash.com/photo-1763276674437-a1305c7021d1?w=800&q=80",
    href: "/domoupravitel",
  },
  {
    title: "Електронен касиер",
    description: "Удобно и прозрачно управление на финансите",
    image:
      "https://images.unsplash.com/photo-1758448721162-0c77cf477d6f?w=800&q=80",
    href: "/el-kasier",
  },
  {
    title: "Административни услуги",
    description: "Пълно административно обслужване от врата до врата",
    image:
      "https://images.unsplash.com/flagged/photo-1551135049-83f3419ef05c?w=800&q=80",
    href: "/administrativni-uslugi",
  },
];

const BUILDING_SERVICES = [
  { icon: UserCheck, label: "Проф. домоуправител" },
  { icon: Calculator, label: "Електронен касиер" },
  { icon: ShieldCheck, label: "Контрол на достъпа" },
];

const GENERAL_SERVICES = [
  { icon: Wrench, label: "Ремонт и поддръжка" },
  { icon: Truck, label: "Транспорт" },
  { icon: KeyRound, label: "Аксесоари за входа" },
  { icon: Info, label: "Полезна информация" },
  { icon: FileCheck, label: "Сделки и застраховки" },
];

// Stagger container
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
    },
  },
};

const iconCardVariant = {
  hidden: { opacity: 0, y: 30, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 18,
    },
  },
};

export default function ServicesSection() {
  return (
    <section id="услуги" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            ВСИЧКО ЗА ВАШАТА СГРАДА
          </h2>
          <motion.div
            className="w-16 h-1 bg-white mt-4 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Image overview cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {SERVICE_CARDS.map((card) => (
            <motion.div key={card.title} variants={fadeSlideUp}>
              <Link to={card.href}>
                <motion.div
                  className="relative group rounded-2xl overflow-hidden h-72 cursor-pointer shadow-xl border border-white/10"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-white font-bold text-lg mb-1">
                      {card.title}
                    </h3>
                    <p className="text-white/60 text-sm">{card.description}</p>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Icon grids */}
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Building services */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"
                initial={{ rotate: -180, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                <Building2 className="size-5 text-white" />
              </motion.div>
              ЖИЛИЩНИ И ОФИС СГРАДИ
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {BUILDING_SERVICES.map((svc) => (
                <motion.div key={svc.label} variants={iconCardVariant}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="flex flex-col items-center text-center p-6 hover:shadow-2xl shadow-lg border-white/20 transition-all duration-300 cursor-pointer group bg-white/95 backdrop-blur-sm">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      >
                        <svc.icon className="size-8 text-[oklch(0.35_0.12_250)] mb-3" />
                      </motion.div>
                      <span className="text-sm font-semibold text-[oklch(0.14_0.04_255)]">
                        {svc.label}
                      </span>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* General services */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center"
                initial={{ rotate: 180, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                <Settings className="size-5 text-white" />
              </motion.div>
              УСЛУГИ
            </motion.h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {GENERAL_SERVICES.map((svc) => (
                <motion.div key={svc.label} variants={iconCardVariant}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="flex flex-col items-center text-center p-6 hover:shadow-2xl shadow-lg border-white/20 transition-all duration-300 cursor-pointer group bg-white/95 backdrop-blur-sm">
                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 12 }}
                      >
                        <svc.icon className="size-8 text-[oklch(0.35_0.12_250)] mb-3" />
                      </motion.div>
                      <span className="text-sm font-semibold text-[oklch(0.14_0.04_255)]">
                        {svc.label}
                      </span>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
