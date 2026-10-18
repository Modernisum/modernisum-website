export interface AppChangelog {
  version: string;
  date: string;
  highlights: string[];
}

export interface AppSystemRequirements {
  os: string;
  processor: string;
  ram: string;
  storage: string;
  network?: string;
  runtime?: string;
}

export interface SchoolAppConfig {
  id: "desktop" | "employee" | "student" | "extension";
  name: string;
  badge: string;
  tagline: string;
  description: string;
  version: string;
  releaseDate: string;
  fileSize: string;
  fileFormat: string;
  fileName: string;
  directDownloadUrl: string;
  driveMirrorUrl: string;
  localSourcePath?: string;
  sha256: string;
  accentColor: "sky" | "indigo" | "emerald" | "amber";
  targetUsers: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  requirements: AppSystemRequirements;
  changelog: AppChangelog[];
}

export type VidhyamAppConfig = SchoolAppConfig;

export const SCHOOL_APPS: Record<string, SchoolAppConfig> = {
  desktop: {
    id: "desktop",
    name: "ModSchool Desktop OS",
    badge: "Windows Local-First",
    tagline: "Autonomous Offline-First Campus Administration Suite",
    description:
      "Engineered for School Principals, Bursars, and Administrative Clerks. Operates 100% offline with zero cloud latency, direct hardware peripheral interfacing (POS printers, RFID turnstiles), multi-PC local LAN anti-collision sync, and sovereign Google Drive vault replication.",
    version: "v2.8.1",
    releaseDate: "September 2026",
    fileSize: "32.6 MB",
    fileFormat: ".ZIP (64-bit Windows Package)",
    fileName: "School-Setup-v2.8.1-x64.zip",
    directDownloadUrl: "/downloads/School-Setup-v2.8.1-x64.zip",
    driveMirrorUrl: "https://drive.google.com/drive/folders/1VidhyamDesktopOS-Release-v1.2.0",
    localSourcePath: "D:\\modernisum\\vidhyam\\desktop_app",
    sha256: "e8f4c28a9b23f5b7d34190c42ba5e917d057a62df864817a7e80d4f1295b9c02",
    accentColor: "sky",
    targetUsers: "Principals, Directors, Accountants & System Admins",
    capabilities: [
      {
        title: "100% Offline-First Architecture & Windows Tray Daemon",
        description:
          "Runs entirely on local hardware without internet dependency. Rust Axum backend with embedded PostgreSQL delivers sub-10ms response times and zero cloud vendor lock-in.",
      },
      {
        title: "Dual-Rate Financial Engine & Classroom Micro-P&L",
        description:
          "Session Progress Clock with +25% cash buffer eliminates year-end cash crunch. Tracks classroom-level revenue, faculty payroll burn, and 0 bank reconciliation drift.",
      },
      {
        title: "5-Factor Teacher Substitution & Dynamic Timetable",
        description:
          "Instant conflict-free substitute allocation evaluating 5 workload variables in under 3 seconds, with auto-merging for 90-minute labs and push alerts to teacher phones.",
      },
      {
        title: "Contactless UHF RFID Gate AI & Wanderer Anomaly Alert",
        description:
          "Sub-150ms 1:1 Cosine Vector Face Verification at campus turnstiles paired with Raspberry Pi 5. Automatically detects students who entered the gate but skipped class roll-call.",
      },
      {
        title: "Local LAN Autonomous IVR Calling & Voice PBX",
        description:
          "On-premise SIP telephony eliminates ₹20k–₹35k/yr in Twilio costs. Dials absentees automatically; parents press 1 to confirm leave, which is recorded in the database directly.",
      },
      {
        title: "Institutional Document Vault & Govt Co-Pilot (UDISE+/CBSE)",
        description:
          "Dual-sided KYC compliance vault with browser extension auto-filling 80-90% of state and central government portal forms (UDISE+, CBSE LOC, NSP, APAAR).",
      },
      {
        title: "Enterprise Audit Ledger & 1-Click Atomic Rollback",
        description:
          "Monitors 4 high-risk fraud vectors with 1-click state rollback and Resend Email OTP gates protecting institutional profiles and legal school settings.",
      },
      {
        title: "Autonomous Exam Studio & Mobile ML Kit Copy Checking",
        description:
          "Pedagogically differentiated question papers (Class 1-5 visual vs Class 6-12 board exams) with server-side syllabus expiry guards and phone camera answer grading.",
      },
      {
        title: "Bring Your Own Cloud (BYOC) Google Drive Vault",
        description:
          "Encrypted daily database snapshots sync directly to the school's private Google Drive. The institution retains absolute, sovereign data ownership.",
      },
    ],
    requirements: {
      os: "Windows 10 / 11 (64-bit, Version 1903 or higher)",
      processor: "Intel Core i3 / AMD Ryzen 3 or faster",
      ram: "4 GB minimum (8 GB recommended for 1000+ student rosters)",
      storage: "500 MB free NVMe/SSD space for local SQLite database",
      runtime: "Microsoft Edge WebView2 Runtime (pre-installed on Windows 10/11)",
      network: "Local Wi-Fi / Ethernet for multi-PC sync; Internet only for Google Drive backup",
    },
    changelog: [
      {
        version: "v1.2.0",
        date: "September 2026",
        highlights: [
          "Enhanced multi-PC CRDT LAN synchronization engine with automatic collision resolution.",
          "Integrated Google Drive BYOC automated midnight snapshot vault.",
          "High-density 1080p executive administration dashboard with interactive KPI cards.",
          "Direct thermal printer ESC/POS driver integration for instant fee receipts.",
        ],
      },
      {
        version: "v1.1.4",
        date: "August 2026",
        highlights: [
          "Added space digital twin holding capacity modeling and asset tracking.",
          "Automated timetable substitution solver with zero-scratch setup.",
          "Comprehensive document vault with client-side OCR validation.",
        ],
      },
    ],
  },

  employee: {
    id: "employee",
    name: "Modernisum School Employee App",
    badge: "Faculty & Staff Android",
    tagline: "Rapid Classroom Attendance, Proxy Substitution & Digital Diaries",
    description:
      "Crafted specifically for Teachers, Subject Faculty, Head of Departments, Bus Drivers, and Support Staff. Mark 60-student attendance in under 15 seconds, assign digital homework, submit leave requests, and manage substitute proxy periods.",
    version: "v1.4.2",
    releaseDate: "September 2026",
    fileSize: "112.9 MB",
    fileFormat: ".APK (Android Package)",
    fileName: "School-Employee-App-v1.4.2.apk",
    directDownloadUrl: "/api/download?app=employee",
    driveMirrorUrl: "https://drive.google.com/drive/folders/1VidhyamEmployeeApp-Release-v1.4.2",
    localSourcePath: "D:\\modernisum\\vidhyam\\mobile_apps\\employee\\build\\app\\outputs\\flutter-apk\\app-debug.apk",
    sha256: "9f83a73c914e6b34f8a846c483a9d941deea259779df3f707f1896a297e283be",
    accentColor: "indigo",
    targetUsers: "Teachers, Faculty, Department Heads, Transport Drivers & Staff",
    capabilities: [
      {
        title: "Sub-Second Attendance Roll Call",
        description:
          "Mark whole-class presence with single-tap batch marking and offline local SQLite queuing. Auto-syncs as soon as connectivity resumes.",
      },
      {
        title: "Autonomous Substitute Period Alerts",
        description:
          "Receives instant push notifications for assigned substitute periods when colleagues take leave, complete with period subject and syllabus guidance.",
      },
      {
        title: "Digital Diary & Syllabus Tracker",
        description:
          "Assign homework, broadcast syllabus announcements, and share study materials directly to the student portal with photo attachments.",
      },
      {
        title: "Multimodal AI Exam Copy Checking Studio",
        description:
          "Scan student test sheets using the smartphone camera for instant optical handwriting recognition and automated rubric-based marking suggestions.",
      },
      {
        title: "Staff Leave & Duty Request System",
        description:
          "Submit casual and sick leave requests with one tap, view approval status in real-time, and access monthly salary pay slips.",
      },
      {
        title: "Bus Driver Route & Telemetry Pilot",
        description:
          "Turn-by-turn student pickup checklists for transport drivers with automatic arrival broadcasts sent to waiting parents.",
      },
    ],
    requirements: {
      os: "Android 8.0 (Oreo) or higher",
      processor: "Quad-Core 1.8 GHz ARM64 or faster",
      ram: "3 GB minimum RAM",
      storage: "150 MB available internal storage",
      network: "4G / Wi-Fi connection (offline-tolerant for roll call marking)",
    },
    changelog: [
      {
        version: "v1.4.2",
        date: "September 2026",
        highlights: [
          "Offline roll call caching with automatic background retry and conflict reconciliation.",
          "Sub-second proxy period notifications with 1-tap accept/decline.",
          "Enhanced camera capture with edge detection for digital homework scanning.",
        ],
      },
      {
        version: "v1.3.8",
        date: "August 2026",
        highlights: [
          "Direct teacher timetable daily schedule widget with classroom room numbering.",
          "Integrated staff leave balance tracker and digital payslip viewer.",
        ],
      },
    ],
  },

  student: {
    id: "student",
    name: "Modernisum School Student & Parent App",
    badge: "Student & Parent Android",
    tagline: "Live Campus Safety, Bus GPS Telemetry & Academic Dossier",
    description:
      "A dedicated, transparent portal for Parents and Students. Get instant gate entry/exit alerts, track school bus GPS in real-time, view verified report cards, pay tuition fees via UPI, and access daily homework worksheets.",
    version: "v1.4.0",
    releaseDate: "September 2026",
    fileSize: "48.6 MB",
    fileFormat: ".APK (Android Package)",
    fileName: "School-Student-Parent-App-v1.4.0.apk",
    directDownloadUrl: "/api/download?app=student",
    driveMirrorUrl: "https://drive.google.com/drive/folders/1VidhyamStudentApp-Release-v1.4.0",
    localSourcePath: "D:\\modernisum\\vidhyam\\mobile_apps\\student",
    sha256: "b45a6c1728e219084fb412d264580bfb9812423985a109a12c49b0682281a704",
    accentColor: "emerald",
    targetUsers: "Parents, Guardians, and K-12 Enrolled Students",
    capabilities: [
      {
        title: "Contactless Gate & Turnstile Telemetry",
        description:
          "Instant push notification and WhatsApp confirmation whenever the student enters or exits the school campus gate via RFID/biometric tap.",
      },
      {
        title: "Live GPS School Bus Tracking",
        description:
          "High-precision real-time bus location tracking on map with dynamic ETA and proximity buzzers when the bus is 2 stops away.",
      },
      {
        title: "Digital Marksheet & Progress Bell Curves",
        description:
          "Holistic term examination performance, subject-wise percentiles, attendance health indicators, and teacher observation notes.",
      },
      {
        title: "Frictionless UPI Fee Payments",
        description:
          "Instant zero-friction fee payment via UPI, debit card, or net banking, with authenticated digitally signed PDF receipts.",
      },
      {
        title: "Personalized AI Concept Diagnostics",
        description:
          "Pinpoints specific academic weak spots and generates customized weekend practice worksheets to accelerate student mastery.",
      },
      {
        title: "Digital Diary & School Notices",
        description:
          "Official school circulars, emergency holiday declarations, exam date-sheets, and daily subject homework in one clean stream.",
      },
    ],
    requirements: {
      os: "Android 8.0 (Oreo) or higher",
      processor: "Quad-Core 1.6 GHz ARM64 or faster",
      ram: "2 GB minimum RAM",
      storage: "90 MB available storage",
      network: "3G / 4G / 5G or Wi-Fi connection",
    },
    changelog: [
      {
        version: "v1.4.0",
        date: "September 2026",
        highlights: [
          "Live GPS telemetry with smooth map animation and proximity push alerts.",
          "Instant WhatsApp attendance notification integration.",
          "1-Click UPI fee payment gateway with instant PDF receipt download.",
          "Offline diary review mode for viewing homework without active internet.",
        ],
      },
      {
        version: "v1.3.1",
        date: "August 2026",
        highlights: [
          "Personalized academic concept diagnostic reports for term assessments.",
          "Digital ID card viewer with live QR code for library and canteen access.",
        ],
      },
    ],
  },

  extension: {
    id: "extension",
    name: "Modernisum Clerk Co-Pilot",
    badge: "Chrome & Edge Extension",
    tagline: "Government & Board Form Filing Co-Pilot with Smart Image Resizer",
    description:
      "Purpose-built for School Clerks and Data Entry Staff. Eliminates grueling manual re-typing on state education portals (U-DISE+, Board Registration, RTE, Scholarships). Features 1-click form autofill, client-side photo/document resizer to exact KB limits, and USB hardware gateway.",
    version: "v1.0.0",
    releaseDate: "September 2026",
    fileSize: "605 KB",
    fileFormat: ".ZIP (Manifest V3 Archive)",
    fileName: "school-copilot-extension-v1.0.0.zip",
    directDownloadUrl: "/api/download?app=extension",
    driveMirrorUrl: "https://drive.google.com/drive/folders/1VidhyamExtension-Release-v1.0.0",
    localSourcePath: "D:\\modernisum\\vidhyam\\extensions\\vidhyam_copilot",
    sha256: "7c61b2e49c95d98fa63e1858a7e3cf476839d48b11c63dbd981e7d8258276f5a",
    accentColor: "amber",
    targetUsers: "School Clerks, Administrative Staff & Computer Operators",
    capabilities: [
      {
        title: "1-Click Board & Govt Portal Auto-Filler",
        description:
          "Injects verified student details (Aadhaar, DOB, PEN, Parent Details, Bank IFSC) directly into official education board registration forms with zero manual errors.",
      },
      {
        title: "In-Browser Smart Image & Signature Resizer",
        description:
          "Automatically downsamples and crops student photographs and signature scans to exact government portal thresholds (e.g. 20 KB to 50 KB JPG) directly in the browser.",
      },
      {
        title: "Persistent Sidepanel Command Center",
        description:
          "Docked Chrome side-panel displays the active student roster alongside the open government portal with instantaneous 1-click clipboard transfer.",
      },
      {
        title: "Hardware Gateway for Turnstiles & Fingerprint Scanners",
        description:
          "Bridge layer that allows web portals to read raw serial streams from USB RFID turnstile controllers, smartcard readers, and optical biometric sensors.",
      },
      {
        title: "State Government Filing Tracker & Audit Trail",
        description:
          "Maintains a tamper-evident log of every student record submitted to external government servers with timestamp and clerk ID.",
      },
      {
        title: "Offline Student Dossier Cache",
        description:
          "Caches the active batch locally in browser storage so clerks can continue filling government applications even if the local ERP server is rebooting.",
      },
    ],
    requirements: {
      os: "Any desktop OS running Chromium-based browser (Windows, macOS, Linux)",
      processor: "Any modern dual-core CPU",
      ram: "2 GB RAM",
      storage: "10 MB free disk space",
      runtime: "Google Chrome 116+, Microsoft Edge 116+, Brave, or Chromium",
      network: "Access to local school server (127.0.0.1:7070 or campus LAN IP)",
    },
    changelog: [
      {
        version: "v1.0.0",
        date: "September 2026",
        highlights: [
          "Manifest V3 sidepanel architecture with zero background battery drain.",
          "Integrated in-browser Canvas 2D image compressor targeting exact 20KB-50KB limits.",
          "High-speed student search by Roll No, Admission No, or Student Name.",
          "Direct USB/Serial bridge for RFID turnstile gate telemetry.",
        ],
      },
    ],
  },
};
export const VIDHYAM_APPS = SCHOOL_APPS;

