import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Maximize2,
  BedDouble,
  Calendar,
  Layers,
  Phone as PhoneIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useAdminStore } from "../_lib/admin-store.ts";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { EditableProperty } from "../_lib/properties-data.ts";

const HAS_CONVEX_BACKEND = Boolean(import.meta.env.VITE_CONVEX_URL);

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

function PropertiesSectionContent({
  properties,
}: {
  properties: EditableProperty[];
}) {
  const visibleProperties = properties
    .filter((property) => property.isVisible)
    .sort((a, b) => a.order - b.order);

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
          {visibleProperties.map((property, i) => (
            <motion.div key={property.slug} variants={cardVariants}>
              <Link to={`/imoti/${property.slug}`}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="pt-0 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-white/20 bg-white/95 backdrop-blur-sm shadow-lg">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={(property as EditableProperty & { imageUrl?: string }).imageUrl ?? property.image}
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
                        <div className="flex items-center gap-3 text-xs text-[oklch(0.45_0.03_250)]">
                          <div className="flex items-center gap-1">
                            <Maximize2 className="size-3" />
                            <span>{property.area} кв.м.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BedDouble className="size-3" />
                            <span>{property.rooms}</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-[oklch(0.14_0.04_255)] text-sm">
                          {property.price.split(".")[0]} EUR
                        </span>
                      </div>
                      <div className="flex items-center gap-3 pt-2 text-xs text-[oklch(0.45_0.03_250)]">
                        <div className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>{property.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Layers className="size-3" />
                          <span>{property.material}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <motion.a
            href="tel:0876590580"
            className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-white/80 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PhoneIcon className="size-4" />
            Обадете се за повече обяви: 0876 590 580
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function LocalPropertiesSection() {
  const { properties } = useAdminStore();
  return <PropertiesSectionContent properties={properties} />;
}

function ConvexPropertiesSection() {
  const properties = useQuery(api.properties.listPublic, {});
  const { properties: fallbackProperties } = useAdminStore();
  return (
    <PropertiesSectionContent
      properties={
        properties && properties.length > 0
          ? properties
          : fallbackProperties
      }
    />
  );
}

export default function PropertiesSection() {
  if (HAS_CONVEX_BACKEND) {
    return <ConvexPropertiesSection />;
  }

  return <LocalPropertiesSection />;
}
