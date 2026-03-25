import { motion } from "motion/react";
import {
  FileText,
  ScrollText,
  MapPinned,
  Landmark,
  GitFork,
  BadgeDollarSign,
  FileSignature,
  Gift,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";
import Navbar from "../_components/Navbar.tsx";
import Footer from "../_components/Footer.tsx";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const ROW_1_SERVICES = [
  {
    icon: FileText,
    title: "Консултации за изготвяне на документи",
    description:
      "Нашите юристи ще Ви консултират относно видовете сделки с имоти (продажба, дарение, делба или отдаване под наем и др.), ще подготвят необходимите документи, включително и предварителен договор за продажба, договори за наем, делба или дарение на недвижими имоти, както и ще набавят всички нужни за сделката документи.",
  },
  {
    icon: ScrollText,
    title: "Снабдяване с акт за имот без документ",
    description:
      "Извършваме тази услуга, която ние ще подпомогнем целият процес по снабдяването на нашите клиенти с акт за имот без документи. Нашите юристи ще Ви консултират и съдействат за извършване на конкретните нотариални дейности по озаконяването на Вашия документ.",
  },
  {
    icon: MapPinned,
    title: "Снабдяване със скици, нотариална оценка, удостоверения и др.",
    description:
      "Според нуждите на нашите клиенти извършваме заявление и получаване на скица за имот или сграда в урбанизирана територия от Агенцията по кадастър и Общината. Нашият екип ще се погрижи за всичко, което Ви е необходимо относно документацията на Вашият имот или сграда.",
  },
  {
    icon: Landmark,
    title: "Представяне пред институции",
    description:
      "Екипът на НАДОМ се състои от образовани хора, сред които юристи и имотни консултанти, имащи нужните качества, за да Ви представляват пред различни институции. Упълномощавайки наш служител, той ще Ви представлява пред всички държавни, общински служби и различни институции, като НАП, Агенция по кадастър, Данъчна служба, МВР, КАТ и др.",
  },
];

const ROW_2_SERVICES = [
  {
    icon: GitFork,
    title: "Делби",
    description:
      "Нашите работещи в НАДОМ изготвят всички видове договори за делба, както и всички последващи документи свързани със сделката за делбата. Нашите специалисти ще Ви консултират и подпомогнат процесът на делбата за имущество да премине бързо и безпроблемно за всички съсобственици.",
  },
  {
    icon: BadgeDollarSign,
    title: "Продажба",
    description:
      "Нашите служители ще съдействат за продажбата или отдаването под наем на притежаваните от Вас имоти, като срещу минимална комисиона се ангажираме да получите желаната от Вас продажна или наемна цена, без досадни огледи и ангажименти с купувачи или наематели. Основна идея е да предлагаме имоти на наши клиенти, които не са обявени в други агенции за недвижими имоти.",
  },
  {
    icon: FileSignature,
    title: "Завещания",
    description:
      "Изготвяне на нотариални завещания и всички видове документи свързани с него. Нашите юристи ще Ви помогнат да депозирате завещанието пред нотариус. Ако в него има и недвижими имоти е необходимо представяне на копия от документите за собственост на завещаваните недвижими имоти, както и данъчни оценки и скици или схеми на същите имоти.",
  },
  {
    icon: Gift,
    title: "Дарения",
    description:
      "Нашите юристи се занимават с изготвянето на договори за дарения, както на физически, така и на юридически лица. С договора за дарение дарителят отстъпва веднага и безвъзмездно различно движимо или недвижимо имущество на дарения, който го приема. По правило този договор е безвъзмезден.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 160, damping: 20 },
  },
};

export default function AdminServicesPage() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.42_0.16_250)] via-[oklch(0.58_0.13_232)] to-[oklch(0.78_0.09_218)]" />
        <div className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full bg-white/40 blur-[250px] translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE_OUT_EXPO }}
        >
          <img
            src="https://images.unsplash.com/photo-1623177623389-0b003998c5d3?w=1920&q=80"
            alt="Административни услуги"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.06_250/0.80)] via-[oklch(0.20_0.08_250/0.65)] to-[oklch(0.42_0.16_250)]" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              Обратно към начало
            </Link>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
          >
            АДМИНИСТРАТИВНИ УСЛУГИ
            <br />
            <motion.span
              className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT_EXPO }}
            >
              ОТ ВРАТА ДО ВРАТА
            </motion.span>
          </motion.h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-2xl shadow-xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <motion.h2
              className="text-2xl lg:text-3xl font-extrabold text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Какво можем да направим за вас?
            </motion.h2>
            <motion.p
              className="text-white/70 leading-relaxed text-base lg:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Чрез услугите предлагани от НАДОМ пестите време, упълномощавайки
              наш служител, който да набави нужните за Вас или Вашия бизнес
              документи, като Ви представлява пред всички държавни (общински
              служби и институции - НАП, АГЕНЦИЯ ПО КАДАСТЪР, ДАНЪЧНА СЛУЖБА,
              ОБЩИНА, МВР/КАТ и др.), физически или юридически лица. Ние ще
              изготвим пълномощно, което след одобрението Ви може да подпишете
              пред избран Нотариус. Пълномощното може да използвате всеки път,
              когато имате нужда от извършване на определена услуга или набавяне
              на документ. Необходимите документи, ние можем да доставим до
              посочен от вас адрес (личен адрес, държавна или общинска служба,
              нотариална кантора, банка и др.) или да получите в удобно време в
              офисите ни.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Row 1 */}
      <section className="pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {ROW_1_SERVICES.map((svc) => (
              <motion.div key={svc.title} variants={cardVariant}>
                <ServiceCard
                  icon={svc.icon}
                  title={svc.title}
                  description={svc.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Row 2 */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {ROW_2_SERVICES.map((svc) => (
              <motion.div key={svc.title} variants={cardVariant}>
                <ServiceCard
                  icon={svc.icon}
                  title={svc.title}
                  description={svc.description}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="h-full bg-white/[0.08] backdrop-blur-xl border-white/15 shadow-lg hover:shadow-2xl hover:bg-white/[0.12] transition-all duration-300 p-6 flex flex-col items-center text-center">
        <motion.div
          className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-5"
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          <Icon className="size-8 text-white/90" />
        </motion.div>
        <h3 className="font-bold text-white text-sm lg:text-base mb-3 leading-snug">
          {title}
        </h3>
        <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
