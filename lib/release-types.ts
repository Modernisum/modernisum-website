export type AppTargetType = "school-admin" | "employee-app" | "student-app" | "clerk-copilot";

export interface ReleaseItem {
  id: string;
  appTarget: AppTargetType;
  appName: string;
  version: string;
  title: string;
  releaseDate: string;
  overview: string;
  improvements: string[];
  fixes: string[];
  patches: string[];
  downloadUrl: string;
  gdriveFileId?: string;
  gdriveFolder?: string;
  fileSize: string;
  sha256?: string;
  isLatest: boolean;
  platform?: string;
}

export const CORE_APPS_CONFIG: Record<
  AppTargetType,
  { name: string; platform: string; gdriveFolder: string; filePrefix: string }
> = {
  "school-admin": {
    name: "MOD School Desktop OS (Admin & Server)",
    platform: "Windows 10/11 x64 & Linux",
    gdriveFolder: "MOD-Releases/Desktop-Admin-OS",
    filePrefix: "MOD-School-OS-Setup",
  },
  "employee-app": {
    name: "MOD School Employee & Faculty App",
    platform: "Android 8.0+ APK",
    gdriveFolder: "MOD-Releases/Employee-App",
    filePrefix: "MOD-Employee-App",
  },
  "student-app": {
    name: "MOD School Student & Parent App",
    platform: "Android 8.0+ APK",
    gdriveFolder: "MOD-Releases/Student-Parent-App",
    filePrefix: "MOD-Student-Parent-App",
  },
  "clerk-copilot": {
    name: "Clerk MV3 Co-Pilot Extension",
    platform: "Chrome / Edge MV3 Extension",
    gdriveFolder: "MOD-Releases/Browser-Extensions",
    filePrefix: "MOD-Clerk-Copilot",
  },
};

