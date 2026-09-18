export interface ReleaseItem {
  id: string;
  version: string;
  title: string;
  releaseDate: string;
  overview: string;
  improvements: string[];
  fixes: string[];
  patches: string[];
  downloadUrl: string;
  gdriveFileId?: string;
  fileSize: string;
  sha256?: string;
  isLatest: boolean;
}

export const SEED_RELEASES: ReleaseItem[] = [
  {
    id: "rel_2_8_1",
    version: "2.8.1",
    title: "Chat Responsiveness Improvements",
    releaseDate: "August 13, 2026",
    overview: "Bug fixes addressing message responsiveness when interacting with the agent.",
    improvements: [],
    fixes: [
      "Improved responsiveness and reduced hanging issues when sending messages to the agent.",
      "Optimized WebSocket session keepalive telemetry on unstable campus connections.",
    ],
    patches: [],
    downloadUrl: "/downloads/Vidhyam-Setup-v2.8.1-x64.exe",
    fileSize: "68.4 MB",
    sha256: "e8f4c28a9b23f5b7d34190c42ba5e917d057a62df864817a7e80d4f1295b9c02",
    isLatest: true,
  },
  {
    id: "rel_2_8_0",
    version: "2.8.0",
    title: "Persistent Sidebar Folders & LAN Speed Boost",
    releaseDate: "August 02, 2026",
    overview: "Vidhyam improves workspace organization by persisting your custom folder hierarchy across restarts.",
    improvements: [
      "Persistent folder hierarchy across multi-class teacher workstations.",
      "Sub-10ms query execution across 50 connected LAN client PCs.",
    ],
    fixes: [
      "Fixed thermal receipt print clipping on 58mm compact paper rolls.",
    ],
    patches: [
      "Updated TLS 1.3 cryptographic cipher suites for enhanced school network security.",
    ],
    downloadUrl: "/downloads/Vidhyam-Setup-v2.8.0-x64.exe",
    fileSize: "67.9 MB",
    sha256: "c18f3a9e2d765b4f0281b931e847c210d7a5b34927f8a32190c741e549d102ab",
    isLatest: false,
  },
  {
    id: "rel_2_4_0",
    version: "2.4.0",
    title: "High-Throughput Rust Engine & Face AI Attendance",
    releaseDate: "July 18, 2026",
    overview: "Official milestone release introducing zero-cloud edge face AI recognition at campus turnstiles.",
    improvements: [
      "Edge Face AI attendance processing under 0.38 seconds per student.",
      "Raw ESC/POS byte streaming bypassing Windows print spooler for instant counter receipts.",
    ],
    fixes: [
      "Resolved memory leak during 24-hour continuous RTSP turnstile video stream decoding.",
    ],
    patches: [
      "Initial LTS stability baseline for Windows 10 & 11 64-bit platforms.",
    ],
    downloadUrl: "/downloads/Vidhyam-Setup-v2.4.0-x64.exe",
    fileSize: "66.5 MB",
    sha256: "a948e210b37c54d19762fa8390b1c245d8e741029384756b1029384756c81029",
    isLatest: false,
  },
];
