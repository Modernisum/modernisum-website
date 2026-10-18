import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export interface DesktopScreenItem {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  caption: string;
  whyBuilt: string;
  url: string;
  darkUrl?: string;
  lightUrl?: string;
  thumbnailUrl: string;
  iconName?: string;
  badge: string;
  impactMetric: string;
  // Bilingual Hindi support
  titleHi?: string;
  shortTitleHi?: string;
  categoryHi?: string;
  captionHi?: string;
  whyBuiltHi?: string;
  impactMetricHi?: string;
  badgeHi?: string;
  order?: number;
  isActive?: boolean;
  product?: string;
}

const SHOWCASE_COLLECTION = "software_showcase";

export const SEED_SHOWCASE_SCREENS: DesktopScreenItem[] = [
  {
    id: "dashboard",
    title: "Executive Cockpit & School Dashboard",
    shortTitle: "Dashboard",
    category: "Executive Overview",
    caption:
      "Real-time administrative telemetry: daily attendance metrics, fee collection summaries, active bus tracking alerts, and quick actions.",
    whyBuilt:
      "Gives principals and school directors an instant morning pulse of campus operations—daily fee collections, student turnout, transit routes, and pending approvals.",
    impactMetric: "Real-Time Telemetry",
    badge: "Core Telemetry",
    titleHi: "एग्जीक्यूटिव कॉकपिट और स्कूल डैशबोर्ड",
    shortTitleHi: "डैशबोर्ड",
    categoryHi: "प्रशासनिक अवलोकन",
    captionHi: "रियल-टाइम प्रशासनिक टेलीमेट्री: दैनिक उपस्थिति मेट्रिक्स, शुल्क संग्रह सारांश, जीपीएस बस ट्रैकिंग और त्वरित प्रशासनिक कार्य।",
    whyBuiltHi: "प्राचार्यों और निदेशकों को कैंपस के दैनिक कामकाज (फीस कलेक्शन, उपस्थिति, वाहन और पेंडिंग अनुमतियों) की सुबह की संपूर्ण लाइव स्थिति देता है।",
    impactMetricHi: "रियल-टाइम टेलीमेट्री",
    badgeHi: "कोर टेलीमेट्री",
    url: "/images/desktop/dashboard_dark.png",
    darkUrl: "/images/desktop/dashboard_dark.png",
    lightUrl: "/images/desktop/dashboard_light.png",
    thumbnailUrl: "/images/desktop/dashboard_dark.png",
    iconName: "LayoutDashboard",
    order: 1,
    isActive: true,
    product: "school",
  },
  {
    id: "assistant",
    title: "Context-Aware AI Administrative Copilot",
    shortTitle: "AI Assistant",
    category: "Cognitive AI",
    caption:
      "Generative AI assistant delivering instant student dossiers, marksheet analytics, board curriculum policies, and administrative insights.",
    whyBuilt:
      "Answers complex queries instantly without navigating nested menus—generating student academic dossiers, syllabus policies, and attendance analysis in seconds.",
    impactMetric: "Instant AI Intelligence",
    badge: "Sub-1s Answers",
    titleHi: "संदर्भ-संवेदनशील एआई प्रशासनिक को-पायलट",
    shortTitleHi: "एआई सहायक",
    categoryHi: "कॉग्निटिव एआई",
    captionHi: "जेनरेटिव एआई सहायक जो सेकंडों में छात्र डॉसियर, मार्कशीट विश्लेषण, बोर्ड नीतियां और प्रशासनिक अंतर्दृष्टि प्रदान करता है।",
    whyBuiltHi: "जटिल मेनू में भटके बिना तुरंत जवाब देता है—छात्र अकादमिक रिकॉर्ड, पाठ्यक्रम नीतियां और उपस्थिति विश्लेषण सेकंडों में प्रस्तुत करता है।",
    impactMetricHi: "त्वरित एआई इंटेलिजेंस",
    badgeHi: "सब-1s त्वरित उत्तर",
    url: "/images/desktop/assistant_overview.png",
    darkUrl: "/images/desktop/assistant_overview.png",
    lightUrl: "/images/desktop/assistant_chat_window.png",
    thumbnailUrl: "/images/desktop/assistant_overview.png",
    iconName: "Bot",
    order: 2,
    isActive: true,
    product: "school",
  },
  {
    id: "student_profile",
    title: "Student 360° Profile & Academic Dossier",
    shortTitle: "Student Profile",
    category: "Student Records",
    caption:
      "Holistic student dossier integrating disciplinary notes, fee receipts, examination history, attendance analytics, and guardian records.",
    whyBuilt:
      "Eliminates fragmented paperwork by consolidating academic marks, fee balances, RFID attendance logs, and guardian contacts in one unified profile view.",
    impactMetric: "360° Student Audit",
    badge: "360° Dossier",
    titleHi: "विद्यार्थी 360° समग्र प्रोफाइल एवं अकादमिक डॉसियर",
    shortTitleHi: "छात्र प्रोफाइल",
    categoryHi: "छात्र अभिलेख",
    captionHi: "समग्र छात्र डॉसियर जो अनुशासनात्मक नोट्स, फीस रसीदें, परीक्षा इतिहास, उपस्थिति और अभिभावक संपर्क को एकीकृत करता है।",
    whyBuiltHi: "अलग-अलग फाइलों की उलझन मिटाकर अंक, फीस शेष, आरएफआईडी उपस्थिति और अभिभावक संपर्क को एक ही स्क्रीन पर समेकित करता है।",
    impactMetricHi: "360° छात्र ऑडिट",
    badgeHi: "360° डॉसियर",
    url: "/images/desktop/student_profile_overview.png",
    darkUrl: "/images/desktop/student_profile_overview.png",
    lightUrl: "/images/desktop/student_dossier_performance.png",
    thumbnailUrl: "/images/desktop/student_profile_overview.png",
    iconName: "Users",
    order: 3,
    isActive: true,
    product: "school",
  },
  {
    id: "attendance",
    title: "Contactless Face AI & RFID Gate Turnstile Ingress",
    shortTitle: "Gate Attendance",
    category: "Campus Access Control",
    caption:
      "Sub-second gate attendance processing 1,400+ students with instant WhatsApp arrival notifications and automated anti-passback security.",
    whyBuilt:
      "Resolves morning entrance congestion with 0.38s sub-second face AI and 13.56MHz smart card turnstiles—notifying parents instantly via WhatsApp.",
    impactMetric: "0.38s Ingress Speed",
    badge: "Anti-Passback",
    titleHi: "संपर्करहित फेस एआई एवं आरएफआईडी टर्नस्टाइल गेट हाजिरी",
    shortTitleHi: "गेट उपस्थिति",
    categoryHi: "कैंपस एक्सेस कंट्रोल",
    captionHi: "1,400+ छात्रों के लिए सब-सेकंड गेट उपस्थिति, तत्काल व्हाट्सएप आगमन अलर्ट और स्वचालित एंटी-पासबैक सुरक्षा।",
    whyBuiltHi: "सुबह गेट की भीड़ को 0.38s फेस एआई और स्मार्ट कार्ड टर्नस्टाइल्स से पूरी तरह खत्म करता है और अभिभावकों को तुरंत व्हाट्सएप भेजता है।",
    impactMetricHi: "0.38s गेट स्पीड",
    badgeHi: "एंटी-पासबैक सुरक्षा",
    url: "/images/desktop/attendance_dark.png",
    darkUrl: "/images/desktop/attendance_dark.png",
    lightUrl: "/images/desktop/attendance_leave.png",
    thumbnailUrl: "/images/desktop/attendance_dark.png",
    iconName: "ScanFace",
    order: 4,
    isActive: true,
    product: "school",
  },
  {
    id: "finance",
    title: "Double-Entry Institutional Ledger & Passbook",
    shortTitle: "Fee Treasury",
    category: "Financial Governance",
    caption:
      "Multi-installment fee management, automated deficit shortfall calculations (+25% buffer), instant WhatsApp payment links, and offline POS thermal receipt printing.",
    whyBuilt:
      "Stops campus fee leakage with continuous accrual ledgers, automated deficit shortfalls, and dual-copy 80mm thermal receipt printing.",
    impactMetric: "99.8% On-Time Collection",
    badge: "Zero Fee Leakage",
    titleHi: "डबल-एंट्री संस्थागत लेजर एवं डिजिटल पासबुक",
    shortTitleHi: "फीस कोषागार",
    categoryHi: "वित्तीय शासन",
    captionHi: "मल्टी-किस्त फीस प्रबंधन, स्वचालित घाटा गणना (+25% बफर), तत्काल व्हाट्सएप भुगतान लिंक और ऑफलाइन पीओएस रसीद प्रिंटिंग।",
    whyBuiltHi: "कंटीन्यूअस लेजर, ऑटोमेटेड डेफिसिट शॉर्टफॉल और 80mm थर्मल रसीद प्रिंटिंग से स्कूल की पाई-पाई का सटीक हिसाब रखता है।",
    impactMetricHi: "99.8% समय पर वसूली",
    badgeHi: "शून्य फीस लीकेज",
    url: "/images/desktop/finance_dark.png",
    darkUrl: "/images/desktop/finance_dark.png",
    lightUrl: "/images/desktop/finance_light.png",
    thumbnailUrl: "/images/desktop/finance_dark.png",
    iconName: "CreditCard",
    order: 5,
    isActive: true,
    product: "school",
  },
  {
    id: "timetable",
    title: "Zero-Conflict Master Timetable & Auto-Substitution",
    shortTitle: "Timetable Solver",
    category: "Academic Operations",
    caption:
      "Algorithmic constraint solver managing multi-period schedules, lab allocations, teacher workload limits, and single-click absent teacher substitution.",
    whyBuilt:
      "Eliminates 3+ hours of daily morning schedule headache. Automatically assigns qualified proxy teachers when staff report leaves, with zero room/slot conflicts.",
    impactMetric: "<3s Conflict Solver",
    badge: "1-Click Proxy",
    titleHi: "टकराव-मुक्त मास्टर टाइमटेबल एवं प्रॉक्सी सब्स्टीट्यूशन",
    shortTitleHi: "समय-सारणी इंजन",
    categoryHi: "अकादमिक संचालन",
    captionHi: "मल्टी-पीरियड शेड्यूल, लैब आवंटन, शिक्षक कार्यभार और अनुपस्थित शिक्षकों की 1-क्लिक में स्वचालित प्रॉक्सी व्यवस्था।",
    whyBuiltHi: "रोज सुबह की 3 घंटे की भागदौड़ मिटाता है—छुट्टी पर गए शिक्षकों की जगह तुरंत सही विषय विशेषज्ञ को बिना किसी क्लैश के तैनात करता है।",
    impactMetricHi: "<3 सेकंड में समाधान",
    badgeHi: "1-क्लिक प्रॉक्सी",
    url: "/images/desktop/timetable_dark.png",
    darkUrl: "/images/desktop/timetable_dark.png",
    lightUrl: "/images/desktop/timetable_calendar.png",
    thumbnailUrl: "/images/desktop/timetable_dark.png",
    iconName: "Calendar",
    order: 6,
    isActive: true,
    product: "school",
  },
  {
    id: "call_center",
    title: "Autonomous Voice Campaign & Parent Call Center",
    shortTitle: "Voice Broadcast",
    category: "Parent Communication",
    caption:
      "Automated outbound SIP/GSM voice alerts for fee reminders, emergency weather closures, and absent notifications with DTMF confirmation keys.",
    whyBuilt:
      "Reaches parents who miss SMS or don't use smartphones. Delivers urgent school announcements and payment alerts with interactive touch-tone responses.",
    impactMetric: "1,000 Calls in 6 Mins",
    badge: "Outbound IVR",
    titleHi: "स्वायत्त वॉइस कैंपेन एवं पेरेंट कॉल सेंटर",
    shortTitleHi: "वॉइस ब्रॉडकास्ट",
    categoryHi: "अभिभावक संवाद",
    captionHi: "फीस अनुस्मारक, आपातकालीन अवकाश और अनुपस्थिति सूचनाओं के लिए स्वचालित आउटबाउंड वॉइस कॉल और डीटीएमएफ पुष्टि।",
    whyBuiltHi: "उन अभिभावकों तक पहुंचता है जो एसएमएस नहीं देखते—तत्काल महत्वपूर्ण सूचनाएं वॉइस कॉल द्वारा इंटरएक्टिव पुष्टि के साथ पहुंचाता है।",
    impactMetricHi: "6 मिनट में 1,000 कॉल्स",
    badgeHi: "आउटबाउंड आईवीआर",
    url: "/images/desktop/call_center_dark.png",
    darkUrl: "/images/desktop/call_center_dark.png",
    lightUrl: "/images/desktop/call_center_phone.png",
    thumbnailUrl: "/images/desktop/call_center_dark.png",
    iconName: "PhoneCall",
    order: 7,
    isActive: true,
    product: "school",
  },
  {
    id: "admissions",
    title: "In-Place Multi-Step Student Admission Suite",
    shortTitle: "Admissions Suite",
    category: "Student Onboarding",
    caption:
      "Streamlined onboarding capturing family identity, mandatory KYC verification, transport route allotment, and automated fee quote calculation.",
    whyBuilt:
      "Replaces confusing paper application queues with an elegant multi-step admission wizard validating student eligibility, documents, and sibling discounts in real time.",
    impactMetric: "5-Min Paperless Admission",
    badge: "Full KYC Validation",
    titleHi: "मल्टी-स्टेप छात्र प्रवेश एवं ऑनबोर्डिंग सूट",
    shortTitleHi: "प्रवेश प्रणाली",
    categoryHi: "छात्र नामांकन",
    captionHi: "परिवार पहचान, अनिवार्य केवाईसी सत्यापन, बस रूट आवंटन और स्वचालित फीस कोटेशन के साथ सुव्यवस्थित प्रवेश प्रक्रिया।",
    whyBuiltHi: "कागजी कतारों को खत्म कर 5 मिनट में पात्रता जांच, दस्तावेज सत्यापन और सिबलिंग डिस्काउंट के साथ डिजिटल एडमिशन पूरा करता है।",
    impactMetricHi: "5 मिनट में पेपरलेस एडमिशन",
    badgeHi: "संपूर्ण केवाईसी सत्यापन",
    url: "/images/desktop/admissions_dark.png",
    darkUrl: "/images/desktop/admissions_dark.png",
    lightUrl: "/images/desktop/admissions_light.png",
    thumbnailUrl: "/images/desktop/admissions_dark.png",
    iconName: "UserPlus",
    order: 8,
    isActive: true,
    product: "school",
  },
  {
    id: "vault",
    title: "Statutory KYC Vault & Government Portal Extension",
    shortTitle: "Document Vault",
    category: "Compliance & Extension",
    caption:
      "Centralized AES-256 encrypted repository for Transfer Certificates, birth records, and one-click auto-filling for CBSE LOC, U-DISE+, and NSP scholarship portals.",
    whyBuilt:
      "Protects school against compliance penalties. Pairs with the Clerk MV3 Extension to inject verified student data directly into government portals with 20-50KB image resizing.",
    impactMetric: "Zero Data Re-Entry",
    badge: "CBSE & U-DISE+ Auto-Fill",
    titleHi: "सांविधिक केवाईसी वॉल्ट एवं सरकारी पोर्टल एक्सटेंशन",
    shortTitleHi: "दस्तावेज वॉल्ट",
    categoryHi: "अनुपालन एवं ऑटोमेशन",
    captionHi: "टी.सी., जन्म प्रमाण पत्र का सुरक्षित एनक्रिप्टेड भंडार, और सीबीएसई एलओसी, यू-डायस+ और एनएसपी छात्रवृत्ति के लिए 1-क्लिक ऑटो-फिल।",
    whyBuiltHi: "क्लर्क एमवी3 को-पायलट एक्सटेंशन के साथ मिलकर सरकारी पोर्टल्स पर बिना किसी दोबारा टाइपिंग के छात्रों का डेटा व फोटो सही साइज में भरता है।",
    impactMetricHi: "शून्य री-एंट्री त्रुटि",
    badgeHi: "सीबीएसई एवं यू-डायस+ ऑटो-फिल",
    url: "/images/desktop/vault_dark.png",
    darkUrl: "/images/desktop/vault_dark.png",
    lightUrl: "/images/desktop/vault_extension.png",
    thumbnailUrl: "/images/desktop/vault_dark.png",
    iconName: "FolderLock",
    order: 9,
    isActive: true,
    product: "school",
  },
  {
    id: "exams",
    title: "Autonomous Exam Matrix & Cognitive Question Generator",
    shortTitle: "Exam Studio",
    category: "Academic Assessment",
    caption:
      "CBSE/ICSE syllabus-aligned question generator, marksheet formulation with dual-grading algorithms, automated report cards, and student progress radar charts.",
    whyBuilt:
      "Saves teachers 20+ hours per term by generating balanced question blueprints, computing term percentages automatically, and generating bilingual report cards.",
    impactMetric: "20+ Hours Saved / Term",
    badge: "CBSE/ICSE Aligned",
    titleHi: "स्वायत्त परीक्षा मैट्रिक्स एवं कॉग्निटिव प्रश्न स्टूडियो",
    shortTitleHi: "परीक्षा स्टूडियो",
    categoryHi: "अकादमिक मूल्यांकन",
    captionHi: "सीबीएसई/आईसीएसई पाठ्यक्रम-संरेखित प्रश्न पत्र जनरेटर, मार्कशीट फॉर्मूलेशन, द्विभाषी रिपोर्ट कार्ड और छात्र प्रगति रडार चार्ट।",
    whyBuiltHi: "शिक्षकों के 20+ घंटे बचाता है—संतुलित प्रश्न पत्र तैयार करता है, स्वचालित प्रतिशत गणना करता है और सुंदर रिपोर्ट कार्ड बनाता है।",
    impactMetricHi: "प्रति सत्र 20+ घंटे की बचत",
    badgeHi: "सीबीएसई/आईसीएसई संरेखित",
    url: "/images/desktop/exams_dark.png",
    darkUrl: "/images/desktop/exams_dark.png",
    lightUrl: "/images/desktop/exams_ai_paper.png",
    thumbnailUrl: "/images/desktop/exams_dark.png",
    iconName: "FileCheck2",
    order: 10,
    isActive: true,
    product: "school",
  },
];

