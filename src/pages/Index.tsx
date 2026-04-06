import Navbar from "./_components/Navbar.tsx";
import HeroSection from "./_components/HeroSection.tsx";
import PropertyManagementSection from "./_components/PropertyManagementSection.tsx";
import ServicesSection from "./_components/ServicesSection.tsx";
import PropertiesSection from "./_components/PropertiesSection.tsx";
import ReviewsSection from "./_components/ReviewsSection.tsx";
import ContactSection from "./_components/ContactSection.tsx";
import Footer from "./_components/Footer.tsx";

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
      <PropertyManagementSection />
      <ServicesSection />
      <PropertiesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
