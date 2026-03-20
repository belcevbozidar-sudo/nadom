import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

const ADDRESSES = [
  "гр. Велико Търново, ул. Никола Габровски 2",
  "гр. Горна Оряховица, пл. Георги Измирлиев 1, офис 9",
  "гр. Габрово, ул. Свищовска 73",
  "гр. София, ПК 1612, ж.к. Хиподрума, ул. Ами Буе 68-72",
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    title: "Телефон",
    content: (
      <a
        href="tel:070020215"
        className="text-muted-foreground hover:text-primary transition-colors text-sm"
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
        className="text-muted-foreground hover:text-primary transition-colors text-sm"
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
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {addr}
          </li>
        ))}
      </ul>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="контакти" className="py-20 lg:py-28 bg-background">
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
            КОНТАКТИ
          </h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded-full" />
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTACT_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wider">
                  {item.title}
                </h3>
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
