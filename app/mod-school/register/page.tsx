import React from "react";
import type { Metadata } from "next";
import { SchoolRegistrationSection } from "@/components/shared/SchoolRegistrationSection";

export const metadata: Metadata = {
  title: "School Registration & Instant Sandbox — Modernisum School OS",
  description:
    "Register your institution for instant access to Modernisum School OS and local Windows desktop deployment.",
};

export default function SchoolRegisterPage() {
  return <SchoolRegistrationSection />;
}
