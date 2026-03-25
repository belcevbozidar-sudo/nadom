import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ADDRESSES = [
  "гр. Велико Търново, ул. Никола Габровски 2",
  "гр. Горна Оряховица, пл. Георги Измирлиев 1, офис 9",
  "гр. Габрово, ул. Свищовска 73",
  "гр. София, ПК 1612, ж.к. Хиподрума, ул. Ами Буе 68-72",
];

// Google Maps embed URL centered on the main office in Велико Търново
const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.5!2d25.6178!3d43.0757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a926149bffffff%3A0x1234567890!2z0YPQuy4g0J3QuNC60L7Qu9CwINCT0LDQsdGA0L7QstGB0LrQuCAyLCDQktC10LvQuNC60L4g0KLRitGA0L3QvtCy0L4!5e0!3m2!1sbg!2sbg!4v1700000000000!5m2!1sbg!2sbg";

const itemVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

        {/* Two-column layout: Map left, Contacts right */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Google Maps - left side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl h-full min-h-[400px] lg:min-h-[480px]">
              <iframe
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NADOM.BG офис - Велико Търново"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Contact info - right side */}
          <motion.div
            className="flex flex-col gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Phone */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <Phone className="size-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">
                  Телефон
                </h3>
                <a
                  href="tel:070020215"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  0700 20 215
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <Mail className="size-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">
                  Имейл
                </h3>
                <a
                  href="mailto:office@nadom.bg"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  office@nadom.bg
                </a>
              </div>
            </motion.div>

            {/* Working hours */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <Clock className="size-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">
                  Работно време
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Понеделник - Петък: 09:00 - 18:00
                </p>
              </div>
            </motion.div>

            {/* Addresses */}
            <motion.div variants={itemVariants} className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
              >
                <MapPin className="size-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">
                  Адреси
                </h3>
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
