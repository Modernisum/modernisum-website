import React from "react";
import { Metadata } from "next";
import { AppDetailPage } from "@/components/school/AppDetailPage";
import { SCHOOL_APPS } from "@/lib/school-downloads";

export const metadata: Metadata = {
  title: "School Desktop OS — Local-First Windows School Administration Suite",
  description:
    "Download School Desktop OS for Windows. 100% offline-first school ERP, zero cloud lock-in, automated Google Drive BYOC vault, POS thermal receipt printing, and local LAN sync.",
};

export default function SchoolDesktopAppPage() {
  const app = SCHOOL_APPS.desktop;
  return <AppDetailPage app={app} />;
}
