import { NextResponse } from "next/server";
import { fetchPolicies, savePolicy, FirestorePolicyDoc } from "@/lib/firestore/policies";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get("variant") as "modernisum" | "vidhyam" | "all" | null;
    const policies = await fetchPolicies(variant || "all");
    return NextResponse.json({
      success: true,
      count: policies.length,
      policies,
    });
  } catch (error: any) {
    console.error("[API] Error fetching policies:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to fetch policies",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FirestorePolicyDoc;
    if (!body.id || !body.title || !body.sections) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (id, title, sections)" },
        { status: 400 }
      );
    }

    await savePolicy(body);

    return NextResponse.json({
      success: true,
      message: `Policy "${body.title}" successfully saved to Firebase Firestore.`,
      policyId: body.id,
      sectionsCount: body.sections.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[API] Error saving policy:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to save policy to Firebase",
      },
      { status: 500 }
    );
  }
}
