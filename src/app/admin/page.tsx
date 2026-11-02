"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Plus,
  Search,
  Share2,
  Copy,
  RefreshCw,
  Trash2,
  Edit,
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  Hotel,
  Car,
  Settings,
  BarChart3,
  UserCheck,
  Mail,
  Video,
  Printer,
  Heart,
  Music,
  MapPin,
  Save,
  CheckCircle2,
} from "lucide-react";

interface AdminStats {
  totalGuests: number;
  totalInvitations: number;
  confirmedCount: number;
  totalConfirmedAttendees: number;
  declinedCount: number;
  pendingCount: number;
  hotelRequests: number;
  shuttleRequests: number;
  eventStats: { id: string; title: string; attendees: number }[];
  dietaryStats: { name: string; value: number }[];
  recentRsvps: any[];
}

type AdminTab =
  | "overview"
  | "guests"
  | "invitations"
  | "events"
  | "rsvps"
  | "gallery"
  | "guestbook"
  | "analytics"
  | "users"
  | "settings";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("admin@royalwedding.com");
  const [password, setPassword] = useState("royal2026");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [guests, setGuests] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [wishes, setWishes] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [weddingSettings, setWeddingSettings] = useState<any>(null);

  // Filters & State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // Modals
  const [addGuestOpen, setAddGuestOpen] = useState(false);
  const [editGuestOpen, setEditGuestOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);

  // Guest Form
  const [guestName, setGuestName] = useState("");
  const [guestFamily, setGuestFamily] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestLimit, setGuestLimit] = useState(2);
  const [guestMessage, setGuestMessage] = useState("");

  // Event Modal & Form
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [evTitle, setEvTitle] = useState("");
  const [evDate, setEvDate] = useState("2026-12-16");
  const [evStartTime, setEvStartTime] = useState("10:30 AM");
  const [evEndTime, setEvEndTime] = useState("02:00 PM");
  const [evVenue, setEvVenue] = useState("");
  const [evAddress, setEvAddress] = useState("");
  const [evMap, setEvMap] = useState("");
  const [evDesc, setEvDesc] = useState("");
  const [evDress, setEvDress] = useState("");
  const [evColors, setEvColors] = useState("#EAB308,#F59E0B,#FFF9F0");
  const [evImage, setEvImage] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80");

  // Media Modal & Form
  const [addMediaOpen, setAddMediaOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("couple");
  const [newMediaType, setNewMediaType] = useState<"image" | "video">("image");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  // Add User Modal
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("CONCIERGE");

  useEffect(() => {
    const saved = sessionStorage.getItem("royal_admin_logged_in");
    if (saved === "true") {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("royal_admin_logged_in", "true");
        loadAllData();
      } else {
        setLoginError(data.error || "Invalid royal credentials");
      }
    } catch (err) {
      setLoginError("Login failed. Please check connection.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("royal_admin_logged_in");
  };

  const loadAllData = async () => {
    loadStats();
    loadGuests();
    loadEvents();
    loadGallery();
    loadWishes();
    loadUsers();
    loadSettings();
    loadContactMessages();
  };

  const loadStats = async () => {
    const res = await fetch("/api/admin/stats");
    if (res.ok) setStats(await res.json());
  };

  const loadGuests = async () => {
    const res = await fetch(`/api/guests?search=${encodeURIComponent(search)}&status=${statusFilter}`);
    if (res.ok) {
      const data = await res.json();
      setGuests(data.guests || []);
    }
  };

  const loadEvents = async () => {
    const res = await fetch("/api/events");
    if (res.ok) {
      const data = await res.json();
      setEvents(data.events || []);
    }
  };

  const loadGallery = async () => {
    const res = await fetch("/api/gallery");
    if (res.ok) {
      const data = await res.json();
      setGallery(data.images || []);
    }
  };

  const loadWishes = async () => {
    const res = await fetch("/api/wishes?all=true");
    if (res.ok) {
      const data = await res.json();
      setWishes(data.wishes || []);
    }
  };

  const loadUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users || []);
    }
  };

  const loadSettings = async () => {
    const res = await fetch("/api/admin/settings");
    if (res.ok) {
      const data = await res.json();
      setWeddingSettings(data.settings);
    }
  };

  const loadContactMessages = async () => {
    const res = await fetch("/api/contact");
    if (res.ok) {
      const data = await res.json();
      setContactMessages(data.messages || []);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadGuests();
    }
  }, [search, statusFilter, isAuthenticated]);

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/invite/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const handleShareWhatsApp = (guest: any) => {
    const token = guest.invitations?.[0]?.token;
    if (!token) return;
    const url = `${window.location.origin}/invite/${token}`;
    const text = `👑 *Royal Wedding Invitation: Radhika & Devansh* 👑\n\nRespected ${guest.name},\n\nWe cordially invite you and your family to celebrate our royal wedding in Udaipur (Dec 16–19, 2026).\n\nView your personalized invitation, schedule, and RSVP here:\n${url}\n\nSinghania & Rathore Families`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleRegenerateToken = async (invitationId: string) => {
    if (!confirm("Regenerate invitation link? The previous link will become invalid.")) return;
    await fetch("/api/guests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invitationId, action: "REGENERATE_TOKEN" }),
    });
    loadGuests();
    loadStats();
  };

  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guest and all their records?")) return;
    await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
    loadGuests();
    loadStats();
  };

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: guestName,
        familyName: guestFamily,
        phone: guestPhone,
        email: guestEmail,
        guestLimit: Number(guestLimit) || 2,
        customMessage: guestMessage,
      }),
    });

    setAddGuestOpen(false);
    resetGuestForm();
    loadGuests();
    loadStats();
  };

  const handleEditGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuest) return;

    await fetch("/api/guests", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: selectedGuest.id,
        name: guestName,
        familyName: guestFamily,
        phone: guestPhone,
        email: guestEmail,
        guestLimit: Number(guestLimit),
      }),
    });

    setEditGuestOpen(false);
    resetGuestForm();
    loadGuests();
    loadStats();
  };

  const openEditGuestModal = (g: any) => {
    setSelectedGuest(g);
    setGuestName(g.name || "");
    setGuestFamily(g.familyName || "");
    setGuestPhone(g.phone || "");
    setGuestEmail(g.email || "");
    setGuestLimit(g.guestLimit || 2);
    setEditGuestOpen(true);
  };

  const resetGuestForm = () => {
    setSelectedGuest(null);
    setGuestName("");
    setGuestFamily("");
    setGuestPhone("");
    setGuestEmail("");
    setGuestLimit(2);
    setGuestMessage("");
  };

  // Event handlers
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle || !evVenue) return;

    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: evTitle,
        ceremonyDate: evDate,
        startTime: evStartTime,
        endTime: evEndTime,
        venueName: evVenue,
        venueAddress: evAddress,
        mapUrl: evMap,
        description: evDesc,
        dressCode: evDress,
        dressCodeColors: evColors,
        imageUrl: evImage,
        orderIndex: events.length + 1,
      }),
    });

    setAddEventOpen(false);
    loadEvents();
    loadStats();
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Delete this wedding ceremony?")) return;
    await fetch(`/api/events?id=${id}`, { method: "DELETE" });
    loadEvents();
    loadStats();
  };

  // Gallery handlers
  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        category: newCategory,
        imageUrl: newMediaUrl,
        videoUrl: newVideoUrl || null,
        mediaType: newMediaType,
        caption: newCaption,
      }),
    });

    setAddMediaOpen(false);
    setNewTitle("");
    setNewMediaUrl("");
    setNewVideoUrl("");
    setNewCaption("");
    loadGallery();
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm("Delete this media item?")) return;
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    loadGallery();
  };

  // Wish handlers
  const handleToggleWishApproval = async (id: string, current: boolean) => {
    await fetch("/api/wishes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isApproved: !current }),
    });
    loadWishes();
  };

  const handleDeleteWish = async (id: string) => {
    if (!confirm("Permanently delete this blessing?")) return;
    await fetch(`/api/wishes?id=${id}`, { method: "DELETE" });
    loadWishes();
  };

  // User handlers
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) return;

    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
      }),
    });

    setAddUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    loadUsers();
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Revoke admin access for this user?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    loadUsers();
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weddingSettings) return;

    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(weddingSettings),
    });

    setSaveSettingsSuccess(true);
    setTimeout(() => setSaveSettingsSuccess(false), 3000);
    loadSettings();
  };

  // Printable Analytics Report
  const handlePrintReport = () => {
    window.print();
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#211A19] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gradient-to-b from-[#3B101F] to-[#1C060E] rounded-3xl border-2 border-[#D4AF75]/60 shadow-2xl p-8 text-[#FFF9F0]">
          <div className="w-16 h-16 rounded-full bg-[#D4AF75]/10 border border-[#D4AF75] flex items-center justify-center mx-auto mb-4 text-[#D4AF75]">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF75] font-bold block mb-1">
              Royal Wedding Platform
            </span>
            <h2 className="font-royal text-2xl font-bold text-white">
              Administrator Portal
            </h2>
            <p className="text-xs text-[#FFF9F0]/70 mt-1 font-serif-luxury">
              Authorized access for guest management, RSVPs &amp; logistics
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs mb-4">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#211A19] border border-[#D4AF75]/40 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF75]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1">
                Security Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#211A19] border border-[#D4AF75]/40 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF75]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 transition-all"
            >
              {loginLoading ? "Authorizing..." : "Enter Royal Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-[#D4AF75] hover:underline flex items-center justify-center gap-1"
            >
              ← Return to Wedding Invitation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Tabs Config
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "guests", label: "Guests", count: guests.length, icon: Users },
    { id: "invitations", label: "Invitations", icon: Share2 },
    { id: "events", label: "Events", count: events.length, icon: Calendar },
    { id: "rsvps", label: "RSVPs & Attendance", count: stats?.confirmedCount, icon: CheckCircle },
    { id: "gallery", label: "Media & Cinema", count: gallery.length, icon: ImageIcon },
    { id: "guestbook", label: "Wishes Wall", count: wishes.length, icon: MessageSquare },
    { id: "analytics", label: "Reports", icon: Printer },
    { id: "users", label: "Users & RBAC", count: users.length, icon: UserCheck },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#18070D] text-[#FFF9F0]">
      {/* Top Navbar */}
      <header className="bg-[#2A0C16] border-b border-[#D4AF75]/40 sticky top-0 z-30 px-4 sm:px-8 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF75] text-[#3B101F] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="font-royal text-base sm:text-lg font-bold text-white">
                Royal Wedding Concierge
              </h1>
              <span className="text-[10px] tracking-widest uppercase text-[#D4AF75] block">
                {weddingSettings?.brideName || "Radhika"} &amp; {weddingSettings?.groomName || "Devansh"} • {weddingSettings?.weddingCity || "Udaipur"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF75]/40 text-[#D4AF75] text-xs hover:bg-[#D4AF75]/10"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-rose-700/60 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-print border-b border-white/10">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as AdminTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-[#D4AF75] text-[#211A19] font-bold shadow-gold scale-105"
                    : "bg-[#2A0C16] text-[#FFF9F0]/80 hover:bg-[#3B101F] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? "bg-black/20 text-[#211A19]" : "bg-white/10 text-white/70"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            MODULE 1: OVERVIEW DASHBOARD
        ========================================================================== */}
        {activeTab === "overview" && stats && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-[#2A0C16] p-5 rounded-2xl border border-[#D4AF75]/30">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF75] block">
                  Total Invited
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-royal text-3xl font-bold text-white">
                    {stats.totalGuests}
                  </span>
                  <span className="text-xs text-white/60">Guests / Houses</span>
                </div>
              </div>

              <div className="bg-[#2A0C16] p-5 rounded-2xl border border-emerald-500/40">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 block">
                  Confirmed Attendees
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-royal text-3xl font-bold text-emerald-300">
                    {stats.totalConfirmedAttendees}
                  </span>
                  <span className="text-xs text-white/60">({stats.confirmedCount} RSVPs)</span>
                </div>
              </div>

              <div className="bg-[#2A0C16] p-5 rounded-2xl border border-amber-500/40">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 block">
                  Pending RSVPs
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-royal text-3xl font-bold text-amber-300">
                    {stats.pendingCount}
                  </span>
                  <span className="text-xs text-white/60">Invites</span>
                </div>
              </div>

              <div className="bg-[#2A0C16] p-5 rounded-2xl border border-rose-500/40">
                <span className="text-[10px] uppercase tracking-wider text-rose-400 block">
                  Declined
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-royal text-3xl font-bold text-rose-300">
                    {stats.declinedCount}
                  </span>
                  <span className="text-xs text-white/60">Guests</span>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1 bg-[#2A0C16] p-5 rounded-2xl border border-[#D4AF75]/30 flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF75] block">
                  Hospitality Requests
                </span>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Hotel className="w-4 h-4 text-[#D4AF75]" /> {stats.hotelRequests} Suites
                  </span>
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Car className="w-4 h-4 text-[#D4AF75]" /> {stats.shuttleRequests} Pickups
                  </span>
                </div>
              </div>
            </div>

            {/* Attendance Progress by Ceremony */}
            <div className="bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30">
              <h3 className="font-royal text-lg font-bold text-[#D4AF75] mb-4">
                Ceremony-wise Attendance Headcount
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.eventStats.map((ev) => (
                  <div key={ev.id} className="bg-[#1C060E] p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-white font-medium block truncate mb-1" title={ev.title}>
                      {ev.title.split(":")[0]}
                    </span>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-royal text-2xl font-bold text-[#D4AF75]">
                        {ev.attendees}
                      </span>
                      <span className="text-[10px] text-white/50">Attendees</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            (ev.attendees / Math.max(stats.totalConfirmedAttendees || 1, 1)) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dietary Distribution & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Dietary Preferences Chart */}
              <div className="lg:col-span-6 bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30">
                <h3 className="font-royal text-lg font-bold text-white mb-4">
                  Dietary Breakdown
                </h3>
                <div className="space-y-3">
                  {stats.dietaryStats.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <span className="text-white/80">{d.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#D4AF75]">{d.value}</span>
                        <span className="text-[10px] text-white/40">portions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inquiries & Activity */}
              <div className="lg:col-span-6 bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-royal text-lg font-bold text-white">
                    Concierge Inquiries ({contactMessages.length})
                  </h3>
                  <Link
                    href="/contact"
                    className="text-xs text-[#D4AF75] hover:underline"
                  >
                    View Desk
                  </Link>
                </div>
                <div className="space-y-3">
                  {contactMessages.slice(0, 3).map((m) => (
                    <div key={m.id} className="p-3 bg-[#1C060E] rounded-xl border border-white/5 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white mb-1">
                        <span>{m.name}</span>
                        <span className="text-[10px] text-[#D4AF75]">{m.status}</span>
                      </div>
                      <p className="text-white/70 line-clamp-1">{m.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 2: GUEST MANAGEMENT (CRUD)
        ========================================================================== */}
        {activeTab === "guests" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search guest or family..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#2A0C16] border border-white/10 text-xs text-white focus:outline-none focus:border-[#D4AF75]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="/api/export-csv"
                  download
                  className="px-3.5 py-2 rounded-xl bg-[#2A0C16] hover:bg-[#3B101F] border border-[#D4AF75]/40 text-[#D4AF75] text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </a>

                <button
                  onClick={() => {
                    resetGuestForm();
                    setAddGuestOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Guest</span>
                </button>
              </div>
            </div>

            {/* Guests Table */}
            <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75]/30 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1C060E] text-[#D4AF75] uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Guest / Family</th>
                      <th className="py-3.5 px-4 font-bold">Quota / Status</th>
                      <th className="py-3.5 px-4 font-bold">Dietary &amp; Logistics</th>
                      <th className="py-3.5 px-4 font-bold">Personalized Link</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/90">
                    {guests.map((g) => {
                      const inv = g.invitations?.[0];
                      const rsvp = g.rsvps?.[0];
                      const isCopied = copiedToken === inv?.token;

                      return (
                        <tr key={g.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-royal text-sm font-bold text-white block">
                              {g.name}
                            </span>
                            <div className="text-[11px] text-white/60 mt-0.5">
                              {g.familyName && <span>{g.familyName} • </span>}
                              <span>{g.phone || g.email || "No contact"}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1C060E] text-[#D4AF75] border border-[#D4AF75]/30">
                                Limit: {g.guestLimit}
                              </span>
                              {rsvp && (
                                <span className={`text-[11px] font-semibold ${rsvp.attending ? "text-emerald-400" : "text-rose-400"}`}>
                                  {rsvp.attending ? `Attending (${rsvp.totalAttending})` : "Declined"}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 max-w-xs">
                            {rsvp ? (
                              <div className="text-[11px]">
                                <span className="text-[#D4AF75] font-medium block">
                                  {rsvp.dietaryPreference || "Standard"}
                                </span>
                                {(rsvp.needsHotelStay || rsvp.needsShuttle) && (
                                  <span className="text-white/60 text-[10px]">
                                    {rsvp.needsHotelStay ? "Hotel Suite" : ""}{" "}
                                    {rsvp.needsShuttle ? "• Chauffeur" : ""}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-white/40 italic">Awaiting RSVP</span>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            {inv ? (
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] text-[#D4AF75] truncate max-w-[120px]">
                                  {inv.token}
                                </span>
                                <button
                                  onClick={() => handleCopyLink(inv.token)}
                                  title="Copy invite link"
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF75]"
                                >
                                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            ) : (
                              <span className="text-white/40">No link</span>
                            )}
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {inv && (
                                <button
                                  onClick={() => handleShareWhatsApp(g)}
                                  title="Share via WhatsApp"
                                  className="p-1.5 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/30"
                                >
                                  <Share2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => openEditGuestModal(g)}
                                title="Edit Guest"
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteGuest(g.id)}
                                title="Delete Guest"
                                className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 3: PERSONALIZED INVITATIONS MANAGEMENT
        ========================================================================== */}
        {activeTab === "invitations" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#2A0C16] p-6 rounded-2xl border border-[#D4AF75]/30">
              <h3 className="font-royal text-xl font-bold text-[#D4AF75] mb-2">
                Personalized Digital Invitation Links &amp; WhatsApp Sender
              </h3>
              <p className="text-xs text-white/70">
                Every invited guest has an unguessable unique token. Status automatically updates to "Opened" when the guest visits their URL.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guests.map((g) => {
                const inv = g.invitations?.[0];
                if (!inv) return null;
                const url = typeof window !== "undefined" ? `${window.location.origin}/invite/${inv.token}` : `/invite/${inv.token}`;
                return (
                  <div key={inv.id} className="bg-[#2A0C16] p-5 rounded-2xl border border-[#D4AF75]/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-royal text-base font-bold text-white">
                          {g.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inv.status === "RSVP_COMPLETED"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                              : inv.status === "OPENED"
                              ? "bg-amber-950 text-amber-300 border border-amber-500/50"
                              : "bg-blue-950 text-blue-300 border border-blue-500/50"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>

                      <p className="text-xs text-white/70 italic font-serif-luxury mb-4 line-clamp-2">
                        "{inv.customMessage || "Cordially invited to our wedding celebration"}"
                      </p>

                      <div className="bg-[#1C060E] p-2.5 rounded-xl border border-white/5 font-mono text-[11px] text-[#D4AF75] break-all mb-4">
                        /invite/{inv.token}
                      </div>

                      <div className="text-[10px] text-white/50 space-y-1 mb-4">
                        {inv.openedAt && (
                          <div>Opened At: {new Date(inv.openedAt).toLocaleString()}</div>
                        )}
                        {inv.rsvpAt && (
                          <div>RSVP Completed: {new Date(inv.rsvpAt).toLocaleString()}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleCopyLink(inv.token)}
                        className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </button>

                      <button
                        onClick={() => handleShareWhatsApp(g)}
                        className="py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                        title="Share via WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => handleRegenerateToken(inv.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/60"
                        title="Regenerate Token"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 4: EVENT MANAGEMENT (CRUD)
        ========================================================================== */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                  Wedding Ceremonies &amp; Schedule Itinerary
                </h3>
                <p className="text-xs text-white/70">
                  Manage timing, dress codes, color swatches, venue details, and maps.
                </p>
              </div>

              <button
                onClick={() => setAddEventOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ceremony</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((ev, index) => (
                <div key={ev.id} className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75]/40 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-video">
                      <img
                        src={ev.imageUrl}
                        alt={ev.title}
                        onError={(e) => {
                          e.currentTarget.src = "/images/gallery/haldi-1.jpg";
                        }}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[#D4AF75] text-[10px] font-bold">
                        Ceremony #{index + 1}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="font-royal text-base sm:text-lg font-bold text-white mb-1">
                        {ev.title}
                      </h4>
                      <div className="text-xs text-[#D4AF75] font-semibold mb-2">
                        {ev.startTime} – {ev.endTime}
                      </div>
                      <p className="text-xs text-white/75 line-clamp-2 mb-3">
                        {ev.description}
                      </p>
                      <div className="text-[11px] text-white/70">
                        <strong>Dress Code:</strong> {ev.dressCode}
                      </div>
                      {ev.dressCodeColors && (
                        <div className="flex items-center gap-1.5 mt-2">
                          {ev.dressCodeColors.split(",").map((c: string, idx: number) => (
                            <span
                              key={idx}
                              className="w-4 h-4 rounded-full border border-white/30"
                              style={{ backgroundColor: c.trim() }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#D4AF75] truncate max-w-[180px]">{ev.venueName}</span>
                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                      title="Delete ceremony"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 5: RSVP AND ATTENDANCE MANAGEMENT
        ========================================================================== */}
        {activeTab === "rsvps" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                  Detailed RSVP &amp; Logistics Register
                </h3>
                <p className="text-xs text-white/70">
                  Track guest headcount, dietary requests, hotel accommodations, and Sangeet song choices.
                </p>
              </div>

              <a
                href="/api/export-csv"
                download
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold uppercase tracking-wider shadow-gold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Attendance CSV</span>
              </a>
            </div>

            <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75]/30 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1C060E] text-[#D4AF75] uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Guest</th>
                      <th className="py-3.5 px-4 font-bold">Attending</th>
                      <th className="py-3.5 px-4 font-bold">Dietary Choice</th>
                      <th className="py-3.5 px-4 font-bold">Logistics Support</th>
                      <th className="py-3.5 px-4 font-bold">Sangeet Song</th>
                      <th className="py-3.5 px-4 font-bold">Special Requests</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/90">
                    {guests.filter((g) => g.rsvps?.length > 0).map((g) => {
                      const r = g.rsvps[0];
                      return (
                        <tr key={r.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 font-semibold text-white">
                            {g.name}
                            <span className="text-[10px] text-white/50 block">{g.phone || g.email}</span>
                          </td>
                          <td className="py-4 px-4">
                            {r.attending ? (
                              <span className="text-emerald-400 font-bold">
                                YES ({r.totalAttending} Guests)
                              </span>
                            ) : (
                              <span className="text-rose-400 font-bold">DECLINED</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-[#D4AF75]">
                            {r.dietaryPreference || "Standard"}
                            {r.allergies && <span className="block text-[10px] text-white/50">Allergies: {r.allergies}</span>}
                          </td>
                          <td className="py-4 px-4">
                            {r.needsHotelStay && <span className="block text-emerald-300">✓ Hotel Suite Needed</span>}
                            {r.needsShuttle && <span className="block text-amber-300">✓ Chauffeur Needed</span>}
                            {!r.needsHotelStay && !r.needsShuttle && <span className="text-white/40">Own arrangements</span>}
                          </td>
                          <td className="py-4 px-4 text-white/80 italic font-serif-luxury">
                            {r.songRequest || "—"}
                          </td>
                          <td className="py-4 px-4 text-white/70 max-w-xs truncate">
                            {r.specialRequests || "None"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 6: GALLERY & MEDIA MANAGEMENT
        ========================================================================== */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                  Photo &amp; Video Media Gallery
                </h3>
                <p className="text-xs text-white/70">
                  Upload images, teaser trailers, and video highlights across ceremony categories.
                </p>
              </div>

              <button
                onClick={() => setAddMediaOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Media</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-[#2A0C16] border border-[#D4AF75]/30">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.src = "/images/gallery/couple-1.jpg";
                    }}
                    className="w-full h-full object-cover"
                  />
                  
                  {item.mediaType === "video" && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 text-[#D4AF75] text-[10px] font-bold flex items-center gap-1">
                      <Video className="w-3 h-3" /> Video
                    </span>
                  )}

                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-white text-xs">
                    <div>
                      <span className="text-[10px] text-[#D4AF75] font-bold uppercase block">
                        {item.category}
                      </span>
                      <strong className="block truncate">{item.title}</strong>
                      {item.caption && <p className="text-[10px] text-white/70 line-clamp-2 mt-1">{item.caption}</p>}
                    </div>

                    <button
                      onClick={() => handleDeleteMedia(item.id)}
                      className="p-1.5 rounded-lg bg-rose-600 text-white self-end hover:bg-rose-700"
                      title="Delete media"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 7: GUESTBOOK MODERATION
        ========================================================================== */}
        {activeTab === "guestbook" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                Guest Wishes &amp; Blessings Moderation
              </h3>
              <p className="text-xs text-white/70">
                Review, approve, hide, or delete guestbook inscriptions.
              </p>
            </div>

            <div className="space-y-4">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className={`p-5 rounded-2xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    w.isApproved
                      ? "bg-[#2A0C16] border-[#D4AF75]/30"
                      : "bg-[#1C060E] border-amber-500/40 opacity-75"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-royal text-base font-bold text-white">
                        {w.guestName}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3B101F] text-[#D4AF75] font-semibold uppercase">
                        {w.relation}
                      </span>
                      {!w.isApproved && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500">
                          Hidden from public wall
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 font-serif-luxury italic">
                      "{w.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleWishApproval(w.id, w.isApproved)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        w.isApproved
                          ? "bg-amber-950 text-amber-300 border border-amber-500/50"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                      }`}
                    >
                      {w.isApproved ? "Hide Wish" : "Approve & Show"}
                    </button>

                    <button
                      onClick={() => handleDeleteWish(w.id)}
                      className="p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                      title="Delete wish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 8: ANALYTICS & PRINTABLE REPORT
        ========================================================================== */}
        {activeTab === "analytics" && stats && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between no-print">
              <div>
                <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                  Wedding Analytics &amp; Printable Summary
                </h3>
                <p className="text-xs text-white/70">
                  Official banquet and logistics report for event caterers and hotel managers.
                </p>
              </div>

              <button
                onClick={handlePrintReport}
                className="px-4 py-2 rounded-xl bg-[#2A0C16] border border-[#D4AF75] text-[#D4AF75] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#D4AF75] hover:text-[#211A19] transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Report</span>
              </button>
            </div>

            <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75]/40 p-8 space-y-6">
              <div className="text-center border-b border-white/10 pb-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF75] font-bold">
                  Official Wedding Banquet &amp; Attendance Report
                </span>
                <h2 className="font-royal text-2xl sm:text-3xl font-bold text-white mt-1">
                  Radhika &amp; Devansh Royal Wedding
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Generated on {new Date().toLocaleDateString("en-US", { dateStyle: "full" })}
                </p>
              </div>

              {/* Ceremony headcounts table */}
              <div>
                <h4 className="font-royal text-sm font-bold text-[#D4AF75] uppercase tracking-wider mb-3">
                  1. Ceremony Headcounts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {stats.eventStats.map((ev) => (
                    <div key={ev.id} className="p-3 bg-[#1C060E] rounded-xl border border-white/5">
                      <span className="text-xs text-white font-medium block truncate">{ev.title.split(":")[0]}</span>
                      <span className="font-royal text-xl font-bold text-[#D4AF75] block mt-1">
                        {ev.attendees} Attendees
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catering & Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <h4 className="font-royal text-sm font-bold text-[#D4AF75] uppercase tracking-wider mb-3">
                    2. Kitchen &amp; Catering Requirements
                  </h4>
                  <div className="space-y-2 text-xs">
                    {stats.dietaryStats.map((d) => (
                      <div key={d.name} className="flex justify-between py-1.5 border-b border-white/5">
                        <span className="text-white/80">{d.name}</span>
                        <span className="font-bold text-[#D4AF75]">{d.value} Portions</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-royal text-sm font-bold text-[#D4AF75] uppercase tracking-wider mb-3">
                    3. Hotel Suites &amp; Transport Pickups
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/80">Partner Hotel Suites Requested</span>
                      <span className="font-bold text-[#D4AF75]">{stats.hotelRequests} Suites</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/80">Airport / Station Chauffeur Transfers</span>
                      <span className="font-bold text-[#D4AF75]">{stats.shuttleRequests} Pickups</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 9: USER MANAGEMENT AND RBAC
        ========================================================================== */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                  Administrator Accounts &amp; Role-Based Access (RBAC)
                </h3>
                <p className="text-xs text-white/70">
                  Assign administrative access for Super Admins, Concierge Team, and Event Planners.
                </p>
              </div>

              <button
                onClick={() => setAddUserOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] text-xs font-bold uppercase tracking-wider shadow-gold hover:brightness-110 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Admin User</span>
              </button>
            </div>

            <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75]/30 overflow-hidden shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1C060E] text-[#D4AF75] uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Admin Name</th>
                    <th className="py-3.5 px-4 font-bold">Email</th>
                    <th className="py-3.5 px-4 font-bold">Assigned Role</th>
                    <th className="py-3.5 px-4 font-bold">Created</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/90">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-semibold text-white">
                        {u.name}
                      </td>
                      <td className="py-4 px-4 text-[#D4AF75] font-mono">
                        {u.email}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#1C060E] text-[#D4AF75] border border-[#D4AF75]/40">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/60">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900"
                          title="Revoke admin"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            MODULE 10: WEBSITE CUSTOMIZATION & SETTINGS
        ========================================================================== */}
        {activeTab === "settings" && weddingSettings && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-royal text-xl font-bold text-[#D4AF75]">
                Platform Customization &amp; Couple Settings
              </h3>
              <p className="text-xs text-white/70">
                Update names, wedding date, city, parents, hero copy, and ambient background music URL.
              </p>
            </div>

            {saveSettingsSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Wedding configuration updated successfully! Changes are live across all pages.</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75]/40 p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                    Bride's First Name
                  </label>
                  <input
                    type="text"
                    value={weddingSettings.brideName || ""}
                    onChange={(e) => setWeddingSettings({ ...weddingSettings, brideName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                    Groom's First Name
                  </label>
                  <input
                    type="text"
                    value={weddingSettings.groomName || ""}
                    onChange={(e) => setWeddingSettings({ ...weddingSettings, groomName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                    Bride's Parents
                  </label>
                  <input
                    type="text"
                    value={weddingSettings.brideParents || ""}
                    onChange={(e) => setWeddingSettings({ ...weddingSettings, brideParents: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                    Groom's Parents
                  </label>
                  <input
                    type="text"
                    value={weddingSettings.groomParents || ""}
                    onChange={(e) => setWeddingSettings({ ...weddingSettings, groomParents: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                    Wedding City &amp; State
                  </label>
                  <input
                    type="text"
                    value={weddingSettings.weddingCity || ""}
                    onChange={(e) => setWeddingSettings({ ...weddingSettings, weddingCity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                    Principal Wedding Date (Countdown Target)
                  </label>
                  <input
                    type="datetime-local"
                    value={weddingSettings.weddingDate ? new Date(weddingSettings.weddingDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setWeddingSettings({ ...weddingSettings, weddingDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                  Hero Welcome Tagline
                </label>
                <input
                  type="text"
                  value={weddingSettings.heroTagline || ""}
                  onChange={(e) => setWeddingSettings({ ...weddingSettings, heroTagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#D4AF75] mb-1.5">
                  Background Wedding Shehnai &amp; Sitar Music URL (.mp3)
                </label>
                <input
                  type="url"
                  value={weddingSettings.musicUrl || ""}
                  onChange={(e) => setWeddingSettings({ ...weddingSettings, musicUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1C060E] border border-white/20 text-sm text-white font-mono text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold text-xs uppercase tracking-widest shadow-gold hover:brightness-110 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* =========================================================================
          MODALS
      ========================================================================== */}
      {/* 1. Add Guest Modal */}
      {addGuestOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75] p-6 max-w-md w-full text-white">
            <h3 className="font-royal text-xl font-bold text-[#D4AF75] mb-4">
              Add New Invited Guest
            </h3>
            <form onSubmit={handleCreateGuest} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 mb-1">Guest / Invitee Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Family / House Name</label>
                <input
                  type="text"
                  placeholder="e.g. Singhania Family"
                  value={guestFamily}
                  onChange={(e) => setGuestFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/80 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">Guest Quota Limit</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guestLimit}
                    onChange={(e) => setGuestLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="guest@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Custom Welcome Note</label>
                <textarea
                  rows={2}
                  placeholder="Custom warm note shown on their invitation link..."
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddGuestOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold"
                >
                  Generate Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Guest Modal */}
      {editGuestOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75] p-6 max-w-md w-full text-white">
            <h3 className="font-royal text-xl font-bold text-[#D4AF75] mb-4">
              Edit Guest Details
            </h3>
            <form onSubmit={handleEditGuest} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 mb-1">Guest Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Family / Clan</label>
                <input
                  type="text"
                  value={guestFamily}
                  onChange={(e) => setGuestFamily(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/80 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">Guest Quota Limit</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guestLimit}
                    onChange={(e) => setGuestLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 mb-1">Email</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditGuestOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Event Modal */}
      {addEventOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75] p-6 max-w-lg w-full text-white">
            <h3 className="font-royal text-xl font-bold text-[#D4AF75] mb-4">
              Add Wedding Ceremony
            </h3>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 mb-1">Ceremony Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Sufi Night"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-white/80 mb-1">Date</label>
                  <input
                    type="date"
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">Start</label>
                  <input
                    type="text"
                    value={evStartTime}
                    onChange={(e) => setEvStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1">End</label>
                  <input
                    type="text"
                    value={evEndTime}
                    onChange={(e) => setEvEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 mb-1">Venue Name &amp; Address *</label>
                <input
                  type="text"
                  required
                  placeholder="The Courtyard, City Palace"
                  value={evVenue}
                  onChange={(e) => setEvVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Dress Code &amp; Recommended Palette</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Burgundy, Champagne Gold & Velvet"
                  value={evDress}
                  onChange={(e) => setEvDress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Ceremony description and significance..."
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddEventOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold"
                >
                  Create Ceremony
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add Media Modal (Photo/Video) */}
      {addMediaOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75] p-6 max-w-md w-full text-white">
            <h3 className="font-royal text-xl font-bold text-[#D4AF75] mb-4">
              Add Photo or Video Highlight
            </h3>
            <form onSubmit={handleAddMedia} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Wedding Highlights"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white/80 mb-1">Media Type</label>
                  <select
                    value={newMediaType}
                    onChange={(e: any) => setNewMediaType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  >
                    <option value="image">Photography</option>
                    <option value="video">Cinema / Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  >
                    <option value="couple">Royal Couple</option>
                    <option value="highlights">Film &amp; Highlights</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="mehendi">Mehendi</option>
                    <option value="haldi">Haldi Glow</option>
                    <option value="sangeet">Sangeet Gala</option>
                    <option value="wedding">The Mandap</option>
                    <option value="reception">Reception</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white/80 mb-1">Poster Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              {newMediaType === "video" && (
                <div>
                  <label className="block text-white/80 mb-1">Video Stream URL (.mp4 / video link)</label>
                  <input
                    type="url"
                    placeholder="https://.../video.mp4"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                  />
                </div>
              )}
              <div>
                <label className="block text-white/80 mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="Romantic quote or photo memory..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddMediaOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold"
                >
                  Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Add User Modal (RBAC) */}
      {addUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#2A0C16] rounded-2xl border border-[#D4AF75] p-6 max-w-md w-full text-white">
            <h3 className="font-royal text-xl font-bold text-[#D4AF75] mb-4">
              Add Administrator / Concierge
            </h3>
            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kunwar Raghav Singhania"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Login Email *</label>
                <input
                  type="email"
                  required
                  placeholder="coordinator@royalwedding.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Enter strong password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Role / Permissions</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#1C060E] border border-white/20 text-white"
                >
                  <option value="CONCIERGE">CONCIERGE (Guest &amp; Travel Logistics)</option>
                  <option value="EVENT_PLANNER">EVENT_PLANNER (Ceremonies &amp; Media)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Platform Authority)</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setAddUserOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4AF75] to-[#A57D3E] text-[#211A19] font-bold"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
