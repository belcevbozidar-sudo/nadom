import { motion } from "motion/react";
import Navbar from "../_components/Navbar.tsx";
import ContactSection from "../_components/ContactSection.tsx";
import Footer from "../_components/Footer.tsx";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    text: "Предоставя възможност на всеки, собственик/наемател/обитател/ползвател в ЕС, лесно да плати месечните си такси, с абонатен номер, по някой от следните начини:",
    subItems: [
      "на всяка каса на EasyPay за търговец Национална агенция - Домоуправител;",
      "онлайн в ePay за търговец Национална агенция - Домоуправител;",
      'чрез интернет банкиране за физическо лице - раздел: "битови сметки", перо "професионален домоуправител" за търговец Национална агенция - Домоуправител;',
    ],
    note: 'Всеки собственик може да открие абонатния номер за свой самостоятелен обект на информационното табло във входа, ще получи също SMS с абонатния номер, потребителско име и парола за достъп до онлайн системата ни - nadom.bg. По желание може да получи и персонална визитка с абонатен номер от наш офис, която да покаже на каса EasyPay. Месечните такси се определят с решение на Общо събрание, след което се начисляват от касиера и са фиксирани, не е нужно собственикът да посочва сума за плащане. За заплатената месечна такса, той получава подробна разписка.',
  },
  {
    text: "Изчислява задълженията на собствениците и събира месечните такси;",
  },
  {
    text: "Плаща всички разходи за общите части на етажната собственост – общ ток - стълбище, вода, абонаментна такса на асансьора, ток асансьор, почистване, управление и др.",
  },
  {
    text: "Води отчет за събраните средства и извършените плащания, до които всеки наш клиент има достъп в реално време, през нашата онлайн система - nadom.bg. Там всеки може да открие първичния счетоводни документи, като с основание за направените разходи, наличност в касата, размер на месечните такси, длъжници и т.н.",
  },
  {
    text: "Предоставя пред Общото събрание, както и за ревизия от контрольор/контролен съвет: отчети за приходи и разходи, месечни списъци с платени и неплатени такси, както и счетоводни консултации относно индивидуални плащания на всеки собственик.",
  },
  {
    text: 'Планира годишния бюджет на етажната собственост, изчислява месечните вноски за управление и поддръжка, както и тези за фонд "Ремонт и обновление", съобразно идеалните части от общите части в сградата на всеки самостоятелен обект. Начислява минимум един процент от минималната работна заплата на всеки самостоятелен обект за фонд "Ремонт и обновление".',
    bold: 'Не се предоставя услуга Домоуправител и Касиер при липса на месечна вноска за фонд "Ремонт и обновление" на сградата;',
  },
];

type ServiceItem = (typeof SERVICES)[number];

function ServiceBullet({ item, index }: { item: ServiceItem; index: number }) {
  return (
    <motion.li
      className="text-[oklch(0.25_0.03_250)] text-sm lg:text-base leading-relaxed"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.35_0.12_250)]" />
        <div>
          <span>{item.text}</span>

          {"subItems" in item && item.subItems && (
            <ul className="mt-2 ml-4 space-y-1.5">
              {item.subItems.map((sub) => (
                <li key={sub} className="flex items-start gap-2">
                  <span className="shrink-0 mt-2 w-1 h-1 rounded-full bg-[oklch(0.50_0.08_250)]" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          )}

          {"note" in item && item.note && (
            <p className="mt-3 text-[oklch(0.30_0.03_250)]">{item.note}</p>
          )}

          {"bold" in item && item.bold && (
            <p className="mt-2 font-bold text-[oklch(0.20_0.04_255)]">
              {item.bold}
            </p>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default function ElKasierPage() {
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
            src="https://images.unsplash.com/photo-1651326770902-5360f70acc7c?w=1920&q=80"
            alt="Електронен касиер"
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
            ЕЛЕКТРОНЕН КАСИЕР
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
              Счетоводство на блока и касиер
            </motion.h2>

            <ul className="space-y-5">
              {SERVICES.map((item, i) => (
                <ServiceBullet key={i} item={item} index={i} />
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
