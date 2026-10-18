import React from "react";
import type { Metadata } from "next";
import { CommunityHub } from "@/components/community/CommunityHub";

export const metadata: Metadata = {
  title: "MOD School Community — Verified Reviews, Bug Reports & Feature Requests",
  description:
    "Official community hub for MOD School principals, educators, and administrators. 100% transparent reviews, feature requests, and developer updates.",
};

export const revalidate = 60;

export default function SchoolCommunityPage() {
  return (
    <div className="py-8 sm:py-12">
      <CommunityHub variant="school" initialProduct="vidhyam" />
    </div>
  );
}
