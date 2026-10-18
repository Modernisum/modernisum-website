import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, type = "blog" } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, message: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        data: {
          title: "Next.js 16 Edge Architecture for Autonomous Campus Ingress & Fleet Telemetry",
          excerpt: "How low-latency edge workers and local SQLite sandboxes eliminate administrative friction.",
          content: "## Architectural Overview\n\nModern school ecosystems require deterministic reliability...",
          tags: ["Edge Computing", "MOD School OS", "Next.js 16", "Telemetry"],
          metaTitle: "Autonomous Campus Edge Architecture | MOD School OS",
          metaDescription: "Sub-second bus telemetry and turnstile synchronization powered by Next.js 16 edge pipelines.",
          readTime: "4 min read",
        },
      });
    }

    const systemInstructions = `
You are the Chief AI Content Engine for Modernisum (a premier software engineering company providing Autonomous Enterprise OS architectures, MOD School autonomous school operating system, MOD Farmer Agro-Tech OS, and Custom AI Agents).
Task type: ${type}.
Format your response as clean JSON with these keys:
{
  "title": "A captivating, high-CTR headline",
  "excerpt": "A 2-sentence punchy summary",
  "content": "Comprehensive markdown content with ## headings, bullet points, and real architectural depth",
  "tags": ["3-5", "relevant", "tags"],
  "metaTitle": "SEO title under 60 chars",
  "metaDescription": "SEO meta description under 155 chars",
  "readTime": "e.g. 4 min read"
}
Output valid JSON only. Do not wrap in markdown backticks.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstructions}\n\nTopic / Instructions: ${prompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.warn("⚠️ Gemini API HTTP Error, falling back to simulated generation:", errText);
      // Fallback generator for zero downtime
      return NextResponse.json({
        success: true,
        data: {
          title: `Architecting ${prompt}: Modern Systems & AI Integration`,
          excerpt: `A technical deep-dive into how ${prompt} scales seamlessly in high-concurrency enterprise environments.`,
          content: `## Executive Overview\n\nWhen scaling modern software systems, ${prompt} represents a pivotal architectural milestone. Modernisum engineers high-performance cloud backends and client applications designed for zero downtime.\n\n### Key Deliverables\n- Sub-second data replication\n- Offline-first resilience with SQLite\n- Liquid Glass user interfaces for maximum operator efficiency.`,
          tags: ["Modernisum", "AI SaaS", "Architecture"],
          metaTitle: `${prompt} | Modernisum Engineering`,
          metaDescription: `Technical analysis and architectural patterns for ${prompt}.`,
          readTime: "4 min read",
        },
      });
    }

    const json = await response.json();
    const candidateText =
      json.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse JSON
    let parsedData: any;
    try {
      const cleanJson = candidateText.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleanJson);
    } catch {
      parsedData = {
        title: prompt,
        excerpt: "AI Generated Insights",
        content: candidateText,
        tags: ["AI", "Tech"],
        metaTitle: prompt,
        metaDescription: prompt,
        readTime: "3 min read",
      };
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Gemini Generation Error (using fallback):", err.message);
    return NextResponse.json({
      success: true,
      data: {
        title: "Next.js 16 Edge Architecture for Autonomous Campus Ingress & Fleet Telemetry",
        excerpt: "How low-latency edge workers and local SQLite sandboxes eliminate administrative friction.",
        content: "## Architectural Overview\n\nModern school ecosystems require deterministic reliability...",
        tags: ["Edge Computing", "Vidhyam OS", "Next.js 16", "Telemetry"],
        metaTitle: "Autonomous Campus Edge Architecture | Vidhyam OS",
        metaDescription: "Sub-second bus telemetry and turnstile synchronization powered by Next.js 16 edge pipelines.",
        readTime: "4 min read",
      },
    });
  }
}
