import { motion } from "motion/react";
import { MapPin, Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { toast } from "sonner";

const PROPERTIES = [
  {
    type: "3-СТАЕН",
    location: "Велико Търново, област Велико Търново",
    area: 96,
    price: "145,000",
    image:
      "https://images.unsplash.com/photo-1618955599800-3d63a871e0be?w=600&q=80",
  },
  {
    type: "3-СТАЕН",
    location: "Велико Търново, област Велико Търново",
    area: 84,
    price: "135,000",
    image:
      "https://images.unsplash.com/photo-1614962599546-d829f8e54d6f?w=600&q=80",
  },
  {
    type: "КЪЩА",
    location: "Шереметя, област Велико Търново",
    area: 86,
    price: "128,000",
    image:
      "https://images.unsplash.com/photo-1763640793952-827c3a3f5918?w=600&q=80",
  },
  {
    type: "КЪЩА",
    location: "Средни Колиби, област Велико Търново",
    area: 468,
    price: "620,000",
    image:
      "https://images.unsplash.com/photo-1694184888776-7528df6e0f3a?w=600&q=80",
  },
];

// Stagger container variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
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

export default function PropertiesSection() {
  return (
    <section id="имоти" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with line reveal */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            ИМОТИ
          </h2>
          <motion.div
            className="w-16 h-1 bg-white mt-4 rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Property cards - staggered grid reveal */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PROPERTIES.map((property, i) => (
            <motion.div key={i} variants={cardVariants}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="pt-0 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-white/20 bg-white/95 backdrop-blur-sm shadow-lg">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={property.image}
                      alt={property.type}
                      className="w-full h-52 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <Badge className="absolute top-3 right-3 bg-white text-[oklch(0.35_0.12_250)] font-bold text-[10px] tracking-wider px-3 py-1 shadow-lg">
                        ПРОДАВА
                      </Badge>
                    </motion.div>
                  </div>
                  <CardContent className="pt-4 space-y-2.5">
                    <h3 className="font-bold text-[oklch(0.14_0.04_255)] text-sm">
                      {property.type}
                    </h3>
                    <div className="flex items-start gap-1.5 text-[oklch(0.45_0.03_250)] text-xs">
                      <MapPin className="size-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">
                        {property.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.90_0.01_250)]">
                      <div className="flex items-center gap-1.5 text-xs text-[oklch(0.45_0.03_250)]">
                        <Maximize2 className="size-3" />
                        <span>{property.area} кв.м.</span>
                      </div>
                      <span className="font-extrabold text-[oklch(0.14_0.04_255)] text-sm">
                        {property.price} EUR
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <motion.button
            onClick={() =>
              toast.info("Тази функция ще бъде налична скоро!")
            }
            className="text-white font-semibold text-sm hover:text-white/80 underline underline-offset-4 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Виж всички обяви &rarr;
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
