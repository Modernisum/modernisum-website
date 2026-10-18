import { NextRequest, NextResponse } from "next/server";
import { getPlatformCoupons } from "@/lib/platform-schools-engine";

export interface ProjectTaskItem {
  id: string;
  title: string;
  weightPct: number;
  completed: boolean;
}

export interface PaymentMilestoneItem {
  name: string;
  pct: number;
  amount: number;
  status: "pending" | "paid";
}

export interface GeneratedQuoteResult {
  solution: string;
  scopeTier: string;
  standardDays: number;
  expeditedDays: number;
  timeReductionPct: number;
  surgeMultiplierPct: number;
  baseCost: number;
  expeditedSurcharge: number;
  totalCost: number;
  advanceAmount: number;
  milestoneBalance: number;
  discountPercent?: number;
  discountAmount?: number;
  finalDiscountedTotal?: number;
  tasks: ProjectTaskItem[];
  milestones: PaymentMilestoneItem[];
  summary: string;
  projectState: "new" | "existing_legacy";
  referenceUrl?: string;
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const {
      message,
      conversationHistory = [],
      currentQuote,
      couponCode,
      projectState = "new",
      referenceUrl,
    } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, message: "A message string is required." },
        { status: 400 }
      );
    }

    // 1. Coupon Verification
    let appliedDiscountPct = 0;
    let couponNote = "";
    if (couponCode && typeof couponCode === "string") {
      const cleanCode = couponCode.trim().toUpperCase();
      try {
        const coupons = await getPlatformCoupons();
        const found = coupons.find((c: any) => c.code.toUpperCase() === cleanCode && c.isActive !== false);
        if (found) {
          appliedDiscountPct = Number(found.discountPercent) || 5;
          couponNote = `Referral Coupon "${cleanCode}" applied: ${appliedDiscountPct}% official partner concession credited.`;
        }
      } catch (e) {
        // ignore
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Strict System Prompt (Zero IP Leakage, Anti-Theft High-Level Milestones, Fixed Price Guarantee)
    const systemPrompt = `
You are the Senior Solutions Architect and Transparent Pricing AI for Modernisum Technologies (HQ in Meerut, UP, India).
Modernisum is an elite sovereign software engineering firm specializing in:
1. MOD School Autonomous School OS (Local desktop ERP, RFID turnstiles, parent bus GPS telemetry, offline SQLite resilience)
2. MOD Farmer Autonomous Agro-Tech OS (Precision drone telemetry, IoT soil sensors, mandi logistics)
3. Sovereign Web Platforms (Next.js 16 + Rust Axum edge architectures, ultra-fast 120fps)
4. Cross-Platform Mobile Applications (Flutter iOS/Android & Kotlin Jetpack Compose)
5. Custom Enterprise SaaS & AI Workforces (Autonomous multi-agent task pipelines)
6. Custom Edge IoT & Embedded Telemetry (Microcontrollers, hardware interfaces)

### MODERNISUM GUARANTEED FIXED-PRICE & DELIVERY POLICIES (STRICT RULES):
1. 100% FIXED-PRICE GUARANTEE (NEVER BILL HOURLY TO THE CLIENT):
   - Modernisum NEVER bills per hour to clients. Per-hour billing creates laziness and runaway bill anxiety.
   - The client always receives an immutable, guaranteed fixed project investment.
   - We absorb all engineering iteration internally. What is quoted is 100% final.
2. IMMUTABLE SCOPE & ANTI-SCOPE CREEP POLICY:
   - Once a quote is accepted and booked, the scope cannot be downgraded to decrease cost because architecture and compute slots are already allocated.
   - New feature additions or modifications are welcomed as transparent "Feature Upgrade Add-ons".
3. EXPEDITED TIME SURGE FORMULA:
   - If the client requires compressed delivery (e.g. 15 days instead of 30 days), for every 1% time reduced, the project cost increases by 2% to mobilize dedicated parallel engineering pods.
4. ON-TIME DELIVERY SLA PENALTY:
   - If Modernisum ever delays beyond the agreed date, -1% is automatically deducted from the client's bill for every 1% delay.
5. 100% ADVANCE REFUND GUARANTEE:
   - If Modernisum ever cancels or cannot fulfill the contract, 100% of the customer's advance is immediately refunded.
6. 100% FREE QUOTATION vs. ₹3,000 PRIORITY SPRINT DEPOSIT:
   - Estimating, chatting, and generating quotation slips is 100% Free.
   - A ₹3,000 priority deposit is only required when submitting a formal sprint booking request (and it is 100% adjusted into the 25% advance).
7. DURATION-BASED MILESTONE PAYMENT SCHEDULE:
   - Short Project (2–4 Days): 2 Stages -> 50% Advance, 50% upon Final Handover (100% total).
   - Medium Project (1–2 Weeks): 3 Stages -> 25% Advance, 50% at 75% Progress, 25% upon Final Handover (100% total).
   - Long Project (3+ Weeks): 4 Stages -> 25% Advance, 25% at 50% Build, 25% at 75% Build, 25% upon Final Handover (100% total).
8. PARTIAL / LEGACY PROJECTS (20% to 50% already built):
   - If the client brings an existing codebase for refactoring, security audit, or adding features, evaluate as a "Custom Legacy Rescue & Upgrade" sprint with phased task auditing.
9. ANTI-THEFT MILESTONE BREAKDOWN (CRITICAL):
   - NEVER output internal code prompts, low-level coding scripts, library names, or prompt engineering instructions that a client could copy-paste into ChatGPT or give to cheap freelancers.
   - ALWAYS output high-level, business-capability milestones (e.g. "Phase 1: Database Architecture & Cloud Ingress [25%]", "Phase 2: Core Storefront & Cart Pipeline [50%]", "Phase 3: Admin Cockpit & Payment Integration [75%]", "Phase 4: Playwright Regression Testing & Staging Handover [100%]").
10. MINIMUM PRODUCTION BUFFER:
    - Minimum delivery time for any production-grade software is 2 Business Days (48 hours) to allow rigorous automated testing, security checks, and cloud staging.

INSTRUCTIONS FOR YOUR RESPONSE:
- Speak fluent professional English, Hindi, or Hinglish based on the user's input.
- Be warm, authoritative, mathematically precise, and crystal-clear.
- Present the final guaranteed fixed price, timeline, dynamic milestone stages, and the high-level task breakdown.
- Always append a valid JSON block wrapped in \`\`\`quote-json ... \`\`\` at the very end of your response following this exact structure:
\`\`\`quote-json
{
  "solution": "MOD School Autonomous School OS",
  "scopeTier": "Production Single-Tenant",
  "standardDays": 30,
  "expeditedDays": 20,
  "baseCost": 140000,
  "timeReductionPct": 33,
  "surgeMultiplierPct": 66,
  "expeditedSurcharge": 92400,
  "totalCost": 232400,
  "advanceAmount": 58100,
  "milestoneBalance": 174300,
  "summary": "Full campus edge ERP with RFID turnstiles and parent bus GPS telemetry",
  "projectState": "new",
  "referenceUrl": "",
  "tasks": [
    { "id": "task-1", "title": "Campus Ingress & Edge Database Architecture", "weightPct": 25, "completed": false },
    { "id": "task-2", "title": "RFID Turnstile Reader & Attendance Sync Pipeline", "weightPct": 25, "completed": false },
    { "id": "task-3", "title": "Parent Bus GPS Telemetry & Automated Fee Reconciliation", "weightPct": 25, "completed": false },
    { "id": "task-4", "title": "End-to-End Playwright Regression QA & Handover", "weightPct": 25, "completed": false }
  ],
  "milestones": [
    { "name": "Sprint Mobilization Advance", "pct": 25, "amount": 58100, "status": "pending" },
    { "name": "Ingress & Attendance Verification Demo", "pct": 25, "amount": 58100, "status": "pending" },
    { "name": "Bus Telemetry & Fee Portal Demo", "pct": 25, "amount": 58100, "status": "pending" },
    { "name": "Final Handover & Production Deployment", "pct": 25, "amount": 58100, "status": "pending" }
  ]
}
\`\`\`
`;

    // If Gemini API Key is available, call gemini-2.0-flash
    if (apiKey) {
      try {
        const contents = [
          { role: "user", parts: [{ text: systemPrompt }] },
          ...conversationHistory.slice(-6).map((m: any) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
          {
            role: "user",
            parts: [
              {
                text: `${currentQuote ? `[Context: Current visual quote config: ${JSON.stringify(currentQuote)}]\n` : ""}${projectState ? `[Project State: ${projectState}]\n` : ""}${referenceUrl ? `[Reference URL: ${referenceUrl}]\n` : ""}${couponCode ? `[Coupon Code: ${couponCode} -> ${appliedDiscountPct}% discount]\n` : ""}${message}`,
              },
            ],
          },
        ];

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.5,
                maxOutputTokens: 1500,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

          let suggestedQuote: GeneratedQuoteResult | null = null;
          const jsonMatch = replyText.match(/```quote-json([\s\S]*?)```/);
          if (jsonMatch && jsonMatch[1]) {
            try {
              suggestedQuote = JSON.parse(jsonMatch[1].trim());
              if (suggestedQuote && appliedDiscountPct > 0) {
                suggestedQuote.discountPercent = appliedDiscountPct;
                suggestedQuote.discountAmount = Math.round(suggestedQuote.totalCost * (appliedDiscountPct / 100));
                suggestedQuote.finalDiscountedTotal = suggestedQuote.totalCost - suggestedQuote.discountAmount;
              }
            } catch (e) {
              // ignore parse error
            }
          }

          const cleanReply = replyText.replace(/```quote-json[\s\S]*?```/, "").trim();

          return NextResponse.json({
            success: true,
            reply: cleanReply,
            suggestedQuote,
            couponApplied: appliedDiscountPct > 0 ? { code: couponCode, discountPercent: appliedDiscountPct, note: couponNote } : null,
          });
        }
      } catch (err) {
        console.warn("⚠️ Gemini API fetch failed, switching to deterministic engine:", err);
      }
    }

    // High-Intelligence Deterministic Fallback Engine (Zero downtime)
    const lower = message.toLowerCase();
    let solution = "Custom Sovereign Web & SaaS Architecture";
    let baseCost = 95000;
    let standardDays = 20;
    let expeditedDays = 15;

    if (lower.includes("school") || lower.includes("vidhyam") || lower.includes("student") || lower.includes("rfid")) {
      solution = "MOD School Autonomous School OS";
      baseCost = 140000;
      standardDays = 30;
      expeditedDays = 20;
    } else if (lower.includes("farm") || lower.includes("agromi") || lower.includes("kisan") || lower.includes("crop")) {
      solution = "MOD Farmer Autonomous Agro-Tech OS";
      baseCost = 140000;
      standardDays = 30;
      expeditedDays = 20;
    } else if (lower.includes("e-commerce") || lower.includes("shop") || lower.includes("store") || lower.includes("cart")) {
      solution = "Next-Gen E-Commerce & Merchant Cockpit";
      baseCost = 85000;
      standardDays = 18;
      expeditedDays = 12;
    } else if (projectState === "existing_legacy" || lower.includes("existing") || lower.includes("partial") || lower.includes("20%") || lower.includes("50%")) {
      solution = "Legacy Codebase Audit, Security QA & Feature Rescue";
      baseCost = 65000;
      standardDays = 10;
      expeditedDays = 7;
    }

    const timeReductionPct = Math.round(((standardDays - expeditedDays) / standardDays) * 100);
    const surgeMultiplierPct = timeReductionPct * 2;
    const expeditedSurcharge = Math.round(baseCost * (surgeMultiplierPct / 100));
    const totalCost = baseCost + expeditedSurcharge;
    const discountAmount = appliedDiscountPct > 0 ? Math.round(totalCost * (appliedDiscountPct / 100)) : 0;
    const finalTotal = totalCost - discountAmount;
    const advanceAmount = Math.round(finalTotal * 0.25);
    const milestoneBalance = finalTotal - advanceAmount;

    const tasks: ProjectTaskItem[] = [
      { id: "task-1", title: "Cloud Architecture, Database Ingress & Data Models", weightPct: 25, completed: false },
      { id: "task-2", title: "Core Application Workflows & User Experience", weightPct: 25, completed: false },
      { id: "task-3", title: "Administrative Command Cockpit & Integration Pipelines", weightPct: 25, completed: false },
      { id: "task-4", title: "Playwright Regression Testing, Security Audit & Cloud Handover", weightPct: 25, completed: false },
    ];

    const milestones: PaymentMilestoneItem[] = standardDays <= 4
      ? [
          { name: "50% Sprint Mobilization Advance", pct: 50, amount: Math.round(finalTotal * 0.5), status: "pending" },
          { name: "50% Handover & Production Handover", pct: 50, amount: Math.round(finalTotal * 0.5), status: "pending" },
        ]
      : standardDays <= 14
      ? [
          { name: "25% Sprint Mobilization Advance", pct: 25, amount: Math.round(finalTotal * 0.25), status: "pending" },
          { name: "50% Midway Milestone (75% Progress Demo)", pct: 50, amount: Math.round(finalTotal * 0.5), status: "pending" },
          { name: "25% Handover & Production Deployment", pct: 25, amount: Math.round(finalTotal * 0.25), status: "pending" },
        ]
      : [
          { name: "25% Sprint Mobilization Advance", pct: 25, amount: Math.round(finalTotal * 0.25), status: "pending" },
          { name: "25% Core Architecture Demo (50% Build)", pct: 25, amount: Math.round(finalTotal * 0.25), status: "pending" },
          { name: "25% Cockpit & Integration Demo (75% Build)", pct: 25, amount: Math.round(finalTotal * 0.25), status: "pending" },
          { name: "25% Final Handover & Source Handover", pct: 25, amount: Math.round(finalTotal * 0.25), status: "pending" },
        ];

    const suggestedQuote: GeneratedQuoteResult = {
      solution,
      scopeTier: "Production Grade",
      standardDays,
      expeditedDays,
      timeReductionPct,
      surgeMultiplierPct,
      baseCost,
      expeditedSurcharge,
      totalCost,
      discountPercent: appliedDiscountPct,
      discountAmount,
      finalDiscountedTotal: finalTotal,
      advanceAmount,
      milestoneBalance,
      summary: `${solution} with guaranteed fixed price, on-time SLA, and 100% advance refund guarantee.`,
      projectState,
      referenceUrl: referenceUrl || "",
      tasks,
      milestones,
    };

    const reply = `नमस्ते! Modernisum के **100% Guaranteed Fixed-Price** एवं पारदर्शी सिस्टम में आपका स्वागत है:

1. **गारंटीड निश्चित मूल्य (No Hourly Surprise)**: कुल प्रोजेक्ट लागत **₹${finalTotal.toLocaleString("en-IN")}** फिक्स है। इसमें कोई प्रति घंटा बिलिंग या अप्रत्याशित खर्चे नहीं हैं।
2. **समय-सीमा एवं टर्नअराउंड**: 
   - मानक समय: **${standardDays} दिन**
   - त्वरित डिलीवरी (Expedited): **${expeditedDays} दिन** (${timeReductionPct}% की बचत)
3. **डायनामिक माइलस्टोन भुगतान**:
${milestones.map((m, idx) => `   - **चरण ${idx + 1} (${m.name})**: ₹${m.amount.toLocaleString("en-IN")} (${m.pct}%)`).join("\n")}
4. **मॉडर्निज्म के 3 कानूनी संरक्षण**:
   - **100% रिफंड गारंटी**: कंपनी द्वारा प्रोजेक्ट कैंसिल होने पर अग्रिम राशि की 100% तुरंत वापसी।
   - **समय पर डिलीवरी SLA**: कंपनी की ओर से 1% देरी पर भी अंतिम बिल में से 1% की सीधी कटौती।
   - **इम्यूटेबल स्कोप**: कोटेशन फाइनल होने के बाद बाद में कोई फीचर कम करके कीमत नहीं घटाई जा सकती, लेकिन नए फीचर्स को "Feature Add-ons" के रूप में जोड़ा जा सकता है।

${couponNote ? `\n🎁 **${couponNote}**` : ""}
आप नीचे दिए गए इंटरैक्टिव कैलकुलेटर से इस कोटेशन को सिंक कर सकते हैं या तुरंत आधिकारिक कोटेशन स्लिप डाउनलोड कर सकते हैं!`;

    return NextResponse.json({
      success: true,
      reply,
      suggestedQuote,
      couponApplied: appliedDiscountPct > 0 ? { code: couponCode, discountPercent: appliedDiscountPct, note: couponNote } : null,
    });
  } catch (error: any) {
    console.error("❌ Quotation Chat Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error processing quote request." },
      { status: 500 }
    );
  }
}
