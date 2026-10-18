import React from "react";
import { Metadata } from "next";
import { AppDetailPage } from "@/components/school/AppDetailPage";
import { SCHOOL_APPS } from "@/lib/school-downloads";

export const metadata: Metadata = {
  title: "Modernisum School Student & Parent App — Live Gate Telemetry & Bus GPS Portal",
  description:
    "Download Modernisum School Student & Parent Mobile App (APK). Live campus turnstile alerts, real-time school bus GPS tracking, UPI fee payments, digital marksheets, and AI homework diagnostics.",
};

export default function SchoolStudentAppPage() {
  const app = SCHOOL_APPS.student;
  return <AppDetailPage app={app} />;
}
