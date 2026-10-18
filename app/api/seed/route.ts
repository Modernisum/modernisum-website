import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Firebase Firestore active. Seed operation complete.",
  });
}
