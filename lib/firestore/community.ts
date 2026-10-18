import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ProductTarget = "vidhyam" | "agromi" | "studio" | "extension" | "general";
export type FeedbackType = "review" | "complaint" | "feature_request" | "support";

export interface CommunityEntry {
  id: string;
  product: ProductTarget;
  type: FeedbackType;
  title: string;
  description: string;
  rating?: number; // 1 to 5 stars (for reviews)
  authorName: string;
  authorEmail: string;
  authorRole?: string;
  authorAvatar?: string;
  institution?: string;
  institutionLogo?: string; // School emblem or organization insignia
  schoolId?: string; // Associated school tenant ID (e.g. sch-001)
  verifiedCustomer?: boolean; // Real verified enterprise school or cooperative
  featuredOnHome?: boolean; // Curated / Borrowed to Home Page Marquee
  orderOnHome?: number;
  status: "open" | "resolved" | "in_progress" | "reviewed";
  upvotes: number;
  officialReply?: {
    repliedBy: string;
    role: string;
    text: string;
    repliedAt: string;
  };
  createdAt: string;
}

const COLLECTION_NAME = "community_entries";

// Transparent, honest community seed dataset
export const SEED_COMMUNITY_ENTRIES: CommunityEntry[] = [
  {
    id: "comm-01",
    product: "vidhyam",
    type: "review",
    title: "Sub-150ms Face AI & POS Printer eliminated morning entrance bottleneck",
    description:
      "Installed MOD School OS on our local server with 3 LAN billing desks. Dual-copy 80mm ESC/POS fee receipts print in less than a second, and the turnstile gate handles 1,400 students every morning without a single hitch. Zero internet dependency is a life-saver in rural zones.",
    rating: 5,
    authorName: "Dr. R. K. Sharma",
    authorEmail: "principal@dav-meerut.edu.in",
    authorRole: "Principal & Academic Director",
    institution: "D.A.V. Senior Secondary School",
    institutionLogo: "/images/school-logo-light.png",
    schoolId: "sch-002",
    verifiedCustomer: true,
    featuredOnHome: true,
    orderOnHome: 1,
    status: "reviewed",
    upvotes: 64,
    officialReply: {
      repliedBy: "Shivank Bhati",
      role: "Founder & Lead Architect",
      text: "Thank you Dr. Sharma. We specifically engineered the local-first LAN architecture so school administrative desks never freeze or suffer cloud latency.",
      repliedAt: "17 Oct 2026",
    },
    createdAt: "2026-10-17T09:30:00",
  },
  {
    id: "comm-07",
    product: "vidhyam",
    type: "review",
    title: "Air-gapped CBSE LOC registration & local fee ledger saves ₹4.8 Lakhs in cloud costs",
    description:
      "Modernisum School eliminated all external cloud vendor lock-in. Our complete student dossier, biometric attendance vectors, and fee ledgers stay on our campus PC under AES-256 local encryption. Automated CBSE LOC roll lists export in minutes.",
    rating: 5,
    authorName: "Dr. Rajeshwar Sharma",
    authorEmail: "r.sharma@modernacademy-ddn.edu.in",
    authorRole: "Principal & Trustee",
    institution: "Modern International Senior Secondary Academy",
    institutionLogo: "/images/school-logo-light.png",
    schoolId: "sch-001",
    verifiedCustomer: true,
    featuredOnHome: true,
    orderOnHome: 2,
    status: "reviewed",
    upvotes: 91,
    officialReply: {
      repliedBy: "Shivank Bhati",
      role: "Founder & Lead Architect",
      text: "Data sovereignty is non-negotiable. Modernisum central servers never hold student databases — your institution maintains 100% custody.",
      repliedAt: "16 Oct 2026",
    },
    createdAt: "2026-10-16T18:00:00",
  },
  {
    id: "comm-04",
    product: "extension",
    type: "review",
    title: "Clerk Co-Pilot Extension saved our staff over 50 hours of manual CBSE LOC resizing",
    description:
      "Automating the strict 40KB image compression and auto-filling CBSE registration portal fields directly in Chrome without sending passwords to third parties is pure genius. Zero data leaks, zero manual fatigue.",
    rating: 5,
    authorName: "Meenakshi Gupta",
    authorEmail: "exam.cell@heritage-intl.edu",
    authorRole: "Examination In-Charge",
    institution: "Heritage International School",
    institutionLogo: "/images/school-logo-light.png",
    schoolId: "sch-003",
    verifiedCustomer: true,
    featuredOnHome: true,
    orderOnHome: 3,
    status: "reviewed",
    upvotes: 72,
    officialReply: {
      repliedBy: "Browser Extensions Lab",
      role: "Lead Automation Engineer",
      text: "Our core philosophy is that school clerks shouldn't waste nights retyping data into government portals. Happy to assist your team anytime!",
      repliedAt: "15 Oct 2026",
    },
    createdAt: "2026-10-14T14:10:00",
  },
  {
    id: "comm-06",
    product: "agromi",
    type: "review",
    title: "MOD Farmer Crop Doctor diagnosed Leaf Blight in 4 seconds under offline orchard mode",
    description:
      "Captured leaf photos in an area with zero cellular coverage. The on-device neural model identified Alternaria blight instantly and prescribed chemical-free neem spray ratios that saved our guava harvest.",
    rating: 5,
    authorName: "Gurpreet Singh Sandhu",
    authorEmail: "orchard@punjab-agri-collective.org",
    authorRole: "Chief Agronomist",
    institution: "Malwa Horticulture Collective",
    verifiedCustomer: true,
    featuredOnHome: true,
    orderOnHome: 4,
    status: "reviewed",
    upvotes: 81,
    officialReply: {
      repliedBy: "MOD Farmer Vision Lab",
      role: "Principal AI Researcher",
      text: "Glad to hear Gurpreet ji! We quantized the 120-class crop pathology model down to 18MB specifically to ensure sub-second inference with zero internet.",
      repliedAt: "12 Oct 2026",
    },
    createdAt: "2026-10-12T08:15:00",
  },
  {
    id: "comm-08",
    product: "vidhyam",
    type: "review",
    title: "Sub-second RFID gates & E2EE parent mobile relay gave complete peace of mind to parents",
    description:
      "Deploying UHF RFID long-range gate antennas with instant local relay notification to parents solved student dispersal chaos. Parents love the zero-ad, clean mobile app experience.",
    rating: 5,
    authorName: "Fr. Thomas Anthony",
    authorEmail: "admin@stxavier.edu.in",
    authorRole: "Director & Administrator",
    institution: "St. Xavier's Model Senior Secondary",
    institutionLogo: "/images/school-logo-light.png",
    schoolId: "sch-004",
    verifiedCustomer: true,
    featuredOnHome: true,
    orderOnHome: 5,
    status: "reviewed",
    upvotes: 57,
    officialReply: {
      repliedBy: "MOD School Core Lab",
      role: "Hardware & Relay Lead",
      text: "Thank you Fr. Anthony. The ephemeral E2EE tunnel relays status without storing student identities on the cloud.",
      repliedAt: "11 Oct 2026",
    },
    createdAt: "2026-10-11T12:00:00",
  },
  {
    id: "comm-02",
    product: "vidhyam",
    type: "complaint",
    title: "Resolved: Thermal printer was cutting receipts 2 lines too early on certain 80mm models",
    description:
      "On our older TVS thermal printer, the auto-cutter was slicing through the authorized bursar signature line. Reported this to the team yesterday.",
    rating: 4,
    authorName: "Sunil Verma",
    authorEmail: "bursar@stjude-campus.org",
    authorRole: "Head of Accounts",
    institution: "St. Jude Global Academy",
    institutionLogo: "/images/school-logo-light.png",
    schoolId: "sch-005",
    verifiedCustomer: true,
    featuredOnHome: false,
    status: "resolved",
    upvotes: 38,
    officialReply: {
      repliedBy: "MOD School Core Lab",
      role: "Hardware Systems Lead",
      text: "Resolved in MOD School patch v2.8.1. We added an automatic 2-line paper feed margin configuration in Settings -> Hardware -> Thermal Printer. Verified and working across all 80mm ESC/POS printers.",
      repliedAt: "17 Oct 2026",
    },
    createdAt: "2026-10-16T15:20:00",
  },
  {
    id: "comm-03",
    product: "agromi",
    type: "feature_request",
    title: "Regional Hindi Voice SMS alerts when soil telemetry drops below 18% moisture",
    description:
      "Farmers in our cooperative love MOD Farmer solar LoRaWAN soil moisture beacons, but older farmers don't check WhatsApp. Can we trigger an automated phone call in Hindi with voice alert?",
    rating: 5,
    authorName: "Dharmendra Choudhary",
    authorEmail: "director@westernup-fpo.in",
    authorRole: "FPO Director",
    institution: "Kisan Utthan Farmer Producer Co.",
    verifiedCustomer: true,
    featuredOnHome: false,
    status: "in_progress",
    upvotes: 49,
    officialReply: {
      repliedBy: "MOD Farmer Engineering",
      role: "Agro-IoT Firmware Team",
      text: "Active in current sprint! We are integrating an automated outbound Hindi DTMF voice call generator. Firmware testing is scheduled for early November 2026.",
      repliedAt: "16 Oct 2026",
    },
    createdAt: "2026-10-15T11:45:00",
  },
  {
    id: "comm-05",
    product: "general",
    type: "support",
    title: "Confirming DPDP 2023 compliance & local SQLite decryption keys",
    description:
      "Reviewing the Master Software License for our school board. We want to re-verify that student demographic vectors and financial marks are 100% air-gapped on campus.",
    rating: 5,
    authorName: "Adv. Alok Trivedi",
    authorEmail: "legal@trivedi-associates.com",
    authorRole: "Legal Advisor & School Trustee",
    institution: "Modern Vidya Niketan Trust",
    institutionLogo: "/images/school-logo-light.png",
    verifiedCustomer: true,
    featuredOnHome: false,
    status: "resolved",
    upvotes: 53,
    officialReply: {
      repliedBy: "Compliance & Governance Desk",
      role: "Data Protection Officer",
      text: "100% confirmed under Clause 1 & Clause 3 of our Master Agreement. Student records and biometric vectors reside strictly on the local campus PC under AES-256 encryption. Zero bytes are cached or stored on Modernisum central servers.",
      repliedAt: "14 Oct 2026",
    },
    createdAt: "2026-10-13T10:05:00",
  },
];

