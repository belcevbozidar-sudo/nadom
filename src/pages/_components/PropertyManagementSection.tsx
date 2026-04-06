import { motion } from "motion/react";
import {
  Home,
  Wrench,
  Scale,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROPERTY_SERVICES = [
  { icon: Home, label: "Управление на наеми" },
  { icon: Wrench, label: "Поддръжка на имоти" },
  { icon: Scale, label: "Правни консултации за имоти" },
  { icon: BarChart3, label: "Оценка на недвижими имоти" },
  { icon: ShieldCheck, label: "Застрахователно посредничество" },
];

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 18,
    },
  },
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function PropertyManagementSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            ПРОФЕСИОНАЛНО УПРАВЛЕНИЕ НА ИМОТИ
          </h2>
          <motion.div
            className="w-16 h-1 bg-white mt-4 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.p
            className="mt-4 text-white/55 max-w-2xl text-base lg:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Цялостно управление на вашите имоти с професионализъм и
            индивидуален подход
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PROPERTY_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.label}
                variants={itemVariant}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group relative rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-xl p-5 lg:p-6 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.10] hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)] text-center"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.12] flex items-center justify-center mb-4 group-hover:bg-white/[0.18] transition-colors duration-300">
                    <Icon className="size-5 text-white/85" />
                  </div>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight">
                    {service.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
