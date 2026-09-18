"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  RefreshCw,
  Clock,
  User,
  Activity,
  Layers,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit-logs");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter(
    (l) =>
      !search ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.actor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Platform Security & Audit Trail
          </h2>
          <p className="text-sm text-slate-400">
            Immutable log of school tenant registrations, compliance suspensions, and administrative actions.
          </p>
        </div>
        <GlassButton
          variant="secondary"
          size="sm"
          onClick={loadLogs}
          icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />}
        >
          Refresh Trail
        </GlassButton>
      </div>

      {/* Search Input */}
      <div className="relative">
        <GlassInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter audit events by action, school code, or actor..."
          className="pl-10"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
      </div>

      {/* Logs Table */}
      <LiquidGlassCard glowColor="emerald" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Target</th>
                <th className="p-3.5">Details</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Loading security audit logs...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No audit records matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((log, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          log.action.includes("SUSPENDED")
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : log.action.includes("REGISTERED")
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">{log.category}</td>
                    <td className="p-3.5 font-mono text-white font-semibold">{log.target}</td>
                    <td className="p-3.5 text-slate-300 max-w-md">{log.details}</td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">{log.actor}</td>
                    <td className="p-3.5 text-right text-slate-500 font-mono text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
