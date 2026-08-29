"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Language,
  DonationEvent,
  ImpactStory,
  FundAllocationItem,
  TransparencyReport,
  SiteSettings,
} from "@/types";
import {
  PlusCircle,
  TrendingUp,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  Trash2,
  Edit3,
  CheckCircle,
  Lock,
  ArrowRight,
  Eye,
  BookOpen,
  FolderHeart,
  Quote,
  PieChart,
  FileText,
  Save,
  Download,
  Award,
} from "lucide-react";
import { INITIAL_SETTINGS } from "@/lib/settings";

export default function AdminDashboardPage() {
  const [lang, setLang] = useState<Language>("en");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // Active Tab: "events" | "stories" | "transparency" | "reports" | "stats"
  const [activeTab, setActiveTab] = useState<
    "events" | "stories" | "transparency" | "reports" | "stats"
  >("events");

  // Events State
  const [events, setEvents] = useState<DonationEvent[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<DonationEvent | null>(null);

  // Stories State
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null);

  // Settings State (Fund Allocation, Reports, Impact Stats)
  const [fundAllocation, setFundAllocation] = useState<FundAllocationItem[]>(
    INITIAL_SETTINGS.fundAllocation
  );
  const [reports, setReports] = useState<TransparencyReport[]>(INITIAL_SETTINGS.reports);
  const [impactStats, setImpactStats] = useState<SiteSettings["impactStats"]>(
    INITIAL_SETTINGS.impactStats
  );
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<TransparencyReport | null>(null);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);

  // Event Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleHi, setTitleHi] = useState("");
  const [category, setCategory] = useState<
    "skills" | "wash" | "nutrition" | "livelihood" | "emergency" | "general"
  >("skills");
  const [targetAmount, setTargetAmount] = useState("");
  const [raisedAmount, setRaisedAmount] = useState("");
  const [donorCount, setDonorCount] = useState("");
  const [locationEn, setLocationEn] = useState("Bikaner District, Rajasthan");
  const [locationHi, setLocationHi] = useState("बीकानेर जिला, राजस्थान");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionHi, setDescriptionHi] = useState("");
  const [eventImage, setEventImage] = useState("/images/hero-charkha.jpeg");
  const [featured, setFeatured] = useState(false);

  // Story Form State
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [villageEn, setVillageEn] = useState("");
  const [villageHi, setVillageHi] = useState("");
  const [storyCategory, setStoryCategory] = useState<
    "skills" | "wash" | "nutrition" | "livelihood"
  >("skills");
  const [headlineEn, setHeadlineEn] = useState("");
  const [headlineHi, setHeadlineHi] = useState("");
  const [storyEn, setStoryEn] = useState("");
  const [storyHi, setStoryHi] = useState("");
  const [quoteEn, setQuoteEn] = useState("");
  const [quoteHi, setQuoteHi] = useState("");
  const [donationImpactEn, setDonationImpactEn] = useState("");
  const [donationImpactHi, setDonationImpactHi] = useState("");
  const [storyEventSlug, setStoryEventSlug] = useState("charkha-revival");
  const [storyImage, setStoryImage] = useState("/images/hero-charkha.jpeg");
  const [storyYear, setStoryYear] = useState("2025");

  // Report Form State
  const [reportTitleEn, setReportTitleEn] = useState("");
  const [reportTitleHi, setReportTitleHi] = useState("");
  const [reportType, setReportType] = useState("PDF Document");
  const [reportSize, setReportSize] = useState("2.1 MB");
  const [reportFileUrl, setReportFileUrl] = useState("/documents/annual-report.pdf");
  const [reportYear, setReportYear] = useState("2024-25");

  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Check existing session on load
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          setAdminToken(data.token);
        }
      } catch {
        // Not authenticated
      }
    }
    checkSession();
  }, []);

  // Server-side PIN authentication
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(false);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setAdminToken(data.token);
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch {
      setPinError(true);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setAdminToken(null);
      setPin("");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      if (data.success) {
        setStories(data.stories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        if (data.settings.fundAllocation) setFundAllocation(data.settings.fundAllocation);
        if (data.settings.reports) setReports(data.settings.reports);
        if (data.settings.impactStats) setImpactStats(data.settings.impactStats);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchStories();
    fetchSettings();
  }, []);

  // Save Settings to Backend API
  const saveSettingsToServer = async (updates: Partial<SiteSettings>) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: adminToken ? `Bearer ${adminToken}` : "",
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSavedMessage("Saved successfully to live site!");
        setTimeout(() => setSettingsSavedMessage(null), 3500);
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  // File Upload Helper to Supabase Storage Bucket
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
    bucket: string = "Images"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: adminToken ? `Bearer ${adminToken}` : "",
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setter(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Event handlers
  const openCreateEventModal = () => {
    setEditingEvent(null);
    setTitleEn("");
    setTitleHi("");
    setCategory("skills");
    setTargetAmount("");
    setRaisedAmount("0");
    setDonorCount("0");
    setLocationEn("Bikaner District, Rajasthan");
    setLocationHi("बीकानेर जिला, राजस्थान");
    setDescriptionEn("");
    setDescriptionHi("");
    setEventImage("/images/hero-charkha.jpeg");
    setFeatured(false);
    setIsEventModalOpen(true);
  };

  const openEditEventModal = (evt: DonationEvent) => {
    setEditingEvent(evt);
    setTitleEn(evt.titleEn);
    setTitleHi(evt.titleHi);
    setCategory(evt.category);
    setTargetAmount(evt.targetAmount.toString());
    setRaisedAmount(evt.raisedAmount.toString());
    setDonorCount(evt.donorCount.toString());
    setLocationEn(evt.locationEn);
    setLocationHi(evt.locationHi);
    setDescriptionEn(evt.descriptionEn);
    setDescriptionHi(evt.descriptionHi);
    setEventImage(evt.image);
    setFeatured(Boolean(evt.featured));
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingEvent?.id,
      titleEn,
      titleHi,
      category,
      targetAmount: Number(targetAmount),
      raisedAmount: Number(raisedAmount || 0),
      donorCount: Number(donorCount || 0),
      locationEn,
      locationHi,
      descriptionEn,
      descriptionHi,
      image: eventImage,
      featured,
      status: editingEvent?.status || "active",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: adminToken ? `Bearer ${adminToken}` : "",
    };

    if (editingEvent) {
      await fetch("/api/events", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/events", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
    }

    setIsEventModalOpen(false);
    fetchEvents();
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this fundraising campaign?")) return;
    await fetch(`/api/events?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: adminToken ? `Bearer ${adminToken}` : "",
      },
    });
    fetchEvents();
  };

  // Story handlers
  const openCreateStoryModal = () => {
    setEditingStory(null);
    setBeneficiaryName("");
    setVillageEn("Kolasar Mandi, Bikaner");
    setVillageHi("कोलासर मंडी, बीकानेर");
    setStoryCategory("skills");
    setHeadlineEn("");
    setHeadlineHi("");
    setStoryEn("");
    setStoryHi("");
    setQuoteEn("");
    setQuoteHi("");
    setDonationImpactEn("₹2,500 funded training and tools");
    setDonationImpactHi("₹2,500 के सहयोग से प्रशिक्षण और उपकरण मिले");
    setStoryEventSlug(events[0]?.slug || "charkha-revival");
    setStoryImage("/images/hero-charkha.jpeg");
    setStoryYear(new Date().getFullYear().toString());
    setIsStoryModalOpen(true);
  };

  const openEditStoryModal = (st: ImpactStory) => {
    setEditingStory(st);
    setBeneficiaryName(st.beneficiaryName);
    setVillageEn(st.villageEn);
    setVillageHi(st.villageHi);
    setStoryCategory(st.category);
    setHeadlineEn(st.headlineEn);
    setHeadlineHi(st.headlineHi);
    setStoryEn(st.storyEn);
    setStoryHi(st.storyHi);
    setQuoteEn(st.quoteEn);
    setQuoteHi(st.quoteHi);
    setDonationImpactEn(st.donationImpactEn);
    setDonationImpactHi(st.donationImpactHi);
    setStoryEventSlug(st.eventSlug);
    setStoryImage(st.image);
    setStoryYear(st.year);
    setIsStoryModalOpen(true);
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingStory?.id,
      beneficiaryName,
      villageEn,
      villageHi,
      category: storyCategory,
      headlineEn,
      headlineHi,
      storyEn,
      storyHi,
      quoteEn,
      quoteHi,
      donationImpactEn,
      donationImpactHi,
      eventSlug: storyEventSlug,
      image: storyImage,
      year: storyYear,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: adminToken ? `Bearer ${adminToken}` : "",
    };

    if (editingStory) {
      await fetch("/api/stories", {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/stories", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
    }

    setIsStoryModalOpen(false);
    fetchStories();
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this impact story?")) return;
    await fetch(`/api/stories?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: adminToken ? `Bearer ${adminToken}` : "",
      },
    });
    fetchStories();
  };

  // Report handlers
  const openCreateReportModal = () => {
    setEditingReport(null);
    setReportTitleEn("");
    setReportTitleHi("");
    setReportType("PDF Document");
    setReportSize("2.0 MB");
    setReportFileUrl("/documents/annual-report.pdf");
    setReportYear("2024-25");
    setIsReportModalOpen(true);
  };

  const openEditReportModal = (rep: TransparencyReport) => {
    setEditingReport(rep);
    setReportTitleEn(rep.titleEn);
    setReportTitleHi(rep.titleHi);
    setReportType(rep.type);
    setReportSize(rep.size);
    setReportFileUrl(rep.fileUrl || "");
    setReportYear(rep.year || "");
    setIsReportModalOpen(true);
  };

  const handleSaveReport = async (e: React.FormEvent) => {
    e.preventDefault();
    let updatedReports: TransparencyReport[];
    if (editingReport) {
      updatedReports = reports.map((r) =>
        r.id === editingReport.id
          ? {
            ...r,
            titleEn: reportTitleEn,
            titleHi: reportTitleHi,
            type: reportType,
            size: reportSize,
            fileUrl: reportFileUrl,
            year: reportYear,
          }
          : r
      );
    } else {
      const newRep: TransparencyReport = {
        id: `rep-${Date.now()}`,
        titleEn: reportTitleEn,
        titleHi: reportTitleHi || reportTitleEn,
        type: reportType,
        size: reportSize,
        fileUrl: reportFileUrl,
        year: reportYear,
      };
      updatedReports = [newRep, ...reports];
    }

    setReports(updatedReports);
    setIsReportModalOpen(false);
    await saveSettingsToServer({ reports: updatedReports });
  };

  const handleDeleteReport = async (id: string) => {
    if (!confirm("Are you sure you want to remove this report?")) return;
    const filtered = reports.filter((r) => r.id !== id);
    setReports(filtered);
    await saveSettingsToServer({ reports: filtered });
  };

  // Fund allocation percentage update
  const handleFundPercentageChange = (id: string, newPercentage: number) => {
    const updated = fundAllocation.map((item) =>
      item.id === id ? { ...item, percentage: newPercentage } : item
    );
    setFundAllocation(updated);
  };

  const totalFundPercentage = fundAllocation.reduce((acc, curr) => acc + curr.percentage, 0);

  // Metrics summary
  const totalTarget = events.reduce((acc, curr) => acc + curr.targetAmount, 0);
  const totalRaised = events.reduce((acc, curr) => acc + curr.raisedAmount, 0);
  const totalDonors = events.reduce((acc, curr) => acc + curr.donorCount, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-cream/40 text-dark">
        <Header lang={lang} onLanguageChange={setLang} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-sage-200 shadow-xl max-w-md w-full text-center space-y-6">
            <div className="w-16 h-16 bg-terracotta/10 text-terracotta rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-serif font-bold text-dark">
                Admin Control Portal
              </h1>
              <p className="text-xs text-dark/70 font-sans">
                Enter your administrative password to access the CMS (secured via signed cryptographic JWT).
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4" suppressHydrationWarning>
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Admin Password or PIN"
                  className="w-full text-center text-base px-4 py-3 bg-cream/50 border border-sage-300 rounded-xl focus:outline-none focus:border-terracotta font-mono"
                  required
                  suppressHydrationWarning
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-2 font-medium">
                    Invalid credentials. Check ADMIN_PASSWORD or ADMIN_PIN in .env.local.
                  </p>
                )}
              </div>
              <button
                type="submit"
                suppressHydrationWarning
                className="w-full py-3 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </main>
        <Footer lang={lang} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream/30 text-dark font-sans">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sage-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
              Full NGO Admin CMS
            </span>
            <h1 className="text-3xl font-serif font-bold text-dark mt-2">
              Jeevan Dhara Management Portal
            </h1>
            <p className="text-sm text-dark/70 font-sans">
              Modify live campaigns, impact stories, transparency fund breakdown, and downloadable PDF reports without editing any code.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-cream border border-sage-300 hover:bg-sage-100 text-dark font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs"
            >
              <Eye className="w-4 h-4" />
              <span>Public Site</span>
            </Link>

            {activeTab === "events" && (
              <button
                onClick={openCreateEventModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Campaign</span>
              </button>
            )}

            {activeTab === "stories" && (
              <button
                onClick={openCreateStoryModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Story</span>
              </button>
            )}

            {activeTab === "reports" && (
              <button
                onClick={openCreateReportModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Report</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Global Success Notification */}
        {settingsSavedMessage && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle className="w-4 h-4 text-green-700" />
            <span>{settingsSavedMessage}</span>
          </div>
        )}

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs">
            <span className="text-xs text-dark/60 font-semibold uppercase tracking-wider">
              Total Raised
            </span>
            <div className="text-2xl font-serif font-bold text-terracotta mt-1">
              ₹{totalRaised.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-sage-800 mt-1 block">
              Target: ₹{totalTarget.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs">
            <span className="text-xs text-dark/60 font-semibold uppercase tracking-wider">
              Verified Donors
            </span>
            <div className="text-2xl font-serif font-bold text-dark mt-1">
              {totalDonors.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-dark/60 mt-1 block">
              Active Contributors
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs">
            <span className="text-xs text-dark/60 font-semibold uppercase tracking-wider">
              Live Campaigns
            </span>
            <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
              {events.length} Causes
            </div>
            <span className="text-[11px] text-dark/60 mt-1 block">
              Public Donation Targets
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-xs">
            <span className="text-xs text-dark/60 font-semibold uppercase tracking-wider">
              Beneficiary Stories
            </span>
            <div className="text-2xl font-serif font-bold text-sage-900 mt-1">
              {stories.length} Published
            </div>
            <span className="text-[11px] text-dark/60 mt-1 block">
              Voices from the Field
            </span>
          </div>
        </div>

        {/* CMS Navigation Tabs */}
        <div className="flex bg-cream p-1.5 rounded-2xl border border-sage-200 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${activeTab === "events"
                ? "bg-terracotta text-white shadow-xs"
                : "text-dark/70 hover:text-dark"
              }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Fundraising Campaigns ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${activeTab === "stories"
                ? "bg-terracotta text-white shadow-xs"
                : "text-dark/70 hover:text-dark"
              }`}
          >
            <Quote className="w-4 h-4" />
            <span>Impact Stories ({stories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("transparency")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${activeTab === "transparency"
                ? "bg-terracotta text-white shadow-xs"
                : "text-dark/70 hover:text-dark"
              }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Fund Utilisation Breakdown</span>
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${activeTab === "reports"
                ? "bg-terracotta text-white shadow-xs"
                : "text-dark/70 hover:text-dark"
              }`}
          >
            <FileText className="w-4 h-4" />
            <span>Statutory Reports ({reports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${activeTab === "stats"
                ? "bg-terracotta text-white shadow-xs"
                : "text-dark/70 hover:text-dark"
              }`}
          >
            <Award className="w-4 h-4" />
            <span>Impact Numbers</span>
          </button>
        </div>

        {/* TAB 1: CAMPAIGNS GRID */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt) => {
                const percent = Math.min(
                  Math.round((evt.raisedAmount / evt.targetAmount) * 100),
                  100
                );
                return (
                  <div
                    key={evt.id}
                    className="bg-white rounded-3xl overflow-hidden border border-sage-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="relative h-44 w-full bg-cream-200">
                      <Image
                        src={evt.image}
                        alt={evt.titleEn}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-dark/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                          {evt.category}
                        </span>
                        {evt.featured && (
                          <span className="px-3 py-1 bg-amber text-dark text-[10px] font-bold uppercase rounded-full tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-serif font-bold text-dark leading-snug line-clamp-2">
                          {evt.titleEn}
                        </h3>
                        <p className="text-xs text-dark/70 font-sans line-clamp-2">
                          {evt.descriptionEn}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-sage-100">
                        <div className="flex justify-between text-xs font-semibold text-dark/75">
                          <span>
                            Raised:{" "}
                            <strong className="text-terracotta">
                              ₹{evt.raisedAmount.toLocaleString("en-IN")}
                            </strong>
                          </span>
                          <span>Target: ₹{evt.targetAmount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="h-2 w-full bg-cream-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-terracotta rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-dark/60">
                          <span>{percent}% Funded</span>
                          <span>{evt.donorCount} Donors</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-sage-100">
                        <Link
                          href={`/donate/${evt.slug}`}
                          target="_blank"
                          className="text-xs font-bold text-terracotta hover:underline inline-flex items-center gap-1"
                        >
                          <span>Live Page</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditEventModal(evt)}
                            className="p-2 hover:bg-sage-100 text-dark/80 hover:text-terracotta rounded-lg transition cursor-pointer"
                            title="Edit Campaign"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-2 hover:bg-red-50 text-dark/60 hover:text-red-600 rounded-lg transition cursor-pointer"
                            title="Delete Campaign"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: IMPACT STORIES GRID */}
        {activeTab === "stories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-3xl overflow-hidden border border-sage-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-cream-200">
                  <Image
                    src={st.image}
                    alt={st.beneficiaryName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-dark/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {st.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-dark">
                          {st.beneficiaryName}
                        </h3>
                        <p className="text-xs text-dark/60 font-sans">{st.villageEn}</p>
                      </div>
                      <span className="text-xs font-mono text-dark/50">{st.year}</span>
                    </div>

                    <p className="text-xs text-dark/80 font-sans italic line-clamp-3 bg-cream/40 p-3 rounded-xl border border-sage-100">
                      "{st.quoteEn}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-sage-100 flex items-center justify-between">
                    <span className="text-[11px] text-terracotta font-semibold truncate max-w-[200px]">
                      {st.donationImpactEn}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditStoryModal(st)}
                        className="p-2 hover:bg-sage-100 text-dark/80 hover:text-terracotta rounded-lg transition cursor-pointer"
                        title="Edit Story"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStory(st.id)}
                        className="p-2 hover:bg-red-50 text-dark/60 hover:text-red-600 rounded-lg transition cursor-pointer"
                        title="Delete Story"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: FUND UTILISATION BREAKDOWN CMS */}
        {activeTab === "transparency" && (
          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-8 max-w-4xl">
            <div>
              <h2 className="text-2xl font-serif font-bold text-dark">
                Fund Utilisation Breakdown Settings
              </h2>
              <p className="text-xs text-dark/70 font-sans mt-1">
                Update the 3 statutory expenditure categories and percentages shown to general donors and auditors on the /transparency page.
              </p>
            </div>

            {/* Live Progress Preview Bar */}
            <div className="space-y-2 bg-cream/40 p-6 rounded-2xl border border-sage-200">
              <div className="flex justify-between items-center text-xs font-bold">
                <span>Live Preview:</span>
                <span className={totalFundPercentage === 100 ? "text-green-700" : "text-red-600"}>
                  Total: {totalFundPercentage}% {totalFundPercentage === 100 ? "✓ (Balanced)" : "⚠️ (Must equal 100%)"}
                </span>
              </div>
              <div className="h-7 w-full rounded-full overflow-hidden flex shadow-inner p-0.5 bg-cream-300">
                {fundAllocation.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                    className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                    title={`${item.categoryEn}: ${item.percentage}%`}
                  />
                ))}
              </div>
            </div>

            {/* Editable Category Form Rows */}
            <div className="space-y-4">
              {fundAllocation.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-sage-200 bg-cream/20 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  <div className="sm:col-span-6 space-y-1">
                    <label className="text-xs font-bold text-dark/80 block uppercase">
                      Category Name (English)
                    </label>
                    <input
                      type="text"
                      value={item.categoryEn}
                      onChange={(e) => {
                        const updated = fundAllocation.map((fa) =>
                          fa.id === item.id ? { ...fa, categoryEn: e.target.value } : fa
                        );
                        setFundAllocation(updated);
                      }}
                      className="w-full px-3 py-2 bg-white border border-sage-300 rounded-xl text-xs"
                    />
                  </div>

                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-xs font-bold text-dark/80 block uppercase">
                      Percentage (%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={item.percentage}
                        onChange={(e) =>
                          handleFundPercentageChange(item.id, Number(e.target.value))
                        }
                        className="w-24 px-3 py-2 bg-white border border-sage-300 rounded-xl text-sm font-bold text-terracotta"
                      />
                      <span className="text-sm font-bold">%</span>
                      <input
                        type="color"
                        value={item.color}
                        onChange={(e) => {
                          const updated = fundAllocation.map((fa) =>
                            fa.id === item.id ? { ...fa, color: e.target.value } : fa
                          );
                          setFundAllocation(updated);
                        }}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-sage-300"
                        title="Pick Category Color"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 text-right">
                    <span className="text-xl font-serif font-bold text-terracotta">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => saveSettingsToServer({ fundAllocation })}
              className="px-6 py-3 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Fund Utilisation Breakdown</span>
            </button>
          </div>
        )}

        {/* TAB 4: STATUTORY & ANNUAL REPORTS CMS */}
        {activeTab === "reports" && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold text-dark">
                  Annual Reports & Statutory Filings
                </h2>
                <p className="text-xs text-dark/70 font-sans mt-1">
                  Manage the downloadable PDF reports and registration certificates on the Transparency page.
                </p>
              </div>
              <button
                onClick={openCreateReportModal}
                className="px-4 py-2.5 bg-terracotta text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Report</span>
              </button>
            </div>

            <div className="space-y-4">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-white p-6 rounded-2xl border border-sage-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-dark">
                        {rep.titleEn}
                      </h4>
                      <p className="text-xs text-dark/60 font-mono mt-0.5">
                        {rep.type} • {rep.size} {rep.year ? `• Year: ${rep.year}` : ""}
                      </p>
                      <p className="text-[11px] text-sage-800 truncate max-w-md mt-1">
                        URL: {rep.fileUrl || "Request via form"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditReportModal(rep)}
                      className="p-2 hover:bg-sage-100 text-dark/80 hover:text-terracotta rounded-lg transition cursor-pointer"
                      title="Edit Document"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReport(rep.id)}
                      className="p-2 hover:bg-red-50 text-dark/60 hover:text-red-600 rounded-lg transition cursor-pointer"
                      title="Delete Document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: IMPACT NUMBERS CMS */}
        {activeTab === "stats" && (
          <div className="bg-white p-8 rounded-3xl border border-sage-200 shadow-sm space-y-6 max-w-3xl">
            <div>
              <h2 className="text-2xl font-serif font-bold text-dark">
                Live Trust & Impact Counter Stats
              </h2>
              <p className="text-xs text-dark/70 font-sans mt-1">
                Edit the milestone metric numbers displayed across the homepage and about page.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Women Skilled
                </label>
                <input
                  type="text"
                  value={impactStats.womenSkilled}
                  onChange={(e) =>
                    setImpactStats({ ...impactStats, womenSkilled: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Villages Reached
                </label>
                <input
                  type="text"
                  value={impactStats.villagesReached}
                  onChange={(e) =>
                    setImpactStats({ ...impactStats, villagesReached: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Active Volunteers
                </label>
                <input
                  type="text"
                  value={impactStats.activeVolunteers}
                  onChange={(e) =>
                    setImpactStats({ ...impactStats, activeVolunteers: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Happy Donors
                </label>
                <input
                  type="text"
                  value={impactStats.donorsCount}
                  onChange={(e) =>
                    setImpactStats({ ...impactStats, donorsCount: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-cream/30 border border-sage-300 rounded-xl text-sm font-bold"
                />
              </div>
            </div>

            <button
              onClick={() => saveSettingsToServer({ impactStats })}
              className="px-6 py-3 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Impact Counters</span>
            </button>
          </div>
        )}
      </main>

      {/* MODAL: CAMPAIGN CREATE / EDIT */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-sage-200 pb-4">
              <h3 className="text-xl font-serif font-bold text-dark">
                {editingEvent ? "Edit Fundraising Campaign" : "Create New Campaign"}
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="text-dark/50 hover:text-dark text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Campaign Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Solar Charkha for 50 Women"
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Campaign Title (Hindi)
                </label>
                <input
                  type="text"
                  value={titleHi}
                  onChange={(e) => setTitleHi(e.target.value)}
                  placeholder="e.g. 50 महिलाओं हेतु सौर चरखा प्रायोजन"
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  >
                    <option value="skills">Skills & Handloom</option>
                    <option value="wash">WASH & Clean Water</option>
                    <option value="nutrition">Nutrition & Health</option>
                    <option value="livelihood">Digital & Livelihood</option>
                    <option value="emergency">Emergency Relief</option>
                    <option value="general">General NGO Fund</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Target Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="250000"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Raised Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={raisedAmount}
                    onChange={(e) => setRaisedAmount(e.target.value)}
                    placeholder="185000"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm font-bold text-terracotta"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Location (English)
                </label>
                <input
                  type="text"
                  value={locationEn}
                  onChange={(e) => setLocationEn(e.target.value)}
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Campaign Description (English) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Photo Path / Image URL
                  </label>
                  <label className="text-[11px] font-bold text-terracotta bg-terracotta/10 hover:bg-terracotta/20 px-2.5 py-1 rounded-lg cursor-pointer transition">
                    <span>{isUploading ? "Uploading..." : "📁 Upload from Device"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setEventImage, "images")}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={eventImage}
                  onChange={(e) => setEventImage(e.target.value)}
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-terracotta rounded"
                />
                <label htmlFor="featured-check" className="text-xs font-bold text-dark/80 cursor-pointer">
                  Feature this campaign on the Homepage banner
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-sage-200">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-5 py-2.5 bg-cream hover:bg-sage-100 text-dark font-bold text-xs uppercase rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase rounded-xl shadow-md transition"
                >
                  {editingEvent ? "Save Changes" : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: IMPACT STORY CREATE / EDIT */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-sage-200 pb-4">
              <h3 className="text-xl font-serif font-bold text-dark">
                {editingStory ? "Edit Beneficiary Story" : "Add New Impact Story"}
              </h3>
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="text-dark/50 hover:text-dark text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Beneficiary Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={beneficiaryName}
                    onChange={(e) => setBeneficiaryName(e.target.value)}
                    placeholder="e.g. Santosh Devi"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Village & District
                  </label>
                  <input
                    type="text"
                    value={villageEn}
                    onChange={(e) => setVillageEn(e.target.value)}
                    placeholder="Kolasar Village, Bikaner"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Direct Beneficiary Quote *
                </label>
                <textarea
                  rows={2}
                  required
                  value={quoteEn}
                  onChange={(e) => setQuoteEn(e.target.value)}
                  placeholder="“The solar charkha gave me financial freedom and respect in my village.”"
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Transformation Story Narrative *
                </label>
                <textarea
                  rows={3}
                  required
                  value={storyEn}
                  onChange={(e) => setStoryEn(e.target.value)}
                  placeholder="Describe their journey before and after Jeevan Dhara..."
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Donation Impact Note
                  </label>
                  <input
                    type="text"
                    value={donationImpactEn}
                    onChange={(e) => setDonationImpactEn(e.target.value)}
                    placeholder="₹2,500 sponsored her solar wheel"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Associated Campaign
                  </label>
                  <select
                    value={storyEventSlug}
                    onChange={(e) => setStoryEventSlug(e.target.value)}
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  >
                    {events.map((e) => (
                      <option key={e.id} value={e.slug}>
                        {e.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Beneficiary Photo Path
                  </label>
                  <label className="text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg cursor-pointer transition">
                    <span>{isUploading ? "Uploading..." : "📁 Upload from Device"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setStoryImage, "images")}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={storyImage}
                  onChange={(e) => setStoryImage(e.target.value)}
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-sage-200">
                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="px-5 py-2.5 bg-cream hover:bg-sage-100 text-dark font-bold text-xs uppercase rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber hover:bg-amber-400 text-dark font-bold text-xs uppercase rounded-xl shadow-md transition"
                >
                  {editingStory ? "Save Changes" : "Create Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REPORT CREATE / EDIT */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-sage-200 pb-4">
              <h3 className="text-xl font-serif font-bold text-dark">
                {editingReport ? "Edit Statutory Report" : "Add Statutory Report"}
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-dark/50 hover:text-dark text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReport} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-dark/80">
                  Report Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={reportTitleEn}
                  onChange={(e) => setReportTitleEn(e.target.value)}
                  placeholder="e.g. Audited Financial Report 2024-25"
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Document Type
                  </label>
                  <input
                    type="text"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    placeholder="PDF Document"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    File Size / Year
                  </label>
                  <input
                    type="text"
                    value={reportSize}
                    onChange={(e) => setReportSize(e.target.value)}
                    placeholder="2.4 MB"
                    className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase text-dark/80">
                    Download Link / File Path
                  </label>
                  <label className="text-[11px] font-bold text-terracotta bg-terracotta/10 hover:bg-terracotta/20 px-2.5 py-1 rounded-lg cursor-pointer transition">
                    <span>{isUploading ? "Uploading..." : "📄 Upload PDF"}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, setReportFileUrl, "Images")}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={reportFileUrl}
                  onChange={(e) => setReportFileUrl(e.target.value)}
                  placeholder="/documents/annual-report.pdf or cloud link"
                  className="w-full px-4 py-2 bg-cream/30 border border-sage-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-sage-200">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-5 py-2.5 bg-cream hover:bg-sage-100 text-dark font-bold text-xs uppercase rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-600 text-white font-bold text-xs uppercase rounded-xl shadow-md transition"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
}