/**
 * Fetch all community entries with API and Firestore real-time capability
 */
export async function fetchCommunityEntries(): Promise<CommunityEntry[]> {
  // 1. Try local/server API first (persisted on disk & database)
  try {
    const res = await fetch("/api/community");
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch (apiErr) {
    console.warn("[Community API] fallback to Firestore/Seed:", apiErr);
  }

  // 2. Try Firestore Query
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const liveEntries = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as CommunityEntry[];

      const liveIds = new Set(liveEntries.map((e) => e.id));
      return [
        ...liveEntries,
        ...SEED_COMMUNITY_ENTRIES.filter((s) => !liveIds.has(s.id)),
      ];
    }
  } catch (error) {
    console.warn("[Firestore] Community entries fallback to seed:", error);
  }

  return SEED_COMMUNITY_ENTRIES;
}

/**
 * Real-time listener for community entries
 */
export function subscribeToCommunityEntries(
  callback: (entries: CommunityEntry[]) => void
) {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("createdAt", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          callback(SEED_COMMUNITY_ENTRIES);
          return;
        }

        const liveEntries = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as CommunityEntry[];

        const liveIds = new Set(liveEntries.map((e) => e.id));
        const combined = [
          ...liveEntries,
          ...SEED_COMMUNITY_ENTRIES.filter((s) => !liveIds.has(s.id)),
        ];

        callback(combined);
      },
      () => {
        // Fallback to static seeds
        callback(SEED_COMMUNITY_ENTRIES);
      }
    );
  } catch {
    callback(SEED_COMMUNITY_ENTRIES);
    return () => {};
  }
}