/**
 * Fetch showcase screens with auto-seeding if empty
 */
export async function fetchShowcaseScreens(product = "school"): Promise<DesktopScreenItem[]> {
  try {
    const colRef = collection(db, SHOWCASE_COLLECTION);
    const snap = await getDocs(colRef);

    if (snap.empty) {
      // Auto-seed into Firestore
      for (const item of SEED_SHOWCASE_SCREENS) {
        const docRef = doc(db, SHOWCASE_COLLECTION, item.id);
        await setDoc(docRef, {
          ...item,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }
      return SEED_SHOWCASE_SCREENS;
    }

    const items = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as any),
    })) as DesktopScreenItem[];

    // Sort by order
    return items
      .filter((i) => !product || i.product === product || i.product === "all")
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    console.warn("[Showcase DB Query] Falling back to baseline seeds:", err);
    return SEED_SHOWCASE_SCREENS;
  }
}

/**
 * Save or update a showcase screen in Firestore
 */
export async function saveShowcaseScreen(item: DesktopScreenItem): Promise<boolean> {
  try {
    const docRef = doc(db, SHOWCASE_COLLECTION, item.id);
    await setDoc(docRef, {
      ...item,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (err) {
    console.error("[Showcase DB Save] Error:", err);
    return false;
  }
}

/**
 * Delete a showcase screen
 */
export async function deleteShowcaseScreen(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, SHOWCASE_COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("[Showcase DB Delete] Error:", err);
    return false;
  }
}

/**
 * Reorder showcase screens
 */
export async function reorderShowcaseScreens(orderedIds: string[]): Promise<boolean> {
  try {
    for (let index = 0; index < orderedIds.length; index++) {
      const id = orderedIds[index];
      const docRef = doc(db, SHOWCASE_COLLECTION, id);
      await setDoc(docRef, { order: index + 1 }, { merge: true });
    }
    return true;
  } catch (err) {
    console.error("[Showcase DB Reorder] Error:", err);
    return false;
  }
}
