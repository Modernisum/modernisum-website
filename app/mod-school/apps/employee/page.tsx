import React from "react";
import { Metadata } from "next";
import { AppDetailPage } from "@/components/school/AppDetailPage";
import { SCHOOL_APPS } from "@/lib/school-downloads";

export const metadata: Metadata = {
  title: "Modernisum School Employee App — Faculty Attendance & Substitution Mobile Suite",
  description:
    "Download Modernisum School Employee Mobile App (APK). Rapid classroom attendance roll call in under 15s, autonomous substitute period alerts, digital homework diary, and staff leave governance.",
};

export default function SchoolEmployeeAppPage() {
  const app = SCHOOL_APPS.employee;
  return <AppDetailPage app={app} />;
}
