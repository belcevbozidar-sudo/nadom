import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";

const ADDRESSES = [
  "гр. Велико Търново, ул. Никола Габровски 2",
  "гр. Горна Оряховица, пл. Георги Измирлиев 1, офис 9",
  "гр. Габрово, ул. Свищовска 73",
  "гр. София, ПК 1612, ж.к. Хиподрума, ул. Ами Буе 68-72",
];

type ContactItem = {
  icon: typeof Phone;
  title: string;
  content: ReactNode;
};

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Phone,
    title: "Телефон",
    content: (
      <a
        href="tel:070020215"
        className="text-white/80 hover:text-white transition-colors text-sm"
      >
        0700 20 215
      </a>
    ),
  },
  {
    icon: Mail,
    title: "Имейл",
    content: (
      <a
        href="mailto:office@nadom.bg"
        className="text-white/80 hover:text-white transition-colors text-sm"
      >
        office@nadom.bg
      </a>
    ),
  },
  {
    icon: MapPin,
    title: "Адреси",
    content: (
      <ul className="space-y-2">
        {ADDRESSES.map((addr) => (
          <li
            key={addr}
            className="text-sm text-white/70 leading-relaxed"
          >
            {addr}
          </li>
        ))}
      </ul>
    ),
  },
];

// Stagger variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 18,
    },
  },
};

export default function ContactSection() {
  return (
    <section id="контакти" className="py-20 lg:py-28">
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
            КОНТАКТИ
          </h2>
          <motion.div
            className="w-16 h-1 bg-white mt-4 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Contact cards - staggered reveal from left */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {CONTACT_ITEMS.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="flex items-start gap-4"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <item.icon className="size-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
