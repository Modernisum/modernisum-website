"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Zap, Radio, Bus, Cpu, QrCode } from "lucide-react";

export function TurnstileSimulator() {
  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 242, 254, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Real-Time NPU Recognition HUD */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-4">
        {/* Face HUD Box */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 border-2 border-cyan-400/60 rounded-2xl p-2 flex flex-col items-center justify-center bg-cyan-950/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,242,254,0.2)]">
          {/* Corner Reticles */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* Animated Laser Scanning Line */}
          <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce opacity-80" />

          {/* Biometric Landmark Vectors */}
          <div className="w-24 h-28 rounded-full border border-dashed border-cyan-400/40 flex items-center justify-center relative">
            <div className="w-2 h-2 rounded-full bg-cyan-400 absolute top-8 left-6 animate-ping" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 absolute top-8 right-6 animate-ping" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 absolute top-14 left-11" />
            <div className="w-4 h-1 rounded-full bg-cyan-300/60 absolute bottom-6" />
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>NPU: 124ms MATCH</span>
          </div>
        </div>

        {/* Turnstile Barrier State Indicator */}
        <div className="w-full bg-slate-900/90 border border-white/10 rounded-xl p-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200 font-bold">GATE #01: UNLOCKED</span>
          </div>
          <span className="text-cyan-400">STUDENT #2024-819</span>
        </div>
      </div>
    </div>
  );
}

export function ThermalPrinterSimulator() {
  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Printer Slot Housing */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl relative z-10 flex flex-col items-center">
        {/* Status Bar */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            ESC/POS 80mm READY
          </span>
          <span>SPEED: 250mm/s</span>
        </div>

        {/* Paper Dispenser Slot */}
        <div className="w-full h-2 bg-slate-950 rounded-full my-3 border border-slate-800 shadow-inner" />

        {/* Dispensed Receipt Paper (Continuous Animation) */}
        <div className="w-[85%] bg-white text-slate-900 p-4 rounded-b-lg shadow-xl font-mono text-[10px] space-y-1.5 border-t-2 border-dashed border-slate-300">
          <div className="text-center font-bold text-xs uppercase tracking-wider pb-1 border-b border-slate-200">
            MOD SCHOOL ACADEMY
          </div>
          <div className="flex justify-between text-slate-600">
            <span>RECEIPT: #MS-9821</span>
            <span>DATE: TODAY</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>STUDENT: Aarav Sharma</span>
            <span>CLASS: X-A</span>
          </div>
          <div className="py-1 border-t border-b border-slate-200 flex justify-between font-bold text-emerald-700">
            <span>TOTAL COLLECTED:</span>
            <span>₹14,200.00</span>
          </div>
          <div className="flex items-center justify-between pt-1 text-[9px] text-slate-500">
            <span>STATUS: 100% RECONCILED</span>
            <QrCode className="w-5 h-5 text-slate-900" />
          </div>
        </div>

        {/* Guillotine Auto-Cutter Indicator */}
        <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-cyan-400">
          <Zap className="w-3 h-3" />
          <span>AUTO-GUILLOTINE CUT COMPLETE (0.4s)</span>
        </div>
      </div>
    </div>
  );
}

export function RfidSimulator() {
  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Antenna Pulses */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping" />
        <div className="absolute inset-6 rounded-full border border-purple-500/30 animate-pulse" />
        <div className="absolute inset-16 rounded-full border border-emerald-500/40" />

        {/* Center UHF Antenna Mast */}
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-400/50 flex flex-col items-center justify-center z-10 shadow-[0_0_25px_rgba(0,242,254,0.3)]">
          <Radio className="w-8 h-8 text-cyan-400" />
          <span className="text-[9px] font-mono text-cyan-300 font-bold">865 MHz</span>
        </div>

        {/* Surrounding Detected Student Badges */}
        <div className="absolute top-2 left-4 bg-slate-900/90 border border-white/10 px-2 py-1 rounded-md text-[10px] font-mono text-slate-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>TAG: #9042 [PASS]</span>
        </div>
        <div className="absolute bottom-4 right-2 bg-slate-900/90 border border-white/10 px-2 py-1 rounded-md text-[10px] font-mono text-slate-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>TAG: #8119 [PASS]</span>
        </div>
      </div>

      <div className="mt-3 text-xs font-mono text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>12-METER BULK RFID ATTENDANCE SCANNER ACTIVE</span>
      </div>
    </div>
  );
}

export function BusTelemetrySimulator() {
  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Map Radar Grid */}
      <div className="w-full max-w-md h-56 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between">
        {/* Dotted Route Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path
            d="M 30 180 Q 150 40 260 120 T 400 60"
            fill="none"
            stroke="#00f2fe"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Top Telemetry Header */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono">
          <span className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Bus className="w-4 h-4" />
            <span>BUS #04 (ROUTE: NORTH CAMPUS)</span>
          </span>
          <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            38 KM/H • ON TIME
          </span>
        </div>

        {/* Animated Moving Bus Marker */}
        <div className="relative z-10 self-center flex items-center gap-2 bg-slate-950/90 border border-cyan-400/40 px-3 py-1.5 rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.25)]">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-mono text-white font-bold">
            GEOFENCE RADIUS: 450M TO STOP
          </span>
        </div>

        {/* Bottom Coordinates & Alert */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>LAT: 28.6139° N, LONG: 77.2090° E</span>
          <span className="text-cyan-400">PARENT APP: NOTIFIED</span>
        </div>
      </div>
    </div>
  );
}

export function LanServerSimulator() {
  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* 2U Rack Chassis */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl relative z-10 space-y-3">
        {/* Server Faceplate */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="font-bold">MOD AIR-GAPPED LAN SERVER</span>
          </div>
          <span className="text-emerald-400 text-[10px] font-bold">RAFT CONSENSUS: OK</span>
        </div>

        {/* 8 Drive Bay Indicator LEDs */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((bay) => (
            <div key={bay} className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>BAY {bay}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          ))}
        </div>

        {/* LAN Connected Terminals Strip */}
        <div className="p-2.5 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">CONNECTED LAN NODES:</span>
          <span className="text-cyan-400 font-bold">14 TERMINALS • &lt;12ms LATENCY</span>
        </div>
      </div>
    </div>
  );
}

export function HardwareMotionGraphic({ gadgetId }: { gadgetId: string }) {
  switch (gadgetId) {
    case "turnstile":
      return <TurnstileSimulator />;
    case "thermal-printer":
      return <ThermalPrinterSimulator />;
    case "rfid-antennas":
      return <RfidSimulator />;
    case "bus-telemetry":
      return <BusTelemetrySimulator />;
    case "lan-server":
      return <LanServerSimulator />;
    default:
      return <TurnstileSimulator />;
  }
}
