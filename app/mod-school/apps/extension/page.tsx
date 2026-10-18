import React from "react";
import { Metadata } from "next";
import { AppDetailPage } from "@/components/school/AppDetailPage";
import { SCHOOL_APPS } from "@/lib/school-downloads";

export const metadata: Metadata = {
  title: "Modernisum Clerk Co-Pilot — Government & Board Portal Auto-Filler Extension",
  description:
    "Download Modernisum Clerk Co-Pilot Chrome/Edge Extension. 1-click state board & scholarship auto-fill, in-browser document & photo resizer to strict KB limits, and USB RFID turnstile bridge.",
};

export default function SchoolExtensionAppPage() {
  const app = SCHOOL_APPS.extension;
  return <AppDetailPage app={app} />;
}
