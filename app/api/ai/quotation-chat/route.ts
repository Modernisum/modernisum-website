import { NextRequest, NextResponse } from "next/server";

interface QuotationCalculation {
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
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [], currentQuote } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, message: "A message string is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `
You are the Senior Solutions Architect and Transparent Pricing AI for Modernisum (HQ in Meerut, UP, India).
Modernisum is a sovereign software engineering firm specializing in:
1. MOD School Autonomous School OS (Campus edge ERP, RFID, GPS bus telemetry, zero-latency desktop app)
2. Agromi Autonomous Agro-Tech OS (Precision drone telemetry, IoT soil sensors, mandi logistics)
3. Sovereign Web Platforms (Next.js 16 + Rust Axum edge architectures)
4. Cross-Platform Mobile Applications (Flutter iOS/Android & Kotlin Jetpack Compose)
5. Enterprise Autonomous AI Workforce (Multi-agent custom automation, self-healing bots)
6. Custom Edge IoT & Embedded Telemetry (Microcontrollers, hardware interfaces)

### MODERNISUM TRANSPARENT PRICING & PAYMENT CALCULUS (STRICT RULES):
In today's AI agent era, programming languages, UI graphics, and tech stacks are NOT barriers. Modernisum NEVER charges a tech stack markup. Pricing is purely driven by SCOPE and TIME DURATION.
1. Baseline turnaround and base prices:
   - Rapid Prototype / MVP: Base 14 days, Base ₹45,000
   - Production Single-Tenant / School / Org: Base 30 days, Base ₹1,40,000
   - Multi-Tenant / Multi-Campus Ecosystem: Base 45 days, Base ₹3,80,000
   - Sovereign Enterprise Infrastructure: Base 60 days, Base ₹8,50,000
2. EXPEDITED TIME SURGE FORMULA:
   - If client needs delivery faster than the standard baseline, for every 1% reduction in turnaround time, project cost increases by 2%.
   - Reason: Dedicated concurrent AI orchestrators, senior engineers, and accelerated cloud compute tools must be mobilized immediately.
   - Example: 30-day baseline project (₹1,00,000) expedited to 15 days (50% reduction in time) => +100% surcharge => ₹2,00,000 total.
3. ON-TIME DELIVERY SLA GUARANTEE (COMPANY DELAY PENALTY):
   - If Modernisum ever delays delivery beyond the agreed deadline, for every 1% time delay incurred, Modernisum deducts 1% from the remaining balance / project cost as an automatic SLA credit!
4. 25% ADVANCE COMMITMENT:
   - Client pays only 25% advance to mobilize the team and lock the development calendar. The remaining 75% is payable only upon milestone delivery and sign-off.
5. 100% FULL ADVANCE REFUND GUARANTEE:
   - If Modernisum cancels the project or is unable to deliver, 100% of the customer's advance is immediately refunded without deductions.
6. APPROVAL PIPELINE:
   - Customer submits the quotation blueprint request. Admin and engineering leads review team capacity and confirm the exact start date and sprint lead within 4 hours.

INSTRUCTIONS FOR YOUR RESPONSE:
- You speak fluent professional English, Hindi, and Hinglish. Adapt to the user's language naturally.
- Be warm, confident, mathematically precise, and completely transparent about pricing and policies.
- If the user asks for a price estimate, outline:
  1. Recommended Solution & Tier
  2. Baseline Duration vs. Expedited Option
  3. Total Cost calculation using the formula
  4. 25% Advance and 75% Milestone breakdown
  5. The 3 core guarantees: 100% Refund, -1% per 1% Delay SLA, and 25% Advance Lock.
