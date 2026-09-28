import fs from "fs";
import path from "path";
import { CATALOG_ITEMS, EquipmentItem } from "@/data/catalog";
import { CATEGORIES, CategoryDefinition } from "@/data/categories";

const DATA_DIR = path.join(process.cwd(), "data");

export interface DynamicPromotion {
  id: string;
  type: "x_plus_y" | "custom";
  badgeRu: string;
  badgeKz: string;
  payDays: number;     // e.g. 3
  freeDays: number;    // e.g. 1 (3+1)
  minDays: number;     // e.g. 4
  titleRu: string;
  titleKz: string;
  subtitleRu: string;
  subtitleKz: string;
  descriptionRu: string;
  descriptionKz: string;
  applicableTiers: ("tool" | "equipment" | "heavy")[];
  isActive: boolean;
  createdAt: string;
}

export interface BranchItem {
  id: string;
  nameRu: string;
  nameKz: string;
  addressRu: string;
  addressKz: string;
  gisLink: string;
  phone: string;
  workingHoursRu: string;
  workingHoursKz: string;
  isMain: boolean;
}

export interface LeadItem {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  equipmentId: string;
  equipmentName: string;
  days: number;
  durationUnit: string;
  deliveryType: "pickup" | "delivery";
  address?: string;
  totalPrice: number;
  deposit: number;
  promoApplied?: string;
  status: "new" | "in_rent" | "completed" | "cancelled";
}

export interface SiteSettings {
  whatsappNumber: string;
  contactPhone: string;
  workingHours: string;
  companyName: string;
  companyBin: string;
  headName: string;
}

export interface AdminUser {
  email: string;
  passwordHash: string;
}

export interface DatabaseSchema {
  equipment: EquipmentItem[];
  categories: CategoryDefinition[];
  promotions: DynamicPromotion[];
  branches: BranchItem[];
  settings: SiteSettings;
  leads: LeadItem[];
  admin: AdminUser;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

const DB_FILE = path.join(DATA_DIR, "db.json");

// Default initial seed
function getInitialData(): DatabaseSchema {
  const dynamicPromos: DynamicPromotion[] = [
    {
      id: "promo-3-plus-1",
      type: "x_plus_y",
      badgeRu: "Хит проката",
      badgeKz: "Жалға алу хиті",
      payDays: 3,
      freeDays: 1,
      minDays: 4,
      titleRu: "3 + 1: Четвёртый день аренды бесплатно",
      titleKz: "3 + 1: Жалға алудың төртінші күні сыйлыққа",
      subtitleRu: "При аренде любого инструмента на 3 суток — четвертые сутки за наш счет!",
      subtitleKz: "Кез келген құралды 3 тәулікке жалға алғанда — төртінші тәулік тегін!",
      descriptionRu: "Идеально подходит для ремонта квартир, монтажных работ и заливки стяжки. Оплачивайте 3 суток и пользуйтесь 4 полных дня.",
      descriptionKz: "Пәтер жөндеуге, монтаждау жұмыстарына және еден құюға өте қолайлы. Тек 3 тәулікті төлеп, құралды 4 толық күн пайдаланыңыз.",
      applicableTiers: ["tool", "equipment"],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "promo-5-plus-2",
      type: "x_plus_y",
      badgeRu: "Выгода недели",
      badgeKz: "Апталық тиімділік",
      payDays: 5,
      freeDays: 2,
      minDays: 7,
      titleRu: "5 + 2: Целая неделя аренды по цене 5 дней",
      titleKz: "5 + 2: 5 күннің құнымен тұтас бір апта жалға алу",
      subtitleRu: "Арендуйте на 5 рабочих дней и забирайте выходные в подарок!",
      subtitleKz: "5 жұмыс күніне жалға алып, демалыс күндерін тегін сыйлыққа алыңыз!",
      descriptionRu: "Специальное предложение для строительных бригад и мастеров. 7 полных дней аренды по стоимости 5.",
      descriptionKz: "Құрылыс бригадалары мен шеберлерге арналған тиімді ұсыныс. 5 күн бағасына толық 7 күн.",
      applicableTiers: ["tool", "equipment"],
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const defaultBranches: BranchItem[] = [
    {
      id: "astana-bekturova",
      nameRu: "Склад выдачи Бектурова 4Г",
      nameKz: "Бектұров 4Г қоймасы",
      addressRu: "г. Астана, ул. Абикена Бектурова, 4Г (въезд с торца)",
      addressKz: "Астана қ., Әбікен Бектұров көш., 4Г",
      gisLink: "https://2gis.kz/astana/geo/70000001065108547",
      phone: "+7 (705) 631-78-87",
      workingHoursRu: "Ежедневно: 08:00 – 20:00 (без перерывов)",
      workingHoursKz: "Күн сайын: 08:00 – 20:00 (үзіліссіз)",
      isMain: true,
    },
  ];

  const defaultSettings: SiteSettings = {
    whatsappNumber: "77056317887",
    contactPhone: "+7 (705) 631-78-87",
    workingHours: "Ежедневно: 08:00 – 20:00",
    companyName: "ИП «Прокатека»",
    companyBin: "970319350517",
    headName: "Рақымжан Наурыз Болатұлы",
  };

  const defaultAdmin: AdminUser = {
    email: "admin@prokateka.kz",
    passwordHash: "admin123!",
  };

  return {
    equipment: CATALOG_ITEMS,
    categories: CATEGORIES,
    promotions: dynamicPromos,
    branches: defaultBranches,
    settings: defaultSettings,
    leads: [],
    admin: defaultAdmin,
  };
}

export function readDb(): DatabaseSchema {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json, returning initial seed:", err);
    return getInitialData();
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}
