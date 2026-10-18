"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import {
  Stethoscope,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  TrendingUp,
  Droplets,
  Sprout,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  Search,
} from "lucide-react";

export interface CropDisease {
  id: string;
  crop: string;
  cropHi: string;
  name: string;
  nameHi: string;
  severity: "Severe" | "Moderate" | "Warning";
  symptoms: string;
  symptomsHi: string;
  yieldLoss: string;
  prescription: {
    instantSpray: string;
    instantSprayHi: string;
    dosagePerAcre: string;
    fertilizerAdjustment: string;
    fertilizerAdjustmentHi: string;
    prevention: string;
    preventionHi: string;
  };
  audioSummaryHi: string;
}

const CROPS_LIST = [
  { id: "sugarcane", name: "Sugarcane", nameHi: "गन्ना", icon: "🎋" },
  { id: "wheat", name: "Wheat", nameHi: "गेहूं", icon: "🌾" },
  { id: "paddy", name: "Paddy (Rice)", nameHi: "धान", icon: "🌱" },
  { id: "potato", name: "Potato", nameHi: "आलू", icon: "🥔" },
  { id: "mustard", name: "Mustard", nameHi: "सरसों", icon: "🌼" },
];

const DISEASES_DATABASE: Record<string, CropDisease[]> = {
  sugarcane: [
    {
      id: "red-rot",
      crop: "Sugarcane",
      cropHi: "गन्ना",
      name: "Red Rot (Cancer of Sugarcane)",
      nameHi: "लाल सड़न रोग (कैंसर)",
      severity: "Severe",
      symptoms: "Stalk pith turns dull red with transverse white patches, leaves wither from margin inwards, alcohol/sour smell from split cane.",
      symptomsHi: "गन्ने के भीतर का गूदा लाल हो जाता है और सफेद चकत्ते दिखते हैं। गन्ने से सिरके जैसी खट्टी गंध आती है और पत्तियां सूखने लगती हैं।",
      yieldLoss: "30% – 85% if untreated",
      prescription: {
        instantSpray: "Carbendazim 50% WP + Mancozeb 75% WP",
        instantSprayHi: "कार्बेन्डाजिम 50% WP + मैन्कोजेब 75% WP का छिड़काव",
        dosagePerAcre: "500 grams in 200 Litres water per acre",
        fertilizerAdjustment: "Halt excessive Nitrogen. Apply Potash (MOP) @ 25kg/acre to strengthen cell walls.",
        fertilizerAdjustmentHi: "यूरिया (नाइट्रोजन) तुरंत रोकें। 25 किलो म्यूरेट ऑफ पोटाश (MOP) प्रति एकड़ दें।",
        prevention: "Dip setts in Trichoderma viride @ 5g/L water before planting. Practice 2-year crop rotation.",
        preventionHi: "बुवाई से पहले बीज को ट्राइकोडर्मा विरिडी से उपचारित करें। गन्ने के बाद दलहन फसल लगाएं।",
      },
      audioSummaryHi: "गन्ने में लाल सड़न रोग लगा है। यूरिया तुरंत बंद करें, 500 ग्राम कार्बेन्डाजिम 200 लीटर पानी में मिलाकर प्रति एकड़ छिड़कें और पोटाश खाद दें।",
    },
    {
      id: "top-borer",
      crop: "Sugarcane",
      cropHi: "गन्ना",
      name: "Top Borer (Shoot Borer)",
      nameHi: "चोटी छेदक कीट",
      severity: "Moderate",
      symptoms: "Shot holes along the midrib of unopened leaves, dead heart formation in terminal shoot with bunchy top.",
      symptomsHi: "पत्तियों के बीच में छलनी जैसे गोल छेद और बीच की मुख्य गोफ का सूखना (डेड हार्ट बनना)।",
      yieldLoss: "15% – 30% sugar recovery loss",
      prescription: {
        instantSpray: "Chlorantraniliprole 0.4% GR or Cartap Hydrochloride 4G",
        instantSprayHi: "क्लोरएंट्रानिलिप्रोल 0.4% GR या कारटाप हाइड्रोक्लोराइड 4G",
        dosagePerAcre: "7.5 kg granules incorporated near root zone followed by light irrigation",
        fertilizerAdjustment: "Maintain adequate soil moisture. Avoid water-logging.",
        fertilizerAdjustmentHi: "खेत में हल्की नमी बनाए रखें, पानी रुकने न दें।",
        prevention: "Install pheromone traps @ 5 per acre for early moth monitoring.",
        preventionHi: "प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं ताकि कीट की शुरुआती पहचान हो सके।",
      },
      audioSummaryHi: "चोटी छेदक कीट के लिए जड़ों के पास क्लोरएंट्रानिलिप्रोल 7.5 किलो प्रति एकड़ डालकर हल्का पानी लगाएं।",
    },
  ],
  wheat: [
    {
      id: "yellow-rust",
      crop: "Wheat",
      cropHi: "गेहूं",
      name: "Yellow Rust (Stripe Rust)",
      nameHi: "पीला रतुआ (हल्दी रोग)",
      severity: "Severe",
      symptoms: "Bright yellow pustules arranged in linear stripes on leaves, yellow powder rubs off on fingers.",
      symptomsHi: "पत्तियों पर पीले रंग की धारियां बन जाती हैं। हाथ लगाने पर उंगली पर हल्दी जैसा पीला पाउडर चिपकता है।",
      yieldLoss: "25% – 50% grain shriveling",
      prescription: {
        instantSpray: "Propiconazole 25% EC (Tilt / Bumper)",
        instantSprayHi: "प्रोपिकोनाजोल 25% EC का फोलियर स्प्रे",
        dosagePerAcre: "200 ml in 200 Litres water per acre on clear sunny day",
        fertilizerAdjustment: "Do not apply additional urea. Spray Zinc Sulphate (0.5%) + Urea (2%) after disease arrest.",
        fertilizerAdjustmentHi: "यूरिया का छिड़काव तुरंत रोकें। रोग थमने के बाद 0.5% जिंक सल्फेट दें।",
        prevention: "Plant resistant varieties (HD-3086, DBW-187, PBW-725) in prone sub-Himalayan plains.",
        preventionHi: "पीला रतुआ रोधी किस्में जैसे एचडी-3086 या डीबीडब्ल्यू-187 की बुवाई करें।",
      },
      audioSummaryHi: "गेहूं में पीला रतुआ आया है। बिना देरी किए 200 मिली प्रोपिकोनाजोल को 200 लीटर पानी में मिलाकर धूप में छिड़कें।",
    },
    {
      id: "aphids",
      crop: "Wheat",
      cropHi: "गेहूं",
      name: "Wheat Aphids (Mahun)",
      nameHi: "गेहूं का माहू कीट",
      severity: "Warning",
      symptoms: "Colonies of tiny green insects sucking sap from ears during grain filling stage, sticky honeydew.",
      symptomsHi: "बालियों में छोटे हरे कीड़ों का गुच्छा जो दानों का दूध चूस लेते हैं और बाली हल्की रह जाती है।",
      yieldLoss: "10% – 20% test weight loss",
      prescription: {
        instantSpray: "Thiamethoxam 25% WG",
        instantSprayHi: "थियामेथोक्सम 25% WG का स्प्रे",
        dosagePerAcre: "50 grams in 150 Litres water per acre",
        fertilizerAdjustment: "Avoid late-season heavy irrigation on windy afternoons.",
        fertilizerAdjustmentHi: "हवा चलने के समय सिंचाई न करें ताकि फसल गिरे नहीं।",
        prevention: "Preserve ladybird beetle natural predators; spray only when threshold exceeds 10 aphids/ear.",
        preventionHi: "जब एक बाली पर 10 से ज्यादा माहू दिखें तभी दवा का छिड़काव करें।",
      },
      audioSummaryHi: "माहू कीट के नियंत्रण के लिए 50 ग्राम थियामेथोक्सम 150 लीटर पानी में मिलाकर शाम के समय छिड़कें।",
    },
  ],
  paddy: [
    {
      id: "bacterial-blight",
      crop: "Paddy",
      cropHi: "धान",
      name: "Bacterial Leaf Blight (BLB)",
      nameHi: "जीवाणु झुलसा रोग",
      severity: "Severe",
      symptoms: "Wavy yellow-to-white lesions starting from leaf tips down the margins, milky bacterial ooze on morning dew.",
      symptomsHi: "पत्तियों के ऊपरी सिरे से किनारों की तरफ पीली-सफेद लहरदार धारियां सूखती हैं।",
      yieldLoss: "20% – 45% grain sterility",
      prescription: {
        instantSpray: "Copper Oxychloride 50% WP + Streptocycline (90:10)",
        instantSprayHi: "कॉपर ऑक्सीक्लोराइड + स्ट्रेप्टोसाइक्लिन",
        dosagePerAcre: "500g Copper Oxychloride + 18g Streptocycline in 200L water",
        fertilizerAdjustment: "Halt top-dressing of nitrogen immediately. Drain standing water for 48 hours.",
        fertilizerAdjustmentHi: "नाइट्रोजन तुरंत बंद करें। खेत से 2 दिन के लिए पानी निकाल दें।",
        prevention: "Disinfect seeds with Streptocycline (0.01%) prior to nursery sowing.",
        preventionHi: "नर्सरी डालने से पहले बीज को स्ट्रेप्टोसाइक्लिन के घोल से उपचारित करें।",
      },
      audioSummaryHi: "धान में जीवाणु झुलसा के लिए 500 ग्राम कॉपर ऑक्सीक्लोराइड और 18 ग्राम स्ट्रेप्टोसाइक्लिन मिलाकर छिड़कें। खेत का पानी 2 दिन खाली करें।",
    },
  ],
  potato: [
    {
      id: "late-blight",
      crop: "Potato",
      cropHi: "आलू",
      name: "Late Blight of Potato",
      nameHi: "आलू का पिछेती झुलसा",
      severity: "Severe",
      symptoms: "Water-soaked dark purplish lesions on leaves with cottony white fungal growth underneath during cool foggy mornings.",
      symptomsHi: "कोहरे और ठंड में पत्तियों पर भूरे-काले गीले धब्बे और पत्तियों के नीचे सफेद फफूंद का जाल।",
      yieldLoss: "40% – 100% tuber rot",
      prescription: {
        instantSpray: "Cymoxanil 8% + Mancozeb 64% WP (Curzate M8) or Dimethomorph",
        instantSprayHi: "साइमोक्सानिल + मैन्कोजेब या डाइमेथोमॉर्फ",
        dosagePerAcre: "600 grams in 200 Litres water per acre with wetting sticker",
        fertilizerAdjustment: "Do not give heavy sprinkler irrigation in evening hours.",
        fertilizerAdjustmentHi: "शाम के समय स्प्रिंकलर से पानी न दें, रात में पत्तियां सूखी रहनी चाहिए।",
        prevention: "Prophylactic preventive spray of Mancozeb 75% WP @ 2.5g/L before fog season.",
        preventionHi: "कोहरा शुरू होने से पहले ही मैन्कोजेब का सुरक्षात्मक छिड़काव कर लें।",
      },
      audioSummaryHi: "आलू के पिछेती झुलसा से बचाव के लिए 600 ग्राम साइमोक्सानिल-मैन्कोजेब को 200 लीटर पानी में मिलाकर स्टिकर के साथ छिड़कें।",
    },
  ],
  mustard: [
    {
      id: "white-rust",
      crop: "Mustard",
      cropHi: "सरसों",
      name: "White Rust & Staghead",
      nameHi: "सफेद रतुआ (छाछिया रोग)",
      severity: "Moderate",
      symptoms: "Chalky white blister-like pustules on lower leaf surface, floral malformation and distorted pods (staghead).",
      symptomsHi: "पत्तियों की निचली सतह पर चूने जैसे सफेद फफोले और फूलों का गुच्छा हिरन के सींग जैसा मुड़ जाना।",
      yieldLoss: "15% – 35% oil content drop",
      prescription: {
        instantSpray: "Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)",
        instantSprayHi: "मेटालेक्सिल 8% + मैन्कोजेब 64% WP",
        dosagePerAcre: "500 grams in 200 Litres water per acre",
        fertilizerAdjustment: "Ensure Sulphur application @ 10kg/acre for pod filling and oil percentage.",
        fertilizerAdjustmentHi: "सरसों में तेल और दाना भरने के लिए 10 किलो सल्फर प्रति एकड़ अवश्य दें।",
        prevention: "Early sowing before October 20 to escape peak aphid and white rust season.",
        preventionHi: "20 अक्टूबर से पहले अगेती बुवाई करें ताकि बीमारी से बचा जा सके।",
      },
      audioSummaryHi: "सरसों के सफेद रतुआ के लिए 500 ग्राम रिडोमिल एमजेड 200 लीटर पानी में मिलाकर छिड़कें। 10 किलो सल्फर अवश्य डालें।",
    },
  ],
};

