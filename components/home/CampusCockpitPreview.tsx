"use client";

import React, { useState, useEffect } from "react";
import { 
  School, 
  Navigation, 
  CreditCard, 
  Radio, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldCheck,
  MapPin,
  Bell
} from "lucide-react";

export function CampusCockpitPreview() {
  const [activeTab, setActiveTab] = useState<"attendance" | "fleet" | "fees">("attendance");
  const [tickerIndex, setTickerIndex] = useState(0);

  const liveTaps = [
    { name: "Aarav Sharma", grade: "Class 9-A", gate: "Turnstile 02", time: "07:54:12 AM", speed: "0.38s", status: "Parent SMS Sent" },
    { name: "Diya Verma", grade: "Class 11-B", gate: "Turnstile 01", time: "07:55:04 AM", speed: "0.41s", status: "Parent SMS Sent" },
    { name: "Kabir Mehta", grade: "Class 6-C", gate: "Turnstile 03", time: "07:55:48 AM", speed: "0.36s", status: "Parent SMS Sent" },
    { name: "Ananya Gupta", grade: "Class 10-A", gate: "Turnstile 02", time: "07:56:19 AM", speed: "0.39s", status: "Parent SMS Sent" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTaps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [liveTaps.length]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100/90 dark:bg-slate-950/90 border border-slate-200/80 dark:border-white/10 shadow-2xl transition-colors duration-300">
      {/* Cockpit Window Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 pl-2">
            <School className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold text-slate-800 dark:text-white font-tech">
              Delhi Public Campus — Live Operating Cockpit
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>ONLINE • 120 BUSES ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20 px-4 pt-2 gap-2 text-xs">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`px-3 py-2 rounded-t-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "attendance"
              ? "bg-white dark:bg-white/10 text-cyan-700 dark:text-cyan-300 border-t-2 border-cyan-500 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>RFID Gate Stream</span>
        </button>

        <button
          onClick={() => setActiveTab("fleet")}
          className={`px-3 py-2 rounded-t-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "fleet"
              ? "bg-white dark:bg-white/10 text-cyan-700 dark:text-cyan-300 border-t-2 border-cyan-500 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>GPS Fleet Radar</span>
        </button>

        <button
          onClick={() => setActiveTab("fees")}
          className={`px-3 py-2 rounded-t-xl font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === "fees"
              ? "bg-white dark:bg-white/10 text-cyan-700 dark:text-cyan-300 border-t-2 border-cyan-500 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Fee Ledger</span>
        </button>
      </div>

      {/* Main Cockpit Display Body */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* KPI Strip */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
              Today's Attendance
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                98.6%
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                (1,420 / 1,440)
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/10 mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full w-[98.6%]" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
              Bus Telemetry Ping
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-display text-cyan-600 dark:text-cyan-300">
                180ms
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                WebSocket
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 block truncate">
              120/120 Vehicles In Geofence
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
              WhatsApp Recovery
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl sm:text-2xl font-bold font-display text-purple-600 dark:text-purple-300">
                ₹4.82 L
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                99.2%
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 block truncate">
              Auto-Reconciled Today
            </span>
          </div>
        </div>

        {/* Tab-Specific Content */}
        {activeTab === "attendance" && (
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-white/10">
              <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                Live RFID Gate Tap Feed (Sub-0.4s Verification)
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Auto-Refreshing Live
              </span>
            </div>

            <div className="space-y-1.5">
              {liveTaps.map((tap, idx) => {
                const isHighlight = idx === tickerIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                      isHighlight
                        ? "bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-400/40 text-cyan-900 dark:text-cyan-200 shadow-sm"
                        : "bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">{tap.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono">
                        {tap.grade}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="hidden sm:inline text-slate-500 dark:text-slate-400">{tap.gate}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{tap.speed}</span>
                      <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        {tap.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "fleet" && (
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-white/10">
              <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Active Bus Route Geofence Telemetry
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                100% Vehicles On Schedule
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Bus #14 (North Route)</span>
                  <span className="text-cyan-600 dark:text-cyan-400">38 km/h</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Next Stop: Sector 18 (ETA 4 min)
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5">
                  <span>Occupancy: 28/32</span>
                  <span className="text-emerald-600 dark:text-emerald-400">SMS Alerts Dispatched</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-1">
                <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                  <span>Bus #08 (South Ring)</span>
                  <span className="text-cyan-600 dark:text-cyan-400">32 km/h</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Next Stop: Civil Lines (ETA 6 min)
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5">
                  <span>Occupancy: 31/35</span>
                  <span className="text-emerald-600 dark:text-emerald-400">SMS Alerts Dispatched</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fees" && (
          <div className="p-3.5 rounded-xl bg-white/90 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-white/10">
              <span className="font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                Automated WhatsApp Fee Installment Reconciliation
              </span>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-300 font-bold">
                Q3 Installments
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Digital Collection Velocity</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">99.2% Direct to Bank</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full w-[99.2%]" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                <span>Total Recovered: ₹84,20,000</span>
                <span>Pending Inquiries: 14</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-[11px] font-mono border border-cyan-500/30">
              Telemetry Cockpit
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              Unified Campus Command Center
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
            Offline SQLite • Cloud Synced
          </span>
        </div>
      </div>
    </div>
  );
}
