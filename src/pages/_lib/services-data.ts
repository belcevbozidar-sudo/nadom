export type ServiceCategory =
  | "hero_domoupravitel"
  | "hero_admin"
  | "homepage_card"
  | "building"
  | "general"
  | "domoupravitel"
  | "admin_services"
  | "el_kasier"
  | "payment_method";

export type EditableService = {
  category: ServiceCategory;
  title: string;
  description: string;
  image?: string;
  href?: string;
  icon: string;
  order: number;
  isVisible: boolean;
};

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  hero_domoupravitel: "Hero: Домоуправител",
  hero_admin: "Hero: Административни",
  homepage_card: "Начална: големи карти",
  building: "Начална: жилищни и офис сгради",
  general: "Начална: услуги",
  domoupravitel: "Страница Домоуправител",
  admin_services: "Страница Административни услуги",
  el_kasier: "Страница Ел. Касиер",
  payment_method: "Начини на плащане",
};

export const SERVICE_CATEGORIES = Object.keys(
  SERVICE_CATEGORY_LABELS,
) as ServiceCategory[];

export const DEFAULT_SERVICES: EditableService[] = [
  {
    category: "hero_domoupravitel",
    title: "Правно представителство",
    description: "",
    icon: "Scale",
    order: 1,
    isVisible: true,
  },
  {
    category: "hero_domoupravitel",
    title: "Общи събрания",
    description: "",
    icon: "Users",
    order: 2,
    isVisible: true,
  },
  {
    category: "hero_domoupravitel",
    title: "Документация и протоколи",
    description: "",
    icon: "FileText",
    order: 3,
    isVisible: true,
  },
  {
    category: "hero_domoupravitel",
    title: "Поддръжка на сградата",
    description: "",
    icon: "Wrench",
    order: 4,
    isVisible: true,
  },
  {
    category: "hero_domoupravitel",
    title: "Финансово управление",
    description: "",
    icon: "BarChart3",
    order: 5,
    isVisible: true,
  },
  {
    category: "hero_admin",
    title: "Подготовка на документи",
    description: "",
    icon: "FileSignature",
    order: 1,
    isVisible: true,
  },
  {
    category: "hero_admin",
    title: "Скици и удостоверения",
    description: "",
    icon: "MapPinned",
    order: 2,
    isVisible: true,
  },
  {
    category: "hero_admin",
    title: "Представяне пред институции",
    description: "",
    icon: "Landmark",
    order: 3,
    isVisible: true,
  },
  {
    category: "hero_admin",
    title: "Делби и продажби",
    description: "",
    icon: "GitFork",
    order: 4,
    isVisible: true,
  },
  {
    category: "hero_admin",
    title: "Завещания и дарения",
    description: "",
    icon: "BadgeDollarSign",
    order: 5,
    isVisible: true,
  },
  {
    category: "homepage_card",
    title: "Проф. домоуправител",
    description: "Професионално управление на вашата жилищна сграда",
    image:
      "https://images.unsplash.com/photo-1763276674437-a1305c7021d1?w=800&q=80",
    href: "/domoupravitel",
    icon: "Building2",
    order: 1,
    isVisible: true,
  },
  {
    category: "homepage_card",
    title: "Електронен касиер",
    description: "Удобно и прозрачно управление на финансите",
    image:
      "https://images.unsplash.com/photo-1758448721162-0c77cf477d6f?w=800&q=80",
    href: "/el-kasier",
    icon: "Calculator",
    order: 2,
    isVisible: true,
  },
  {
    category: "homepage_card",
    title: "Административни услуги",
    description: "Пълно административно обслужване от врата до врата",
    image:
      "https://images.unsplash.com/flagged/photo-1551135049-83f3419ef05c?w=800&q=80",
    href: "/administrativni-uslugi",
    icon: "FileText",
    order: 3,
    isVisible: true,
  },
  {
    category: "building",
    title: "Проф. домоуправител",
    description: "",
    icon: "UserCheck",
    order: 1,
    isVisible: true,
  },
  {
    category: "building",
    title: "Електронен касиер",
    description: "",
    icon: "Calculator",
    order: 2,
    isVisible: true,
  },
  {
    category: "building",
    title: "Контрол на достъпа",
    description: "",
    icon: "ShieldCheck",
    order: 3,
    isVisible: true,
  },
  {
    category: "general",
    title: "Ремонт и поддръжка",
    description: "",
    icon: "Wrench",
    order: 1,
    isVisible: true,
  },
  {
    category: "general",
    title: "Транспорт",
    description: "",
    icon: "Truck",
    order: 2,
    isVisible: true,
  },
  {
    category: "general",
    title: "Аксесоари за входа",
    description: "",
    icon: "KeyRound",
    order: 3,
    isVisible: true,
  },
  {
    category: "general",
    title: "Полезна информация",
    description: "",
    icon: "Info",
    order: 4,
    isVisible: true,
  },
  {
    category: "general",
    title: "Сделки и застраховки",
    description: "",
    icon: "FileCheck",
    order: 5,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Правно представителство",
    description:
      "Представлява Общото събрание пред държавната и общинската администрация, МВР, съда и всички компетентни органи.",
    icon: "Scale",
    order: 1,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Общи събрания",
    description:
      "Провежда законосъобразни отчетно-изборни Общи събрания - изготвя покани, председателства, отчита гласуването и съставя протоколи.",
    icon: "Users",
    order: 2,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Вътрешен ред",
    description:
      "Изготвя правилник за вътрешен ред и контролира стриктното му изпълнение от всички обитатели.",
    icon: "FileText",
    order: 3,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Юридически консултации",
    description:
      "Предоставя правни консултации относно проблеми в етажната собственост, управление и разпореждане с недвижими имоти.",
    icon: "BookOpen",
    order: 4,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Документация",
    description:
      "Подготвя жалби, сигнали, протоколи, предписания, заявления и всички необходими документи до компетентните институции.",
    icon: "ClipboardList",
    order: 5,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Събиране на задължения",
    description:
      "Организира събирането от некоректни платци чрез извънсъдебни и съдебни способи за максимална ефективност.",
    icon: "Wallet",
    order: 6,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Поддръжка на инсталации",
    description:
      "Контролира поддръжката на асансьорни уредби, осветление, домофони, пожароизвестителни и пожарогасителни системи.",
    icon: "Wrench",
    order: 7,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Ремонтни дейности",
    description:
      "Организира ремонти на общи части - изготвя оферти с цена, срок и качество от квалифицирани специалисти.",
    icon: "Hammer",
    order: 8,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Финансово управление",
    description:
      "Изготвя годишен бюджет, процентно разпределение, съхранение и управление на средствата по утвърдени правила.",
    icon: "BarChart3",
    order: 9,
    isVisible: true,
  },
  {
    category: "domoupravitel",
    title: "Годишен отчет и архив",
    description:
      "Предоставя годишен отчет за дейността и води пълна документация на етажната собственост.",
    icon: "Archive",
    order: 10,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Консултации за изготвяне на документи",
    description:
      "Нашите юристи ще Ви консултират относно видовете сделки с имоти, ще подготвят необходимите документи и ще набавят всички нужни за сделката документи.",
    icon: "FileText",
    order: 1,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Снабдяване с акт за имот без документ",
    description:
      "Подпомагаме целия процес по снабдяването с акт за имот без документи и съдействаме за конкретните нотариални дейности.",
    icon: "ScrollText",
    order: 2,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Снабдяване със скици, нотариална оценка, удостоверения и др.",
    description:
      "Извършваме заявление и получаване на скица за имот или сграда, както и друга нужна документация.",
    icon: "MapPinned",
    order: 3,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Представяне пред институции",
    description:
      "Представляваме ви пред държавни и общински служби, НАП, Агенция по кадастър, Данъчна служба, МВР, КАТ и др.",
    icon: "Landmark",
    order: 4,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Делби",
    description:
      "Изготвяме договори за делба и всички последващи документи, за да премине процесът бързо и безпроблемно.",
    icon: "GitFork",
    order: 5,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Продажба",
    description:
      "Съдействаме за продажба или отдаване под наем на притежаваните от Вас имоти срещу минимална комисиона.",
    icon: "BadgeDollarSign",
    order: 6,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Завещания",
    description:
      "Изготвяне на нотариални завещания и всички видове документи, свързани с него.",
    icon: "FileSignature",
    order: 7,
    isVisible: true,
  },
  {
    category: "admin_services",
    title: "Дарения",
    description:
      "Изготвяме договори за дарения за физически и юридически лица.",
    icon: "Gift",
    order: 8,
    isVisible: true,
  },
  {
    category: "payment_method",
    title: "Каса EasyPay",
    description:
      'На всяка каса на EasyPay за търговец "Национална агенция - Домоуправител".',
    icon: "Building2",
    order: 1,
    isVisible: true,
  },
  {
    category: "payment_method",
    title: "Онлайн в ePay",
    description:
      'Бързо и удобно онлайн плащане чрез ePay за търговец "Национална агенция - Домоуправител".',
    icon: "Globe",
    order: 2,
    isVisible: true,
  },
  {
    category: "payment_method",
    title: "Интернет банкиране",
    description:
      'Чрез интернет банкиране, раздел "битови сметки", перо "професионален домоуправител".',
    icon: "Smartphone",
    order: 3,
    isVisible: true,
  },
  {
    category: "el_kasier",
    title: "Изчисление на задължения",
    description:
      "Изчислява задълженията на собствениците и събира месечните такси точно и навременно.",
    icon: "Calculator",
    order: 1,
    isVisible: true,
  },
  {
    category: "el_kasier",
    title: "Плащане на разходи",
    description:
      "Плаща всички разходи за общите части - общ ток, вода, асансьор, почистване и управление.",
    icon: "Banknote",
    order: 2,
    isVisible: true,
  },
  {
    category: "el_kasier",
    title: "Онлайн достъп до отчети",
    description:
      "Води отчет за събраните средства и извършените плащания с достъп в реално време чрез nadom.bg.",
    icon: "Receipt",
    order: 3,
    isVisible: true,
  },
  {
    category: "el_kasier",
    title: "Отчети за Общо събрание",
    description:
      "Предоставя отчети за приходи и разходи, месечни списъци с платени и неплатени такси.",
    icon: "FileBarChart",
    order: 4,
    isVisible: true,
  },
  {
    category: "el_kasier",
    title: "Планиране на бюджет",
    description:
      'Планира годишния бюджет, изчислява месечните вноски за управление, поддръжка и фонд "Ремонт и обновление".',
    icon: "PieChart",
    order: 5,
    isVisible: true,
  },
];
