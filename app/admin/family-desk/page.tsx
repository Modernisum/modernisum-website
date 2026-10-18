"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import {
  HeartHandshake,
  MessageCircle,
  Phone,
  Building2,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  Save,
  Languages,
  Plus,
  Send,
  UserCheck,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface FamilyRequest {
  id: string;
  institutionName: string;
  contactPerson: string;
  contactNumber: string;
  cityState?: string;
  studentCount?: number;
  challenge: string;
  preferredLanguage?: string;
  status: "new" | "in_dialogue" | "resolved" | "family_member";
  notes?: string;
  createdAt?: any;
}

export default function AdminFamilyDeskPage() {
  const [requests, setRequests] = useState<FamilyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHindi, setIsHindi] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeNotes, setActiveNotes] = useState<Record<string, string>>({});
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Request Form State
  const [newForm, setNewForm] = useState({
    institutionName: "",
    contactPerson: "",
    contactNumber: "",
    cityState: "",
    studentCount: "",
    challenge: "",
    preferredLanguage: "hi",
  });

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/family-care/request");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRequests(json.data);
        const notesMap: Record<string, string> = {};
        json.data.forEach((r: FamilyRequest) => {
          notesMap[r.id] = r.notes || "";
        });
        setActiveNotes(notesMap);
      }
    } catch (err) {
      console.error("Failed to load family requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch("/api/family-care/request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r))
        );
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      setUpdatingId(id);
      const notes = activeNotes[id] || "";
      const res = await fetch("/api/family-care/request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, notes }),
      });
      const json = await res.json();
      if (json.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, notes } : r))
        );
      }
    } catch (e) {
      console.error("Failed to update notes:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.institutionName || !newForm.contactNumber) return;

    try {
      setUpdatingId("create");
      const res = await fetch("/api/family-care/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });
      const json = await res.json();
      if (json.success) {
        setIsNewModalOpen(false);
        setNewForm({
          institutionName: "",
          contactPerson: "",
          contactNumber: "",
          cityState: "",
          studentCount: "",
          challenge: "",
          preferredLanguage: "hi",
        });
        await loadRequests();
      }
    } catch (e) {
      console.error("Failed to create request:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const openWhatsApp = (phone: string, name: string, institution: string) => {
    const cleanNumber = phone.replace(/[^0-9]/g, "");
    const formattedNumber = cleanNumber.startsWith("91") ? cleanNumber : `91${cleanNumber}`;
    const greeting = isHindi
      ? `नमस्ते ${name} जी! मॉडर्निज़्म टीम की ओर से सविनय प्रणाम। ${institution} के संबंध में आपने जो चुनौती साझा की थी, उस पर हम आपकी सेवा में उपस्थित हैं। बताएं हम कैसे सहायता कर सकते हैं?`
      : `Namaste ${name} ji! Greetings from Modernisum Technologies regarding ${institution}. We are here to respectfully assist you with your school administrative requirements. How may we help?`;
    window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(greeting)}`, "_blank");
  };

  const filteredRequests = requests.filter((r) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "new" && r.status === "new") ||
      (activeFilter === "in_dialogue" && r.status === "in_dialogue") ||
      (activeFilter === "resolved" && (r.status === "resolved" || r.status === "family_member"));

    const matchesSearch =
      r.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.cityState && r.cityState.toLowerCase().includes(searchQuery.toLowerCase())) ||
      r.challenge.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalInquiries = requests.length;
  const newCount = requests.filter((r) => r.status === "new").length;
  const inDialogueCount = requests.filter((r) => r.status === "in_dialogue").length;
  const familyCount = requests.filter((r) => r.status === "family_member" || r.status === "resolved").length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
              {isHindi ? "अतिथि सेवा डेस्क (अतिथि देवो भव)" : "Family Care & Hospitality Desk"}
            </span>
            <span className="text-xs text-white/40">
              {requests.length} {isHindi ? "संस्थागत संवाद रिकॉर्ड" : "Institutional Records"}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mt-2 flex items-center gap-2">
            <HeartHandshake className="w-8 h-8 text-emerald-400" />
            {isHindi ? "अतिथि सेवा एवं संस्थागत परिवार डेस्क" : "Family Care Desk"}
          </h1>
          <p className="text-sm text-white/60 mt-1 max-w-2xl">
            {isHindi
              ? "जब कोई विद्यालय संचालक अपनी प्रशासनिक समस्या साझा करता है, तो हम उनका स्वागत एक अतिथि व पारिवारिक सदस्य के रूप में करते हैं। 1-क्लिक व्हाट्सएप संवाद और त्वरित समाधान।"
              : "Direct, compassionate support for school principals, managers, and teachers. Zero corporate sales pitch; pure administrative and engineering assistance."}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-all shadow-sm"
          >
            <Languages className="w-4 h-4 text-emerald-400" />
            {isHindi ? "View in English" : "हिंदी में देखें"}
          </button>
          <GlassButton
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            {isHindi ? "नया संस्थागत अनुरोध" : "New Inward Request"}
          </GlassButton>
          <GlassButton
            onClick={loadRequests}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </GlassButton>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "कुल सम्मानित संस्थाएं" : "Total Inquiries"}
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white tracking-tight">
              {totalInquiries}
            </div>
            <div className="text-xs text-cyan-400 mt-1 font-medium">
              {isHindi ? "सभी सक्रिय व हल किए गए अनुरोध" : "Active institutional relationships"}
            </div>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "संवाद प्रतीक्षारत (New)" : "Awaiting Dialogue"}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-300 tracking-tight">
              {newCount}
            </div>
            <div className="text-xs text-white/60 mt-1">
              {isHindi ? "त्वरित व्हाट्सएप उत्तर अपेक्षित" : "Immediate follow-up required"}
            </div>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "संवाद जारी (In Dialogue)" : "Ongoing Dialogue"}
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-sky-300 tracking-tight">
              {inDialogueCount}
            </div>
            <div className="text-xs text-white/60 mt-1">
              {isHindi ? "डेमो व तकनीकी मार्गदर्शन जारी" : "Setup guidance in progress"}
            </div>
          </div>
        </LiquidGlassCard>

        <LiquidGlassCard className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">
              {isHindi ? "संस्थागत परिवार (Family)" : "Active Family Members"}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
              {familyCount}
            </div>
            <div className="text-xs text-emerald-300 mt-1 font-medium">
              {isHindi ? "संतुष्ट विद्यालय व स्थायी संबंध" : "Empowered schools"}
            </div>
          </div>
        </LiquidGlassCard>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === "all"
                ? "bg-white/15 text-white shadow-sm"
                : "text-white/60 hover:text-white"
            }`}
          >
            {isHindi ? "सभी (" + requests.length + ")" : "All (" + requests.length + ")"}
          </button>
          <button
            onClick={() => setActiveFilter("new")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === "new"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            {isHindi ? "नए (" + newCount + ")" : "New (" + newCount + ")"}
          </button>
          <button
            onClick={() => setActiveFilter("in_dialogue")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === "in_dialogue"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            {isHindi ? "संवाद में (" + inDialogueCount + ")" : "In Dialogue (" + inDialogueCount + ")"}
          </button>
          <button
            onClick={() => setActiveFilter("resolved")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === "resolved"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            {isHindi ? "परिवार / पूर्ण (" + familyCount + ")" : "Family (" + familyCount + ")"}
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder={isHindi ? "विद्यालय, शहर या नाम खोजें..." : "Search institution or city..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* Requests Stream Cards */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <LiquidGlassCard className="p-12 text-center text-white/50 space-y-2">
            <HeartHandshake className="w-10 h-10 mx-auto text-white/30" />
            <p className="text-sm font-medium">
              {isHindi ? "कोई संस्थागत अनुरोध नहीं मिला" : "No institutional records found"}
            </p>
            <p className="text-xs text-white/40">
              {isHindi ? "फ़िल्टर या खोज मानदंड बदलकर पुनः प्रयास करें।" : "Try clearing filters or search terms."}
            </p>
          </LiquidGlassCard>
        ) : (
          filteredRequests.map((req) => (
            <LiquidGlassCard
              key={req.id}
              className={`p-6 transition-all border ${
                req.status === "new"
                  ? "border-amber-500/30 bg-amber-500/[0.02]"
                  : req.status === "family_member"
                  ? "border-emerald-500/30 bg-emerald-500/[0.02]"
                  : "border-white/10"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                {/* Left details */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                        req.status === "new"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : req.status === "in_dialogue"
                          ? "bg-sky-500/20 text-sky-300 border-sky-500/30"
                          : req.status === "family_member"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-slate-500/20 text-white/70 border-white/20"
                      }`}
                    >
                      {req.status === "new"
                        ? isHindi ? "नया अनुरोध" : "New Inward"
                        : req.status === "in_dialogue"
                        ? isHindi ? "संवाद जारी" : "In Dialogue"
                        : req.status === "family_member"
                        ? isHindi ? "संस्थागत परिवार" : "Family Member"
                        : isHindi ? "समाधान पूर्ण" : "Resolved"}
                    </span>

                    {req.preferredLanguage && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                        {req.preferredLanguage.toUpperCase()}
                      </span>
                    )}

                    {req.studentCount ? (
                      <span className="text-xs text-white/60 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-white/40" />
                        {req.studentCount} {isHindi ? "विद्यार्थी" : "students"}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{req.institutionName}</span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                    <span className="font-medium text-white/90">
                      {req.contactPerson}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="font-mono text-cyan-400">
                      {req.contactNumber}
                    </span>
                    {req.cityState && (
                      <>
                        <span className="text-white/40">•</span>
                        <span className="flex items-center gap-1 text-white/60">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          {req.cityState}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Core Challenge Box */}
                  <div className="mt-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
                    <span className="font-semibold text-emerald-300 block">
                      {isHindi ? "प्रशासनिक चुनौती / आवश्यकता:" : "Institutional Hurdle:"}
                    </span>
                    <p className="leading-relaxed text-white/90">{req.challenge}</p>
                  </div>
                </div>

                {/* Right Actions & Notes */}
                <div className="w-full lg:w-80 flex flex-col gap-3">
                  {/* WhatsApp Dialogue Button */}
                  <button
                    onClick={() =>
                      openWhatsApp(req.contactNumber, req.contactPerson, req.institutionName)
                    }
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isHindi ? "व्हाट्सएप संवाद शुरू करें" : "Start WhatsApp Dialogue"}</span>
                  </button>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">
                      {isHindi ? "स्थिति:" : "Status:"}
                    </span>
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      disabled={updatingId === req.id}
                      className="flex-1 py-1.5 px-3 rounded-lg text-xs bg-white/5 border border-white/15 text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="new" className="bg-slate-900 text-white">
                        {isHindi ? "नया (New)" : "New"}
                      </option>
                      <option value="in_dialogue" className="bg-slate-900 text-white">
                        {isHindi ? "संवाद जारी (In Dialogue)" : "In Dialogue"}
                      </option>
                      <option value="family_member" className="bg-slate-900 text-white">
                        {isHindi ? "संस्थागत परिवार (Family Member)" : "Family Member"}
                      </option>
                      <option value="resolved" className="bg-slate-900 text-white">
                        {isHindi ? "समाधान पूर्ण (Resolved)" : "Resolved"}
                      </option>
                    </select>
                  </div>

                  {/* Administrative Notes Editor */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-white/50">
                      <span>{isHindi ? "आंतरिक टिप्पणी (Internal Notes):" : "Internal Notes:"}</span>
                      <button
                        onClick={() => handleSaveNotes(req.id)}
                        disabled={updatingId === req.id}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                      >
                        <Save className="w-3 h-3" />
                        {isHindi ? "सहेजें" : "Save"}
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={activeNotes[req.id] || ""}
                      onChange={(e) =>
                        setActiveNotes((prev) => ({ ...prev, [req.id]: e.target.value }))
                      }
                      placeholder={
                        isHindi ? "संवाद प्रगति या समाधान विवरण लिखें..." : "Add follow-up notes..."
                      }
                      className="w-full p-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          ))
        )}
      </div>

      {/* Manual Request Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <LiquidGlassCard className="max-w-lg w-full p-6 space-y-5 border-emerald-500/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
                {isHindi ? "नया संस्थागत अनुरोध दर्ज करें" : "Record New Institutional Request"}
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  {isHindi ? "विद्यालय / संस्था का नाम *" : "Institution Name *"}
                </label>
                <GlassInput
                  required
                  placeholder="e.g. Saraswati Vidya Mandir, Meerut"
                  value={newForm.institutionName}
                  onChange={(e) => setNewForm({ ...newForm, institutionName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    {isHindi ? "संपर्क व्यक्ति (नाम व पद)" : "Contact Person & Designation"}
                  </label>
                  <GlassInput
                    placeholder="e.g. Dr. Rajesh Sharma (Principal)"
                    value={newForm.contactPerson}
                    onChange={(e) => setNewForm({ ...newForm, contactPerson: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    {isHindi ? "व्हाट्सएप / मोबाइल नंबर *" : "WhatsApp / Mobile *"}
                  </label>
                  <GlassInput
                    required
                    placeholder="+91 98765 43210"
                    value={newForm.contactNumber}
                    onChange={(e) => setNewForm({ ...newForm, contactNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    {isHindi ? "शहर व राज्य" : "City & State"}
                  </label>
                  <GlassInput
                    placeholder="e.g. Meerut, Uttar Pradesh"
                    value={newForm.cityState}
                    onChange={(e) => setNewForm({ ...newForm, cityState: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1">
                    {isHindi ? "छात्र संख्या (अनुमानित)" : "Student Strength"}
                  </label>
                  <GlassInput
                    type="number"
                    placeholder="e.g. 850"
                    value={newForm.studentCount}
                    onChange={(e) => setNewForm({ ...newForm, studentCount: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1">
                  {isHindi ? "मुख्य प्रशासनिक चुनौती / समस्या *" : "Core Challenge / Hurdle *"}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    isHindi
                      ? "जैसे: बायोमेट्रिक टर्नस्टाइल से स्टाफ LOP, फीस बकाया WhatsApp मैसेज..."
                      : "Describe the school's operational hurdle..."
                  }
                  value={newForm.challenge}
                  onChange={(e) => setNewForm({ ...newForm, challenge: e.target.value })}
                  className="w-full p-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <GlassButton
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="text-xs"
                >
                  {isHindi ? "रद्द करें" : "Cancel"}
                </GlassButton>
                <GlassButton
                  type="submit"
                  disabled={updatingId === "create"}
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {updatingId === "create" ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span>{isHindi ? "अनुरोध सहेजें" : "Record Request"}</span>
                </GlassButton>
              </div>
            </form>
          </LiquidGlassCard>
        </div>
      )}
    </div>
  );
}
