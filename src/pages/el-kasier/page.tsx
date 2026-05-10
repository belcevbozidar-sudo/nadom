import { motion } from "motion/react";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import Navbar from "../_components/Navbar.tsx";
import ContactSection from "../_components/ContactSection.tsx";
import Footer from "../_components/Footer.tsx";
import { getServiceIcon } from "../_lib/content-icons.ts";
import { useAdminStore } from "../_lib/admin-store.ts";

const EASE = [0.16, 1, 0.3, 1] as const;

type PaymentMethod = {
  icon: string;
  title: string;
  description: string;
};

type ServiceCard = {
  icon: string;
  title: string;
  description: string;
};

const INFO_NOTE =
  "Всеки собственик може да открие абонатния си номер на информационното табло във входа, или ще получи SMS с абонатен номер, потребителско име и парола за достъп до онлайн системата — nadom.bg.";

const IMPORTANT_NOTE =
  'Не се предоставя услуга Домоуправител и Касиер при липса на месечна вноска за фонд "Ремонт и обновление" на сградата.';

const HIGHLIGHTS = [
  "Абонатен номер за всеки обект",
  "Персонална визитка от офис",
  "SMS известия за плащания",
  "24/7 онлайн достъп до nadom.bg",
];

function PaymentMethodCard({
  method,
  index,
}: {
  method: PaymentMethod;
  index: number;
}) {
  const Icon = getServiceIcon(method.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative rounded-2xl border border-white/[0.15] bg-white/[0.08] backdrop-blur-xl p-7 lg:p-8 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12] hover:shadow-[0_8px_40px_rgba(255,255,255,0.08)]"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[oklch(0.55_0.15_170/0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.15] to-white/[0.05] flex items-center justify-center mb-5 group-hover:from-white/[0.22] group-hover:to-white/[0.08] transition-all duration-300">
          <Icon className="size-6 text-white/90" />
        </div>
        <h3 className="text-base lg:text-lg font-bold text-white mb-2 tracking-tight">
          {method.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed">
          {method.description}
        </p>
      </div>
    </motion.div>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const Icon = getServiceIcon(service.icon);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="group flex items-start gap-5 p-5 lg:p-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
    >
      <div className="w-11 h-11 rounded-xl bg-white/[0.10] flex items-center justify-center shrink-0 group-hover:bg-white/[0.16] transition-colors duration-300">
        <Icon className="size-5 text-white/80" />
      </div>
      <div>
        <h3 className="text-base font-bold text-white mb-1 tracking-tight">
          {service.title}
        </h3>
        <p className="text-sm text-white/55 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ElKasierPage() {
  const { services } = useAdminStore();
  const visibleServices = services.filter((service) => service.isVisible);
  const paymentMethods = visibleServices
    .filter((service) => service.category === "payment_method")
    .sort((a, b) => a.order - b.order);
  const cashierServices = visibleServices
    .filter((service) => service.category === "el_kasier")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.16_0.05_255)] via-[oklch(0.22_0.08_248)] to-[oklch(0.30_0.10_242)]" />
        <div className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full bg-[oklch(0.40_0.14_200/0.12)] blur-[180px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[oklch(0.45_0.12_260/0.10)] blur-[160px]" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: EASE }}
        >
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80"
            alt="Електронен касиер"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.03_255/0.88)] via-[oklch(0.12_0.05_252/0.80)] to-[oklch(0.16_0.05_255)]" />
        </motion.div>

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <CreditCard className="size-4 text-white/70" />
            <span className="text-xs font-medium text-white/70 tracking-wide uppercase">
              Счетоводство и плащания
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight text-balance leading-[1.1]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Електронен
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Касиер
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            Лесно плащане на месечните такси по множество удобни начини. Пълна
            прозрачност и достъп до счетоводството в реално време.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            <a
              href="tel:070020215"
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[oklch(0.16_0.05_255)] font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20"
            >
              <Phone className="size-4" />
              Обадете се сега
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#начини-на-плащане"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
            >
              Начини на плащане
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </section>

      {/* Highlights bar */}
      <section className="relative py-16 border-t border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {HIGHLIGHTS.map((text, i) => (
              <motion.div
                key={text}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              >
                <CheckCircle2 className="size-5 text-[oklch(0.65_0.12_170)] shrink-0" />
                <span className="text-sm font-medium text-white/70">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section id="начини-на-плащане" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Начини на плащане
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto text-base lg:text-lg">
              Плащайте месечните си такси бързо и удобно с абонатен номер по
              един от следните начини
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {paymentMethods.map((method, i) => (
              <PaymentMethodCard key={method.title} method={method} index={i} />
            ))}
          </div>

          {/* Info note */}
          <motion.div
            className="mt-10 rounded-2xl border border-white/[0.10] bg-white/[0.04] backdrop-blur-sm p-6 lg:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.55_0.15_200/0.15)] flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5 text-[oklch(0.70_0.12_200)]" />
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {INFO_NOTE}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Счетоводство на блока
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto text-base lg:text-lg">
              Пълно финансово обслужване с прозрачност и професионализъм
            </p>
          </motion.div>

          <div className="space-y-4">
            {cashierServices.map((service, i) => (
              <ServiceRow key={service.title} service={service} index={i} />
            ))}
          </div>

          {/* Important note */}
          <motion.div
            className="mt-10 rounded-2xl border border-[oklch(0.60_0.20_30/0.25)] bg-[oklch(0.60_0.20_30/0.06)] p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            <p className="text-sm font-semibold text-[oklch(0.75_0.14_40)] leading-relaxed">
              {IMPORTANT_NOTE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="relative rounded-3xl border border-white/[0.12] bg-white/[0.04] backdrop-blur-xl p-10 lg:p-16 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[oklch(0.45_0.14_200/0.12)] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
                Започнете да плащате лесно
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8 text-base lg:text-lg">
                Свържете се с нас за да получите вашия абонатен номер и достъп
                до онлайн системата nadom.bg.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:070020215"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[oklch(0.16_0.05_255)] font-bold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20"
                >
                  <Phone className="size-4" />
                  0700 20 215
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:office@nadom.bg"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                >
                  office@nadom.bg
                </a>
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
