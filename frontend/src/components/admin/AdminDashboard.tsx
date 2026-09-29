"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EquipmentItem, EquipmentTier, Tier } from "@/data/catalog";
import { CategoryDefinition } from "@/data/categories";
import { DynamicPromotion, BranchItem, LeadItem, SiteSettings } from "@/lib/db";
import { parseVideoUrl } from "@/lib/video";
import {
  LayoutDashboard,
  Wrench,
  Gift,
  Layers,
  MapPin,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Sparkles,
  Phone,
  MessageCircle,
  Truck,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Eye,
  AlertTriangle,
  Clock,
  ChevronRight,
} from "lucide-react";

type AdminTab =
  | "dashboard"
  | "equipment"
  | "tiers"
  | "promotions"
  | "categories"
  | "branches"
  | "leads"
  | "settings";

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data states
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [promotions, setPromotions] = useState<DynamicPromotion[]>([]);
  const [categories, setCategories] = useState<CategoryDefinition[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    whatsappNumber: "77055036772",
    contactPhone: "+7 705 503 6772",
    workingHours: "Ежедневно: 08:00 – 20:00",
    companyName: "ИП «Прокатека»",
    companyBin: "970319350517",
    headName: "Рақымжан Наурыз Болатұлы",
    youtubeVideoUrl: "https://www.youtube.com/embed/yP2RjVf02g4",
  });
  const [adminEmail, setAdminEmail] = useState("admin@prokateka.kz");

  // Equipment filters & modals
  const [eqSearch, setEqSearch] = useState("");
  const [eqTierFilter, setEqTierFilter] = useState<"all" | EquipmentTier>("all");
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  // Promo modal
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<DynamicPromotion | null>(null);

  // Category modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryDefinition | null>(null);

  // Tier modal
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);

  // Branch modal
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchItem | null>(null);

  // Settings form
  const [adminPasswordInput, setAdminPasswordInput] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const now = Date.now();
      const [eqRes, prRes, catRes, brRes, setRes, ldRes, meRes, tierRes] = await Promise.all([
        fetch(`/api/equipment?t=${now}`, { cache: "no-store" }),
        fetch(`/api/promotions?t=${now}`, { cache: "no-store" }),
        fetch(`/api/categories?t=${now}`, { cache: "no-store" }),
        fetch(`/api/branches?t=${now}`, { cache: "no-store" }),
        fetch(`/api/settings?t=${now}`, { cache: "no-store" }),
        fetch(`/api/leads?t=${now}`, { cache: "no-store" }),
        fetch(`/api/admin/auth/me?t=${now}`, { cache: "no-store" }),
        fetch(`/api/tiers?t=${now}`, { cache: "no-store" }),
      ]);

      if (eqRes.ok) setEquipment((await eqRes.json()).items || []);
      if (prRes.ok) setPromotions((await prRes.json()).promotions || []);
      if (catRes.ok) setCategories((await catRes.json()).categories || []);
      if (brRes.ok) setBranches((await brRes.json()).branches || []);
      if (setRes.ok) setSettings((await setRes.json()).settings || settings);
      if (ldRes.ok) setLeads((await ldRes.json()).leads || []);
      if (meRes.ok) setAdminEmail((await meRes.json()).email || "admin@prokateka.kz");
      if (tierRes.ok) setTiers(await tierRes.json() || []);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        if (editingItem) setEditingItem({ ...editingItem, image: data.url });
        showToast("Фото успешно загружено");
      } else {
        showToast("Ошибка при загрузке фото");
      }
    } catch (err) {
      showToast("Ошибка при загрузке фото");
    } finally {
      setIsUploading(false);
    }
  };

  // 1-CLICK STOCK TOGGLE (Crucial user request!)
  const handleToggleStock = async (item: EquipmentItem) => {
    const updated = !item.inStock;
    // Optimistic UI update
    setEquipment((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, inStock: updated } : i))
    );

    try {
      const res = await fetch("/api/equipment", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, inStock: updated }),
      });
      if (res.ok) {
        showToast(
          updated
            ? `«${item.name}» теперь В НАЛИЧИИ`
            : `«${item.name}» переведен В АРЕНДУ (серый цвет)`
        );
      } else {
        throw new Error();
      }
    } catch {
      // Revert if error
      setEquipment((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, inStock: !updated } : i))
      );
      showToast("Ошибка сохранения статуса");
    }
  };

  // DELETE ITEM
  const handleDeleteEquipment = async (id: string, name: string) => {
    if (!confirm(`Вы действительно хотите удалить «${name}» из каталога?`)) return;

    try {
      const res = await fetch(`/api/equipment?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEquipment((prev) => prev.filter((i) => i.id !== id));
        showToast(`Позиция «${name}» удалена`);
      }
    } catch {
      showToast("Ошибка удаления");
    }
  };

  // SAVE ITEM (CREATE OR UPDATE)
  const handleSaveEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);

    try {
      const isNew = !equipment.some((i) => i.id === editingItem.id);
      const res = await fetch("/api/equipment", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (res.ok) {
        await fetchAllData();
        setIsItemModalOpen(false);
        setEditingItem(null);
        showToast(isNew ? "Позиция добавлена!" : "Изменения сохранены!");
      } else {
        showToast("Ошибка сохранения");
      }
    } catch {
      showToast("Ошибка сети");
    } finally {
      setSaving(false);
    }
  };

  // DELETE PROMO
  const handleDeletePromotion = async (id: string, title: string) => {
    if (!confirm(`Удалить акцию «${title}»? Она сразу перестанет действовать на сайте.`)) return;

    try {
      const res = await fetch(`/api/promotions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setPromotions((prev) => prev.filter((p) => p.id !== id));
        showToast("Акция удалена!");
      }
    } catch {
      showToast("Ошибка при удалении акции");
    }
  };

  // TOGGLE PROMO ACTIVE
  const handleTogglePromoActive = async (promo: DynamicPromotion) => {
    const updated = !promo.isActive;
    setPromotions((prev) =>
      prev.map((p) => (p.id === promo.id ? { ...p, isActive: updated } : p))
    );

    try {
      await fetch("/api/promotions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: promo.id, isActive: updated }),
      });
      showToast(updated ? "Акция включена" : "Акция приостановлена");
    } catch {
      setPromotions((prev) =>
        prev.map((p) => (p.id === promo.id ? { ...p, isActive: !updated } : p))
      );
      showToast("Ошибка сохранения акции");
    }
  };

  // SAVE PROMO
  const handleSavePromotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo) return;
    setSaving(true);

    try {
      const isNew = !promotions.some((p) => p.id === editingPromo.id);
      const res = await fetch("/api/promotions", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPromo),
      });

      if (res.ok) {
        await fetchAllData();
        setIsPromoModalOpen(false);
        setEditingPromo(null);
        showToast(isNew ? "Новая акция создана и активирована!" : "Акция обновлена!");
      }
    } catch {
      showToast("Ошибка при сохранении акции");
    } finally {
      setSaving(false);
    }
  };

  // SAVE SETTINGS
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { settings };
      if (adminEmail) payload.adminEmail = adminEmail;
      if (adminPasswordInput) payload.adminPassword = adminPasswordInput;

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await fetchAllData();
        showToast("Настройки сервиса успешно обновлены!");
        setAdminPasswordInput("");
      }
    } catch {
      showToast("Ошибка сохранения настроек");
    } finally {
      setSaving(false);
    }
  };

  // UPDATE LEAD STATUS
  const handleUpdateLeadStatus = async (id: string, status: LeadItem["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      showToast("Статус заявки обновлен");
    } catch {
      showToast("Ошибка обновления");
    }
  };

  // Filtered equipment list for UI
  const filteredEq = equipment.filter((i) => {
    if (eqTierFilter !== "all" && i.tier !== eqTierFilter) return false;
    if (eqSearch.trim()) {
      const q = eqSearch.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        (i.nameKz && i.nameKz.toLowerCase().includes(q)) ||
        i.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInStock = equipment.filter((i) => i.inStock).length;
  const totalRented = equipment.filter((i) => !i.inStock).length;

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex font-sans selection:bg-brand-500 selection:text-navy-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-500 text-navy-950 font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200 text-sm">
          <CheckCircle2 className="w-4 h-4 text-navy-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-navy-900 border-r border-white/10 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div>
          {/* Logo Bar */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center p-2 shadow-lg shadow-brand-500/20">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={30}
                height={30}
                className="object-contain invert brightness-0"
              />
            </div>
            <div>
              <span className="font-black text-white text-base tracking-wider block">
                PRO<span className="text-brand-400">kateka</span>
              </span>
              <span className="text-[10px] text-brand-400 font-bold uppercase tracking-widest block">
                Панель управления
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "dashboard"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Дашборд и обзор</span>
            </button>

            <button
              onClick={() => setActiveTab("equipment")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "equipment"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Wrench className="w-4 h-4" />
                <span>Парк техники</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "equipment"
                    ? "bg-navy-950/20 text-navy-950 font-extrabold"
                    : "bg-navy-800 text-slate-400"
                }`}
              >
                {equipment.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("promotions")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "promotions"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4" />
                <span>Акции (3+1, 5+2)</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "promotions"
                    ? "bg-navy-950/20 text-navy-950 font-extrabold"
                    : "bg-navy-800 text-brand-400 font-bold"
                }`}
              >
                {promotions.filter((p) => p.isActive).length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("tiers")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "tiers"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Разделы ({tiers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "categories"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Категории ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("branches")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "branches"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Филиалы и склады ({branches.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "leads"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Журнал заявок</span>
              </div>
              {leads.filter((l) => l.status === "new").length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-navy-950 font-extrabold animate-pulse">
                  +{leads.filter((l) => l.status === "new").length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === "settings"
                  ? "bg-brand-500 text-navy-950 shadow-md shadow-brand-500/20"
                  : "text-slate-300 hover:bg-navy-800 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Контакты и реквизиты</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-300 transition-colors"
          >
            <span>Открыть сайт</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Выйти из админки</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-navy-900/60 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold text-white capitalize">
              {activeTab === "dashboard" && "Сводка сервиса"}
              {activeTab === "equipment" && "Парк техники и инструмента"}
              {activeTab === "promotions" && "Конструктор акций (3+1, 5+2)"}
              {activeTab === "categories" && "Категории каталога"}
              {activeTab === "branches" && "Филиалы и 2GIS"}
              {activeTab === "leads" && "Входящие заявки из калькулятора"}
              {activeTab === "settings" && "Реквизиты и WhatsApp"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchAllData}
              title="Обновить данные"
              className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <div className="text-right">
              <span className="text-xs font-bold text-white block">{adminEmail}</span>
              <span className="text-[10px] text-emerald-400 block font-semibold">Администратор</span>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="p-6 md:p-8 space-y-6">
          {/* ========================================================
              TAB 1: DASHBOARD
             ======================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-navy-900 border border-white/10">
                  <div className="flex items-center justify-between text-slate-400 mb-2 text-xs font-bold uppercase tracking-wider">
                    <span>Всего в парке</span>
                    <Wrench className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="text-3xl font-black text-white">{equipment.length}</div>
                  <div className="text-[11px] text-slate-400 mt-1">активных моделей в каталоге</div>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-emerald-400 mb-2 text-xs font-bold uppercase tracking-wider">
                    <span>В наличии</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-black text-white">{totalInStock}</div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">готовы к выдаче клиентам</div>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-amber-500/20">
                  <div className="flex items-center justify-between text-amber-400 mb-2 text-xs font-bold uppercase tracking-wider">
                    <span>В аренде (на объекте)</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-black text-white">{totalRented}</div>
                  <div className="text-[11px] text-amber-400/80 mt-1">отображаются серыми на сайте</div>
                </div>

                <div className="p-5 rounded-2xl bg-navy-900 border border-purple-500/20">
                  <div className="flex items-center justify-between text-purple-400 mb-2 text-xs font-bold uppercase tracking-wider">
                    <span>Активных акций</span>
                    <Gift className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-black text-white">
                    {promotions.filter((p) => p.isActive).length}
                  </div>
                  <div className="text-[11px] text-purple-400/80 mt-1">автоматически считаются в калькуляторе</div>
                </div>
              </div>

              {/* Quick Toggle Board (1-Click Availability Switch) */}
              <div className="p-6 rounded-2xl bg-navy-900 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      Быстрое переключение наличия (в 1 клик)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Кликните по тумблеру позиции, чтобы мгновенно сдать инструмент в аренду (сделать серым) или вернуть в наличие
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("equipment")}
                    className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                  >
                    <span>Все позиции ({equipment.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {equipment.slice(0, 9).map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        item.inStock
                          ? "bg-navy-950/80 border-white/10"
                          : "bg-navy-950/40 border-slate-700/50 opacity-75"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-navy-900 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className={`object-cover ${item.inStock ? "" : "grayscale"}`}
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleStock(item)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                          item.inStock
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.inStock ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                          }`}
                        />
                        <span>{item.inStock ? "В наличии" : "В аренде"}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent WhatsApp Leads */}
              <div className="p-6 rounded-2xl bg-navy-900 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-extrabold text-white">
                    Последние заявки из калькулятора сайта
                  </h3>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-bold text-brand-400 hover:text-brand-300"
                  >
                    Перейти в журнал
                  </button>
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    Заявок пока нет. При расчете в калькуляторе сайта они будут автоматически сохраняться здесь.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase">
                          <th className="pb-3">Дата</th>
                          <th className="pb-3">Клиент</th>
                          <th className="pb-3">Техника</th>
                          <th className="pb-3">Срок</th>
                          <th className="pb-3">Статус</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {leads.slice(0, 5).map((l) => (
                          <tr key={l.id} className="hover:bg-white/[0.02]">
                            <td className="py-3 text-slate-400">
                              {new Date(l.createdAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-3 font-semibold text-white">
                              {l.customerName}
                              <span className="block text-[11px] text-slate-400">
                                {l.customerPhone}
                              </span>
                            </td>
                            <td className="py-3 text-slate-300">{l.equipmentName}</td>
                            <td className="py-3 text-slate-400">
                              {l.days} {l.durationUnit}
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  l.status === "new"
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : l.status === "in_rent"
                                    ? "bg-amber-500/20 text-amber-300"
                                    : "bg-slate-700 text-slate-300"
                                }`}
                              >
                                {l.status === "new" && "Новая"}
                                {l.status === "in_rent" && "В аренде"}
                                {l.status === "completed" && "Завершена"}
                                {l.status === "cancelled" && "Отменена"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: EQUIPMENT MANAGEMENT
             ======================================================== */}
          {activeTab === "equipment" && (
            <div className="space-y-4">
              {/* Header Bar with Action & Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative w-64 sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Поиск по названию или категории..."
                      value={eqSearch}
                      onChange={(e) => setEqSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <select
                    value={eqTierFilter}
                    onChange={(e) => setEqTierFilter(e.target.value)}
                    className="bg-navy-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="all">Все разделы</option>
                    {tiers.map((t) => (
                      <option key={t.id} value={t.id}>{t.nameRu}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setEditingItem({
                      id: `tool-${Date.now()}`,
                      name: "",
                      nameKz: "",
                      tier: "tool",
                      categoryId: categories[0]?.id || "tools-general",
                      category: categories[0]?.nameRu || "Инструменты",
                      categoryKz: categories[0]?.nameKz || "Құралдар",
                      powerType: "220v",
                      image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
                      gallery: [],
                      priceDay: 5000,
                      deposit: 15000,
                      inStock: true,
                      stockCount: 1,
                      branch: "Склад Бектурова 4Г (Астана)",
                      branchKz: "Бектұров 4Г қоймасы (Астана)",
                      branchId: "astana-bekturova",
                      specs: [
                        { key: "Мощность", keyKz: "Қуаты", value: "1500 Вт" },
                        { key: "Вес", keyKz: "Салмағы", value: "5 кг" },
                      ],
                      description: "",
                      descriptionKz: "",
                    });
                    setIsItemModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-brand-500/20 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить позицию в каталог</span>
                </button>
              </div>

              {/* Table of items */}
              <div className="bg-navy-900 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-navy-950/60 border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4">Фото</th>
                        <th className="py-3 px-4">Наименование</th>
                        <th className="py-3 px-4">Категория / Раздел</th>
                        <th className="py-3 px-4 text-center">Наличие (Тумблер)</th>
                        <th className="py-3 px-4 text-right">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredEq.map((item) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-white/[0.02] transition-colors ${
                            item.inStock ? "" : "opacity-75 bg-navy-950/20"
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-navy-950">
                              <Image
                                src={item.image}
                                alt=""
                                fill
                                className={`object-cover ${item.inStock ? "" : "grayscale"}`}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-white block text-sm">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              KZ: {item.nameKz || item.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            <span className="font-semibold block">{item.category}</span>
                            <span className="text-[10px] text-brand-400 uppercase font-bold">
                              {item.tier}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggleStock(item)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                                item.inStock
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-sm shadow-emerald-500/10"
                                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 shadow-sm shadow-amber-500/10"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.inStock ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                                }`}
                              />
                              <span>{item.inStock ? "В наличии" : "В аренде"}</span>
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingItem({ ...item });
                                  setIsItemModalOpen(true);
                                }}
                                className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white transition-colors"
                                title="Редактировать"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteEquipment(item.id, item.name)}
                                className="p-2 rounded-lg bg-navy-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                                title="Удалить"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: PROMOTION ENGINE (3+1, 5+2, ETC.)
             ======================================================== */}
          {activeTab === "promotions" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-amber-500/10 to-transparent border border-brand-500/20">
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Gift className="w-5 h-5 text-brand-400" />
                    <span>Динамический конструктор акций</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    Здесь вы можете добавлять и удалять акции по формуле «X + Y» (например, 3+1, 5+2, 7+3). 
                    Любая включенная акция <strong>автоматически рассчитывается в калькуляторе сайта</strong>, 
                    дарит бесплатные дни и отображается на странице акций.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingPromo({
                      id: `promo-${Date.now()}`,
                      type: "x_plus_y",
                      badgeRu: "3+1",
                      badgeKz: "3+1",
                      payDays: 3,
                      freeDays: 1,
                      minDays: 4,
                      titleRu: "3 + 1: Четвёртый день аренды бесплатно",
                      titleKz: "3 + 1: Жалға алудың төртінші күні сыйлыққа",
                      subtitleRu: "При аренде любого инструмента на 3 суток — четвертые сутки за наш счет!",
                      subtitleKz: "Кез келген құралды 3 тәулікке жалға алғанда — төртінші тәулік тегін!",
                      descriptionRu: "Оплачивайте 3 суток и пользуйтесь 4 полных дня.",
                      descriptionKz: "Тек 3 тәулікті төлеп, құралды 4 толық күн пайдаланыңыз.",
                      applicableTiers: ["tool", "equipment"],
                      isActive: true,
                      createdAt: new Date().toISOString(),
                    });
                    setIsPromoModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-brand-500/20 active:scale-95 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Создать новую акцию</span>
                </button>
              </div>

              {/* Promotions Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      promo.isActive
                        ? "bg-navy-900 border-white/10 shadow-lg"
                        : "bg-navy-950/60 border-slate-800 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-500 text-navy-950">
                          {promo.badgeRu}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          Формула: {promo.payDays} оплата + {promo.freeDays} в подарок ({promo.minDays} дн.)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePromoActive(promo)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                            promo.isActive
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {promo.isActive ? "Активна" : "Приостановлена"}
                        </button>

                        <button
                          onClick={() => handleDeletePromotion(promo.id, promo.titleRu)}
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Удалить акцию"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base font-extrabold text-white mb-1">{promo.titleRu}</h4>
                    <p className="text-xs text-brand-300 font-semibold mb-2">{promo.subtitleRu}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{promo.descriptionRu}</p>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                      <div>
                        Применяется к:{" "}
                        <strong className="text-white">
                          {promo.applicableTiers.join(", ")}
                        </strong>
                      </div>
                      <button
                        onClick={() => {
                          setEditingPromo({ ...promo });
                          setIsPromoModalOpen(true);
                        }}
                        className="text-brand-400 hover:underline font-bold"
                      >
                        Редактировать
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3.5: TIERS (РАЗДЕЛЫ)
             ======================================================== */}
          {activeTab === "tiers" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  Управление глобальными разделами каталога (например: Оборудование, Спецтехника).
                </p>
                <button
                  onClick={() => {
                    setEditingTier({
                      id: `tier-${Date.now()}`,
                      nameRu: "",
                      nameKz: "",
                    });
                    setIsTierModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить раздел</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tiers.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-navy-900 border border-white/10 flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{t.nameRu}</h4>
                      <p className="text-xs text-slate-400">KZ: {t.nameKz}</p>
                      <p className="text-[10px] text-slate-500 mt-2 font-mono">{t.id}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingTier({ ...t });
                          setIsTierModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Удалить раздел «${t.nameRu}»?`)) {
                            await fetch(`/api/tiers?id=${t.id}`, { method: "DELETE" });
                            fetchAllData();
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: CATEGORIES
             ======================================================== */}
          {activeTab === "categories" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  Управление рубрикатором сайта. Вы можете изменять названия и порядок категорий.
                </p>
                <button
                  onClick={() => {
                    setEditingCat({
                      id: `cat-${Date.now()}`,
                      nameRu: "",
                      nameKz: "",
                      tier: "tool",
                      iconName: "Wrench",
                      itemCount: 0,
                      startPrice: 3000,
                      priceUnitRu: "сутки",
                      priceUnitKz: "тәулік",
                      descriptionRu: "",
                      descriptionKz: "",
                    });
                    setIsCatModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить категорию</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-navy-900 border border-white/10 flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-brand-400 font-bold uppercase block mb-1">
                        Раздел: {cat.tier}
                      </span>
                      <h4 className="text-sm font-bold text-white mb-0.5">{cat.nameRu}</h4>
                      <p className="text-xs text-slate-400">KZ: {cat.nameKz}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingCat({ ...cat });
                          setIsCatModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: BRANCHES & 2GIS
             ======================================================== */}
          {activeTab === "branches" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  Филиалы, склады выдачи и ссылки на 2GIS карточки.
                </p>
                <button
                  onClick={() => {
                    setEditingBranch({
                      id: `branch-${Date.now()}`,
                      nameRu: "",
                      nameKz: "",
                      addressRu: "",
                      addressKz: "",
                      gisLink: "https://2gis.kz/astana/geo/70000001065108547",
                      phone: "+7 705 503 6772",
                      workingHoursRu: "Ежедневно: 08:00 – 20:00",
                      workingHoursKz: "Күн сайын: 08:00 – 20:00",
                      isMain: false,
                    });
                    setIsBranchModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold px-4 py-2 rounded-xl text-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Добавить филиал</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {branches.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl bg-navy-900 border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider block">
                          {b.isMain ? "Основной филиал" : "Дополнительный склад"}
                        </span>
                        <h4 className="text-base font-bold text-white">{b.nameRu}</h4>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingBranch({ ...b });
                            setIsBranchModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div>Адрес: {b.addressRu}</div>
                      <div>Телефон: {b.phone}</div>
                      <div>Режим: {b.workingHoursRu}</div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <a
                        href={b.gisLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Проверить в 2GIS</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: LEADS JOURNAL (MINI-CRM)
             ======================================================== */}
          {activeTab === "leads" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  Все отправленные расчеты из калькулятора сайта. Клиенты не регистрируются, но заявки сохраняются для вас.
                </p>
                <span className="text-xs font-bold text-slate-300">
                  Всего записей: {leads.length}
                </span>
              </div>

              <div className="bg-navy-900 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-navy-950/60 border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4">Дата / Время</th>
                        <th className="py-3 px-4">Клиент</th>
                        <th className="py-3 px-4">Техника</th>
                        <th className="py-3 px-4">Срок</th>
                        <th className="py-3 px-4">Доставка</th>
                        <th className="py-3 px-4">Статус</th>
                        <th className="py-3 px-4 text-right">WhatsApp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 px-4 text-slate-400">
                            {new Date(lead.createdAt).toLocaleDateString("ru-RU", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3 px-4 font-bold text-white">
                            {lead.customerName}
                            <span className="block text-[11px] text-slate-400 font-normal">
                              {lead.customerPhone}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-300 font-semibold">
                            {lead.equipmentName}
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {lead.days} {lead.durationUnit}
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            {lead.deliveryType === "delivery"
                              ? `Доставка: ${lead.address || "адрес уточняется"}`
                              : "Самовывоз"}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateLeadStatus(lead.id, e.target.value as any)
                              }
                              className="bg-navy-950 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                            >
                              <option value="new">Новая</option>
                              <option value="in_rent">В аренде</option>
                              <option value="completed">Завершена</option>
                              <option value="cancelled">Отменена</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {lead.customerPhone && lead.customerPhone !== "Не указан" && (
                              <a
                                href={`https://wa.me/${lead.customerPhone.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-lg text-[10px]"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>Написать</span>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: SETTINGS & WHATSAPP
             ======================================================== */}
          {activeTab === "settings" && (
            <div className="max-w-2xl bg-navy-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-white">
                  Настройки сервиса и контактные данные
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Изменение номера WhatsApp немедленно меняет получателя заявок со всех кнопок сайта
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Номер WhatsApp для приема заказов (только цифры, без +)
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.whatsappNumber}
                    onChange={(e) =>
                      setSettings({ ...settings, whatsappNumber: e.target.value.replace(/\D/g, "") })
                    }
                    placeholder="77055036772"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Текущая ссылка: https://wa.me/{settings.whatsappNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Телефон для звонков
                    </label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Режим работы
                    </label>
                    <input
                      type="text"
                      value={settings.workingHours}
                      onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Видео о компании (YouTube Ссылка)
                  </label>
                  <input
                    type="text"
                    value={settings.youtubeVideoUrl || ""}
                    onChange={(e) => setSettings({ ...settings, youtubeVideoUrl: e.target.value })}
                    placeholder="https://youtu.be/... или https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                  
                  {/* Status & Preview */}
                  {(() => {
                    const parsed = parseVideoUrl(settings.youtubeVideoUrl || "");
                    if (!settings.youtubeVideoUrl?.trim()) {
                      return (
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Поддерживаются любые ссылки: обычные (youtube.com/watch?v=...), короткие (youtu.be/...), Shorts, Live или код вставки &lt;iframe&gt;.
                        </span>
                      );
                    }
                    if (parsed.type === "youtube" && parsed.id) {
                      return (
                        <div className="mt-3 p-3.5 rounded-xl bg-navy-950 border border-emerald-500/30 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              YouTube видео распознано (ID: {parsed.id})
                            </span>
                            {parsed.watchUrl && (
                              <a
                                href={parsed.watchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] text-brand-400 hover:underline"
                              >
                                Проверить на YouTube <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <div className="relative w-full aspect-video max-w-sm rounded-lg overflow-hidden border border-white/10 bg-black">
                            <iframe
                              src={`${parsed.embedUrl}?autoplay=0&rel=0`}
                              title="Предпросмотр видео"
                              className="absolute inset-0 w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 block">
                            💡 Подсказка: ссылка автоматически приводится к формату embed при сохранении.
                          </span>
                        </div>
                      );
                    }
                    return (
                      <span className="text-[11px] text-amber-400 mt-1 block">
                        Не удалось автоматически определить YouTube ID. Проверьте правильность ссылки.
                      </span>
                    );
                  })()}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3">Официальные реквизиты компании</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Наименование юрлица</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">ИИН / БИН</label>
                        <input
                          type="text"
                          value={settings.companyBin}
                          onChange={(e) => setSettings({ ...settings, companyBin: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-400 mb-1">Руководитель</label>
                        <input
                          type="text"
                          value={settings.headName}
                          onChange={(e) => setSettings({ ...settings, headName: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white mb-3">Смена Email и Пароля входа в админку</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Email администратора</label>
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Новый пароль (оставьте пустым, если не меняете)</label>
                      <input
                        type="password"
                        placeholder="Введите новый пароль"
                        value={adminPasswordInput}
                        onChange={(e) => setAdminPasswordInput(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-brand-500 hover:bg-brand-600 text-navy-950 font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-brand-500/20 disabled:opacity-50 text-sm"
                  >
                    {saving ? "Сохранение..." : "Сохранить все настройки"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================
          MODAL: ADD / EDIT EQUIPMENT ITEM
         ======================================================== */}
      {isItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8 sm:my-12">
            <h3 className="text-lg font-black text-white mb-4">
              {equipment.some((i) => i.id === editingItem.id)
                ? "Редактирование позиции"
                : "Новая позиция в каталоге"}
            </h3>

            <form onSubmit={handleSaveEquipment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Название (RU)</label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Название (KZ)</label>
                  <input
                    type="text"
                    value={editingItem.nameKz}
                    onChange={(e) => setEditingItem({ ...editingItem, nameKz: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Раздел (Tier)</label>
                  <select
                    value={editingItem.tier}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, tier: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                  >
                    {tiers.map((t) => (
                      <option key={t.id} value={t.id}>{t.nameRu}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Категория</label>
                  <select
                    value={editingItem.categoryId}
                    onChange={(e) => {
                      const selected = categories.find((c) => c.id === e.target.value);
                      setEditingItem({
                        ...editingItem,
                        categoryId: e.target.value,
                        category: selected ? selected.nameRu : editingItem.category,
                        categoryKz: selected ? selected.nameKz : editingItem.categoryKz,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                  >
                    {categories.filter(c => c.tier === editingItem.tier).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameRu}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Тип питания</label>
                  <select
                    value={editingItem.powerType}
                    onChange={(e) => setEditingItem({ ...editingItem, powerType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                  >
                    <option value="220v">Сеть 220 В</option>
                    <option value="380v">Сеть 380 В</option>
                    <option value="gasoline">Бензин</option>
                    <option value="diesel">Дизель</option>
                    <option value="battery">Аккумулятор</option>
                    <option value="manual">Механический</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Empty grid replacing prices */}
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300">Технические характеристики</label>
                  <button
                    type="button"
                    onClick={() => setEditingItem({
                      ...editingItem,
                      specs: [...(editingItem.specs || []), { key: "", keyKz: "", value: "" }]
                    })}
                    className="text-[10px] bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 px-2 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Добавить
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(editingItem.specs || []).map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Название (RU)"
                        value={spec.key}
                        onChange={(e) => {
                          const newSpecs = [...editingItem.specs];
                          newSpecs[sIdx].key = e.target.value;
                          setEditingItem({ ...editingItem, specs: newSpecs });
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500"
                      />
                      <input
                        type="text"
                        placeholder="Название (KZ)"
                        value={spec.keyKz}
                        onChange={(e) => {
                          const newSpecs = [...editingItem.specs];
                          newSpecs[sIdx].keyKz = e.target.value;
                          setEditingItem({ ...editingItem, specs: newSpecs });
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500"
                      />
                      <input
                        type="text"
                        placeholder="Значение"
                        value={spec.value}
                        onChange={(e) => {
                          const newSpecs = [...editingItem.specs];
                          newSpecs[sIdx].value = e.target.value;
                          setEditingItem({ ...editingItem, specs: newSpecs });
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-brand-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSpecs = editingItem.specs.filter((_, idx) => idx !== sIdx);
                          setEditingItem({ ...editingItem, specs: newSpecs });
                        }}
                        className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl transition-colors flex-shrink-0"
                        title="Удалить характеристику"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {(!editingItem.specs || editingItem.specs.length === 0) && (
                    <div className="text-center py-3 border border-dashed border-white/10 rounded-xl text-[10px] text-slate-500">
                      Нет характеристик. Нажмите «Добавить», чтобы указать мощность, вес и т.д.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Комплектация / Описание (RU)</label>
                <textarea
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Комплектация / Описание (KZ)</label>
                <textarea
                  value={editingItem.descriptionKz || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, descriptionKz: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Фотография (URL или загрузка)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                  />
                  <label className="relative cursor-pointer bg-brand-500 hover:bg-brand-600 text-navy-950 px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center">
                    {isUploading ? "Загрузка..." : "С галереи"}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={editingItem.inStock}
                    onChange={(e) => setEditingItem({ ...editingItem, inStock: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-500 bg-navy-950 border-white/10"
                  />
                  <span className="font-bold text-white">В наличии</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.popular)}
                    onChange={(e) => setEditingItem({ ...editingItem, popular: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-500 bg-navy-950 border-white/10"
                  />
                  <span>Популярный (TOP бейдж)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.operatorIncluded)}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, operatorIncluded: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-brand-500 bg-navy-950 border-white/10"
                  />
                  <span>С экипажем / оператором</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 text-xs font-bold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-navy-950 text-xs font-bold"
                >
                  {saving ? "Сохранение..." : "Сохранить позицию"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT PROMOTION (3+1, 5+2, ETC.)
         ======================================================== */}
      {isPromoModalOpen && editingPromo && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8 sm:my-12">
            <h3 className="text-lg font-black text-white mb-2">Настройка акции «X + Y»</h3>
            <p className="text-xs text-slate-400 mb-4">
              Задайте сколько дней оплачивает клиент и сколько дней получает бесплатно в подарок
            </p>

            <form onSubmit={handleSavePromotion} className="space-y-4">
              {/* Formula X + Y */}
              <div className="p-4 rounded-xl bg-navy-950 border border-brand-500/30 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-300 mb-1">
                    Оплачивает клиент (дней):
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingPromo.payDays}
                    onChange={(e) => {
                      const pay = Number(e.target.value);
                      const free = editingPromo.freeDays;
                      setEditingPromo({
                        ...editingPromo,
                        payDays: pay,
                        minDays: pay + free,
                        badgeRu: `${pay}+${free}`,
                        badgeKz: `${pay}+${free}`,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-sm font-bold text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Например: 3 или 5</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-300 mb-1">
                    В подарок бесплатно (дней):
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingPromo.freeDays}
                    onChange={(e) => {
                      const free = Number(e.target.value);
                      const pay = editingPromo.payDays;
                      setEditingPromo({
                        ...editingPromo,
                        freeDays: free,
                        minDays: pay + free,
                        badgeRu: `${pay}+${free}`,
                        badgeKz: `${pay}+${free}`,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-sm font-bold text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Например: 1 или 2</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Заголовок акции (RU)</label>
                <input
                  type="text"
                  required
                  value={editingPromo.titleRu}
                  onChange={(e) => setEditingPromo({ ...editingPromo, titleRu: e.target.value })}
                  placeholder="3 + 1: Четвёртый день аренды бесплатно"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Заголовок акции (KZ)</label>
                <input
                  type="text"
                  value={editingPromo.titleKz}
                  onChange={(e) => setEditingPromo({ ...editingPromo, titleKz: e.target.value })}
                  placeholder="3 + 1: Жалға алудың төртінші күні сыйлыққа"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Краткий подзаголовок</label>
                <input
                  type="text"
                  value={editingPromo.subtitleRu}
                  onChange={(e) => setEditingPromo({ ...editingPromo, subtitleRu: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Условия акции (Описание RU)</label>
                <textarea
                  value={editingPromo.descriptionRu || ""}
                  onChange={(e) => setEditingPromo({ ...editingPromo, descriptionRu: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Условия акции (Описание KZ)</label>
                <textarea
                  value={editingPromo.descriptionKz || ""}
                  onChange={(e) => setEditingPromo({ ...editingPromo, descriptionKz: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-xs text-white min-h-[80px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="promoActive"
                  checked={editingPromo.isActive}
                  onChange={(e) => setEditingPromo({ ...editingPromo, isActive: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-500 bg-navy-950"
                />
                <label htmlFor="promoActive" className="text-xs font-bold text-white cursor-pointer">
                  Акция активна и сразу применяется в калькуляторе сайта
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 text-xs font-bold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-navy-950 text-xs font-bold"
                >
                  {saving ? "Сохранение..." : "Сохранить акцию"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT TIER
         ======================================================== */}
      {isTierModalOpen && editingTier && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8 sm:my-12">
            <h3 className="text-base font-bold text-white mb-3">Глобальный раздел (Tier)</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                const isNew = !tiers.some((t) => t.id === editingTier.id);
                const res = await fetch("/api/tiers", {
                  method: isNew ? "POST" : "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(editingTier),
                });
                if (res.ok) {
                  await fetchAllData();
                  setIsTierModalOpen(false);
                  showToast("Раздел сохранен!");
                }
                setSaving(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">ID (лат. буквы без пробелов, например: scaffolding)</label>
                <input
                  type="text"
                  required
                  disabled={tiers.some((t) => t.id === editingTier.id)}
                  value={editingTier.id.replace("tier-", "")}
                  onChange={(e) => setEditingTier({ ...editingTier, id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Название (RU)</label>
                <input
                  type="text"
                  required
                  value={editingTier.nameRu}
                  onChange={(e) => setEditingTier({ ...editingTier, nameRu: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Название (KZ)</label>
                <input
                  type="text"
                  required
                  value={editingTier.nameKz}
                  onChange={(e) => setEditingTier({ ...editingTier, nameKz: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTierModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 text-slate-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 rounded-lg bg-brand-500 font-bold text-navy-950"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT CATEGORY
         ======================================================== */}
      {isCatModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8 sm:my-12">
            <h3 className="text-base font-bold text-white mb-3">Категория каталога</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                const isNew = !categories.some((c) => c.id === editingCat.id);
                await fetch("/api/categories", {
                  method: isNew ? "POST" : "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(editingCat),
                });
                await fetchAllData();
                setIsCatModalOpen(false);
                setSaving(false);
                showToast("Категория сохранена!");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">Название (RU)</label>
                <input
                  type="text"
                  required
                  value={editingCat.nameRu}
                  onChange={(e) => setEditingCat({ ...editingCat, nameRu: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Название (KZ)</label>
                <input
                  type="text"
                  value={editingCat.nameKz}
                  onChange={(e) => setEditingCat({ ...editingCat, nameKz: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Раздел</label>
                <select
                  value={editingCat.tier}
                  onChange={(e) => setEditingCat({ ...editingCat, tier: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                >
                  {tiers.map((t) => (
                    <option key={t.id} value={t.id}>{t.nameRu}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 text-slate-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 rounded-lg bg-brand-500 font-bold text-navy-950"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT BRANCH
         ======================================================== */}
      {isBranchModalOpen && editingBranch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-navy-900 border border-white/10 rounded-2xl p-6 shadow-2xl my-8 sm:my-12">
            <h3 className="text-base font-bold text-white mb-3">Филиал / Склад выдачи</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSaving(true);
                const isNew = !branches.some((b) => b.id === editingBranch.id);
                await fetch("/api/branches", {
                  method: isNew ? "POST" : "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(editingBranch),
                });
                await fetchAllData();
                setIsBranchModalOpen(false);
                setSaving(false);
                showToast("Филиал сохранен!");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-300 mb-1">Название филиала (RU)</label>
                <input
                  type="text"
                  required
                  value={editingBranch.nameRu}
                  onChange={(e) => setEditingBranch({ ...editingBranch, nameRu: e.target.value })}
                  placeholder="Склад выдачи Бектурова 4Г"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Адрес (RU)</label>
                <input
                  type="text"
                  required
                  value={editingBranch.addressRu}
                  onChange={(e) => setEditingBranch({ ...editingBranch, addressRu: e.target.value })}
                  placeholder="г. Астана, ул. Абикена Бектурова, 4Г"
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Ссылка на карточку в 2GIS</label>
                <input
                  type="text"
                  value={editingBranch.gisLink}
                  onChange={(e) => setEditingBranch({ ...editingBranch, gisLink: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Телефон филиала</label>
                <input
                  type="text"
                  value={editingBranch.phone}
                  onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsBranchModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 text-slate-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 rounded-lg bg-brand-500 font-bold text-navy-950"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
