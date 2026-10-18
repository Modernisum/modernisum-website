import { NextRequest, NextResponse } from "next/server";

export interface TrendingTopicItem {
  id: string;
  topic: string;
  category: "cbse_compliance" | "biometric_security" | "fee_ledger" | "fleet_gps" | "deep_tech";
  searchIntent: string;
  suggestedTitle: string;
  focusKeyword: string;
  difficulty: "Low" | "Medium" | "High";
  outline: string[];
}

const FALLBACK_TOPICS: TrendingTopicItem[] = [
  {
    id: "topic-1",
    topic: "CBSE LOC 2026-27 Automated Registration & Photo Resizing",
    category: "cbse_compliance",
    searchIntent: "High Intent — School Clerks & Bursars searching for portal error fixes",
    suggestedTitle: "CBSE LOC 2026: How to Auto-Fill 500+ Students Without Photo Rejections",
    focusKeyword: "cbse loc auto fill",
    difficulty: "Low",
    outline: [
      "Why manual CBSE LOC submissions cause 40+ hours of clerical burn-out",
      "Client-side 20-50KB automatic photo & signature resizing standards",
      "One-click zero-re-entry submission using ModSchool Clerk MV3 Extension",
    ],
  },
  {
    id: "topic-2",
    topic: "Contactless Face AI Turnstiles vs RFID Gate Congestion",
    category: "biometric_security",
    searchIntent: "High Intent — Principals upgrading physical campus perimeter security",
    suggestedTitle: "Sub-150ms Face AI vs Old RFID Cards: Solving 7:45 AM Gate Congestion",
    focusKeyword: "face ai school turnstiles",
    difficulty: "Low",
    outline: [
      "The physics of morning assembly rush: 600 students through 2 gates in 15 mins",
      "Anti-spoofing dual infrared NPU matching vs fake photo proxies",
      "Instant automated parent WhatsApp delivery upon turnstile ingress",
    ],
  },
  {
    id: "topic-3",
    topic: "Fee Deficit Shortfall Radar (+25% Buffer) for School Cashflow",
    category: "fee_ledger",
    searchIntent: "Institutional Directors looking to eliminate bank drift & pending dues",
    suggestedTitle: "Why Every School Needs a +25% Fee Deficit Radar to Prevent Cash Crunches",
    focusKeyword: "school fee deficit radar",
    difficulty: "Medium",
    outline: [
      "The mathematical reality of academic session progress vs annual fee collections",
      "Continuous wage payroll obligations (daily accrual) vs irregular fee receipts",
      "Automated double-entry general ledger synchronization with 0 manual tallying",
    ],
  },
  {
    id: "topic-4",
    topic: "Offline-First Multi-PC LAN Architecture in Indian Schools",
    category: "deep_tech",
    searchIntent: "Computer Teachers & Administrators worried about broadband outages",
    suggestedTitle: "Zero Internet, Zero Downtime: Running 30 Campus PCs on Local SQLite LAN",
    focusKeyword: "offline school erp software",
    difficulty: "Low",
    outline: [
      "Why cloud-only School ERPs freeze during rural or monsoon broadband blackouts",
      "Embedded Raft consensus: sub-15ms terminal reconciliation without cloud dependency",
      "Local AES-256 database vaulting and midnight Google Drive BYOC sync",
    ],
  },
  {
    id: "topic-5",
    topic: "School Bus GPS Fleet Telemetry & Geofence Parent Peace-of-Mind",
    category: "fleet_gps",
    searchIntent: "Parents & Transport In-charges eliminating morning stop anxiety",
    suggestedTitle: "Sub-Second Bus Telemetry: Eliminating 200 Anxious Morning Reception Calls",
    focusKeyword: "school bus gps tracking parent app",
    difficulty: "Low",
    outline: [
      "Geofenced 500m approach buzzer: parents never wait in harsh winter or monsoon rain",
      "Speed-violation alerts and harsh-braking telemetry for student safety",
      "Driver route adherence and fuel consumption audits on school desktop OS",
    ],
  },
];

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    // Strict 15 RPM Free Tier Guard:
    // If no key or on serverless cold start, serve instant curated fallback in <5ms with 0 tokens consumed.
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        source: "curated_radar",
        topics: FALLBACK_TOPICS,
      });
    }

    const prompt = `Generate 5 high-CTR, trending educational and school ERP topics for Indian schools (CBSE, ICSE, State Boards).
Focus on: CBSE LOC, Face AI Turnstiles, Fee Ledger Radar, Offline-First LAN, Bus GPS.
Format strictly as JSON array of objects with keys: id, topic, category, searchIntent, suggestedTitle, focusKeyword, difficulty, outline (array of 3 bullets).
Output JSON only. Keep token output under 400 tokens.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        source: "curated_radar_fallback",
        topics: FALLBACK_TOPICS,
      });
    }

    const json = await response.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    return NextResponse.json({
      success: true,
      source: "gemini_flash_live",
      topics: Array.isArray(parsed) ? parsed : FALLBACK_TOPICS,
    });
  } catch (error) {
    console.warn("⚠️ Trending topics fallback:", error);
    return NextResponse.json({
      success: true,
      source: "curated_radar_fallback",
      topics: FALLBACK_TOPICS,
    });
  }
}
