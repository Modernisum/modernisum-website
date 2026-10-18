import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { SEED_SITE_SETTINGS } from "@/lib/seed-data";

export interface TelemetryStats {
  projectsCompleted: number;
  satisfiedClients: number;
  itSpecialists: number;
  smartSolutions: number;
  systemUptime: string;
}

const SETTINGS_COLLECTION = "site_settings";
const TELEMETRY_DOC_ID = "telemetry";

/**
 * Fetch telemetry/fun-facts metrics from Firestore with auto-seeding
 */
export async function fetchTelemetryStats(): Promise<TelemetryStats> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, TELEMETRY_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        projectsCompleted: Number(data.projectsCompleted) || SEED_SITE_SETTINGS.funFacts.projectsCompleted,
        satisfiedClients: Number(data.satisfiedClients) || SEED_SITE_SETTINGS.funFacts.satisfiedClients,
        itSpecialists: Number(data.itSpecialists) || SEED_SITE_SETTINGS.funFacts.itSpecialists,
        smartSolutions: Number(data.smartSolutions) || SEED_SITE_SETTINGS.funFacts.smartSolutions,
        systemUptime: data.systemUptime || SEED_SITE_SETTINGS.funFacts.systemUptime,
      };
    }

    // Auto-seed baseline telemetry into Firestore if not present
    await setDoc(docRef, {
      ...SEED_SITE_SETTINGS.funFacts,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    return SEED_SITE_SETTINGS.funFacts;
  } catch (err) {
    console.warn("[Telemetry DB Query] Fallback to seeds:", err);
    return SEED_SITE_SETTINGS.funFacts;
  }
}

/**
 * Update telemetry metrics directly in Firestore database
 */
export async function updateTelemetryStats(updates: Partial<TelemetryStats>): Promise<boolean> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, TELEMETRY_DOC_ID);
    await setDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("[Telemetry DB Update] Error:", err);
    return false;
  }
}
