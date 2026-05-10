export type Property = {
  id: string;
  slug?: string;
  type: string;
  title: string;
  location: string;
  area: number;
  rooms: string;
  year: number;
  material: string;
  price: string;
  phone: string;
  description: string;
  image: string;
  gallery: string[];
  order?: number;
  isVisible?: boolean;
};

export const PROPERTIES: Property[] = [
  {
    id: "1",
    type: "3-СТАЕН",
    title: "Продава 3-СТАЕН АПАРТАМЕНТ",
    location: "Велико Търново, област Велико Търново, център",
    area: 96,
    rooms: "3-ри (3)",
    year: 2018,
    material: "Тухла",
    price: "145,000.00",
    phone: "0876 590 580",
    description:
      "НАДОМ-Недвижими имоти представя просторен тристаен апартамент за продажба в центъра на Велико Търново. Имотът разполага с две спални, хол, кухня и баня. Разположен е на тих етаж с прекрасна панорама към Царевец. Сградата е с отлична поддръжка и контролиран достъп.",
    image:
      "https://images.unsplash.com/photo-1618955599800-3d63a871e0be?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618955599800-3d63a871e0be?w=400&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80",
    ],
  },
  {
    id: "2",
    type: "3-СТАЕН",
    title: "Продава 3-СТАЕН АПАРТАМЕНТ",
    location: "Велико Търново, област Велико Търново, Бузлуджа",
    area: 84,
    rooms: "3-ри (3)",
    year: 2005,
    material: "Тухла",
    price: "135,000.00",
    phone: "0876 590 580",
    description:
      "НАДОМ-Недвижими имоти представя уютен тристаен апартамент в квартал Бузлуджа. Имотът е с две спални, хол с кухненски бокс, баня и тоалетна. Сградата е с обновена фасада и нов асансьор. Близо до училище, детска градина и паркова зона.",
    image:
      "https://images.unsplash.com/photo-1614962599546-d829f8e54d6f?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614962599546-d829f8e54d6f?w=400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
    ],
  },
  {
    id: "3",
    type: "КЪЩА",
    title: "Продава КЪЩА",
    location: "Шереметя, област Велико Търново, център",
    area: 86,
    rooms: "2-ри (2)",
    year: 1976,
    material: "Тухла",
    price: "128,000.00",
    phone: "0876 590 580",
    description:
      "НАДОМ-Недвижими имоти представя инвестиционен имот за продажба. Локацията на имота позволява да се използва за търговска дейност, като е разположен на главен път София- Варна. Стара къща 86 кв.м.",
    image:
      "https://images.unsplash.com/photo-1763640793952-827c3a3f5918?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1763640793952-827c3a3f5918?w=400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    ],
  },
  {
    id: "4",
    type: "КЪЩА",
    title: "Продава КЪЩА",
    location: "Средни Колиби, област Велико Търново",
    area: 468,
    rooms: "5-ри (5)",
    year: 2010,
    material: "Тухла",
    price: "620,000.00",
    phone: "0876 590 580",
    description:
      "НАДОМ-Недвижими имоти представя луксозна къща за продажба в Средни Колиби. Имотът разполага с просторен двор, гараж за два автомобила, пет спални, три бани и панорамна гледка към Стара Планина. Къщата е с висок клас довършителни работи.",
    image:
      "https://images.unsplash.com/photo-1694184888776-7528df6e0f3a?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1694184888776-7528df6e0f3a?w=400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7a5a2e?w=400&q=80",
    ],
  },
];

export type EditableProperty = Omit<Property, "id"> & {
  slug: string;
  order: number;
  isVisible: boolean;
};

export const DEFAULT_PROPERTIES: EditableProperty[] = PROPERTIES.map(
  ({ id, ...property }, index) => ({
    ...property,
    slug: id,
    order: index + 1,
    isVisible: true,
  }),
);