export function CropCareAssistant() {
  const [selectedCropId, setSelectedCropId] = useState<string>("sugarcane");
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>("red-rot");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeCrop = CROPS_LIST.find((c) => c.id === selectedCropId) || CROPS_LIST[0];
  const cropDiseases = DISEASES_DATABASE[selectedCropId] || [];
  const activeDisease =
    cropDiseases.find((d) => d.id === selectedDiseaseId) || cropDiseases[0];

  const handleSpeakAudio = (text: string) => {
    if (typeof window === "undefined") return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (isPlayingAudio) {
        setIsPlayingAudio(false);
        return;
      }
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "hi-IN";
      utter.rate = 0.9;
      utter.onend = () => setIsPlayingAudio(false);
      utter.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utter);
    } else {
      alert(text);
    }
  };

  return (
    <div id="crop-care" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 scroll-mt-28">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
          <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Crop Care • AI Crop Doctor & Farmer Assistant (फसल चिकित्सक)</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Khet Ki Bimari Pehchano,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 dark:from-emerald-400 dark:via-teal-300 dark:to-green-400">
            Utpadan Badhao
          </span>
        </h2>

        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Kisan Bhaiyon ke liye 24×7 digital sahayak: Kheton mein lagne wali bimariyon ki turant jaanch,
          khad-dawa ka sahi naap, aur utpadan sudharne ke saral nirdesh.
        </p>
      </div>

      {/* Interactive Crop Selector Strip */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CROPS_LIST.map((crop) => {
          const isSelected = crop.id === selectedCropId;
          return (
            <button
              key={crop.id}
              onClick={() => {
                setSelectedCropId(crop.id);
                const firstD = DISEASES_DATABASE[crop.id]?.[0];
                if (firstD) setSelectedDiseaseId(firstD.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20 scale-105"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-400/40"
              }`}
            >
              <span className="text-base">{crop.icon}</span>
              <span>{crop.name}</span>
              <span className="text-[11px] font-normal opacity-80">({crop.nameHi})</span>
            </button>
          );
        })}
      </div>

      {/* Main Diagnostic Cockpit (Split: Left Symptom Selector, Right Doctor Prescription) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Common Disease Symptoms for selected crop */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
              {activeCrop.name} Bimariyan & Lakshan ({cropDiseases.length})
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Select to Diagnose
            </span>
          </div>

          <div className="space-y-3">
            {cropDiseases.map((dis) => {
              const isSelected = dis.id === selectedDiseaseId;
              return (
                <div
                  key={dis.id}
                  onClick={() => setSelectedDiseaseId(dis.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-2 ${
                    isSelected
                      ? "bg-emerald-500/[0.08] dark:bg-emerald-500/[0.12] border-emerald-500/50 shadow-sm"
                      : "bg-white dark:bg-white/[0.03] border-slate-200/80 dark:border-white/10 hover:border-emerald-400/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {dis.name}
                      </h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        {dis.nameHi}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                        dis.severity === "Severe"
                          ? "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400"
                          : dis.severity === "Moderate"
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400"
                          : "bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {dis.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {dis.symptomsHi}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Direct Help Callout */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>Kisan Helpdesk: Free WhatsApp Consult</span>
            </div>
            <a
              href="https://wa.me/919368671007?text=Crop%20Care%20Doctor%20Help%20Needed"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              +91 9368671007
            </a>
          </div>
        </div>

        {/* Right Column: AI Crop Doctor Prescription & Assistant Action Steps */}
        <div className="lg:col-span-7">
          {activeDisease && (
            <LiquidGlassCard
              glowColor="rgba(16, 185, 129, 0.2)"
              className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6 shadow-xl"
            >
              {/* Doctor Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Crop Doctor Diagnostic Report
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                      {activeDisease.name} ({activeDisease.nameHi})
                    </h3>
                  </div>
                </div>

                {/* Listen in Hindi Voice Button */}
                <button
                  type="button"
                  onClick={() => handleSpeakAudio(activeDisease.audioSummaryHi)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                    isPlayingAudio
                      ? "bg-emerald-500 text-white border-emerald-400 shadow-sm animate-pulse"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20"
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? "Rokne Ke Liye Dabayein" : "Awaaz Mein Sunein (Hindi)"}</span>
                </button>
              </div>

              {/* Yield Impact Warning */}
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-3 text-xs text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <div>
                  <span className="font-bold">Sambhavit Utpadan Nuksan (Yield Loss):</span>{" "}
                  {activeDisease.yieldLoss}
                </div>
              </div>

              {/* 3 Action Steps: Kisan Ko Kya Karna Hai */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-900 dark:text-white tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Kisan Sahayak: 3-Step Action Plan (Kisan Ko Kya Karna Hai)</span>
                </h4>

                {/* Step 1: Instant Spray */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>Turant Dawa Chidkav (Instant Spray Remedy)</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      Dose per Acre
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pl-7">
                    {activeDisease.prescription.instantSprayHi}
                  </p>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 pl-7">
                    👉 Naap (Dosage): <span className="font-bold text-slate-700 dark:text-slate-200">{activeDisease.prescription.dosagePerAcre}</span>
                  </div>
                </div>

                {/* Step 2: Fertilizer & Water Adjustment */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px]">
                        2
                      </span>
                      <span>Khad & Paani Ka Niyam (Fertilizer & Irrigation)</span>
                    </span>
                    <Droplets className="w-3.5 h-3.5 text-teal-500" />
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pl-7">
                    {activeDisease.prescription.fertilizerAdjustmentHi}
                  </p>
                </div>

                {/* Step 3: Future Prevention */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>Agli Fasal Me Bachav (Future Prevention Protocol)</span>
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium pl-7">
                    {activeDisease.prescription.preventionHi}
                  </p>
                </div>
              </div>

              {/* Bottom Summary Callout */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Crop Care Assistant continuously monitors regional disease outbreaks in Meerut & Western UP.
                </span>
                <a
                  href="/agromi/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                >
                  <span>Book Soil & Crop Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </LiquidGlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
