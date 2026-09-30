export type Language = "ru" | "kz";

export interface Translations {
  topBar: {
    tagline: string;
    hours: string;
    fastDelivery: string;
    phone: string;
  };
  header: {
    subtitle: string;
    catalog: string;
    promotions: string;
    pricing: string;
    forBusiness: string;
    branches: string;
    contacts: string;
    offer: string;
    whatsappManager: string;
    searchPlaceholder: string;
    cart: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleAccent: string;
    titlePart2: string;
    subtitle: string;
    ctaCatalog: string;
    ctaWhatsapp: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    tabAll: string;
    tabTools: string;
    tabEquipment: string;
    tabHeavy: string;
    searchLabel: string;
    filterInStock: string;
    filterPowerType: string;
    powerAll: string;
    power220: string;
    power380: string;
    powerGasoline: string;
    powerDiesel: string;
    filterBranch: string;
    branchAll: string;
    branchRayymbek: string;
    branchRozybakiev: string;
    sortBy: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortPopular: string;
    inStock: string;
    outOfStock: string;
    perDay: string;
    perShift: string;
    deposit: string;
    withOperator: string;
    withoutOperator: string;
    btnRent: string;
    btnCheckDate: string;
    btnDetails: string;
    discountBadge: string;
  };
  productDetail: {
    backToCatalog: string;
    sku: string;
    branchAvailability: string;
    specsTitle: string;
    descriptionTitle: string;
    accessoriesTitle: string;
    accessoriesSubtitle: string;
    similarTitle: string;
    included: string;
    includedText: string;
    operatorIncludedTitle: string;
    operatorIncludedDesc: string;
    whatsappRentBtn: string;
    whatsappCheckDateBtn: string;
    rentedOutNoticeTitle: string;
    rentedOutNoticeDesc: string;
  };
  pricingPage: {
    title: string;
    subtitle: string;
    discountsTitle: string;
    discountsSubtitle: string;
    tier1: string;
    tier1Discount: string;
    tier2: string;
    tier2Discount: string;
    tier3: string;
    tier3Discount: string;
    tier4: string;
    tier4Discount: string;
    depositTitle: string;
    depositDesc: string;
    deliveryTitle: string;
    deliveryDesc: string;
  };
  forBusiness: {
    title: string;
    subtitle: string;
    b1Title: string;
    b1Desc: string;
    b2Title: string;
    b2Desc: string;
    b3Title: string;
    b3Desc: string;
    b4Title: string;
    b4Desc: string;
    requestCtaTitle: string;
    requestCtaSubtitle: string;
    requestBtn: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    startDate: string;
    endDate: string;
    daysCount: string;
    shiftsCount: string;
    operatorOption: string;
    withOperatorText: string;
    withoutOperatorText: string;
    deliveryType: string;
    pickup: string;
    deliveryToSite: string;
    siteAddress: string;
    addressPlaceholder: string;
    customerName: string;
    namePlaceholder: string;
    customerPhone: string;
    phonePlaceholder: string;
    summaryTitle: string;
    basePrice: string;
    discount: string;
    deliveryCost: string;
    depositAmount: string;
    totalToPay: string;
    sendWhatsappBtn: string;
    whatsappDirectNotice: string;
  };
  features: {
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
    step4Num: string;
    step4Title: string;
    step4Desc: string;
  };
  branches: {
    title: string;
    subtitle: string;
    b1Name: string;
    b1Address: string;
    b1Time: string;
    b2Name: string;
    b2Address: string;
    b2Time: string;
  };
  footer: {
    about: string;
    rights: string;
    contactsTitle: string;
    scheduleTitle: string;
    navTitle: string;
    categoriesTitle: string;
    legalTitle: string;
    bin: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    topBar: {
      tagline: "Центр аренды строительной техники и инструмента",
      hours: "Ежедневно: 08:00 – 20:00",
      fastDelivery: "Доставка на объект от 45 минут",
      phone: "+7 705 503 6772",
    },
    header: {
      subtitle: "JALĞA BERU ORTALYĞY",
      catalog: "Каталог",
      promotions: "Акции",
      pricing: "Условия",
      forBusiness: "Для бизнеса (B2B)",
      branches: "Филиал",
      contacts: "Контакты",
      offer: "Договор оферты",
      whatsappManager: "Связаться в WhatsApp",
      searchPlaceholder: "Поиск техники (перфоратор, КамАЗ, виброплита...)",
      cart: "Бронь",
    },
    hero: {
      badge: "Проверенный парк строительной техники в наличии",
      titlePart1: "Аренда строительного ",
      titleAccent: "инструмента, оборудования и техники",
      titlePart2: " в Астане",
      subtitle: "",
      ctaCatalog: "Открыть каталог техники",
      ctaWhatsapp: "Консультация в WhatsApp",
      stat1Value: "180+",
      stat1Label: "единиц проверенной техники",
      stat2Value: "от 45 мин",
      stat2Label: "доставка прямо на объект",
      stat3Value: "100%",
      stat3Label: "исправность и ТО перед выдачей",
      stat4Value: "0 ₸",
      stat4Label: "скрытых наценок и переплат",
    },
    catalog: {
      title: "Каталог техники и инструментов",
      subtitle: "Выберите нужную категорию оборудования. Честная стоимость и выгодная акция 3+1 на инструменты.",
      tabAll: "Вся техника",
      tabTools: "Ручной электроинструмент",
      tabEquipment: "Строительное оборудование",
      tabHeavy: "Тяжелая спецтехника",
      searchLabel: "Поиск по каталогу",
      filterInStock: "Только в наличии",
      filterPowerType: "Тип питания",
      powerAll: "Все типы",
      power220: "Сеть 220 В",
      power380: "Сеть 380 В",
      powerGasoline: "Бензин",
      powerDiesel: "Дизель",
      filterBranch: "Склад выдачи",
      branchAll: "Все склады",
      branchRayymbek: "Склад Бектурова 4Г (Астана)",
      branchRozybakiev: "Служба доставки по Астане",
      sortBy: "Сортировка",
      sortPriceAsc: "Сначала дешевле",
      sortPriceDesc: "Сначала дороже",
      sortPopular: "По популярности",
      inStock: "В наличии",
      outOfStock: "В аренде / Занято",
      perDay: "₸ / сутки",
      perShift: "₸ / смена (8 ч)",
      deposit: "Залог",
      withOperator: "С оператором",
      withoutOperator: "Без экипажа",
      btnRent: "Арендовать",
      btnCheckDate: "Узнать дату сдачи",
      btnDetails: "Подробнее",
      discountBadge: "Скидка от 3 дней",
    },
    productDetail: {
      backToCatalog: "Вернуться в каталог",
      sku: "Артикул позиции",
      branchAvailability: "Наличие на складах",
      specsTitle: "Технические характеристики",
      descriptionTitle: "Описание и сфера применения",
      accessoriesTitle: "Сопутствующие расходники и оснастка",
      accessoriesSubtitle: "Добавьте к заказу, чтобы не докупать расходники отдельно на стройплощадке",
      similarTitle: "Похожее оборудование в этой категории",
      included: "Комплектация",
      includedText: "В комплекте: защитный кейс, руководство по эксплуатации, базовый набор оснастки.",
      operatorIncludedTitle: "Работа с оператором включена",
      operatorIncludedDesc: "Управляется опытным штатным машинистом с допуском. ГСМ и техобслуживание входят в ставку смены.",
      whatsappRentBtn: "Забронировать эту модель в WhatsApp",
      whatsappCheckDateBtn: "Узнать дату сдачи в WhatsApp",
      rentedOutNoticeTitle: "Инструмент сейчас находится в аренде",
      rentedOutNoticeDesc: "Данная позиция сейчас занята на объекте. Напишите нам в WhatsApp, чтобы уточнить дату возврата или оперативно подобрать готовый к выдаче аналог.",
    },
    pricingPage: {
      title: "Тарифы, залоги и условия аренды",
      subtitle: "Честная и прозрачная стоимость без скрытых комиссий, завышенных требований и мелкого шрифта.",
      discountsTitle: "Прогрессивная сетка скидок от срока",
      discountsSubtitle: "Чем дольше срок аренды оборудования, тем ниже ставка за сутки.",
      tier1: "1 – 2 суток",
      tier1Discount: "Базовый тариф (100%)",
      tier2: "3 – 6 суток",
      tier2Discount: "Скидка 10% на весь срок",
      tier3: "7 – 29 суток",
      tier3Discount: "Скидка 20% на весь срок",
      tier4: "от 30 суток (месяц)",
      tier4Discount: "Индивидуальный тариф (до -35%)",
      depositTitle: "Правила внесения и возврата залога",
      depositDesc: "Аренда без залога, за исключением дорогих профессиональных инструментов.",
      deliveryTitle: "Тарифы на доставку по городу и области",
      deliveryDesc: "Ручной инструмент доставляем курьером в течение 45–60 минут. Строительное оборудование перевозится бортовыми автомобилями. Тяжелая спецтехника доставляется на низкорамных тралах по согласованию времени с заказчиком.",
    },
    forBusiness: {
      title: "Аренда техники для строительных компаний (B2B)",
      subtitle: "Надежный технический подрядчик для генеральных подрядчиков, девелоперов и субподрядных организаций.",
      b1Title: "Безналичный расчет с НДС",
      b1Desc: "Работаем официально с ТОО и ИП. Выставляем электронные счета-фактуры (ЭСФ) и акты выполненных работ (АВР) строго в срок.",
      b2Title: "Аттестованные операторы и машинисты",
      b2Desc: "Все специалисты имеют действующие квалификационные удостоверения, допуски по электробезопасности и соблюдают требования охраны труда.",
      b3Title: "Гарантия бесперебойной работы объекта",
      b3Desc: "В случае регламентного ТО или нештатной поломки заменяем единицу техники на объекте в течение 2-3 часов за наш счет.",
      b4Title: "Долгосрочные рамочные договоры",
      b4Desc: "Предоставляем льготные условия, постоплату для постоянных партнеров и фиксируем цены на весь строительный сезон.",
      requestCtaTitle: "Запросить коммерческое предложение или счет",
      requestCtaSubtitle: "Пришлите спецификацию требуемой техники или реквизиты компании менеджеру в WhatsApp.",
      requestBtn: "Отправить запрос в WhatsApp корпоративному менеджеру",
    },
    calculator: {
      title: "Оформление аренды",
      subtitle: "Рассчитайте точную стоимость аренды и отправьте заявку прямо менеджеру в WhatsApp",
      startDate: "Дата начала аренды",
      endDate: "Дата окончания",
      daysCount: "Количество суток:",
      shiftsCount: "Количество смен (8 ч):",
      operatorOption: "Вариант аренды",
      withOperatorText: "С опытным оператором / водителем",
      withoutOperatorText: "Без экипажа (только техника)",
      deliveryType: "Способ получения",
      pickup: "Самовывоз со склада",
      deliveryToSite: "Доставка на объект спецтранспортом",
      siteAddress: "Адрес стройплощадки / объекта",
      addressPlaceholder: "Например: г. Астана, ул. Достык 18",
      customerName: "Ваше имя",
      namePlaceholder: "Как к вам обращаться",
      customerPhone: "Номер телефона (WhatsApp)",
      phonePlaceholder: "+7 (777) 000-00-00",
      summaryTitle: "Итоговый расчет",
      basePrice: "Базовая стоимость:",
      discount: "Акция «3 + 1» (день в подарок):",
      deliveryCost: "Доставка:",
      depositAmount: "Возвратный залог:",
      totalToPay: "К оплате за аренду:",
      sendWhatsappBtn: "Отправить заказ в WhatsApp менеджеру",
      whatsappDirectNotice: "При нажатии откроется диалог в WhatsApp с уже сформированным заказом. Менеджер ответит в течение 2-3 минут.",
    },
    features: {
      title: "Преимущества работы с Prokateka",
      subtitle: "Мы избавились от всех проблем старых пунктов проката: никакого ожидания, бюрократии и старого изношенного оборудования.",
      f1Title: "Обслуженная техника с гарантией",
      f1Desc: "Каждая единица проходит проверку на стенде и очистку после каждого заказа. Никаких простоев на объекте.",
      f2Title: "Заказ прямо в WhatsApp за 1 минуту",
      f2Desc: "Без долгих регистраций. Сформируйте заявку в 1 клик и согласуйте детали с персональным диспетчером.",
      f3Title: "Доставка спецтранспортом на стройку",
      f3Desc: "Собственная служба доставки: малогабаритный инструмент привозим оперативно, тяжелую спецтехнику — на трале точно ко времени.",
      f4Title: "Официальный договор для физ- и юрлиц",
      f4Desc: "Прозрачные условия: Kaspi, банковские карты, безналичный расчет с НДС, ЭСФ и полным комплектом документов.",
    },
    howItWorks: {
      title: "Как арендовать инструмент или спецтехнику",
      subtitle: "Простой и понятный процесс за 4 последовательных шага",
      step1Num: "01",
      step1Title: "Выберите оборудование",
      step1Desc: "Найдите нужную позицию в каталоге с помощью фильтров или строки поиска.",
      step2Num: "02",
      step2Title: "Согласование в WhatsApp",
      step2Desc: "Нажмите «Арендовать», укажите даты и отправьте готовую заявку диспетчеру.",
      step3Num: "03",
      step3Title: "Получение на объекте или складе",
      step3Desc: "Заберите технику самовывозом или примите доставку на объекте с совместной проверкой работоспособности.",
      step4Num: "04",
      step4Title: "Возврат и залог",
      step4Desc: "По завершении работ сдаете инструмент, а мы моментально возвращаем залог в полном объеме.",
    },
    branches: {
      title: "Центр проката и склад в Астане",
      subtitle: "Официальный пункт выдачи строительного инструмента и оборудования Prokateka с удобным заездом, парковкой и экспресс-доставкой по Астане",
      b1Name: "Центр проката PROkateka",
      b1Address: "г. Астана, ул. Абикена Бектурова, 4Г",
      b1Time: "Пн-Вс: 08:00 – 20:00 (Без выходных)",
      b2Name: "Служба экспресс-доставки",
      b2Address: "По всей Астане и пригородам",
      b2Time: "Ежедневно: 08:00 – 20:00",
    },
    footer: {
      about: "PROkateka (Jalğa Beru Ortalyğy) — современный центр комплексной аренды строительного инструмента, оборудования и тяжелой спецтехники. Надежность на каждом объекте.",
      rights: "© 2026 PROkateka. Все права защищены. Барлық құқықтар қорғалған.",
      contactsTitle: "Контакты",
      scheduleTitle: "График работы",
      navTitle: "Навигация",
      categoriesTitle: "Оборудование в аренду",
      legalTitle: "Для юридических лиц",
      bin: "ИИН: 970319350517 • ИП «Прокатека» (г. Астана)",
    },
  },
  kz: {
    topBar: {
      tagline: "Құрылыс техникасы мен құралдарын жалға беру орталығы",
      hours: "Күн сайын: 08:00 – 20:00",
      fastDelivery: "Нысанға 45 минуттан бастап жеткізу",
      phone: "+7 705 503 6772",
    },
    header: {
      subtitle: "JALĞA BERU ORTALYĞY",
      catalog: "Каталог",
      promotions: "Акциялар",
      pricing: "Шарттар",
      forBusiness: "Бизнеске арналған (B2B)",
      branches: "Филиал",
      contacts: "Байланыс",
      offer: "Оферта шарты",
      whatsappManager: "WhatsApp-қа жазу",
      searchPlaceholder: "Техниканы іздеу (перфоратор, КамАЗ, виброплита...)",
      cart: "Бронь",
    },
    hero: {
      badge: "Қоймада бар сенімді техникалар паркі",
      titlePart1: "Астанада құрылыс ",
      titleAccent: "құралдары мен жабдықтарын",
      titlePart2: " жалға алу",
      subtitle: "",
      ctaCatalog: "Техника каталогын ашу",
      ctaWhatsapp: "WhatsApp-та кеңес алу",
      stat1Value: "180+",
      stat1Label: "тексерілген техника бірлігі",
      stat2Value: "45 мин бастап",
      stat2Label: "тікелей нысанға жеткізу",
      stat3Value: "100%",
      stat3Label: "жарамдылық және техникалық тексеріс",
      stat4Value: "0 ₸",
      stat4Label: "жасырын үстеме ақылар жоқ",
    },
    catalog: {
      title: "Техника мен құралдар каталогы",
      subtitle: "Қажетті жабдық санатын таңдаңыз. Адал бағалар және құралдарға пайдалы «3+1» акциясы.",
      tabAll: "Барлық техника",
      tabTools: "Қол электр құралдары",
      tabEquipment: "Құрылыс жабдықтары",
      tabHeavy: "Ауыр арнайы техника",
      searchLabel: "Каталог бойынша іздеу",
      filterInStock: "Тек қолда барлары",
      filterPowerType: "Қуат түрі",
      powerAll: "Барлық түрлері",
      power220: "220 В желісі",
      power380: "380 В желісі",
      powerGasoline: "Бензин",
      powerDiesel: "Дизель",
      filterBranch: "Беру қоймасы",
      branchAll: "Барлық қоймалар",
      branchRayymbek: "Бектұров 4Г қоймасы (Астана)",
      branchRozybakiev: "Астана бойынша жеткізу",
      sortBy: "Сұрыптау",
      sortPriceAsc: "Алдымен арзанырақ",
      sortPriceDesc: "Алдымен қымбатырақ",
      sortPopular: "Танымалдығы бойынша",
      inStock: "Қолда бар",
      outOfStock: "Жалға берілген / Бос емес",
      perDay: "₸ / тәулік",
      perShift: "₸ / ауысым (8 сағ)",
      deposit: "Кепілақы",
      withOperator: "Операторымен",
      withoutOperator: "Жүргізушісіз",
      btnRent: "Жалға алу",
      btnCheckDate: "Босау күнін білу",
      btnDetails: "Толығырақ",
      discountBadge: "3 күннен бастап жеңілдік",
    },
    productDetail: {
      backToCatalog: "Каталогқа оралу",
      sku: "Артикулы",
      branchAvailability: "Қоймаларда болуы",
      specsTitle: "Техникалық сипаттамалары",
      descriptionTitle: "Сипаттамасы және қолдану аясы",
      accessoriesTitle: "Қосымша құралдар мен шығын материалдары",
      accessoriesSubtitle: "Құрылыс алаңында уақыт жоғалтпас үшін бірден тапсырысқа қосыңыз",
      similarTitle: "Осы санаттағы ұқсас жабдықтар",
      included: "Жинақтамасы",
      includedText: "Жинақта: қорғаныс кейсі, пайдалану жөніндегі нұсқаулық, негізгі қондырғылар жиынтығы.",
      operatorIncludedTitle: "Оператор қызметі қосылған",
      operatorIncludedDesc: "Тәжірибелі штаттағы машинист басқарады. ЖЖМ және техникалық қызмет көрсету ауысым құнына кіреді.",
      whatsappRentBtn: "Бұл модельді WhatsApp арқылы брондау",
      whatsappCheckDateBtn: "Босау мерзімін WhatsApp-та білу",
      rentedOutNoticeTitle: "Жабдық қазір жалға берілген",
      rentedOutNoticeDesc: "Бұл позиция қазір нысанда жұмыс істеуде. Нақты босау күнін білу немесе уақыт жоғалтпай қоймадағы ұқсас бос құралды таңдау үшін WhatsApp арқылы хабарласыңыз.",
    },
    pricingPage: {
      title: "Тарифтер, кепілақы және жалға алу шарттары",
      subtitle: "Жасырын үстеме ақыларсыз, негізсіз талаптарсыз адал және түсінікті бағалар.",
      discountsTitle: "Мерзімге байланысты жеңілдіктер кестесі",
      discountsSubtitle: "Жабдықты жалға алу мерзімі неғұрлым ұзақ болса, тәуліктік төлем соғұрлым төмен болады.",
      tier1: "1 – 2 тәулік",
      tier1Discount: "Базалық тариф (100%)",
      tier2: "3 – 6 тәулік",
      tier2Discount: "Барлық мерзімге 10% жеңілдік",
      tier3: "7 – 29 тәулік",
      tier3Discount: "Барлық мерзімге 20% жеңілдік",
      tier4: "30 тәуліктен бастап (ай)",
      tier4Discount: "Жеке корпоративтік тариф (-35%-ға дейін)",
      depositTitle: "Кепілақы енгізу және қайтару ережелері",
      depositDesc: "Кепілақысыз жалға беру, қымбат кәсіби құралдарды қоспағанда.",
      deliveryTitle: "Қала және облыс бойынша жеткізу тарифтері",
      deliveryDesc: "Қол құралдарын курьер арқылы 45-60 минут ішінде жеткіземіз. Құрылыс жабдықтары арнайы бортты көліктермен тасымалданады. Ауыр арнайы техника төмен рамалы тралдармен жеткізіледі.",
    },
    forBusiness: {
      title: "Құрылыс компанияларына арналған техниканы жалға беру (B2B)",
      subtitle: "Бас мердігерлерге, девелоперлерге және мердігерлік ұйымдарға арналған сенімді серіктес.",
      b1Title: "ҚҚС-пен қолма-қол ақшасыз есеп айырысу",
      b1Desc: "ЖШС және ЖК-мен ресми жұмыс істейміз. Электрондық шот-фактуралар (ЭШФ) мен орындалған жұмыстар актілерін мерзімінде ұсынамыз.",
      b2Title: "Аттестатталған операторлар мен машинистер",
      b2Desc: "Барлық мамандардың біліктілік куәліктері, қауіпсіздік техникасы бойынша рұқсаттары бар.",
      b3Title: "Үзіліссіз жұмыс кепілдігі",
      b3Desc: "Техника істен шыққан жағдайда, құрылыс тоқтап қалмас үшін 2-3 сағат ішінде өз есебімізден ауыстырып береміз.",
      b4Title: "Ұзақ мерзімді негіздемелік шарттар",
      b4Desc: "Тұрақты серіктестерге жеңілдіктер ұсынамыз және бағаны бүкіл құрылыс маусымына бекітеміз.",
      requestCtaTitle: "Коммерциялық ұсыныс немесе шот сұрату",
      requestCtaSubtitle: "Қажетті техниканың тізімін немесе компания деректемелерін менеджердің WhatsApp-ына жіберіңіз.",
      requestBtn: "Корпоративтік менеджердің WhatsApp-ына өтінім жіберу",
    },
    calculator: {
      title: "Жалға алуды рәсімдеу",
      subtitle: "Жалға алу құнын дәл есептеп, өтінімді бірден менеджердің WhatsApp-ына жіберіңіз",
      startDate: "Жалға алудың басталу күні",
      endDate: "Аяқталу күні",
      daysCount: "Тәулік саны:",
      shiftsCount: "Ауысым саны (8 сағ):",
      operatorOption: "Жалға алу нұсқасы",
      withOperatorText: "Тәжірибелі операторымен / жүргізушісімен",
      withoutOperatorText: "Экипажсыз (тек техника)",
      deliveryType: "Қабылдау тәсілі",
      pickup: "Қоймадан алып кету",
      deliveryToSite: "Нысанға көлікпен жеткізу",
      siteAddress: "Құрылыс нысанының мекенжайы",
      addressPlaceholder: "Мысалы: Астана қ., Мәңгілік Ел даңғылы 25",
      customerName: "Сіздің есіміңіз",
      namePlaceholder: "Есіміңізді жазыңыз",
      customerPhone: "Телефон нөмірі (WhatsApp)",
      phonePlaceholder: "+7 (777) 000-00-00",
      summaryTitle: "Қорытынды есеп",
      basePrice: "Негізгі құны:",
      discount: "«3 + 1» акциясы (сыйлық күні):",
      deliveryCost: "Жеткізу:",
      depositAmount: "Қайтарылатын кепілақы:",
      totalToPay: "Жалға төленетін сома:",
      sendWhatsappBtn: "Тапсырысты WhatsApp менеджерге жіберу",
      whatsappDirectNotice: "Басқан кезде дайын тапсырыспен WhatsApp ашылады. Менеджер 2-3 минут ішінде жауап береді.",
    },
    features: {
      title: "Prokateka-мен жұмыс істеудің артықшылықтары",
      subtitle: "Біз ескі пункттердің барлық кемшіліктерін жойдық: кезексіз, қағазбастылықсыз және сапалы жабдықтармен.",
      f1Title: "Кепілдігі бар тексерілген жаңа техника",
      f1Desc: "Әрбір құрал стендте тексеруден және толық тазалаудан өтеді. Нысанда ешқандай тоқтап қалу болмайды.",
      f2Title: "1 минутта WhatsApp арқылы тапсырыс",
      f2Desc: "Ұзақ тіркелусіз. 1 басу арқылы өтінім қалыптастырып, тікелей диспетчермен келісіңіз.",
      f3Title: "Арнайы көлікпен құрылысқа жеткізу",
      f3Desc: "Жеке жеткізу қызметі: шағын құралдарды тез, ауыр техниканы тралмен дәл уақытында жеткіземіз.",
      f4Title: "Заңды және жеке тұлғаларға ресми шарт",
      f4Desc: "Ашық шарттар: Kaspi, банк карталары, ҚҚС-пен қолма-қол ақшасыз есеп, ЭШФ және барлық құжаттар.",
    },
    howItWorks: {
      title: "Құралды немесе арнайы техниканы қалай жалға алуға болады",
      subtitle: "4 қарапайым қадамнан тұратын түсінікті процесс",
      step1Num: "01",
      step1Title: "Жабдықты таңдаңыз",
      step1Desc: "Каталогтан сүзгілер немесе іздеу жолы арқылы қажетті позицияны табыңыз.",
      step2Num: "02",
      step2Title: "WhatsApp арқылы келісу",
      step2Desc: "«Жалға алу» түймесін басып, күндерді белгілеңіз және дайын өтінімді диспетчерге жіберіңіз.",
      step3Num: "03",
      step3Title: "Нысанда немесе қоймада қабылдау",
      step3Desc: "Қоймадан өзіңіз алып кетіңіз немесе нысанда қабылдап, жұмысын бірге тексеріңіз.",
      step4Num: "04",
      step4Title: "Қайтару және кепілақы",
      step4Desc: "Жұмыс аяқталған соң техниканы қайтарасыз, ал біз кепілақыны бірден толық қайтарамыз.",
    },
    branches: {
      title: "Астанадағы жалға беру орталығы",
      subtitle: "Ыңғайлы көлік тұрағы, жедел тексеру және Астана бойынша жылдам жеткізуі бар ресми Prokateka құралдар мен жабдықтар қоймасы",
      b1Name: "PROkateka жалға беру орталығы",
      b1Address: "Астана қ., Әбікен Бектұров к-сі, 4Г",
      b1Time: "Дүйсенбі-Жексенбі: 08:00 – 20:00 (Демалыссыз)",
      b2Name: "Жедел жеткізу қызметі",
      b2Address: "Астана қаласы және қала маңы бойынша",
      b2Time: "Күн сайын: 08:00 – 20:00",
    },
    footer: {
      about: "PROkateka (Jalğa Beru Ortalyğy) — құрылыс құралдарын, жабдықтарын және ауыр арнайы техниканы кешенді жалға берудің заманауи орталығы. Әр нысандағы сенімділік.",
      rights: "© 2026 PROkateka. Барлық құқықтар қорғалған. Все права защищены.",
      contactsTitle: "Байланыс",
      scheduleTitle: "Жұмыс кестесі",
      navTitle: "Навигация",
      categoriesTitle: "Жалға берілетін жабдықтар",
      legalTitle: "Заңды тұлғалар үшін",
      bin: "ЖСН: 970319350517 • «Прокатека» ЖК (Астана қ.)",
    },
  },
};
