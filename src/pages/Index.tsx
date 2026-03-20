import { motion } from "motion/react";
import Navbar from "./_components/Navbar.tsx";
import HeroSection from "./_components/HeroSection.tsx";
import PropertiesSection from "./_components/PropertiesSection.tsx";
import ServicesSection from "./_components/ServicesSection.tsx";
import ContactSection from "./_components/ContactSection.tsx";
import Footer from "./_components/Footer.tsx";

const STATS = [
  { value: "15+", label: "Години опит" },
  { value: "500+", label: "Управлявани сгради" },
  { value: "10,000+", label: "Доволни клиенти" },
  { value: "4", label: "Офиса в България" },
];

export default function Index() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background - visible everywhere below hero */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.42_0.16_250)] via-[oklch(0.58_0.13_232)] to-[oklch(0.78_0.09_218)]" />
        {/* White glow - bottom right corner */}
        <div className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full bg-white/40 blur-[250px] translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />
      <HeroSection />

      {/* Stats Bar */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: i * 0.12,
                }}
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  className="text-sm text-white/70 mt-1 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PropertiesSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
