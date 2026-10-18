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
  Eye,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Video,
  Image as ImageIcon,
  Save,
  ChevronDown,
  ChevronUp,
  Tag,
  AlertCircle,
  IndianRupee,
  Layers,
} from "lucide-react";
import { QuotationSlipModal, type QuotationSlipData } from "@/components/shared/QuotationSlipModal";
import { OrderTrackingModal } from "@/components/shared/OrderTrackingModal";
import type { ProjectMilestoneTask, PaymentMilestone, WipScreenshot } from "@/lib/firestore/enquiries";

interface EnquiryItem {
  id: string;
  orderId?: string;
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  budgetRange: string;
  projectDescription: string;
  projectState?: "new" | "existing_legacy";
  referenceUrl?: string;
  surfaces?: string[];
  features?: string[];
  status: "new" | "in_progress" | "approved" | "resolved" | "refunded" | "cancelled";
  createdAt: string;
  quotationDetails?: QuotationSlipData;
  approvedStartDate?: string;
  slaDeliveryDate?: string;
  assignedPod?: string;
  tasks?: ProjectMilestoneTask[];
  milestones?: PaymentMilestone[];
  screenshots?: WipScreenshot[];
  meetingUrl?: string;
  couponCode?: string;
  discountAmount?: number;
  partnerCommission?: number;
  progressPct?: number;
  tokenPaid?: boolean;
  tokenAmount?: number;
  advancePaid?: boolean;
  totalFixedPrice?: number;
  estimatedDays?: number;
}

