import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  MapPin,
  Maximize2,
  BedDouble,
  Calendar,
  Layers,
  Phone,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "../_components/Navbar.tsx";
import ContactSection from "../_components/ContactSection.tsx";
import Footer from "../_components/Footer.tsx";
import { PROPERTIES } from "../_lib/properties-data.ts";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const property = PROPERTIES.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen relative">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.42_0.16_250)] via-[oklch(0.58_0.13_232)] to-[oklch(0.78_0.09_218)]" />
        </div>
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-white mb-4">
              Имотът не е намерен
            </h1>
            <Link
              to="/"
              className="text-white/70 hover:text-white transition-colors underline"
            >
              Обратно към начало
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrev = () => {
    setActiveImage((prev) =>
      prev === 0 ? property.gallery.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveImage((prev) =>
      prev === property.gallery.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.42_0.16_250)] via-[oklch(0.58_0.13_232)] to-[oklch(0.78_0.09_218)]" />
        <div className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full bg-white/40 blur-[250px] translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />

      {/* Hero bar */}
      <section className="relative py-16 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE_OUT_EXPO }}
        >
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.05_255/0.90)] via-[oklch(0.15_0.06_250/0.80)] to-[oklch(0.42_0.16_250)]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors mb-4"
            >
              <ArrowLeft className="size-4" />
              Обратно към имоти
            </Link>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
          >
            ИМОТИ
          </motion.h1>
        </div>
      </section>

      {/* Property content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Image gallery */}
              <div className="p-6 lg:p-8">
                {/* Main image */}
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                  <motion.img
                    key={activeImage}
                    src={property.gallery[activeImage]}
                    alt={`${property.title} - снимка ${activeImage + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Badge className="absolute top-4 right-4 bg-[oklch(0.35_0.12_250)] text-white font-bold text-xs tracking-wider px-4 py-1.5 shadow-lg">
                    ПРОДАВА
                  </Badge>

                  {/* Navigation arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {property.gallery.map((thumb, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all ${
                        i === activeImage
                          ? "border-[oklch(0.35_0.12_250)] shadow-lg"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`Миниатюра ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Property details */}
              <div className="p-6 lg:p-8 flex flex-col">
                <motion.h2
                  className="text-2xl lg:text-3xl font-extrabold text-[oklch(0.14_0.04_255)] mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {property.title}
                </motion.h2>

                {/* Location */}
                <motion.div
                  className="flex items-start gap-2 text-[oklch(0.40_0.03_250)] mb-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <MapPin className="size-4 shrink-0 mt-0.5" />
                  <span className="text-sm">{property.location}</span>
                </motion.div>

                {/* Quick specs grid */}
                <motion.div
                  className="grid grid-cols-2 gap-4 mb-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2.5 bg-[oklch(0.97_0.005_250)] rounded-xl p-3">
                    <Maximize2 className="size-4 text-[oklch(0.35_0.12_250)]" />
                    <div>
                      <p className="text-[10px] text-[oklch(0.50_0.03_250)] uppercase tracking-wider">
                        Площ
                      </p>
                      <p className="text-sm font-bold text-[oklch(0.14_0.04_255)]">
                        {property.area} кв.м.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[oklch(0.97_0.005_250)] rounded-xl p-3">
                    <BedDouble className="size-4 text-[oklch(0.35_0.12_250)]" />
                    <div>
                      <p className="text-[10px] text-[oklch(0.50_0.03_250)] uppercase tracking-wider">
                        Стаи
                      </p>
                      <p className="text-sm font-bold text-[oklch(0.14_0.04_255)]">
                        {property.rooms}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[oklch(0.97_0.005_250)] rounded-xl p-3">
                    <Calendar className="size-4 text-[oklch(0.35_0.12_250)]" />
                    <div>
                      <p className="text-[10px] text-[oklch(0.50_0.03_250)] uppercase tracking-wider">
                        Година
                      </p>
                      <p className="text-sm font-bold text-[oklch(0.14_0.04_255)]">
                        {property.year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[oklch(0.97_0.005_250)] rounded-xl p-3">
                    <Layers className="size-4 text-[oklch(0.35_0.12_250)]" />
                    <div>
                      <p className="text-[10px] text-[oklch(0.50_0.03_250)] uppercase tracking-wider">
                        Материал
                      </p>
                      <p className="text-sm font-bold text-[oklch(0.14_0.04_255)]">
                        {property.material}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  className="mb-8 flex-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <p className="text-sm text-[oklch(0.35_0.03_250)] leading-relaxed">
                    {property.description}
                  </p>
                </motion.div>

                {/* Price & CTA */}
                <motion.div
                  className="border-t border-[oklch(0.92_0.01_250)] pt-6 mt-auto"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <p className="text-3xl lg:text-4xl font-extrabold text-[oklch(0.14_0.04_255)] mb-4">
                    {property.price}{" "}
                    <span className="text-lg font-medium text-[oklch(0.45_0.03_250)]">
                      EUR
                    </span>
                  </p>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base font-bold h-13 rounded-xl gap-2"
                    asChild
                  >
                    <a href={`tel:${property.phone.replace(/\s/g, "")}`}>
                      <Phone className="size-4" />
                      {property.phone}
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
