import { motion } from "motion/react";
import Navbar from "../_components/Navbar.tsx";
import ContactSection from "../_components/ContactSection.tsx";
import Footer from "../_components/Footer.tsx";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  "Представлява Общото събрание на собствениците на обекти в сградата пред държавната и общинската администрация, МВР, компетентния съд, както и пред други;",
  "Провежда едно законосъобразно отчетно-изборно Общо събрание за периода на договора в работен ден от 18.00 ч. на собствениците на самостоятелни обекти в сгради в режим на етажна собственост - изготвя, изпраща и поставя покани, председателства общото събрание, отчита гласуването, съставя протоколи, съобщения, т.н. (за провеждане на непланирано общо събрание по желание на един или повече от собствениците се заплаща такса 50,00 лв.);",
  "Изготвя правилник за вътрешен ред и контролира изпълнението му;",
  "Предоставя юридически консултации относно проблеми в етажната собственост и решенията на Общото събрание, също при действия на управление и разпореждане с недвижими имоти;",
  "Подготвя и необходимата документация: изготвя жалби, сигнали, протоколи, предписания, заявления и други до компетентните институции;",
  "Организира събирането на задължения от некоректните платци /длъжници/ в етажната собственост, чрез извънсъдебни и съдебни способи.",
  "Контролира поддръжката на сградните инсталации и системи – асансьорни уредби, осветление, домофонна система, пожароизвестителна и пожарогасителни системи (при наличие на такива);",
  "Организира ремонтни дейности на общи части и на самостоятелни обекти: изготвя една оферта с цена, срок и качество на изработка от служители на фирмата за управление;",
  "Управлява финансите на етажната собственост – изготвя годишен бюджет, извършва процентно разпределение, съхранение и управление на паричните средства, съгласно утвърдени правила от общо събрание на етажната собственост.",
  "Предоставя годишен отчет за извършеното от управителя дейности на контрольора / контролния съвет на етажната собственост;",
  "Води и съхранява документацията на етажната собственост.",
];

export default function DomoupravitelPage() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed gradient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.42_0.16_250)] via-[oklch(0.58_0.13_232)] to-[oklch(0.78_0.09_218)]" />
        <div className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full bg-white/40 blur-[250px] translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE_OUT_EXPO }}
        >
          <img
            src="https://images.unsplash.com/photo-1590426987126-d4290aaedc72?w=1920&q=80"
            alt="Професионален домоуправител"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.06_250/0.80)] via-[oklch(0.20_0.08_250/0.65)] to-[oklch(0.42_0.16_250)]" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT_EXPO }}
          >
            ПРОФЕСИОНАЛЕН ДОМОУПРАВИТЕЛ
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <motion.h2
              className="text-2xl lg:text-3xl font-extrabold text-[oklch(0.14_0.04_255)] mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Професионален домоуправител
            </motion.h2>

            <ul className="space-y-4">
              {SERVICES.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-[oklch(0.25_0.03_250)] text-sm lg:text-base leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.35_0.12_250)]" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
