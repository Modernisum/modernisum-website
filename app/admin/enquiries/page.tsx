"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Inbox,
  Search,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Filter,
  ExternalLink,
  Loader2,
  Database,
  Printer,
  FileText,
  Calendar,
  Zap,
  ShieldCheck,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { QuotationSlipModal, type QuotationSlipData } from "@/components/shared/QuotationSlipModal";

interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  projectDescription: string;
  status: "new" | "in_progress" | "approved" | "resolved" | "refunded";
  createdAt: string;
  quotationDetails?: QuotationSlipData;
  approvedStartDate?: string;
  assignedPod?: string;
}

const MOCK_ENQUIRIES: EnquiryItem[] = [
  {
    id: "enq-01",
    name: "Dr. Rajesh Sharma",
    email: "principal@delhipublicbranch.edu",
    phone: "+91 9897123456",
    serviceNeeded: "MOD School Autonomous School OS",
    budgetRange: "₹2,00,000 - ₹5,00,000",
    projectDescription: "We operate 3 campuses with 4,200 students and 35 buses. Need RFID turnstiles and parent GPS bus tracking before the new academic session.",
    status: "new",
    createdAt: "2026-03-16",
  },
  {
    id: "enq-02",
    name: "Aman Singhal",
    email: "aman@logistics-infra.in",
    phone: "+91 9811223344",
    serviceNeeded: "Fleet Telemetry & IoT",
    budgetRange: "₹5,00,000+",
    projectDescription: "Need GPS telemetry and RFID integration for warehouse fleet.",
    status: "in_progress",
    createdAt: "2026-03-15",
  },
  {
    id: "enq-03",
    name: "Vikram Malhotra",
    email: "vikram@stxaviers-network.edu",
    phone: "+91 9368671007",
    serviceNeeded: "MOD School Autonomous School OS (Multi-Campus)",
    budgetRange: "₹7,20,720 (15 Days Turnaround)",
    projectDescription: "[AUTOMATED BLUEPRINT QUOTATION REQUEST]\nSolution: MOD School Autonomous School OS\nTier: Multi-Campus Ecosystem\nStandard Timeline: 45 Days\nExpedited Timeline: 15 Days (67% accelerated, +134% surge)\nBase Cost: ₹3,08,000\nExpedited Surcharge: ₹4,12,720\nTotal Budget: ₹7,20,720\n25% Advance: ₹1,80,180\n75% Milestone Balance: ₹5,40,540\nClient Notes: Need 150 RFID smart cards and live bus tracking for 40 school buses.",
    status: "new",
    createdAt: "2026-03-18",
    quotationDetails: {
      quotationId: "MOD-QT-889123",
      createdAt: "18 Mar 2026",
      clientName: "Vikram Malhotra",
      clientEmail: "vikram@stxaviers-network.edu",
      clientPhone: "+91 9368671007",
      solution: "MOD School Autonomous School OS",
      scopeTier: "Multi-Campus Ecosystem",
      standardDays: 45,
      expeditedDays: 15,
      timeReductionPct: 67,
      surgeMultiplierPct: 134,
      baseCost: 308000,
      expeditedSurcharge: 412720,
      totalCost: 720720,
      advanceAmount: 180180,
      milestoneBalance: 540540,
      notes: "Need 150 RFID smart cards and live bus tracking for 40 school buses.",
    },
    approvedStartDate: "2026-03-25",
    assignedPod: "Pod-Alpha (Axum Edge & RFID Core)",
  },
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(MOCK_ENQUIRIES);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedSlip, setSelectedSlip] = useState<QuotationSlipData | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enquiry");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data.map((item: any) => ({
          id: item._id || item.id,
          name: item.name,
          email: item.email,
          phone: item.phone || "Not specified",
          serviceNeeded: item.serviceNeeded || "Custom Solution",
          budgetRange: item.budgetRange || "Flexible",
          projectDescription: item.projectDescription || "",
          status: item.status || "new",
          quotationDetails: item.quotationDetails || null,
          approvedStartDate: item.approvedStartDate || "",
          assignedPod: item.assignedPod || "",
          createdAt: item.createdAt ? item.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
        }));
        setEnquiries(mapped);
        return;
      }
    } catch (err) {
      console.warn("API enquiry fetch fallback, trying direct Firestore:", err);
    }

    // Direct Firestore Lead Fetch (Works in static hosting & offline environments)
    try {
      const { db } = await import("@/lib/firebase");
      const { collection, getDocs, query, limit } = await import("firebase/firestore");

      const liveItems: EnquiryItem[] = [];

      // 1. Fetch from enquiries collection
      try {
        const enqCol = collection(db, "enquiries");
        const enqSnap = await getDocs(query(enqCol, limit(50)));
        enqSnap.forEach((docSnap) => {
          const d = docSnap.data();
          liveItems.push({
            id: docSnap.id,
            name: d.name || "Anonymous",
            email: d.email || "No email",
            phone: d.phone || "Not specified",
            serviceNeeded: d.serviceNeeded || "Lead Verification",
            budgetRange: d.budgetRange || "Flexible",
            projectDescription: d.projectDescription || "",
            status: d.status || "new",
            quotationDetails: d.quotationDetails || null,
            approvedStartDate: d.approvedStartDate || "",
            assignedPod: d.assignedPod || "",
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
          });
        });
      } catch {}

      // 2. Fetch from marketing_leads collection
      try {
        const leadsCol = collection(db, "marketing_leads");
        const leadsSnap = await getDocs(query(leadsCol, limit(50)));
        leadsSnap.forEach((docSnap) => {
          const d = docSnap.data();
          if (d.email && !liveItems.some((item) => item.email.toLowerCase() === d.email.toLowerCase())) {
            liveItems.push({
              id: docSnap.id,
              name: d.name || "Executive Explorer",
              email: d.email || "",
              phone: "Google Verified",
              serviceNeeded: `1-Click Lead (${d.deviceOS || "Desktop"})`,
              budgetRange: "General Inquiry",
              projectDescription: `Authenticated lead from ${d.pageSource || "Homepage"} (${d.deviceOS || "Web"} • ${d.browser || "Browser"}).`,
              status: "new",
              createdAt: d.capturedAt?.toDate ? d.capturedAt.toDate().toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
            });
          }
        });
      } catch {}

      if (liveItems.length > 0) {
        setEnquiries(liveItems);
      }
    } catch (fsErr) {
      console.warn("Direct Firestore lead retrieval fallback error:", fsErr);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filtered = enquiries.filter((item) => {
    let matchesFilter = filter === "all" || item.status === filter;
    if (filter === "blueprints") {
      matchesFilter = !!item.quotationDetails || item.projectDescription.includes("[AUTOMATED BLUEPRINT");
    }
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.serviceNeeded.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id: string, newStatus: EnquiryItem["status"]) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const handleApproveSprint = (id: string, date: string, pod: string) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: "approved",
              approvedStartDate: date || new Date().toISOString().substring(0, 10),
              assignedPod: pod || "Pod-Alpha (Lead Architect)",
            }
          : e
      )
    );
  };

  const handleRefundAdvance = (id: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "refunded" } : e))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">
            Client Enquiries &amp; Architecture Blueprints
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time inbound inquiries and self-service quotations with transparent 25% advance and SLA tracking.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {["all", "blueprints", "new", "in_progress", "approved", "resolved", "refunded"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase transition-all cursor-pointer ${
                filter === status
                  ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 shadow-xs"
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {status === "blueprints" ? "⚡ Blueprints" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by name, email, or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filtered.map((enq) => {
          const isBlueprint =
            !!enq.quotationDetails ||
            enq.projectDescription.includes("[AUTOMATED BLUEPRINT");

          return (
            <LiquidGlassCard
              key={enq.id}
              glowColor={
                enq.status === "approved"
                  ? "rgba(16, 185, 129, 0.2)"
                  : enq.status === "refunded"
                  ? "rgba(239, 68, 68, 0.2)"
                  : isBlueprint
                  ? "rgba(0, 242, 254, 0.2)"
                  : "rgba(121, 40, 202, 0.1)"
              }
              className="p-6 rounded-3xl border border-white/10 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-base text-white">{enq.name}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                        enq.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                          : enq.status === "refunded"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-400/40"
                          : enq.status === "new"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                          : enq.status === "in_progress"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                          : "bg-slate-500/20 text-slate-300 border border-slate-400/40"
                      }`}
                    >
                      {enq.status}
                    </span>

                    {isBlueprint && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-purple-400" />
                        <span>QUOTATION BLUEPRINT</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <a href={`mailto:${enq.email}`} className="hover:text-cyan-300">
                        {enq.email}
                      </a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-purple-400" />
                      <a href={`tel:${enq.phone}`} className="hover:text-cyan-300">
                        {enq.phone}
                      </a>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {enq.createdAt}
                    </span>
                  </div>
                </div>

                {/* Status Switcher & Action */}
                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      updateStatus(enq.id, e.target.value as EnquiryItem["status"])
                    }
                    className="bg-black/60 border border-white/20 rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="new">New Lead</option>
                    <option value="in_progress">In Progress</option>
                    <option value="approved">Approved</option>
                    <option value="resolved">Resolved</option>
                    <option value="refunded">Refunded (Cancelled)</option>
                  </select>

                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(enq.name)},%20Modernisum%20Engineering%20HQ%20has%20received%20your%20blueprint%20request.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium inline-flex items-center gap-1 transition-colors"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Tags and Details */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                    Scope: {enq.serviceNeeded}
                  </span>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                    Investment: {enq.budgetRange}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line">
                  {enq.projectDescription}
                </div>
              </div>

              {/* Blueprint Specific Approval & Slip Matrix */}
              {isBlueprint && (
                <div className="p-4 rounded-2xl bg-cyan-500/[0.05] border border-cyan-500/20 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>Admin Approval &amp; Sprint Pod Lock</span>
                    </div>

                    {enq.quotationDetails && (
                      <button
                        type="button"
                        onClick={() => setSelectedSlip(enq.quotationDetails!)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer w-fit"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>View / Print Official Quotation Slip</span>
                      </button>
                    )}
                  </div>

                  {/* Confirmed Schedule & Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 block">
                        Confirmed Start Date
                      </label>
                      <input
                        type="date"
                        defaultValue={enq.approvedStartDate || ""}
                        id={`date-${enq.id}`}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-slate-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-slate-400 block">
                        Assigned Pod / Lead
                      </label>
                      <select
                        defaultValue={enq.assignedPod || "Pod-Alpha (Axum Edge)"}
                        id={`pod-${enq.id}`}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-slate-200"
                      >
                        <option value="Pod-Alpha (Axum Edge)">Pod-Alpha (Axum Edge)</option>
                        <option value="Pod-Beta (Next.js 16 UI)">Pod-Beta (Next.js 16 UI)</option>
                        <option value="Pod-Gamma (Flutter/Mobile)">Pod-Gamma (Flutter/Mobile)</option>
                        <option value="Pod-Omega (AI Autonomous Agents)">Pod-Omega (AI Autonomous Agents)</option>
                      </select>
                    </div>

                    <div className="flex items-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const dateEl = document.getElementById(`date-${enq.id}`) as HTMLInputElement;
                          const podEl = document.getElementById(`pod-${enq.id}`) as HTMLSelectElement;
                          handleApproveSprint(enq.id, dateEl?.value, podEl?.value);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve &amp; Lock Sprint</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRefundAdvance(enq.id)}
                        className="py-1.5 px-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title="Cancel & return 100% advance to customer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Refund Advance</span>
                      </button>
                    </div>
                  </div>

                  {enq.status === "approved" && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Sprint Locked: Starting on {enq.approvedStartDate || "scheduled date"} by {enq.assignedPod || "Assigned Pod"}. 25% Advance mobilized.</span>
                    </div>
                  )}

                  {enq.status === "refunded" && (
                    <div className="text-[11px] text-rose-400 flex items-center gap-1.5 pt-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancelled: 100% customer advance refunded per Modernisum zero-risk guarantee.</span>
                    </div>
                  )}
                </div>
              )}
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Official Quotation Slip Modal */}
      {selectedSlip && (
        <QuotationSlipModal
          isOpen={!!selectedSlip}
          onClose={() => setSelectedSlip(null)}
          data={selectedSlip}
        />
      )}
    </div>
  );
}
