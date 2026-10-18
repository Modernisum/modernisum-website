"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Search,
  X,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Video,
  ImageIcon,
  IndianRupee,
  Calendar,
  AlertCircle,
  ExternalLink,
  Loader2,
  Lock,
  Layers,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";

interface OrderTrackingData {
  orderId: string;
  clientName: string;
  clientEmail: string;
  serviceNeeded: string;
  status: string;
  projectState: string;
  referenceUrl?: string;
  surfaces?: string[];
  features?: string[];
  progressPct: number;
  totalFixedPrice: number;
  estimatedDays: number;
  approvedStartDate?: string | null;
  slaDeliveryDate?: string | null;
  assignedPod: string;
  tasks?: Array<{ id: string; title: string; weightPct: number; completed: boolean }>;
  milestones?: Array<{ name: string; pct: number; amount: number; status: "pending" | "paid" }>;
  screenshots?: Array<{ url: string; caption: string; uploadedAt: string }>;
  meetingUrl?: string | null;
  tokenPaid: boolean;
  tokenAmount: number;
  advancePaid: boolean;
  createdAt?: any;
}

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export function OrderTrackingModal({ isOpen, onClose, initialOrderId = "" }: OrderTrackingModalProps) {
  const [queryInput, setQueryInput] = useState(initialOrderId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);
  const [activeTab, setActiveTab] = useState<"tasks" | "screenshots" | "payments">("tasks");

  useEffect(() => {
    if (initialOrderId) {
      setQueryInput(initialOrderId);
      fetchOrder(initialOrderId);
    }
  }, [initialOrderId]);

  if (!isOpen) return null;

  const fetchOrder = async (searchId?: string) => {
    const term = (searchId || queryInput).trim();
    if (!term) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/orders/track?orderId=${encodeURIComponent(term)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Order not found. Please check your Order ID.");
      }

      setOrderData(data.data);
      if (data.data.progressPct === 100) {
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (err: any) {
      setError(err.message || "Failed to locate project order.");
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-white/15 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Customer Project &amp; Sprint Tracker
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                100% Real-Time Milestone Verification &amp; WIP Progress
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-5 border-b border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/[0.02] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchOrder();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Enter your Order ID (e.g. MOD-ORD-2026-9812) or Registered Email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </div>
            <GlassButton
              type="submit"
              variant="primary"
              size="sm"
              disabled={loading || !queryInput.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Track Order</span>}
            </GlassButton>
          </form>

          {error && (
            <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Details Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!orderData && !loading && !error && (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Layers className="w-12 h-12 mx-auto text-cyan-500/40 animate-pulse" />
              <p className="text-xs">
                Enter your **Order ID** above to view real-time task completion, WIP screenshots, and meeting sessions.
              </p>
            </div>
          )}

          {orderData && (
            <div className="space-y-6">
              {/* Top Order Badge & Info Strip */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black font-mono text-cyan-600 dark:text-cyan-400">
                      {orderData.orderId}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        orderData.status === "approved"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          : orderData.status === "in_progress"
                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30"
                          : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30"
                      }`}
                    >
                      {orderData.status.replace("_", " ")}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {orderData.serviceNeeded}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Client: {orderData.clientName} ({orderData.clientEmail})
                  </p>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Guaranteed Investment
                  </div>
                  <div className="text-base font-black font-mono text-slate-900 dark:text-white">
                    {formatINR(orderData.totalFixedPrice)}
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center sm:justify-end gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    <span>Fixed Price Locked</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Strip */}
              <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Sprint Execution Completion</span>
                  </span>
                  <span className="font-mono font-black text-sm text-cyan-600 dark:text-cyan-400">
                    {orderData.progressPct}% Complete
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, orderData.progressPct))}%` }}
                  />
                </div>

                <div className="flex flex-wrap justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>Start: {orderData.approvedStartDate || "Capacity Review in Progress"}</span>
                  <span>Promised Delivery SLA: {orderData.slaDeliveryDate || `${orderData.estimatedDays} Days`}</span>
                  <span>Pod: {orderData.assignedPod}</span>
                </div>
              </div>

              {/* Live Meeting Room Trigger (If Scheduled) */}
              {orderData.meetingUrl && (
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        Live Engineering Consultation &amp; Review Room
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Join direct screen-sharing and architecture review with the lead architect.
                      </p>
                    </div>
                  </div>
                  <a
                    href={orderData.meetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <span>Join Google Meet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 dark:border-white/10 gap-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("tasks")}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === "tasks"
                      ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Deliverables Checklist ({orderData.tasks?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("screenshots")}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "screenshots"
                      ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>WIP Screenshots ({orderData.screenshots?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("payments")}
                  className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                    activeTab === "payments"
                      ? "border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Milestones &amp; Billing
                </button>
              </div>

              {/* Tab 1: Task Checklist */}
              {activeTab === "tasks" && (
                <div className="space-y-2.5">
                  {orderData.tasks && orderData.tasks.length > 0 ? (
                    orderData.tasks.map((task, idx) => (
                      <div
                        key={task.id || idx}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          task.completed
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100"
                            : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                              task.completed
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-slate-300 dark:border-white/20 bg-white/5"
                            }`}
                          >
                            {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className={`text-xs font-semibold ${task.completed ? "line-through opacity-80" : ""}`}>
                              {idx + 1}. {task.title}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400 shrink-0">
                          {task.weightPct}% Weight
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      Detailed sprint breakdown will be published as soon as engineer capacity is confirmed.
                    </p>
                  )}
                </div>
              )}

              {/* Tab 2: WIP Screenshots */}
              {activeTab === "screenshots" && (
                <div className="space-y-4">
                  {orderData.screenshots && orderData.screenshots.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {orderData.screenshots.map((shot, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-100 dark:bg-white/5 space-y-2 p-2"
                        >
                          <img
                            src={shot.url}
                            alt={shot.caption || `WIP Milestone Screenshot ${idx + 1}`}
                            className="w-full h-44 object-cover rounded-xl"
                          />
                          <div className="p-1">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">
                              {shot.caption || "Sprint Verification Demo"}
                            </p>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Uploaded: {shot.uploadedAt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-400 space-y-2 border border-dashed border-slate-300 dark:border-white/10 rounded-2xl p-6">
                      <ImageIcon className="w-8 h-8 mx-auto text-slate-400 opacity-50" />
                      <p className="text-xs">
                        Work-in-progress screenshots will be uploaded here by engineers as milestones complete.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Milestones & Payments */}
              {activeTab === "payments" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {orderData.milestones?.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border flex flex-col justify-between ${
                          m.status === "paid"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100"
                            : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold">{m.name}</span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                              m.status === "paid"
                                ? "bg-emerald-500 text-white"
                                : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                        <div className="text-lg font-black font-mono mt-3 text-slate-900 dark:text-white">
                          {formatINR(m.amount)}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          {m.pct}% of total contract
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      💡 Policy Reminder:
                    </p>
                    <p>
                      Milestones are billed only after the corresponding deliverables are completed, demonstrated, and verified by you.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
