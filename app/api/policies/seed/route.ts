import { NextResponse } from "next/server";
import { seedPoliciesToFirestore, DEFAULT_POLICIES_SEED } from "@/lib/firestore/policies";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedPoliciesToFirestore();
    return NextResponse.json({
      success: true,
      message: result.message,
      seededCount: result.count,
      policies: result.seededPolicies,
      timestamp: new Date().toISOString(),
      details: "Policies, categorized headlines, and DPDP Act 2023 clauses seeded into Firebase Firestore.",
    });
  } catch (error: any) {
    console.error("[API] Error seeding policies to Firestore:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to seed policies to Firebase",
        fallbackAvailable: true,
        defaultCount: DEFAULT_POLICIES_SEED.length,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Allow GET request for easy manual triggering or browser verification
  return POST();
}
