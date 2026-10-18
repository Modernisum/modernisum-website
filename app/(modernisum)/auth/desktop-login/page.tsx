"use client";

import { useEffect } from "react";

export default function DesktopAuthLoginPage() {
  useEffect(() => {
    window.location.replace("https://school.modernisum.com?auth=login&origin=desktop");
  }, []);

  return null;
}
