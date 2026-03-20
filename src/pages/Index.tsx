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
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-primary py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-extrabold text-primary-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/70 mt-1 font-medium">
                  {stat.label}
                </div>
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