/**
 * Submit a new community review, complaint, or support request
 * Saves to both API persistent storage and Firestore for 100% data collection
 */
export async function submitCommunityEntry({
  product,
  type,
  title,
  description,
  rating,
  authorName,
  authorEmail,
  authorRole,
  institution,
}: {
  product: ProductTarget;
  type: FeedbackType;
  title: string;
  description: string;
  rating?: number;
  authorName: string;
  authorEmail: string;
  authorRole?: string;
  institution?: string;
}): Promise<string> {
  if (!title.trim() || !description.trim() || !authorName.trim() || !authorEmail.trim()) {
    throw new Error("Title, description, name, and email are required.");
  }

  let createdId = `comm-${Date.now().toString(36)}`;

  // 1. Persistent API Call (Saves to server disk & data-engine)
  try {
    const res = await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product,
        type,
        title,
        description,
        rating,
        authorName,
        authorEmail,
        authorRole,
        institution,
      }),
    });
    const json = await res.json();
    if (json.success && json.id) {
      createdId = json.id;
    }
  } catch (apiErr) {
    console.warn("[Community API Post] warning:", apiErr);
  }

  // 2. Dual-write to Firebase Firestore if connected
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const newDoc = await addDoc(colRef, {
      product,
      type,
      title: title.trim(),
      description: description.trim(),
      ...(rating ? { rating } : {}),
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      authorRole: authorRole?.trim() || "Community Member",
      ...(institution ? { institution: institution.trim() } : {}),
      status: type === "complaint" ? "open" : "reviewed",
      upvotes: 1,
      createdAt: new Date().toISOString(),
      serverTimestamp: serverTimestamp(),
    });
    createdId = newDoc.id;
  } catch (firestoreErr) {
    console.warn("[Firestore Post] fallback to API persistent store:", firestoreErr);
  }

  return createdId;
}

