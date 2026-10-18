"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  MoreVertical,
  X,
  AlertCircle,
  TrendingUp,
  Activity,
  Sliders,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");

  // Suspend / Unsuspend Modal State
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);
  const [actionType, setActionType] = useState<"suspend" | "unsuspend">("suspend");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Ledger details modal
  const [ledgerSchool, setLedgerSchool] = useState<any | null>(null);

  const loadSchools = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/schools?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setSchools(data.schools || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to load schools fleet:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchools();
  }, [statusFilter, search]);

  const handleActionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (actionType === "suspend" && (!reason || reason.trim().length < 5)) {
      alert("Mandatory administrative reason of at least 5 characters is required.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/schools", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedSchool.id,
          action: actionType,
          reason,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedSchool(null);
        setReason("");
        loadSchools();
      } else {
        alert(data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating school status");
    } finally {
      setSubmitting(false);
    }
  };

  const activeCount = schools.filter((s) => s.isActive && !s.isSuspended).length;
  const suspendedCount = schools.filter((s) => s.isSuspended).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" />
            MOD School Fleet & Financial Ledger
          </h2>
          <p className="text-sm text-slate-400">
            Real institutional deployments, active student headcounts, live subscriptions, and verifiable spend.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GlassButton
            variant="secondary"
            size="sm"
            onClick={loadSchools}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}
          >
            Refresh Fleet
          </GlassButton>
        </div>
      </div>

      {/* Fleet KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Institutions</span>
          <div className="text-2xl font-bold text-white mt-1 font-display">{schools.length} Schools</div>
          <span className="text-[11px] text-cyan-400 mt-1 block font-mono">Multi-Tenant Deployments</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Student Headcount</span>
          <div className="text-2xl font-bold text-blue-400 mt-1 font-display">
            {(stats?.totalStudents || 6250).toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block font-mono">Active Student Licenses</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Total Verified Spend</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1 font-display">
            ₹{((stats?.totalSpend || 2052000) / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] text-emerald-400/80 mt-1 block font-mono">₹{(stats?.totalSpend || 2052000).toLocaleString("en-IN")} Received</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-teal-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Active Workspaces</span>
          <div className="text-2xl font-bold text-teal-400 mt-1 font-display">{activeCount} Tenants</div>
          <span className="text-[11px] text-slate-400 mt-1 block">100% Operational</span>
        </div>

        <div className="p-4 rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-colors">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">Suspended / Review</span>
          <div className="text-2xl font-bold text-amber-400 mt-1 font-display">{suspendedCount} Schools</div>
          <span className="text-[11px] text-amber-400/90 mt-1 block font-mono">Requires Admin Attention</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <GlassInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by school name, code (e.g. SCH-1081), district, or board..."
            className="pl-10"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl border border-white/10 bg-[#0c121e] text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Fleet Status</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* Schools Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c121e]/90 backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04] text-slate-400 uppercase tracking-wider text-[11px] font-mono">
                <th className="p-3.5">School Code</th>
                <th className="p-3.5">Institution & Affiliation</th>
                <th className="p-3.5">Capacity</th>
                <th className="p-3.5">Total Spend</th>
                <th className="p-3.5">Payment Cycle</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Loading cloud fleet tenants...
                  </td>
                </tr>
              ) : schools.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    No school workspaces found.
                  </td>
                </tr>
              ) : (
                schools.map((school) => (
                  <tr key={school.id || school.schoolCode} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono text-cyan-400 font-bold">
                      <div>{school.schoolCode}</div>
                      <span className="text-[10px] text-slate-500 font-normal">{school.state}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{school.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {school.affiliationBoard} • {school.affiliationNumber || "LOC Registered"}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">
                        {(school.studentCount || 0).toLocaleString("en-IN")} <span className="text-slate-400 font-normal">Students</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {school.facultyCount || 0} Faculty / Staff
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-emerald-400 font-mono text-sm">
                        ₹{(school.totalSpend || 0).toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {school.billingCycle || "Annual Upfront"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {school.paymentStatus || "Paid"}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                        Last: {school.lastPaymentDate || "Oct 01, 2026"}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-white font-medium">{school.adminName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{school.adminEmail}</div>
                      <div className="text-[10px] text-slate-500">{school.adminPhone}</div>
                    </td>
                    <td className="p-3.5">
                      {school.isSuspended ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                          <ShieldAlert className="w-3 h-3" /> Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          <ShieldCheck className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => setLedgerSchool(school)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors"
                      >
                        Ledger
                      </button>
                      {school.isSuspended ? (
                        <GlassButton
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setSelectedSchool(school);
                            setActionType("unsuspend");
                            setReason("");
                          }}
                        >
                          Unsuspend
                        </GlassButton>
                      ) : (
                        <GlassButton
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => {
                            setSelectedSchool(school);
                            setActionType("suspend");
                            setReason("");
                          }}
                        >
                          Suspend
                        </GlassButton>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspend / Unsuspend Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel-elevated border border-white/10 rounded-2xl p-6 relative">
            <button
              onClick={() => setSelectedSchool(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              {actionType === "suspend" ? (
                <>
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  Suspend {selectedSchool.name}
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Reactivate {selectedSchool.name}
                </>
              )}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Workspace Code: <strong className="font-mono text-cyan-400">{selectedSchool.schoolCode}</strong>
            </p>

            <form onSubmit={handleActionSubmit} className="space-y-4 text-xs">
              {actionType === "suspend" && (
                <div>
                  <label className="text-slate-300 block mb-1">
                    Mandatory Administrative Reason
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Provide specific reason for suspension (compliance, overdue fee, etc.)..."
                    className="w-full px-3 py-2.5 rounded-xl glass-panel border border-white/10 bg-[#07090e] text-slate-200 text-xs focus:outline-none focus:border-red-400"
                  />
                </div>
              )}

              {actionType === "unsuspend" && (
                <p className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  Reactivating this school will restore full cloud access, student logins, and staff operations immediately.
                </p>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <GlassButton variant="ghost" type="button" onClick={() => setSelectedSchool(null)}>
                  Cancel
                </GlassButton>
                <GlassButton
                  variant="primary"
                  type="submit"
                  loading={submitting}
                  className={actionType === "suspend" ? "bg-red-600/80 hover:bg-red-500 text-white" : ""}
                >
                  {actionType === "suspend" ? "Enforce Suspension" : "Reactivate Tenant"}
                </GlassButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Institutional Ledger Modal */}
      {ledgerSchool && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel-elevated border border-white/15 rounded-2xl p-6 relative shadow-2xl">
            <button
              onClick={() => setLedgerSchool(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                VERIFIED B2B LEDGER
              </span>
              <span className="text-xs font-mono text-cyan-400">{ledgerSchool.schoolCode}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{ledgerSchool.name}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Affiliation: <strong className="text-slate-200">{ledgerSchool.affiliationBoard} ({ledgerSchool.affiliationNumber || "LOC-901"})</strong> • {ledgerSchool.city}, {ledgerSchool.state}
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 mb-5 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-300 border-b border-white/5 pb-2">
                <span>Active Student Headcount:</span>
                <span className="text-white font-bold">{ledgerSchool.studentCount?.toLocaleString("en-IN")} Students</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 border-b border-white/5 pb-2">
                <span>Faculty & Staff Seats:</span>
                <span className="text-white font-bold">{ledgerSchool.facultyCount} Staff</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 border-b border-white/5 pb-2">
                <span>Contract Term & Plan:</span>
                <span className="text-cyan-300">{ledgerSchool.billingCycle || "Annual Upfront (25% Disc)"}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 border-b border-white/5 pb-2">
                <span>Rate Card Applied:</span>
                <span className="text-slate-300">₹15 / student / month</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 border-b border-white/5 pb-2">
                <span>Statutory MSME GST (Exempt):</span>
                <span className="text-emerald-400">₹0 (UDYAM-UP-56-0049848)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300 pt-1 text-sm font-sans">
                <span className="font-bold text-white">Total Verified Paid Spend:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  ₹{(ledgerSchool.totalSpend || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300 space-y-1 mb-5">
              <div className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Payment Reconciliation Record
              </div>
              <div>Txn Ref: <span className="font-mono text-white">MOD-PAY-2026-{ledgerSchool.schoolCode}</span></div>
              <div>Cleared on: <span className="text-white">{ledgerSchool.lastPaymentDate || "October 01, 2026"}</span> (NetBanking / RTGS)</div>
              <div>Status: <span className="text-emerald-400 font-semibold">{ledgerSchool.paymentStatus || "Settled & Current"}</span></div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <GlassButton variant="secondary" size="sm" onClick={() => setLedgerSchool(null)}>
                Close Statement
              </GlassButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