- Format clean markdown with bullet points.
- If you can extract or recommend a concrete quote, also include a structured JSON block at the very end wrapped in \`\`\`quote-json ... \`\`\` with this format:
\`\`\`quote-json
{
  "solution": "MOD School Autonomous School OS",
  "scopeTier": "Production Single-Tenant",
  "standardDays": 30,
  "expeditedDays": 20,
  "baseCost": 140000,
  "summary": "Full campus OS with RFID turnstiles and parent GPS app"
}
\`\`\`
`;

    // If Gemini API Key is available, call gemini-2.0-flash
    if (apiKey) {
      try {
        const contents = [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          ...conversationHistory.slice(-6).map((m: any) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
          {
            role: "user",
            parts: [
              {
                text: `${currentQuote ? `[Context: Current visual quote config: ${JSON.stringify(currentQuote)}]\n` : ""}${message}`,
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
                temperature: 0.6,
                maxOutputTokens: 1200,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const replyText =
            geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

          // Parse optional quote-json block
          let suggestedQuote = null;
          const jsonMatch = replyText.match(/```quote-json([\s\S]*?)```/);
          if (jsonMatch && jsonMatch[1]) {
            try {
              suggestedQuote = JSON.parse(jsonMatch[1].trim());
            } catch (e) {
              // ignore parse error
            }
          }

          // Clean reply text of json block if desired
          const cleanReply = replyText.replace(/```quote-json[\s\S]*?```/, "").trim();

          return NextResponse.json({
            success: true,
            reply: cleanReply,
            suggestedQuote,
          });
        }
      } catch (err) {
        console.warn("⚠️ Gemini API fetch failed, switching to intelligent local engine:", err);
      }
    }

    // High-Intelligence Deterministic Fallback Engine (Zero downtime)
    const lower = message.toLowerCase();
    let reply = "";
    let suggestedQuote: any = null;

    if (lower.includes("school") || lower.includes("vidhyam") || lower.includes("erp") || lower.includes("student")) {
      reply = `नमस्ते! Modernisum के **MOD School Autonomous School OS** के लिए हमारी पूरी पारदर्शी कोटेशन नीति निम्नलिखित है:

- **मानक समय (Standard Duration)**: 30 कार्य दिवस (Base ₹1,40,000)
- **त्वरित डिलीवरी (Expedited Delivery)**: यदि आप इसे 20 दिनों में चाहते हैं (33% समय की बचत), तो हमारे नियम के अनुसार (1% समय कम = 2% अतिरिक्त लागत), लागत में +66% की वृद्धि होगी।
- **25% अग्रिम नीति (Advance Policy)**: कार्य प्रारंभ करने के लिए कुल बजट का केवल 25% अग्रिम देय है।
- **Modernisum 100% रिफंड गारंटी**: यदि कंपनी किसी भी कारणवश प्रोजेक्ट रद्द करती है, तो 100% अग्रिम राशि तुरंत वापस की जाएगी।
- **समयबद्ध डिलीवरी SLA (-1% प्रति 1% देरी)**: यदि हमारे द्वारा 1 दिन की भी देरी होती है, तो कुल प्रोजेक्ट लागत में से उसी अनुपात में कटौती की जाएगी।

आप नीचे दिए गए इंटरैक्टिव **Quotation Calculator** में दिनों का चयन करके तुरंत आधिकारिक कोटेशन स्लिप डाउनलोड कर सकते हैं!`;
      suggestedQuote = {
        solution: "MOD School Autonomous School OS",
        scopeTier: "Production Single-Tenant",
        standardDays: 30,
        expeditedDays: 20,
        baseCost: 140000,
      };
    } else if (lower.includes("farm") || lower.includes("agromi") || lower.includes("kisan") || lower.includes("crop")) {
      reply = `नमस्ते! **Agromi Autonomous Agro-Tech OS** (सॉइल टेलीमेट्री, ड्रोन मैपिंग और मंडी लॉजिस्टिक्स) के लिए हमारी पारदर्शी पॉलिसी:

- **मानक समय (Standard)**: 30 कार्य दिवस (Base ₹1,40,000)
- **स्पीड वृद्धि नियम**: समय में प्रत्येक 1% कमी पर प्रोजेक्ट लागत में 2% की वृद्धि होती है।
- **भुगतान गारंटी**: केवल 25% अग्रिम पर काम शुरू, शेष 75% माइलस्टोन डिलीवरी पर।
- **100% सुरक्षित**: कंपनी द्वारा प्रोजेक्ट कैंसिल होने पर 100% अग्रिम रिफंड की गारंटी।`;
      suggestedQuote = {
        solution: "Agromi Autonomous Agro-Tech OS",
        scopeTier: "Production Single-Tenant",
        standardDays: 30,
        expeditedDays: 25,
        baseCost: 140000,
      };
    } else {
      reply = `Hello! Welcome to Modernisum's Autonomous Architecture & Quotation Desk. 

Here is our **100% Transparent Pricing & Delivery Guarantee**:
1. **Zero Stack Markup**: No markup for choice of language or UI animations—our engineering is powered by autonomous AI agents.
2. **Time-Based Calculus**: Baseline projects start from ₹45,000 (MVP) to ₹1,40,000 (Production). For every **1% time saved (expedited delivery)**, cost increases by **2%** to allocate concurrent dedicated engineering pods.
3. **On-Time SLA Guarantee**: If Modernisum is ever delayed by 1% of time, **1% is automatically deducted from your final bill**.
4. **25% Advance & 100% Refund**: Only 25% advance to initiate development. If we cancel the project, **100% of your advance is immediately refunded**.

Tell me what you are planning to build, or use the interactive calculator on this page to generate your instant official blueprint slip!`;
    }

    return NextResponse.json({
      success: true,
      reply,
      suggestedQuote,
    });
  } catch (error: any) {
    console.error("❌ Quotation Chat Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error processing quote request." },
      { status: 500 }
    );
  }
}
