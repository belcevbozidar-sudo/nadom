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
import { Card } from "@/components/ui/card.tsx";

const SERVICE_CARDS = [
  {
    title: "Проф. домоуправител",
    description: "Професионално управление на вашата жилищна сграда",
    image:
      "https://images.unsplash.com/photo-1763276674437-a1305c7021d1?w=800&q=80",
  },
  {
    title: "Електронен касиер",
    description: "Удобно и прозрачно управление на финансите",
    image:
      "https://images.unsplash.com/photo-1758448721162-0c77cf477d6f?w=800&q=80",
  },
  {
    title: "Административни услуги",
    description: "Пълно административно обслужване от врата до врата",
    image:
      "https://images.unsplash.com/flagged/photo-1551135049-83f3419ef05c?w=800&q=80",
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

export default function ServicesSection() {
  return (
    <section id="услуги" className="py-20 lg:py-28 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            ВСИЧКО ЗА ВАШАТА СГРАДА
          </h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded-full" />
        </motion.div>

        {/* Image overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {SERVICE_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="relative group rounded-2xl overflow-hidden h-72 cursor-pointer shadow-lg">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Icon grids */}
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Building services */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold text-foreground mb-6 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="size-5 text-primary" />
              </div>
              ЖИЛИЩНИ И ОФИС СГРАДИ
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BUILDING_SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer group bg-card">
                    <svc.icon className="size-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold text-foreground">
                      {svc.label}
                    </span>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* General services */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold text-foreground mb-6 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Settings className="size-5 text-primary" />
              </div>
              УСЛУГИ
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {GENERAL_SERVICES.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <Card className="flex flex-col items-center text-center p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer group bg-card">
                    <svc.icon className="size-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold text-foreground">
                      {svc.label}
                    </span>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