const MOCK_ENQUIRIES: EnquiryItem[] = [
  {
    id: "enq-03",
    orderId: "MOD-ORD-2026-8891",
    name: "Vikram Malhotra",
    email: "vikram@stxaviers-network.edu",
    phone: "+91 9368671007",
    serviceNeeded: "MOD School Autonomous School OS (Multi-Campus)",
    budgetRange: "₹7,20,720 (15 Days Turnaround)",
    projectDescription:
      "[AUTOMATED BLUEPRINT QUOTATION REQUEST]\nSolution: MOD School Autonomous School OS\nTier: Multi-Campus Ecosystem\nStandard Timeline: 45 Days\nExpedited Timeline: 15 Days (67% accelerated, +134% surge)\nBase Cost: ₹3,08,000\nExpedited Surcharge: ₹4,12,720\nTotal Budget: ₹7,20,720\n25% Advance: ₹1,80,180\n75% Milestone Balance: ₹5,40,540\nClient Notes: Need 150 RFID smart cards and live bus tracking for 40 school buses.",
    status: "approved",
    createdAt: "2026-03-18",
    projectState: "new",
    surfaces: ["Web Admin Portal", "Android Parent App", "Offline Desktop Gate Sync"],
    approvedStartDate: "2026-03-25",
    slaDeliveryDate: "2026-04-09",
    assignedPod: "Pod-Alpha (Axum Edge & RFID Core)",
    progressPct: 45,
    tokenPaid: true,
    tokenAmount: 3000,
    advancePaid: true,
    totalFixedPrice: 720720,
    estimatedDays: 15,
    meetingUrl: "https://meet.google.com/xvy-pqrs-mno",
    tasks: [
      {
        id: "t1",
        title: "Architecture Blueprint, Edge Turnstile Schemas & SQLite Engine",
        weightPct: 20,
        completed: true,
        completedAt: "2026-03-26",
      },
      {
        id: "t2",
        title: "Rust Axum Hardware Tunnel for 120 RPM RFID Gate Readers",
        weightPct: 25,
        completed: true,
        completedAt: "2026-03-28",
      },
      {
        id: "t3",
        title: "Parent GPS Bus Fleet Telemetry & E2EE Push Notifications",
        weightPct: 25,
        completed: false,
      },
      {
        id: "t4",
        title: "Biometric UAT, Failover Rehearsal & Campus Gate Handover",
        weightPct: 30,
        completed: false,
      },
    ],
    milestones: [
      {
        name: "25% Mobilization Advance",
        pct: 25,
        amount: 180180,
        status: "paid",
        paidAt: "2026-03-25",
      },
      {
        name: "50% Mid-Sprint (75% Progress)",
        pct: 50,
        amount: 360360,
        status: "pending",
      },
      {
        name: "25% Final Handover & Source Code",
        pct: 25,
        amount: 180180,
        status: "pending",
      },
    ],
    screenshots: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        caption: "Bench Test: RFID reader latency benchmarked at 42ms on local LAN.",
        uploadedAt: "2026-03-27",
      },
    ],
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
  },
  {
    id: "enq-01",
    name: "Dr. Rajesh Sharma",
    email: "principal@delhipublicbranch.edu",
    phone: "+91 9897123456",
    serviceNeeded: "MOD School Autonomous School OS",
    budgetRange: "₹2,00,000 - ₹5,00,000",
    projectDescription:
      "We operate 3 campuses with 4,200 students and 35 buses. Need RFID turnstiles and parent GPS bus tracking before the new academic session.",
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
];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(MOCK_ENQUIRIES);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedSlip, setSelectedSlip] = useState<QuotationSlipData | null>(null);
  const [previewOrderId, setPreviewOrderId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>("enq-03");

  // New task form state (by order id)
  const [newTaskInput, setNewTaskInput] = useState<{ [id: string]: string }>({});
  // New screenshot form state
  const [newScreenUrl, setNewScreenUrl] = useState<{ [id: string]: string }>({});
  const [newScreenCaption, setNewScreenCaption] = useState<{ [id: string]: string }>({});
  // Meeting URL form state
  const [meetingUrlInput, setMeetingUrlInput] = useState<{ [id: string]: string }>({});
  const [savingAction, setSavingAction] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/enquiry");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped: EnquiryItem[] = json.data.map((item: any) => ({
          id: item._id || item.id,
          orderId:
            item.orderId ||
            (item.quotationDetails?.quotationId
              ? `MOD-ORD-${item.quotationDetails.quotationId.replace("MOD-QT-", "")}`
              : `MOD-ORD-${(item._id || item.id).slice(-6)}`),
          name: item.name || "Anonymous",
          email: item.email || "",
          phone: item.phone || "Not specified",
          serviceNeeded: item.serviceNeeded || "Custom Solution",
          budgetRange: item.budgetRange || "Flexible",
          projectDescription: item.projectDescription || "",
          projectState: item.projectState || "new",
          referenceUrl: item.referenceUrl || "",
          surfaces: item.surfaces || [],
          features: item.features || [],
          status: item.status || "new",
          quotationDetails: item.quotationDetails || null,
          approvedStartDate: item.approvedStartDate || "",
          slaDeliveryDate: item.slaDeliveryDate || "",
          assignedPod: item.assignedPod || "Pod-Alpha (Lead Architect)",
          tasks: item.tasks || item.quotationDetails?.tasks || [],
          milestones: item.milestones || item.quotationDetails?.milestones || [],
          screenshots: item.screenshots || [],
          meetingUrl: item.meetingUrl || "",
          couponCode: item.couponCode || "",
          discountAmount: item.discountAmount || 0,
          partnerCommission: item.partnerCommission || 0,
          progressPct: typeof item.progressPct === "number" ? item.progressPct : 0,
          tokenPaid: Boolean(item.tokenPaid),
          tokenAmount: item.tokenAmount || 0,
          advancePaid: Boolean(item.advancePaid),
          totalFixedPrice: item.totalFixedPrice || item.quotationDetails?.totalCost || 0,
          estimatedDays:
            item.estimatedDays ||
            item.quotationDetails?.expeditedDays ||
            item.quotationDetails?.standardDays ||
            14,
          createdAt: item.createdAt
            ? typeof item.createdAt === "string"
              ? item.createdAt.substring(0, 10)
              : new Date(item.createdAt.seconds * 1000).toISOString().substring(0, 10)
            : new Date().toISOString().substring(0, 10),
        }));
        setEnquiries(mapped);
        return;
      }
    } catch (err) {
      console.warn("API enquiry fetch fallback, trying direct Firestore:", err);
    }

    // Direct Firestore Lead Fetch fallback
    try {
      const { db } = await import("@/lib/firebase");
      const { collection, getDocs, query, limit } = await import("firebase/firestore");

      const liveItems: EnquiryItem[] = [];

      try {
        const enqCol = collection(db, "enquiries");
        const enqSnap = await getDocs(query(enqCol, limit(50)));
        enqSnap.forEach((docSnap) => {
          const d = docSnap.data();
          liveItems.push({
            id: docSnap.id,
            orderId: d.orderId || `MOD-ORD-${docSnap.id.slice(-6)}`,
            name: d.name || "Anonymous",
            email: d.email || "No email",
            phone: d.phone || "Not specified",
            serviceNeeded: d.serviceNeeded || "Lead Verification",
            budgetRange: d.budgetRange || "Flexible",
            projectDescription: d.projectDescription || "",
            projectState: d.projectState || "new",
            referenceUrl: d.referenceUrl || "",
            surfaces: d.surfaces || [],
            features: d.features || [],
            status: d.status || "new",
            quotationDetails: d.quotationDetails || null,
            approvedStartDate: d.approvedStartDate || "",
            slaDeliveryDate: d.slaDeliveryDate || "",
            assignedPod: d.assignedPod || "Pod-Alpha (Lead Architect)",
            tasks: d.tasks || [],
            milestones: d.milestones || [],
            screenshots: d.screenshots || [],
            meetingUrl: d.meetingUrl || "",
            couponCode: d.couponCode || "",
            discountAmount: d.discountAmount || 0,
            partnerCommission: d.partnerCommission || 0,
            progressPct: typeof d.progressPct === "number" ? d.progressPct : 0,
            tokenPaid: Boolean(d.tokenPaid),
            tokenAmount: d.tokenAmount || 0,
            advancePaid: Boolean(d.advancePaid),
            totalFixedPrice: d.totalFixedPrice || 0,
            estimatedDays: d.estimatedDays || 14,
            createdAt: d.createdAt?.toDate
              ? d.createdAt.toDate().toISOString().substring(0, 10)
              : new Date().toISOString().substring(0, 10),
          });
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
      item.serviceNeeded.toLowerCase().includes(search.toLowerCase()) ||
      (item.orderId && item.orderId.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Persist order updates to API & local state
  const syncOrderUpdate = async (id: string, updates: Partial<EnquiryItem>) => {
    setSavingAction(id);
    try {
      // Local immediate update
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
      );

      // Call API
      await fetch("/api/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updates }),
      });
    } catch (err) {
      console.error("Failed to sync order update:", err);
    } finally {
      setSavingAction(null);
    }
  };

  // 1. Task Toggle Checkbox
  const handleToggleTask = (enq: EnquiryItem, taskId: string) => {
    const currentTasks = enq.tasks || [];
    const updatedTasks = currentTasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            completed: !t.completed,
            completedAt: !t.completed ? new Date().toISOString().substring(0, 10) : undefined,
          }
        : t
    );

    const completedWeight = updatedTasks
      .filter((t) => t.completed)
      .reduce((sum, t) => sum + (t.weightPct || 10), 0);
    const totalWeight = updatedTasks.reduce((sum, t) => sum + (t.weightPct || 10), 0);
    const newProgress = totalWeight > 0 ? Math.min(100, Math.round((completedWeight / totalWeight) * 100)) : 0;

    syncOrderUpdate(enq.id, {
      tasks: updatedTasks,
      progressPct: newProgress,
      status: newProgress === 100 ? "resolved" : "in_progress",
    });
  };

  // 2. Add New Task
  const handleAddTask = (enq: EnquiryItem) => {
    const title = newTaskInput[enq.id]?.trim();
    if (!title) return;

    const currentTasks = enq.tasks || [];
    const newTask: ProjectMilestoneTask = {
      id: `task-${Date.now()}`,
      title,
      weightPct: Math.round(100 / (currentTasks.length + 1)),
      completed: false,
    };

    const updatedTasks = [...currentTasks, newTask];
    syncOrderUpdate(enq.id, { tasks: updatedTasks });
    setNewTaskInput((prev) => ({ ...prev, [enq.id]: "" }));
  };

  // 3. Remove Task
  const handleRemoveTask = (enq: EnquiryItem, taskId: string) => {
    const currentTasks = enq.tasks || [];
    const updatedTasks = currentTasks.filter((t) => t.id !== taskId);
    syncOrderUpdate(enq.id, { tasks: updatedTasks });
  };

  // 4. Milestone Toggle Status
  const handleToggleMilestone = (enq: EnquiryItem, idx: number) => {
    const currentMilestones = enq.milestones || [];
    const updated = currentMilestones.map((m, i) => {
      if (i === idx) {
        const nextStatus = m.status === "paid" ? "pending" : "paid";
        return {
          ...m,
          status: nextStatus as "pending" | "paid",
          paidAt: nextStatus === "paid" ? new Date().toISOString().substring(0, 10) : undefined,
        };
      }
      return m;
    });

    syncOrderUpdate(enq.id, { milestones: updated });
  };

  // 5. Add WIP Screenshot
  const handleAddScreenshot = (enq: EnquiryItem) => {
    const url = newScreenUrl[enq.id]?.trim();
    const caption = newScreenCaption[enq.id]?.trim() || "Sprint Progress Snapshot";
    if (!url) return;

    const currentScreenshots = enq.screenshots || [];
    const newScreen: WipScreenshot = {
      url,
      caption,
      uploadedAt: new Date().toISOString().substring(0, 10),
    };

    syncOrderUpdate(enq.id, {
      screenshots: [newScreen, ...currentScreenshots],
    });

    setNewScreenUrl((prev) => ({ ...prev, [enq.id]: "" }));
    setNewScreenCaption((prev) => ({ ...prev, [enq.id]: "" }));
  };

  // 6. Save Meeting URL
  const handleSaveMeetingUrl = (enq: EnquiryItem) => {
    const url = meetingUrlInput[enq.id]?.trim();
    syncOrderUpdate(enq.id, { meetingUrl: url || "" });
  };

  // 7. Lock Sprint with Start Date, SLA Delivery Date & Pod
  const handleApproveSprint = (
    id: string,
    startDate: string,
    slaDate: string,
    pod: string
  ) => {
    syncOrderUpdate(id, {
      status: "approved",
      approvedStartDate: startDate || new Date().toISOString().substring(0, 10),
      slaDeliveryDate: slaDate || "",
      assignedPod: pod || "Pod-Alpha (Lead Architect)",
    });
  };

  // 8. Cancel & 100% Refund Advance
  const handleRefundAdvance = (id: string) => {
    if (!confirm("Are you sure you want to cancel this sprint and initiate 100% advance refund per Modernisum guarantee?")) return;
    syncOrderUpdate(id, { status: "refunded" });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display text-white">
              Engineering Sprints &amp; Order Operations
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              Zero-Server DB Synced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous order dispatch, immutable fixed-price scope governance, milestone escrow, and live customer telemetry.
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

      {/* Search Input & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Order ID, client name, email, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchEnquiries}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
            <span>Refresh Database</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.map((enq) => {
          const isBlueprint =
            !!enq.quotationDetails ||
            enq.projectDescription.includes("[AUTOMATED BLUEPRINT") ||
            !!enq.orderId;
          const isExpanded = expandedId === enq.id;
          const progress = enq.progressPct ?? 0;

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
              className="p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-base text-white">{enq.name}</span>

                    {/* Order ID Tag */}
                    {enq.orderId && (
                      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {enq.orderId}
                      </span>
                    )}

                    {/* Status Badge */}
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

                    {enq.tokenPaid && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>₹{enq.tokenAmount || 3000} TOKEN PAID</span>
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
                    {enq.couponCode && (
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
                        <Tag className="w-3 h-3" />
                        Coupon: {enq.couponCode} (-₹{enq.discountAmount})
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions & Live Client Tracker Trigger */}
                <div className="flex flex-wrap items-center gap-2">
                  {enq.orderId && (
                    <button
                      type="button"
                      onClick={() => setPreviewOrderId(enq.orderId!)}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      title="Preview live screen seen by the customer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Client Tracker</span>
                    </button>
                  )}

                  {enq.quotationDetails && (
                    <button
                      type="button"
                      onClick={() => setSelectedSlip(enq.quotationDetails!)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Quotation Slip</span>
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(enq.name)},%20Modernisum%20Engineering%20HQ%20has%20received%20your%20order%20blueprint%20${encodeURIComponent(enq.orderId || "")}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-medium inline-flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : enq.id)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? "Collapse Ops" : "Manage Order"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Progress Bar & Scope Pills */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                      Scope: {enq.serviceNeeded}
                    </span>
                    <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                      Fixed Investment: {enq.budgetRange}
                    </span>
                    {enq.projectState === "existing_legacy" && (
                      <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        Partial Codebase / Modernization
                      </span>
                    )}
                  </div>

                  {enq.tasks && enq.tasks.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">
                        {enq.tasks.filter((t) => t.completed).length}/{enq.tasks.length} Tasks
                      </span>
                      <span className="text-xs font-bold font-mono text-cyan-300">
                        {progress}% Completed
                      </span>
                    </div>
                  )}
                </div>

                {/* Visual Progress Bar */}
                {enq.tasks && enq.tasks.length > 0 && (
                  <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line">
                  {enq.projectDescription}
                </div>
              </div>

              {/* EXPANDED INTERACTIVE OPERATIONS WORKBENCH */}
              {isExpanded && (
                <div className="pt-2 border-t border-white/10 space-y-6">
                  {/* Sprint Scheduling, Dates & Pod Assignment */}
                  <div className="p-4 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                        <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        <span>Sprint Pod Assignment &amp; SLA Commitment</span>
                      </div>
                      {savingAction === enq.id && (
                        <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Saving to Firestore...</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 block">
                          Confirmed Start Date
                        </label>
                        <input
                          type="date"
                          defaultValue={enq.approvedStartDate || ""}
                          id={`start-${enq.id}`}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-slate-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 block">
                          Guaranteed SLA Delivery Date
                        </label>
                        <input
                          type="date"
                          defaultValue={enq.slaDeliveryDate || ""}
                          id={`sla-${enq.id}`}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-slate-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400 block">
                          Assigned Pod / Lead
                        </label>
                        <select
                          defaultValue={enq.assignedPod || "Pod-Alpha (Lead Architect)"}
                          id={`pod-${enq.id}`}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-slate-200"
                        >
                          <option value="Pod-Alpha (Axum Edge & Core)">Pod-Alpha (Axum Edge &amp; Core)</option>
                          <option value="Pod-Beta (Next.js 16 UI)">Pod-Beta (Next.js 16 UI)</option>
                          <option value="Pod-Gamma (Flutter/Mobile)">Pod-Gamma (Flutter/Mobile)</option>
                          <option value="Pod-Omega (AI Autonomous Agents)">Pod-Omega (AI Autonomous Agents)</option>
                        </select>
                      </div>

                      <div className="flex items-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const startEl = document.getElementById(`start-${enq.id}`) as HTMLInputElement;
                            const slaEl = document.getElementById(`sla-${enq.id}`) as HTMLInputElement;
                            const podEl = document.getElementById(`pod-${enq.id}`) as HTMLSelectElement;
                            handleApproveSprint(enq.id, startEl?.value, slaEl?.value, podEl?.value);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Lock Sprint</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRefundAdvance(enq.id)}
                          className="py-1.5 px-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          title="Cancel sprint and refund 100% advance deposit"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Refund</span>
                        </button>
                      </div>
                    </div>

                    {/* Google Meet Consultation URL */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-cyan-500/20">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 shrink-0">
                        <Video className="w-4 h-4 text-purple-400" />
                        <span>Live Google Meet / Consultation URL:</span>
                      </div>
                      <input
                        type="url"
                        placeholder="https://meet.google.com/xyz-abcd-efg"
                        value={meetingUrlInput[enq.id] ?? enq.meetingUrl ?? ""}
                        onChange={(e) =>
                          setMeetingUrlInput((prev) => ({ ...prev, [enq.id]: e.target.value }))
                        }
                        className="flex-1 px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-slate-200 placeholder-slate-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleSaveMeetingUrl(enq)}
                        className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold cursor-pointer"
                      >
                        Save Meet Link
                      </button>
                      {enq.meetingUrl && (
                        <a
                          href={enq.meetingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold inline-flex items-center gap-1"
                        >
                          <span>Join</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Task Management & Progress Recalculation Engine */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-cyan-400" />
                        <span>Sprint Tasks &amp; Live Client Deliverables</span>
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Toggling a checkbox auto-recalculates progress and updates client live tracker.
                      </span>
                    </div>

                    <div className="space-y-2">
                      {enq.tasks && enq.tasks.length > 0 ? (
                        enq.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                              task.completed
                                ? "bg-emerald-500/[0.06] border-emerald-500/30 text-emerald-200"
                                : "bg-white/[0.02] border-white/10 text-slate-300"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleTask(enq, task.id)}
                              className="flex items-center gap-2.5 text-left cursor-pointer flex-1"
                            >
                              {task.completed ? (
                                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-500 shrink-0" />
                              )}
                              <span
                                className={`text-xs font-medium ${
                                  task.completed ? "line-through text-slate-400" : "text-slate-200"
                                }`}
                              >
                                {task.title}
                              </span>
                            </button>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                                {task.weightPct}% Weight
                              </span>
                              {task.completedAt && (
                                <span className="text-[10px] font-mono text-slate-500">
                                  Done: {task.completedAt}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveTask(enq, task.id)}
                                className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Remove task"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 italic p-2">
                          No tasks logged yet. Add tasks below to start real-time tracking for this client.
                        </p>
                      )}

                      {/* Add Task Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="e.g. Integrate Razorpay / Cashfree UPI Webhook Gateway"
                          value={newTaskInput[enq.id] || ""}
                          onChange={(e) =>
                            setNewTaskInput((prev) => ({ ...prev, [enq.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddTask(enq);
                          }}
                          className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTask(enq)}
                          className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Task</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Payment Escrow Stages */}
                  {enq.milestones && enq.milestones.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <IndianRupee className="w-4 h-4 text-emerald-400" />
                          <span>Milestone Payment Escrow Matrix</span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Click status badge to toggle payment status.
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {enq.milestones.map((m, idx) => (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border transition-all ${
                              m.status === "paid"
                                ? "bg-emerald-500/[0.07] border-emerald-500/30"
                                : "bg-white/[0.02] border-white/10"
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-200">
                                Stage {idx + 1} ({m.pct}%)
                              </span>
                              <button
                                type="button"
                                onClick={() => handleToggleMilestone(enq, idx)}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold cursor-pointer transition-colors ${
                                  m.status === "paid"
                                    ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                                    : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                                }`}
                              >
                                {m.status === "paid" ? "PAID" : "PENDING"}
                              </button>
                            </div>
                            <div className="text-base font-black font-mono text-white mt-1">
                              ₹{m.amount.toLocaleString("en-IN")}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                              {m.name}
                            </div>
                            {m.paidAt && (
                              <div className="text-[10px] text-emerald-400 mt-1">
                                Paid on {m.paidAt}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WIP Screenshots Gallery & Add Screenshot */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-purple-400" />
                        <span>Work-in-Progress Visual Snapshots</span>
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Uploaded screenshots appear instantly on client dashboard.
                      </span>
                    </div>

                    {/* Screenshot Previews */}
                    {enq.screenshots && enq.screenshots.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {enq.screenshots.map((s, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl overflow-hidden border border-white/10 bg-black/40 group relative"
                          >
                            <img
                              src={s.url}
                              alt={s.caption}
                              className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="p-2 space-y-0.5">
                              <p className="text-[11px] text-slate-200 line-clamp-1 font-medium">
                                {s.caption}
                              </p>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {s.uploadedAt}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Screenshot Form */}
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="url"
                          placeholder="Image URL (e.g. Unsplash, Cloudinary, Imgur)"
                          value={newScreenUrl[enq.id] || ""}
                          onChange={(e) =>
                            setNewScreenUrl((prev) => ({ ...prev, [enq.id]: e.target.value }))
                          }
                          className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500"
                        />
                        <input
                          type="text"
                          placeholder="Caption (e.g. Turnstile gate latency benchmark < 50ms)"
                          value={newScreenCaption[enq.id] || ""}
                          onChange={(e) =>
                            setNewScreenCaption((prev) => ({ ...prev, [enq.id]: e.target.value }))
                          }
                          className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleAddScreenshot(enq)}
                          className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Post Screenshot to Client Feed</span>
                        </button>
                      </div>
                    </div>
                  </div>
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

      {/* Customer Order Tracking Live Preview Modal */}
      {previewOrderId && (
        <OrderTrackingModal
          isOpen={!!previewOrderId}
          onClose={() => setPreviewOrderId(null)}
          initialOrderId={previewOrderId}
        />
      )}
    </div>
  );
}
