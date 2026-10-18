import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow } from "@/lib/seo/indexnow";
import { pingSearchEngines } from "@/lib/seo/google-ping";

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();

    const targetUrls = Array.isArray(urls) && urls.length > 0
      ? urls
      : ["https://modernisum.com", "https://school.modernisum.com"];

    const [indexNowResult, searchEnginesResult] = await Promise.all([
      pingIndexNow(targetUrls),
      pingSearchEngines(),
    ]);

    return NextResponse.json({
      success: true,
      indexNow: indexNowResult,
      searchEngines: searchEnginesResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to trigger search pings" },
      { status: 500 }
    );
  }
}