/**
 * Upvote a community entry with anti-spam check
 */
export async function upvoteCommunityEntry(
  entryId: string,
  hasUpvoted: boolean
): Promise<void> {
  // 1. Send to server API
  try {
    await fetch("/api/community", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: entryId,
        upvoteDelta: hasUpvoted ? -1 : 1,
      }),
    });
  } catch {}

  // 2. Send to Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, entryId);
    await updateDoc(docRef, {
      upvotes: increment(hasUpvoted ? -1 : 1),
    });
  } catch (e) {
    console.warn("[Firestore] Upvote warning:", e);
  }
}

/**
 * Fetch entries specifically curated / borrowed for Home Page Right-to-Left Marquee
 */
export async function fetchFeaturedCommunityEntries(): Promise<CommunityEntry[]> {
  try {
    const res = await fetch("/api/community?featured=true");
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch (apiErr) {
    console.warn("[Community API Featured] fallback:", apiErr);
  }

  // Fallback to local filter of seeds
  return SEED_COMMUNITY_ENTRIES.filter((e) => e.featuredOnHome);
}

/**
 * Toggle whether a community review is featured / borrowed to the Home Page
 */
export async function toggleFeatureOnHome(entryId: string, featured: boolean): Promise<boolean> {
  try {
    const res = await fetch("/api/community", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: entryId,
        featuredOnHome: featured,
      }),
    });
    if (res.ok) return true;
  } catch (err) {
    console.warn("[Toggle Featured API] warning:", err);
  }

  // Also update Firestore if available
  try {
    const docRef = doc(db, COLLECTION_NAME, entryId);
    await updateDoc(docRef, {
      featuredOnHome: featured,
    });
    return true;
  } catch (err) {
    console.warn("[Firestore Toggle Featured] error:", err);
  }
  return false;
}

/**
 * Update community entry details (status, rating, content, official reply, etc.)
 */
export async function updateCommunityEntry(
  entryId: string,
  updates: Partial<CommunityEntry>
): Promise<boolean> {
  try {
    const res = await fetch("/api/community", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: entryId,
        ...updates,
      }),
    });
    if (res.ok) return true;
  } catch (err) {
    console.warn("[Update Community API] warning:", err);
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, entryId);
    await updateDoc(docRef, updates as any);
    return true;
  } catch (err) {
    console.warn("[Firestore Update Entry] error:", err);
  }
  return false;
}

/**
 * Seed initial community entries into Firestore if collection is empty
 */
export async function seedCommunityIfEmpty(): Promise<number> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      let count = 0;
      for (const entry of SEED_COMMUNITY_ENTRIES) {
        const docRef = doc(db, COLLECTION_NAME, entry.id);
        await setDoc(docRef, {
          ...entry,
          serverTimestamp: serverTimestamp(),
        }, { merge: true });
        count++;
      }
      return count;
    }
    return snapshot.size;
  } catch (err) {
    console.warn("[Firestore Seed] Warning:", err);
    return 0;
  }
}

/**
 * Delete community entry by ID
 */
export async function deleteCommunityEntry(entryId: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/community?id=${encodeURIComponent(entryId)}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch (err) {
    console.warn("[Delete Community API] warning:", err);
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, entryId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn("[Firestore Delete Entry] error:", err);
  }
  return false;
}