export const SEED_RELEASES: ReleaseItem[] = [
  // 1. MOD School Desktop OS (Admin & Server)
  {
    id: "rel_school_2_8_1",
    appTarget: "school-admin",
    appName: "MOD School Desktop OS (Admin & Server)",
    version: "2.8.1",
    title: "Zero-Cloud Edge Sync & Performance Boost",
    releaseDate: "August 13, 2026",
    overview: "Enhanced local-first SQLite persistence, sub-10ms query execution across 50 LAN terminals, and high-frequency thermal receipt streaming.",
    improvements: [
      "Sub-10ms query execution across 50 connected campus LAN client PCs.",
      "Optimized WebSocket session keepalive telemetry on unstable campus connections.",
    ],
    fixes: [
      "Resolved memory leak during continuous RTSP biometric attendance turnstile video stream decoding.",
      "Fixed ESC/POS thermal receipt print clipping on 58mm compact paper rolls.",
    ],
    patches: [
      "Updated TLS 1.3 cryptographic cipher suites for enhanced air-gapped school network security.",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1MOD_School_281_x64",
    gdriveFileId: "1MOD_School_281_x64",
    gdriveFolder: "MOD-Releases/Desktop-Admin-OS",
    fileSize: "68.4 MB",
    sha256: "e8f4c28a9b23f5b7d34190c42ba5e917d057a62df864817a7e80d4f1295b9c02",
    isLatest: true,
    platform: "Windows 10/11 x64 & Linux",
  },
  {
    id: "rel_school_2_8_0",
    appTarget: "school-admin",
    appName: "MOD School Desktop OS (Admin & Server)",
    version: "2.8.0",
    title: "Persistent Sidebar Hierarchy & Biometric Turnstile Driver",
    releaseDate: "August 02, 2026",
    overview: "MOD School OS improves administrative efficiency by persisting custom class hierarchy across restarts and adding native USB turnstile support.",
    improvements: [
      "Persistent folder hierarchy across multi-class teacher workstations.",
      "Direct USB Biometric Fingerprint/Face recognition driver bypassing Windows COM port lag.",
    ],
    fixes: [
      "Fixed student attendance export CSV formatting for state board submissions.",
    ],
    patches: [
      "Initial LTS baseline for Windows 10 & 11 64-bit platforms.",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1MOD_School_280_x64",
    gdriveFileId: "1MOD_School_280_x64",
    gdriveFolder: "MOD-Releases/Desktop-Admin-OS",
    fileSize: "67.9 MB",
    sha256: "c18f3a9e2d765b4f0281b931e847c210d7a5b34927f8a32190c741e549d102ab",
    isLatest: false,
    platform: "Windows 10/11 x64 & Linux",
  },

  // 2. MOD School Employee App (Android)
  {
    id: "rel_emp_1_4_2",
    appTarget: "employee-app",
    appName: "MOD School Employee & Faculty App",
    version: "1.4.2",
    title: "Offline Grade Book & Instant Attendance Sync",
    releaseDate: "September 28, 2026",
    overview: "Faculty members can mark attendance and record term exam marks completely offline. Syncs automatically with desktop school server upon campus Wi-Fi reconnect.",
    improvements: [
      "Offline student roll-call caching for playgrounds and sports fields without Wi-Fi.",
      "1-Tap bulk SMS & WhatsApp homework assignment dispatcher.",
    ],
    fixes: [
      "Fixed camera crash on certain Xiaomi and Samsung devices when scanning student QR badges.",
    ],
    patches: [
      "Target SDK 34 compatibility updates for Android 14.",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1MOD_Employee_142_apk",
    gdriveFileId: "1MOD_Employee_142_apk",
    gdriveFolder: "MOD-Releases/Employee-App",
    fileSize: "18.4 MB",
    sha256: "b45a901f112e45c789123048923a102948576192837465019283746591029384",
    isLatest: true,
    platform: "Android 8.0+ APK",
  },

  // 3. MOD School Student & Parent App (Android)
  {
    id: "rel_stu_1_6_0",
    appTarget: "student-app",
    appName: "MOD School Student & Parent App",
    version: "1.6.0",
    title: "Contactless Fee Receipts & Live Bus GPS Telemetry",
    releaseDate: "October 04, 2026",
    overview: "Allows parents to view real-time school fee ledgers, download verified receipts, and receive encrypted push notifications when the school bus enters their zone.",
    improvements: [
      "Encrypted ephemeral relay tunnel for fee receipts and marksheet download.",
      "Sub-second push notifications for student arrival/departure at campus turnstile.",
    ],
    fixes: [
      "Fixed dark mode contrast on fee breakdown table.",
    ],
    patches: [
      "DPDP 2023 verified parental consent cryptographic signing verification.",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1MOD_Student_160_apk",
    gdriveFileId: "1MOD_Student_160_apk",
    gdriveFolder: "MOD-Releases/Student-Parent-App",
    fileSize: "21.2 MB",
    sha256: "f781920394857102938475610293847561029384756102938475610293847561",
    isLatest: true,
    platform: "Android 8.0+ APK",
  },

  // 4. Clerk MV3 Co-Pilot Extension
  {
    id: "rel_clerk_1_2_0",
    appTarget: "clerk-copilot",
    appName: "Clerk MV3 Co-Pilot Extension",
    version: "1.2.0",
    title: "UDISE+ & State Portal Autonomous Auto-Fill",
    releaseDate: "October 12, 2026",
    overview: "Client-side Chrome extension operating strictly in browser sandbox. Extracts local student data from MOD School Desktop and fills official government portals with 1-click.",
    improvements: [
      "Support for 2026 UDISE+ student entry schema changes.",
      "Zero credentials harvesting guarantee via local DOM injection.",
    ],
    fixes: [
      "Fixed select dropdown binding on slower government portal servers.",
    ],
    patches: [
      "Manifest V3 background worker memory optimization.",
    ],
    downloadUrl: "https://drive.google.com/uc?export=download&id=1MOD_Clerk_120_zip",
    gdriveFileId: "1MOD_Clerk_120_zip",
    gdriveFolder: "MOD-Releases/Browser-Extensions",
    fileSize: "4.2 MB",
    sha256: "98a1b2c3d4e5f607182930415263748596071829304152637485960718293041",
    isLatest: true,
    platform: "Chrome / Edge MV3 Extension",
  },
];
