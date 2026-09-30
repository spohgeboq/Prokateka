export type EquipmentTier = string;
export type PowerType = "220v" | "380v" | "gasoline" | "diesel" | "battery" | "manual";

export interface Tier {
  id: string;
  nameRu: string;
  nameKz: string;
  iconName?: string;
  color?: string;
}

export interface AccessoryItem {
  id: string;
  name: string;
  nameKz: string;
  price: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  nameKz: string;
  tier: EquipmentTier;
  categoryId: string; // Links to categories.ts
  category: string;
  categoryKz: string;
  powerType: PowerType;
  image: string;
  gallery?: string[];
  priceDay: number; // in KZT
  priceShift?: number; // for heavy machinery (8h shift)
  deposit: number; // in KZT
  inStock: boolean;
  stockCount: number;
  branch: string;
  branchKz: string;
  branchId: "rayymbek" | "rozybakiev" | "all" | string;
  popular?: boolean;
  featured?: boolean;
  operatorIncluded?: boolean;
  specs: {
    key: string;
    keyKz: string;
    value: string;
  }[];
  accessories?: AccessoryItem[];
  description: string;
  descriptionKz: string;
}

export const CATALOG_ITEMS: EquipmentItem[] = [
  // 1. Ручной электро- и бензоинструмент
  {
    id: "tool-perforator-bosch",
    name: "Перфоратор тяжелый SDS-Max 1800W",
    nameKz: "Ауыр SDS-Max перфораторы 1800W",
    tier: "tool",
    categoryId: "demolition-drilling",
    category: "Демонтаж и бурение",
    categoryKz: "Бұзу және бұрғылау",
    powerType: "220v",
    image: "/images/perforator.jpg",
    gallery: [
      "/images/perforator.jpg",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    ],
    priceDay: 4500,
    deposit: 15000,
    inStock: true,
    stockCount: 5,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rozybakiev",
    popular: true,
    featured: true,
    specs: [
      { key: "Мощность", keyKz: "Қуаты", value: "1800 Вт" },
      { key: "Сила удара", keyKz: "Соққы күші", value: "12.5 Дж" },
      { key: "Тип патрона", keyKz: "Патрон түрі", value: "SDS-Max" },
      { key: "Вес", keyKz: "Салмағы", value: "6.8 кг" },
    ],
    accessories: [
      { id: "acc-drill-24", name: "Бур SDS-Max 24х540 мм", nameKz: "SDS-Max бұрғысы 24х540 мм", price: 1500 },
      { id: "acc-chisel", name: "Пика зубило 400 мм", nameKz: "Шаншар қашау 400 мм", price: 1000 },
      { id: "acc-cable", name: "Удлинитель силовой 30 м (3х2.5)", nameKz: "Күштік ұзартқыш 30 м", price: 1200 },
    ],
    description: "Профессиональный перфоратор для бурения отверстий большого диаметра в монолитном бетоне и кирпиче, а также для демонтажных работ средней тяжести.",
    descriptionKz: "Монолитті бетон мен кірпіште үлкен диаметрлі тесіктерді бұрғылауға, сондай-ақ бұзу жұмыстарына арналған кәсіби перфоратор.",
  },
  {
    id: "tool-angle-grinder-makita",
    name: "УШМ Болгарка 230 мм с плавным пуском",
    nameKz: "Тегістеуіш (Болгарка) 230 мм жұмсақ іске қосумен",
    tier: "tool",
    categoryId: "cutting-grinding",
    category: "Резка металла, бетона и УШМ",
    categoryKz: "Металл, бетон кесу және тегістеуіштер",
    powerType: "220v",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    priceDay: 3000,
    deposit: 10000,
    inStock: false,
    stockCount: 0,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rozybakiev",
    popular: true,
    specs: [
      { key: "Диаметр диска", keyKz: "Диск диаметрі", value: "230 мм" },
      { key: "Мощность", keyKz: "Қуаты", value: "2400 Вт" },
      { key: "Обороты", keyKz: "Айналымдар", value: "6600 об/мин" },
      { key: "Безопасность", keyKz: "Қауіпсіздік", value: "Плавный пуск" },
    ],
    accessories: [
      { id: "acc-disc-metal", name: "Диск отрезной по металлу 230 мм (3 шт)", nameKz: "Металл кесу дискісі 230 мм (3 дана)", price: 1800 },
      { id: "acc-disc-diamond", name: "Диск алмазный сегментный по бетону 230 мм", nameKz: "Бетонға арналған алмас диск 230 мм", price: 3500 },
    ],
    description: "Мощная углошлифовальная машина для резки толстой арматуры, металлоконструкций, тротуарного камня и штробления бетона.",
    descriptionKz: "Арматураны, металл құрылымдарды, тротуар тастарын кесуге арналған қуатты бұрыштық тегістеу машинасы.",
  },
  {
    id: "tool-jackhammer-heavy",
    name: "Отбойный молоток бетонолом 45 Дж",
    nameKz: "Бетон бұзғыш балға 45 Дж",
    tier: "tool",
    categoryId: "demolition-drilling",
    category: "Демонтаж и бурение",
    categoryKz: "Бұзу және бұрғылау",
    powerType: "220v",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    priceDay: 6500,
    deposit: 25000,
    inStock: true,
    stockCount: 3,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rozybakiev",
    specs: [
      { key: "Энергия удара", keyKz: "Соққы энергиясы", value: "45 Дж" },
      { key: "Мощность", keyKz: "Қуаты", value: "2100 Вт" },
      { key: "Вес", keyKz: "Салмағы", value: "16.5 кг" },
      { key: "Оснастка", keyKz: "Жабдықталуы", value: "Пика + Лопатка" },
    ],
    accessories: [
      { id: "acc-jack-spade", name: "Лопатка плоская 75 мм", nameKz: "Жалпақ қашау 75 мм", price: 1200 },
      { id: "acc-ear-plugs", name: "Защитные наушники шумоподавляющие", nameKz: "Шуға қарсы қорғаныс құлаққаптары", price: 800 },
    ],
    description: "Разрушительная сила для вскрытия дорожного асфальта, демонтажа монолитных фундаментов, сноса железобетонных перегородок.",
    descriptionKz: "Асфальтты ашуға, монолитті іргетастар мен темірбетон арақабырғаларды бұзуға арналған қуатты балға.",
  },
  {
    id: "tool-chainsaw-stihl",
    name: "Бензопила профессиональная 3.5 л.с.",
    nameKz: "Кәсіби бензин арасы 3.5 а.к.",
    tier: "tool",
    categoryId: "saws-woodworking",
    category: "Пилы и деревообработка",
    categoryKz: "Аралар және ағаш өңдеу",
    powerType: "gasoline",
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80",
    priceDay: 5000,
    deposit: 20000,
    inStock: true,
    stockCount: 4,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rozybakiev",
    specs: [
      { key: "Длина шины", keyKz: "Шина ұзындығы", value: "45 см (18\")" },
      { key: "Мощность", keyKz: "Қуаты", value: "2.6 кВт / 3.5 л.с." },
      { key: "Вес", keyKz: "Салмағы", value: "4.9 кг" },
      { key: "Топливо", keyKz: "Жанармай", value: "АИ-92 + масло 2Т" },
    ],
    description: "Надежная бензопила для валки деревьев, расчистки участков под строительство, распила бруса и кровельных стропильных работ.",
    descriptionKz: "Ағаштарды кесуге, құрылыс алаңдарын тазалауға және шатыр жұмыстарына арналған сенімді бензин арасы.",
  },

  // 2. Строительное оборудование
  {
    id: "equip-vibroplate-bomag",
    name: "Виброплита реверсивная 95 кг с баком для воды",
    nameKz: "Су багы бар реверсивті діріл пластинасы 95 кг",
    tier: "equipment",
    categoryId: "soil-compaction",
    category: "Уплотнение грунта и дорожные работы",
    categoryKz: "Топырақты тығыздау және жол жұмыстары",
    powerType: "gasoline",
    image: "/images/vibroplate.jpg",
    gallery: ["/images/vibroplate.jpg"],
    priceDay: 9000,
    deposit: 35000,
    inStock: true,
    stockCount: 4,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    popular: true,
    featured: true,
    specs: [
      { key: "Масса", keyKz: "Салмағы", value: "95 кг" },
      { key: "Глубина уплотнения", keyKz: "Тығыздау тереңдігі", value: "до 300 мм" },
      { key: "Центробежная сила", keyKz: "Орталықтан тепкіш күш", value: "15 кН" },
      { key: "Двигатель", keyKz: "Қозғалтқыш", value: "Honda GX160 (5.5 л.с.)" },
    ],
    accessories: [
      { id: "acc-rubber-mat", name: "Коврик полиуретановый для брусчатки", nameKz: "Брусчаткаға арналған төсем", price: 1500 },
      { id: "acc-canister", name: "Канистра металлическая 10 л с воронкой", nameKz: "Металл канистра 10 л", price: 1000 },
    ],
    description: "Уплотнение сыпучих грунтов, щебня, песка, укладка тротуарной плитки и ямочный ремонт асфальтового полотна.",
    descriptionKz: "Құм, қиыршық тас тығыздауға, тротуар тақталарын төсеуге және асфальт жөндеуге арналған сенімді жабдық.",
  },
  {
    id: "equip-concrete-mixer",
    name: "Бетономешалка гравитационная 200 литров",
    nameKz: "Гравитациялық бетон араластырғыш 200 литр",
    tier: "equipment",
    categoryId: "concrete",
    category: "Бетонные и монолитные работы",
    categoryKz: "Бетон және монолит жұмыстары",
    powerType: "220v",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    priceDay: 5500,
    deposit: 20000,
    inStock: true,
    stockCount: 6,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    specs: [
      { key: "Объем барабана", keyKz: "Барабан көлемі", value: "200 л" },
      { key: "Готовый замес", keyKz: "Дайын қоспа", value: "140 л" },
      { key: "Мощность", keyKz: "Қуаты", value: "1000 Вт (220 В)" },
      { key: "Венец", keyKz: "Тәжі", value: "Чугунный цельный" },
    ],
    description: "Надежный бетоносмеситель с износостойким чугунным венцом для замешивания строительных растворов и тяжелого бетона.",
    descriptionKz: "Құрылыс ерітінділері мен ауыр бетонды дайындауға арналған сенімді шойын тәжді бетон араластырғыш.",
  },
  {
    id: "equip-generator-diesel",
    name: "Генератор дизельный мобильный 8.5 кВт (220/380В)",
    nameKz: "Мобильді дизельді генератор 8.5 кВт (220/380В)",
    tier: "equipment",
    categoryId: "generators",
    category: "Генераторы и энергоснабжение",
    categoryKz: "Генераторлар және электрмен жабдықтау",
    powerType: "diesel",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    priceDay: 14000,
    deposit: 50000,
    inStock: false,
    stockCount: 0,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    popular: true,
    specs: [
      { key: "Номинал мощность", keyKz: "Номиналды қуат", value: "8.5 кВт" },
      { key: "Напряжение", keyKz: "Кернеу", value: "220 В / 380 В" },
      { key: "Расход топлива", keyKz: "Жанармай шығыны", value: "1.8 л/час" },
      { key: "Запуск", keyKz: "Іске қосу", value: "Электростартер" },
    ],
    description: "Автономное электроснабжение стройплощадок. Свободно обеспечивает работу сварочных постов, компрессоров и глубинного вибратора.",
    descriptionKz: "Құрылыс алаңдарын дербес электрмен жабдықтау. Дәнекерлеу аппараттары мен компрессорларды еркін көтереді.",
  },
  {
    id: "equip-scaffolding-tower",
    name: "Вышка-тура передвижная на колесах (высота 6.2 м)",
    nameKz: "Дөңгелекті жылжымалы мұнара-тура (биіктігі 6.2 м)",
    tier: "equipment",
    categoryId: "scaffolding-aerial",
    category: "Высотные конструкции и вышки",
    categoryKz: "Биіктік құрылымдары және мұнаралар",
    powerType: "manual",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    priceDay: 4000,
    deposit: 20000,
    inStock: true,
    stockCount: 8,
    branch: "Все склады",
    branchKz: "Барлық қоймалар",
    branchId: "all",
    specs: [
      { key: "Рабочая высота", keyKz: "Жұмыс биіктігі", value: "6.2 м" },
      { key: "Размер площадки", keyKz: "Алаң өлшемі", value: "2.0 × 1.2 м" },
      { key: "Нагрузка", keyKz: "Жүктемесі", value: "до 250 кг" },
      { key: "Опоры", keyKz: "Тіректері", value: "Винтовые домкраты" },
    ],
    description: "Быстросборная вышка с поворотными прорезиненными колесами и тормозами для фасадных, монтажных и отделочных работ.",
    descriptionKz: "Қасбеттік, монтаждау және әрлеу жұмыстарына арналған дөңгелектері мен тежегіштері бар жылдам жиналатын мұнара.",
  },
  {
    id: "equip-heater-diesel",
    name: "Тепловая пушка дизельная непрямого нагрева 30 кВт",
    nameKz: "30 кВт жанама жылыту дизельді жылу зеңбірегі",
    tier: "equipment",
    categoryId: "heaters-dryers",
    category: "Тепловые пушки и обогрев объектов",
    categoryKz: "Жылу зеңбіректері және жылыту",
    powerType: "diesel",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    priceDay: 6000,
    deposit: 25000,
    inStock: true,
    stockCount: 4,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    specs: [
      { key: "Тепловая мощность", keyKz: "Жылу қуаты", value: "30 кВт" },
      { key: "Поток воздуха", keyKz: "Ауа ағыны", value: "750 м³/ч" },
      { key: "Отвод газов", keyKz: "Газ шығару", value: "Дымоход (чистый теплый воздух)" },
      { key: "Топливо", keyKz: "Жанармай", value: "Дизель" },
    ],
    description: "Обогрев строящихся помещений, сушка бетонной стяжки и штукатурных слоев в холодное время года. Чистый воздух без гари.",
    descriptionKz: "Құрылыс нысандарын жылытуға, бетон төсемдерін кептіруге арналған жанама жылыту зеңбірегі.",
  },
  {
    id: "equip-welder-inverter",
    name: "Сварочный аппарат инверторный 250А (MMA/TIG)",
    nameKz: "Инверторлық дәнекерлеу аппараты 250А (MMA/TIG)",
    tier: "equipment",
    categoryId: "compressors-welding",
    category: "Компрессоры и сварочные посты",
    categoryKz: "Компрессорлар және дәнекерлеу",
    powerType: "220v",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    priceDay: 5000,
    deposit: 20000,
    inStock: true,
    stockCount: 5,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rozybakiev",
    specs: [
      { key: "Макс. ток", keyKz: "Макс. ток", value: "250 А" },
      { key: "Диаметр электрода", keyKz: "Электрод диаметрі", value: "1.6 – 5.0 мм" },
      { key: "Напряжение", keyKz: "Кернеу", value: "220 В (работает при 160-240В)" },
      { key: "Вес", keyKz: "Салмағы", value: "5.5 кг" },
    ],
    description: "Компактный и мощный сварочный инвертор для монтажа каркасов, заборов, ворот и сварки тяжелой арматуры.",
    descriptionKz: "Қаңқаларды, қоршауларды монтаждауға және арматураны дәнекерлеуге арналған кәсіби инвертор.",
  },

  // 3. Тяжелая спецтехника
  {
    id: "heavy-jcb-excavator",
    name: "Экскаватор-погрузчик JCB 3CX (с гидромолотом / ковшом)",
    nameKz: "JCB 3CX экскаватор-тиегіші (гидробалғамен / ожаумен)",
    tier: "heavy",
    categoryId: "earthmoving",
    category: "Земляные работы и спецтехника",
    categoryKz: "Жер қазу және арнайы техника",
    powerType: "diesel",
    image: "/images/excavator.jpg",
    gallery: ["/images/excavator.jpg"],
    priceDay: 85000,
    priceShift: 85000,
    deposit: 0,
    inStock: true,
    stockCount: 2,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    popular: true,
    featured: true,
    operatorIncluded: true,
    specs: [
      { key: "Глубина копания", keyKz: "Қазу тереңдігі", value: "до 5.46 м" },
      { key: "Объем ковша", keyKz: "Ожау көлемі", value: "Фронт 1.1 м³ / Зад 0.28 м³" },
      { key: "Опция навески", keyKz: "Қосымша қондырғы", value: "Гидромолот / Узкий ковш" },
      { key: "Экипаж", keyKz: "Экипаж", value: "Опытный оператор включен" },
    ],
    accessories: [
      { id: "acc-narrow-bucket", name: "Узкий траншейный ковш 400 мм", nameKz: "Тар траншея ожауы 400 мм", price: 10000 },
      { id: "acc-hammer-attach", name: "Навеска гидромолот Delta F-5", nameKz: "Delta F-5 гидробалға қондырғысы", price: 25000 },
    ],
    description: "Копка траншей под фундаменты и инженерные сети, планировка грунта, погрузка строительного мусора, демонтаж железобетона гидромолотом.",
    descriptionKz: "Ор қазуға, топырақты тегістеуге, қоқыс тиеуге және гидробалғамен бетонды бұзуға арналған әмбебап техника.",
  },
  {
    id: "heavy-kamaz-dump-truck",
    name: "Самосвал КамАЗ 6520 (г/п 20 тонн, кузов 20 м³)",
    nameKz: "КамАЗ 6520 аударғыш көлігі (жүк көтергіштігі 20 тонна)",
    tier: "heavy",
    categoryId: "cargo-trucks",
    category: "Самосвалы и грузоперевозки",
    categoryKz: "Аударғыш және жүк көліктері",
    powerType: "diesel",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    priceDay: 75000,
    priceShift: 75000,
    deposit: 0,
    inStock: true,
    stockCount: 4,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    popular: true,
    operatorIncluded: true,
    specs: [
      { key: "Грузоподъемность", keyKz: "Жүк көтергіштігі", value: "20 тонн" },
      { key: "Объем кузова", keyKz: "Шанақ көлемі", value: "20 м³" },
      { key: "Колесная формула", keyKz: "Дөңгелек формуласы", value: "6×4 (повышенная проходимость)" },
      { key: "Экипаж", keyKz: "Экипаж", value: "Водитель включен" },
    ],
    description: "Перевозка сыпучих инертных материалов (песок, щебень, отсев, ПГС), вывоз строительного мусора и грунта из котлованов.",
    descriptionKz: "Құм, қиыршық тас, топырақ тасуға және құрылыс алаңынан қоқыс шығаруға арналған сенімді аударғыш көлік.",
  },
  {
    id: "heavy-aerial-lift",
    name: "Автовышка телескопическая 22 метра (на базе Isuzu)",
    nameKz: "Телескопиялық автомұнара 22 метр (Isuzu базасында)",
    tier: "heavy",
    categoryId: "cranes-lifting",
    category: "Подъемная техника и краны",
    categoryKz: "Көтергіш техника және крандар",
    powerType: "diesel",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    priceDay: 60000,
    priceShift: 60000,
    deposit: 0,
    inStock: true,
    stockCount: 2,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    operatorIncluded: true,
    specs: [
      { key: "Высота подъема", keyKz: "Көтеру биіктігі", value: "22 метра" },
      { key: "Г/п люльки", keyKz: "Себет жүк көтергіштігі", value: "250 кг (2 человека + инструмент)" },
      { key: "Вылет стрелы", keyKz: "Жебе ұзындығы", value: "до 13 метров" },
      { key: "Управление", keyKz: "Басқару", value: "С люльки и с земли" },
    ],
    description: "Монтаж металлоконструкций, наружной рекламы, кондиционеров, мойка остекления, кровельные и фасадные работы.",
    descriptionKz: "Металл құрылымдарды, жарнаманы монтаждауға, қасбеттерді тазалауға арналған 22 метрлік автомұнара.",
  },
  {
    id: "heavy-crane-25t",
    name: "Автокран 25 тонн стрела 31 метр",
    nameKz: "25 тонналық автокран, жебесі 31 метр",
    tier: "heavy",
    categoryId: "cranes-lifting",
    category: "Подъемная техника и краны",
    categoryKz: "Көтергіш техника және крандар",
    powerType: "diesel",
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=800&q=80",
    priceDay: 95000,
    priceShift: 95000,
    deposit: 0,
    inStock: true,
    stockCount: 2,
    branch: "Склад Бектурова 4Г (Астана)",
    branchKz: "Бектұров 4Г қоймасы (Астана)",
    branchId: "rayymbek",
    operatorIncluded: true,
    specs: [
      { key: "Грузоподъемность", keyKz: "Жүк көтергіштігі", value: "25 тонн" },
      { key: "Длина стрелы", keyKz: "Жебе ұзындығы", value: "31 метр (телескоп)" },
      { key: "Гусек", keyKz: "Қаз мойын", value: "+ 9 метров" },
      { key: "Экипаж", keyKz: "Экипаж", value: "Крановщик высшей категории" },
    ],
    description: "Погрузочно-разгрузочные работы, монтаж плит перекрытия, фундаментных блоков ФБС, сборка каркасных зданий и ангаров.",
    descriptionKz: "Еден тақталарын, ФБС блоктарын монтаждауға, ангарлар мен ғимараттарды құрастыруға арналған автокран.",
  },
];

export const MANAGER_WHATSAPP_NUMBER = "77055036772";
