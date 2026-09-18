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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");

  // Suspend / Unsuspend Modal State
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);
  const [actionType, setActionType] = useState<"suspend" | "unsuspend">("suspend");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
            Cloud Schools Fleet Management
          </h2>
          <p className="text-sm text-slate-400">
            Multi-tenant school tenants, subscriptions, compliance status, and tenant governance.
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <LiquidGlassCard glowColor="cyan" className="p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Fleet Size</span>
          <div className="text-2xl font-bold text-white mt-1">{schools.length} Schools</div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Multi-Tenant Workspaces</span>
        </LiquidGlassCard>

        <LiquidGlassCard glowColor="emerald" className="p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Active & Verified</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{activeCount} Tenants</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Full cloud operational status</span>
        </LiquidGlassCard>

        <LiquidGlassCard glowColor="amber" className="p-4">
          <span className="text-xs text-slate-400 uppercase tracking-wider block">Suspended / Inactive</span>
          <div className="text-2xl font-bold text-amber-400 mt-1">{suspendedCount} Schools</div>
          <span className="text-[11px] text-amber-400/90 mt-1 block">Requires admin review</span>
        </LiquidGlassCard>
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
            className="px-3 py-2.5 rounded-xl glass-panel border border-white/10 bg-[#07090e] text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Fleet Status</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* Schools Table */}
      <LiquidGlassCard glowColor="cyan" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-3.5">School Code</th>
                <th className="p-3.5">School Name</th>
                <th className="p-3.5">Affiliation</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Plan Tier</th>
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
                    <td className="p-3.5 font-mono text-cyan-400 font-bold">{school.schoolCode}</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-white">{school.name}</div>
                      <div className="text-[11px] text-slate-500">{school.contactEmail}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {school.affiliationBoard} {school.affiliationNumber ? `(${school.affiliationNumber})` : ""}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">
                      <div>{school.city || school.district}</div>
                      <div className="text-[11px] text-slate-500">{school.state}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-white">{school.adminName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{school.adminEmail}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {school.subscriptionTier}
                      </span>
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
                    <td className="p-3.5 text-right">
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
      </LiquidGlassCard>

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
    </div>
  );
}
