"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { useLanguage } from "@/lib/LanguageContext";
import {
  ScanFace,
  Printer,
  Radio,
  Bus,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HardDrive,
  Flame,
  Zap,
  Maximize2,
} from "lucide-react";
import { HardwareMotionGraphic } from "./HardwareSimulators";

interface GadgetItem {
  id: string;
  nameEn: string;
  nameHi: string;
  tagEn: string;
  tagHi: string;
  badgeColor: string;
  icon: React.ElementType;
  specs: { labelEn: string; labelHi: string; value: string }[];
  descriptionEn: string;
  descriptionHi: string;
  capabilitiesEn: string[];
  capabilitiesHi: string[];
  imageUrl?: string;
}

const GADGETS: GadgetItem[] = [
  {
    id: "turnstile",
    nameEn: "Face AI Gate Turnstiles & Barrier Gates",
    nameHi: "सब-150ms फेस AI बायोमेट्रिक टर्नस्टाइल बैरियर गेट्स",
    tagEn: "Physical Gate Automation",
    tagHi: "शून्य-कतार परिसर प्रवेश",
    badgeColor: "bg-cyan-500/15 border-cyan-400/30 text-cyan-700 dark:text-cyan-300",
    icon: ScanFace,
    specs: [
      { labelEn: "Recognition Speed", labelHi: "पहचान स्पीड", value: "<150ms NPU" },
      { labelEn: "Throughput", labelHi: "छात्र प्रति मिनट", value: "50 Students/min" },
      { labelEn: "Gate Material", labelHi: "हार्डवेयर बॉडी", value: "SUS 304 Steel" },
      { labelEn: "Anti-Passback", labelHi: "फर्जी एंट्री सुरक्षा", value: "Hardware Locked" },
    ],
    descriptionEn:
      "Heavy-duty industrial tripod and flap barrier turnstiles engineered with dual-lens infrared anti-spoofing cameras. Recognizes student faces on-device in under 150ms and dispatches parent WhatsApp alerts instantly.",
    descriptionHi:
      "औद्योगिक ग्रेड 304 स्टेनलेस स्टील ट्राइपॉड और फ्लैप बैरियर टर्नस्टाइल्स। 150ms से भी कम समय में बिना रुके चेहरे की पहचान कर गेट खोलता है और तुरंत अभिभावक को व्हाट्सएप पर आगमन की सूचना भेजता है।",
    capabilitiesEn: [
      "Zero queue congestion during peak 7:45 AM assembly rush",
      "Infrared dual-lens prevents photo/screen proxy spoofing",
      "Direct native USB/LAN driver interfacing with School Desktop OS",
      "Instant Gate-to-Classroom wanderer radar triggers if student loiters",
    ],
    capabilitiesHi: [
      "सुबह की असेंबली में बिना लाइन लगे तेज गति से सुरक्षित प्रवेश",
      "इन्फ्रारेड डुअल लेंस फोटो या मोबाइल स्क्रीन से फर्जी हाजिरी रोकता है",
      "स्कूल डेस्कटॉप OS के साथ बिना किसी तीसरे सॉफ्टवेयर के डायरेक्ट कनेक्ट",
      "गेट से अंदर आकर क्लास न पहुंचने वाले छात्र का तत्काल वांडरर अलर्ट",
    ],
    imageUrl: "/images/desktop/turnstile_gate_screen.png",
  },
  {
    id: "thermal-printer",
    nameEn: "80mm Heavy-Duty Dual-Slip Thermal POS Printers",
    nameHi: "80mm हैवी-ड्यूटी ड्यूल-स्लिप थर्मल POS रसीद प्रिंटर्स",
    tagEn: "Instant Fee Counter Hardware",
    tagHi: "शून्य-स्याही रसीद प्रिंटिंग",
    badgeColor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    icon: Printer,
    specs: [
      { labelEn: "Print Speed", labelHi: "प्रिंटिंग स्पीड", value: "250 mm/sec" },
      { labelEn: "Receipt Format", labelHi: "रसीद फॉर्मेट", value: "80mm Dual-Copy" },
      { labelEn: "Ink Expense", labelHi: "स्याही का खर्च", value: "₹0 (Direct Thermal)" },
      { labelEn: "Cutter Life", labelHi: "ऑटो-कटर लाइफ", value: "1.5 Million Cuts" },
    ],
    descriptionEn:
      "Dedicated commercial-grade thermal receipt printers integrated with School OS via direct ESC/POS protocols. Prints dual-copy receipts (one parent copy, one audit slip) in 0.8s with automatic guillotine cutting.",
    descriptionHi:
      "डायरेक्ट ESC/POS प्रोटोकॉल द्वारा स्कूल OS से जुड़ा हुआ व्यावसायिक थर्मल प्रिंटर। 0.8 सेकंड में एक साथ दोहरी रसीद (एक अभिभावक के लिए, एक स्कूल ऑडिट रिकॉर्ड के लिए) प्रिंट कर स्वतः कट करता है।",
    capabilitiesEn: [
      "Zero ink or ribbon costs forever — uses low-cost thermal rolls",
      "Auto guillotine paper cutter with cash drawer trigger kick-out",
      "Prints authorized digital QR code for parent instant fee validation",
      "Operates 100% offline at the fee billing counter without broadband",
    ],
    capabilitiesHi: [
      "स्याही या रिबन का जीवन भर ₹0 खर्च — केवल सामान्य थर्मल पेपर",
      "ऑटोमैटिक पेपर कटर और कैश ड्रावर का ऑटो-ओपन ट्रिगर",
      "अभिभावक के तत्काल वेरिफिकेशन के लिए अधिकृत डिजिटल QR कोड प्रिंट",
      "इंटरनेट बंद होने पर भी फीस काउंटर पर बिना रुके तुरंत रसीद प्रिंटिंग",
    ],
    imageUrl: "/images/desktop/pos_printer_receipt.png",
  },
  {
    id: "rfid-antennas",
    nameEn: "UHF Long-Range Antennas & Smart Campus ID Cards",
    nameHi: "UHF लॉन्ग-रेंज गेट एंटीना एवं स्मार्ट चिप ID कार्ड्स",
    tagEn: "Walk-Through Detection",
    tagHi: "8-12 मीटर लॉन्ग रेंज ट्रैकिंग",
    badgeColor: "bg-indigo-500/15 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
    icon: Radio,
    specs: [
      { labelEn: "Read Range", labelHi: "रीड दूरी", value: "8 - 12 Meters" },
      { labelEn: "Multi-Tag Speed", labelHi: "एक साथ पहचान", value: "50 Tags/sec" },
      { labelEn: "Frequency", labelHi: "ऑपरेटिंग फ्रीक्वेंसी", value: "865-867 MHz" },
      { labelEn: "Weather Rating", labelHi: "आउटडोर सुरक्षा", value: "IP67 Waterproof" },
    ],
    descriptionEn:
      "Overhead long-range UHF RFID antennas installed at school gates and bus bays. Reads encrypted smart ID cards hanging on student uniforms up to 12 meters away without requiring physical tap.",
    descriptionHi:
      "स्कूल के मुख्य गेट और बस पार्किंग पर लगने वाले लॉन्ग-रेंज UHF एंटीना। बिना कार्ड सटाए, 12 मीटर की दूरी से ही यूनिफॉर्म में लगे स्मार्ट ID कार्ड को स्वतः डिटेक्ट करके हाजिरी दर्ज करते हैं।",
    capabilitiesEn: [
      "Bulk attendance capture for 30+ students walking through together",
      "Cryptographically salted card numbers protect against cloning",
      "Heavy-duty IP67 waterproof enclosure withstands monsoon weather",
      "Seamlessly synchronizes with campus LAN attendance controller",
    ],
    capabilitiesHi: [
      "एक साथ गेट से निकलने वाले 30+ छात्रों की एक साथ बिना रुके हाजिरी",
      "एन्क्रिप्टेड कार्ड नंबर जिसे कोई भी बाहर कॉपी या क्लोन नहीं कर सकता",
      "कठिन मौसम और बारिश में 24/7 चालू रहने वाली वाटरप्रूफ IP67 बॉडी",
      "लोकल कैंपस सर्वर से बिना देरी के सीधे वायरलेस सिंक",
    ],
    imageUrl: "/images/desktop/rfid_bulk_attendance.png",
  },
  {
    id: "bus-telemetry",
    nameEn: "4G LTE Bus GPS Trackers & Geofence Beacons",
    nameHi: "4G LTE स्कूल बस GPS ट्रैकर्स एवं जियोफेंस बीकन्स",
    tagEn: "Live Fleet Telemetry",
    tagHi: "रीयल-टाइम स्कूल बस ट्रैकिंग",
    badgeColor: "bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300",
    icon: Bus,
    specs: [
      { labelEn: "Location Accuracy", labelHi: "लोकेशन सटीकता", value: "2.5 Meters" },
      { labelEn: "Telemetry Rate", labelHi: "अपडेट दर", value: "Every 5 Seconds" },
      { labelEn: "Backup Battery", labelHi: "इंटरनल बैटरी", value: "12-Hour Reserve" },
      { labelEn: "Sensors", labelHi: "सेंसर्स", value: "Speed & Ignition" },
    ],
    descriptionEn:
      "Automotive-grade IoT telematics installed in school buses. Feeds live GPS coordinates directly to the parent mobile app with automated geofence alerts when the bus approaches the pickup stop.",
    descriptionHi:
      "स्कूल बसों में लगाए जाने वाले ऑटोमोटिव IoT GPS ट्रैकर्स। हर 5 सेकंड में पैरेंट मोबाइल ऐप पर बस की सटीक लोकेशन भेजते हैं। स्टॉप से 1 किलोमीटर पहले अभिभावक को स्वतः अलर्ट मिलता है।",
    capabilitiesEn: [
      "Parents never wait at morning bus stops in harsh winter or rain",
      "Automated over-speed and sudden harsh braking alerts for safety",
      "Eliminates anxious phone calls to school drivers and reception",
      "Tracks fuel consumption and driver route adherence automatically",
    ],
    capabilitiesHi: [
      "सर्दियों या बारिश में अभिभावकों को बस स्टैंड पर लंबे समय तक खड़े रहने से मुक्ति",
      "बस ड्राइवर द्वारा निर्धारित स्पीड पार करने पर तुरंत स्कूल एडमिन को अलर्ट",
      "रिसेप्शन या बस ड्राइवरों को अभिभावकों के बार-बार फोन आने का झंझट खत्म",
      "डीजल खर्च और निर्धारित बस रूट का पूरा डिजिटल रिकॉर्ड",
    ],
    imageUrl: "/images/desktop/call_center_dark.png",
  },
  {
    id: "lan-server",
    nameEn: "Air-Gapped Multi-PC Campus LAN Server Workstation",
    nameHi: "एयर-गैप्ड मल्टी-PC लोकल कैंपस सर्वर वर्कस्टेशन",
    tagEn: "Local-First Core Hub",
    tagHi: "100% इंटरनेट-मुक्त लोकल सर्वर",
    badgeColor: "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300",
    icon: HardDrive,
    specs: [
      { labelEn: "LAN Sync Latency", labelHi: "लोकल सिंक लेटेंसी", value: "<15ms Raft" },
      { labelEn: "Terminals Supported", labelHi: "कनेक्टेड कंप्यूटर्स", value: "Up to 32 PCs" },
      { labelEn: "Internet Dependency", labelHi: "इंटरनेट आवश्यकता", value: "0% Required" },
      { labelEn: "Data Custody", labelHi: "डेटा सुरक्षा", value: "On-Premises" },
    ],
    descriptionEn:
      "A dedicated local-first desktop hub running an embedded Raft consensus engine. Connects fee billing PCs, admission desks, and the principal's dashboard across campus Ethernet/Wi-Fi without sending student data to external clouds.",
    descriptionHi:
      "कैंपस में स्थापित एक समर्पित लोकल सर्वर हब जो लोकल नेटवर्क पर चलता है। फीस काउंटर, एडमिशन डेस्क और प्रिंसिपल के कंप्यूटर को बिना इंटरनेट के आपस में रीयल-टाइम सिंक रखता है।",
    capabilitiesEn: [
      "Zero broadband dependency: fee counters never pause during outages",
      "Multi-terminal real-time reconciliation prevents double billing",
      "Sensitive student biometric and financial data stays inside the school",
      "Automatic encrypted local backups with 1-click restore functionality",
    ],
    capabilitiesHi: [
      "इंटरनेट बंद होने पर भी सभी फीस और एडमिशन काउंटर्स बिना रुकावट चालू",
      "एक साथ कई काउंटर्स पर फीस जमा होने पर भी रीयल-टाइम बैलेंस सिंक",
      "छात्रों का बायोमेट्रिक और वित्तीय डेटा स्कूल की चारदीवारी के अंदर सुरक्षित",
      "दैनिक ऑटो-एन्क्रिप्टेड बैकअप जिसे 1-क्लिक में कभी भी रीस्टोर किया जा सकता है",
    ],
    imageUrl: "/images/desktop/lan_server_cluster.png",
  },
];

