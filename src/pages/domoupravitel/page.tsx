import { motion } from "motion/react";
import {
  Scale,
  Users,
  FileText,
  BookOpen,
  ClipboardList,
  Wallet,
  Wrench,
  Hammer,
  BarChart3,
  Archive,
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react";
import Navbar from "../_components/Navbar.tsx";
import ContactSection from "../_components/ContactSection.tsx";
import Footer from "../_components/Footer.tsx";

const EASE = [0.16, 1, 0.3, 1] as const;

type ServiceCard = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const SERVICES: ServiceCard[] = [
  {
    icon: Scale,
    title: "Правно представителство",
    description:
      "Представлява Общото събрание пред държавната и общинската администрация, МВР, съда и всички компетентни органи.",
  },
  {
    icon: Users,
    title: "Общи събрания",
    description:
      "Провежда законосъобразни отчетно-изборни Общи събрания — изготвя покани, председателства, отчита гласуването и съставя протоколи.",
  },
  {
    icon: FileText,
    title: "Вътрешен ред",
    description:
      "Изготвя правилник за вътрешен ред и контролира стриктното му изпълнение от всички обитатели.",
  },
  {
    icon: BookOpen,
    title: "Юридически консултации",
    description:
      "Предоставя правни консултации относно проблеми в етажната собственост, управление и разпореждане с недвижими имоти.",
  },
  {
    icon: ClipboardList,
    title: "Документация",
    description:
      "Подготвя жалби, сигнали, протоколи, предписания, заявления и всички необходими документи до компетентните институции.",
  },
  {
    icon: Wallet,
    title: "Събиране на задължения",
    description:
      "Организира събирането от некоректни платци чрез извънсъдебни и съдебни способи за максимална ефективност.",
  },
  {
    icon: Wrench,
    title: "Поддръжка на инсталации",
    description:
      "Контролира поддръжката на асансьорни уредби, осветление, домофони, пожароизвестителни и пожарогасителни системи.",
  },
  {
    icon: Hammer,
    title: "Ремонтни дейности",
    description:
      "Организира ремонти на общи части — изготвя оферти с цена, срок и качество от квалифицирани специалисти.",
  },
  {
    icon: BarChart3,
    title: "Финансово управление",
    description:
      "Изготвя годишен бюджет, процентно разпределение, съхранение и управление на средствата по утвърдени правила.",
  },
  {
    icon: Archive,
    title: "Годишен отчет и архив",
    description:
      "Предоставя годишен отчет за дейността и води пълна документация на етажната собственост.",
  },
];

const HIGHLIGHTS = [
  "15+ години професионален опит",
  "Обслужваме 500+ входа в цялата страна",
  "Прозрачно и коректно управление",
  "Онлайн достъп до документация 24/7",
];

function ServiceGridCard({
  service,
  index,
}: {
  service: ServiceCard;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative rounded-2xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-xl p-6 lg:p-7 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.10] hover:shadow-[0_8px_40px_rgba(255,255,255,0.06)]"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-white/[0.12] flex items-center justify-center mb-5 group-hover:bg-white/[0.18] transition-colors duration-300">
          <Icon className="size-5 text-white/90" />
        </div>
        <h3 className="text-base lg:text-lg font-bold text-white mb-2 tracking-tight">
          {service.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function DomoupravitelPage() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.06_250)] via-[oklch(0.25_0.10_245)] to-[oklch(0.35_0.12_240)]" />
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] rounded-full bg-[oklch(0.45_0.15_250/0.15)] blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[oklch(0.50_0.12_220/0.12)] blur-[180px] translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />

      {/* Hero - Full viewport, cinematic */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: EASE }}
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Професионален домоуправител"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.10_0.04_250/0.85)] via-[oklch(0.15_0.06_250/0.75)] to-[oklch(0.18_0.06_250)]" />
        </motion.div>

        {/* Decorative grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <Shield className="size-4 text-white/70" />
            <span className="text-xs font-medium text-white/70 tracking-wide uppercase">
              Професионално управление
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight text-balance leading-[1.1]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Професионален
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Домоуправител
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            Грижим се за вашата сграда с прозрачност, коректност и 
            професионализъм. Пълен набор от услуги за управление на етажна собственост.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            <a
              href="tel:070020215"
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[oklch(0.18_0.06_250)] font-semibold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20"
            >
              <Phone className="size-4" />
              Обадете се сега
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#услуги"
              className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
            >
              Вижте услугите
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

      {/* Services grid */}
      <section id="услуги" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Какво включва услугата
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto text-base lg:text-lg">
              Пълен пакет от професионални услуги за безпроблемно управление
              на вашата етажна собственост
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, i) => (
              <ServiceGridCard key={service.title} service={service} index={i} />
            ))}
          </div>
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
            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[oklch(0.50_0.15_250/0.15)] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
                Готови ли сте за професионално управление?
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8 text-base lg:text-lg">
                Свържете се с нас за безплатна консултация и оферта, 
                съобразена с нуждите на вашата сграда.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:070020215"
                  className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[oklch(0.18_0.06_250)] font-bold text-sm hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20"
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
