// High-fidelity vector cartoon avatars for Modernisum Universal Identity
// 100% self-contained data URIs - zero network delay, zero CDN dependency

export interface CartoonAvatar {
  id: string;
  name: string;
  tag: string;
  svgUrl: string;
}

// 6 Distinct Stylized 3D-feel Cartoon Avatars
export const CARTOON_AVATARS: CartoonAvatar[] = [
  {
    id: "cyber-astro",
    name: "Cyber Astro",
    tag: "Explorer",
    svgUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00f2fe"/>
            <stop offset="100%" stop-color="#4facfe"/>
          </linearGradient>
          <linearGradient id="vis1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#111827"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg1)"/>
        <!-- Helmet -->
        <circle cx="50" cy="50" r="34" fill="#ffffff"/>
        <!-- Visor -->
        <rect x="26" y="36" width="48" height="26" rx="13" fill="url(#vis1)"/>
        <ellipse cx="38" cy="45" rx="4" ry="6" fill="#38bdf8"/>
        <ellipse cx="62" cy="45" rx="4" ry="6" fill="#38bdf8"/>
        <!-- Visor highlight -->
        <path d="M 32 40 Q 42 38 52 40" stroke="#00f2fe" stroke-width="2" stroke-linecap="round" fill="none"/>
        <!-- Antenna -->
        <circle cx="50" cy="12" r="4" fill="#fbbf24"/>
        <line x1="50" y1="16" x2="50" y2="20" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
        <!-- Collar -->
        <rect x="36" y="80" width="28" height="8" rx="4" fill="#cbd5e1"/>
      </svg>
    `.trim())
  },
  {
    id: "tech-wizard",
    name: "Code Wizard",
    tag: "Creator",
    svgUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7928ca"/>
            <stop offset="100%" stop-color="#ff0080"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg2)"/>
        <!-- Wizard Hat -->
        <polygon points="50,8 24,46 76,46" fill="#1e1b4b"/>
        <ellipse cx="50" cy="46" rx="30" ry="7" fill="#312e81"/>
        <polygon points="50,14 52,19 57,19 53,22 55,27 50,24 45,27 47,22 43,19 48,19" fill="#fbbf24"/>
        <!-- Face -->
        <circle cx="50" cy="58" r="22" fill="#fde047"/>
        <!-- Cool Sunglasses -->
        <rect x="34" y="52" width="14" height="10" rx="3" fill="#0f172a"/>
        <rect x="52" y="52" width="14" height="10" rx="3" fill="#0f172a"/>
        <line x1="48" y1="56" x2="52" y2="56" stroke="#0f172a" stroke-width="2"/>
        <!-- Smile -->
        <path d="M 43 68 Q 50 74 57 68" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>
    `.trim())
  },
  {
    id: "robo-buddy",
    name: "Robo Buddy",
    tag: "AI Partner",
    svgUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669"/>
            <stop offset="100%" stop-color="#10b981"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg3)"/>
        <!-- Robot Head -->
        <rect x="25" y="30" width="50" height="42" rx="10" fill="#f8fafc"/>
        <!-- Ears / Bolts -->
        <rect x="18" y="44" width="7" height="14" rx="3" fill="#94a3b8"/>
        <rect x="75" y="44" width="7" height="14" rx="3" fill="#94a3b8"/>
        <!-- Eyes Visor -->
        <rect x="32" y="38" width="36" height="16" rx="6" fill="#0f172a"/>
        <circle cx="42" cy="46" r="4" fill="#38bdf8"/>
        <circle cx="58" cy="46" r="4" fill="#38bdf8"/>
        <!-- Antenna -->
        <line x1="50" y1="18" x2="50" y2="30" stroke="#f8fafc" stroke-width="3"/>
        <circle cx="50" cy="18" r="4" fill="#ef4444"/>
        <!-- Mouth Grill -->
        <line x1="38" y1="62" x2="62" y2="62" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `.trim())
  },
  {
    id: "scholar-owl",
    name: "Vidhyam Owl",
    tag: "Scholar",
    svgUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg4)"/>
        <!-- Owl Body -->
        <ellipse cx="50" cy="58" rx="28" ry="24" fill="#78350f"/>
        <ellipse cx="50" cy="62" rx="18" ry="16" fill="#fef3c7"/>
        <!-- Eyes / Spectacles -->
        <circle cx="38" cy="44" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
        <circle cx="62" cy="44" r="13" fill="#ffffff" stroke="#1e293b" stroke-width="3"/>
        <line x1="51" y1="44" x2="49" y2="44" stroke="#1e293b" stroke-width="3"/>
        <circle cx="39" cy="44" r="5" fill="#0f172a"/>
        <circle cx="61" cy="44" r="5" fill="#0f172a"/>
        <circle cx="41" cy="42" r="1.5" fill="#ffffff"/>
        <circle cx="63" cy="42" r="1.5" fill="#ffffff"/>
        <!-- Beak -->
        <polygon points="50,50 46,57 54,57" fill="#ea580c"/>
        <!-- Graduation Cap -->
        <polygon points="50,14 18,26 50,34 82,26" fill="#0f172a"/>
        <rect x="36" y="29" width="28" height="6" fill="#1e293b"/>
        <line x1="50" y1="26" x2="22" y2="36" stroke="#fbbf24" stroke-width="2"/>
        <circle cx="22" cy="38" r="2" fill="#fbbf24"/>
      </svg>
    `.trim())
  },
  {
    id: "cosmic-fox",
    name: "Solar Fox",
    tag: "Innovator",
    svgUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ea580c"/>
            <stop offset="100%" stop-color="#f97316"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg5)"/>
        <!-- Fox Ears -->
        <polygon points="26,18 42,42 18,44" fill="#c2410c"/>
        <polygon points="26,24 38,40 22,42" fill="#fed7aa"/>
        <polygon points="74,18 82,44 58,42" fill="#c2410c"/>
        <polygon points="74,24 78,42 62,40" fill="#fed7aa"/>
        <!-- Face -->
        <polygon points="50,78 22,44 78,44" fill="#ea580c"/>
        <polygon points="50,78 28,48 50,56" fill="#ffedd5"/>
        <polygon points="50,78 72,48 50,56" fill="#ffedd5"/>
        <!-- Eyes -->
        <ellipse cx="38" cy="46" rx="4" ry="2" fill="#1e293b"/>
        <ellipse cx="62" cy="46" rx="4" ry="2" fill="#1e293b"/>
        <!-- Nose -->
        <circle cx="50" cy="74" r="3" fill="#0f172a"/>
      </svg>
    `.trim())
  },
  {
    id: "neo-cat",
    name: "Cyber Cat",
    tag: "Creative",
    svgUrl: "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="100%" stop-color="#6366f1"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#bg6)"/>
        <!-- Cat Ears -->
        <polygon points="28,24 40,46 22,46" fill="#334155"/>
        <polygon points="30,30 38,44 26,44" fill="#f43f5e"/>
        <polygon points="72,24 78,46 60,46" fill="#334155"/>
        <polygon points="70,30 74,44 62,44" fill="#f43f5e"/>
        <!-- Head -->
        <circle cx="50" cy="56" r="24" fill="#e2e8f0"/>
        <!-- Big Anime Eyes -->
        <ellipse cx="40" cy="52" rx="5" ry="7" fill="#0284c7"/>
        <ellipse cx="60" cy="52" rx="5" ry="7" fill="#0284c7"/>
        <circle cx="39" cy="50" r="2" fill="#ffffff"/>
        <circle cx="59" cy="50" r="2" fill="#ffffff"/>
        <!-- Nose & Whiskers -->
        <polygon points="50,60 48,58 52,58" fill="#f43f5e"/>
        <line x1="26" y1="56" x2="36" y2="58" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="26" y1="62" x2="36" y2="61" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="74" y1="56" x2="64" y2="58" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="74" y1="62" x2="64" y2="61" stroke="#94a3b8" stroke-width="1.5"/>
      </svg>
    `.trim())
  }
];

export function getDefaultAvatar(): CartoonAvatar {
  return CARTOON_AVATARS[0]; // Cyber Astro
}

export function getAvatarById(id?: string): CartoonAvatar {
  if (!id) return CARTOON_AVATARS[0];
  const found = CARTOON_AVATARS.find((a) => a.id === id);
  return found || CARTOON_AVATARS[0];
}