export function HardwareEcosystemSection() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [selectedGadgetId, setSelectedGadgetId] = useState<string>("turnstile");
  const [displayMode, setDisplayMode] = useState<"simulator" | "photo">("simulator");

  const activeGadget = GADGETS.find((g) => g.id === selectedGadgetId) || GADGETS[0];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="hardware-ecosystem">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1760px] mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-bold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5 text-cyan-500" />
            <span>{isHi ? "हार्डवेयर गैजेट्स + सॉफ्टवेयर का संपूर्ण तालमेल" : "Hardware + Software Co-Engineering"}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
            {isHi ? (
              <>
                परिसर में स्थापित होने वाले{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  इंजीनियर्ड गैजेट्स व टूल्स
                </span>
              </>
            ) : (
              <>
                Engineered Campus Gadgets:{" "}
                <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  The Physical Ecosystem
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
            {isHi
              ? "मॉडर्निज़म स्कूल केवल सॉफ्टवेयर नहीं देता — हम आपके परिसर में बायोमेट्रिक टर्नस्टाइल्स, 80mm POS रसीद प्रिंटर्स, RFID एंटीना और लोकल सर्वर स्वयं इंस्टॉल करके पूरा इकोसिस्टम एक्टिवेट करते हैं।"
              : "Modernisum School delivers an end-to-end engineered physical environment. We deploy turnstile barrier hardware, POS thermal printers, long-range RFID, and local servers directly on your campus."}
          </p>
        </div>

        {/* 2-COLUMN MASTER-DETAIL LAYOUT (MATCHING SWITCH SUBSYSTEM SCREEN PATTERN) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT SIDE: Hardware Terminal Window & Telemetry Display       */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-4">
            <LiquidGlassCard
              glowColor="rgba(0, 242, 254, 0.22)"
              className="rounded-3xl border border-slate-200/80 dark:border-white/15 overflow-hidden shadow-2xl p-0 flex flex-col"
            >
              {/* Hardware Device Titlebar Chrome */}
              <div className="bg-slate-200/80 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-5 py-3 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block shadow-xs" />
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block shadow-xs" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
                  <span className="ml-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                    CAMPUS HARDWARE MONITOR — [USB &amp; LAN Native Drivers]
                  </span>
                </div>

                <div className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-xs">
                  {isHi ? activeGadget.nameHi : activeGadget.nameEn}
                </div>

                <div className="flex items-center gap-2">
                  {/* Simulator / Photo Toggle Pills */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-300/80 dark:bg-white/10 text-[10px] font-mono">
                    <button
                      onClick={() => setDisplayMode("simulator")}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        displayMode === "simulator"
                          ? "bg-cyan-500 text-black font-bold shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      3D SIMULATOR
                    </button>
                    <button
                      onClick={() => setDisplayMode("photo")}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        displayMode === "photo"
                          ? "bg-cyan-500 text-black font-bold shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      PHOTO
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </div>
                </div>
              </div>

              {/* Hardware Live Telemetry & 3D Motion Simulator Viewport */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full bg-slate-950 overflow-hidden">
                {displayMode === "simulator" ? (
                  <HardwareMotionGraphic gadgetId={activeGadget.id} />
                ) : activeGadget.imageUrl ? (
                  <Image
                    src={activeGadget.imageUrl}
                    alt={activeGadget.nameEn}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 900px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                    <Cpu className="w-12 h-12 text-cyan-400" />
                    <span className="text-xs font-mono">Hardware Driver Active</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1.5 z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {displayMode === "simulator" ? "REAL-TIME 3D MOTION SIMULATION" : "NATIVE HARDWARE TERMINAL VIEW"}
                </div>
              </div>

              {/* Hardware Deep-Dive Details & Specifications */}
              <div className="p-5 sm:p-6 space-y-5 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200/80 dark:border-white/10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold border" style={{ borderColor: "rgba(56, 189, 248, 0.3)" }}>
                    <Zap className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{isHi ? activeGadget.tagHi : activeGadget.tagEn}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white leading-snug">
                    {isHi ? activeGadget.nameHi : activeGadget.nameEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {isHi ? activeGadget.descriptionHi : activeGadget.descriptionEn}
                  </p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeGadget.specs.map((spec, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10">
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                        {isHi ? spec.labelHi : spec.labelEn}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5 truncate">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 4 Core Campus Operational Advantages */}
                <div className="space-y-2 pt-1 border-t border-slate-200/80 dark:border-white/10">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-300">
                    {isHi ? "मुख्य परिचालन लाभ" : "Operational Advantages"}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {(isHi ? activeGadget.capabilitiesHi : activeGadget.capabilitiesEn).map((cap, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: Interactive Campus Hardware Gadget Switcher       */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-4">
            
            {/* Switcher Panel */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{isHi ? "हार्डवेयर डिवाइस चुनें" : "Switch Campus Hardware Gadget"}</span>
                </span>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-600 dark:text-cyan-400">
                  {GADGETS.length} Engineered Gadgets
                </span>
              </div>

              {/* Vertical Stack of 5 Hardware Gadget Tiles */}
              <div className="space-y-2">
                {GADGETS.map((gadget) => {
                  const isSelected = gadget.id === selectedGadgetId;
                  const Icon = gadget.icon;
                  return (
                    <button
                      key={gadget.id}
                      onClick={() => setSelectedGadgetId(gadget.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl text-xs transition-all duration-200 text-left cursor-pointer border ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-indigo-500/20 text-cyan-950 dark:text-cyan-100 border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.18)] font-bold scale-[1.01]"
                          : "bg-slate-100/70 dark:bg-white/[0.03] text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-cyan-500 text-black shadow-sm"
                          : "bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-[13px]">
                          {isHi ? gadget.nameHi : gadget.nameEn}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {isHi ? gadget.tagHi : gadget.tagEn}
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* On-Site Physical Setup & Warranty Assurance Box */}
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl space-y-3.5 shadow-md">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {isHi ? "ऑन-साइट इंस्टॉलेशन एवं 3-वर्षीय हार्डवेयर वारंटी" : "On-Site Physical Setup & 3-Year Warranty"}
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                {isHi
                  ? "सभी टर्नस्टाइल्स, थर्मल प्रिंटर्स और UHF RFID एंटीना हमारी समर्पित इंजीनियरिंग टीम द्वारा आपके स्कूल में सीधे इंस्टॉल व टेस्ट किए जाते हैं।"
                  : "All turnstiles, thermal printers, and RFID gates are physically deployed, wired, and calibrated on-site directly by our dedicated hardware engineering team."}
              </p>

              <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2.5">
                <a
                  href="https://wa.me/919368671007"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <GlassButton
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {isHi ? "हार्डवेयर डेमो और ऑन-साइट सर्वे बुक करें" : "Request Campus Hardware Demo"}
                  </GlassButton>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
