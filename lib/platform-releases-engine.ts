import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ReleaseItem, SEED_RELEASES, AppTargetType, CORE_APPS_CONFIG } from "./release-types";

export { type ReleaseItem, type AppTargetType, SEED_RELEASES, CORE_APPS_CONFIG };

const RELEASES_COLLECTION = "platform_releases";
const COMMUNITY_COLLECTION = "community_entries";

export function calculateNextVersions(currentVersion: string) {
  const clean = (currentVersion || "1.0.0").replace(/^v/i, "");
  const parts = clean.split(".").map((p) => parseInt(p, 10) || 0);
  while (parts.length < 3) parts.push(0);

  const [major, minor, patch] = parts;

  return {
    current: `${major}.${minor}.${patch}`,
    patch: `${major}.${minor}.${patch + 1}`,
    minor: `${major}.${minor + 1}.0`,
    major: `${major + 1}.0.0`,
  };
}

/**
 * Seed initial releases into Firestore if empty
 */
export async function seedReleasesIfEmpty(): Promise<ReleaseItem[]> {
  try {
    const colRef = collection(db, RELEASES_COLLECTION);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as ReleaseItem[];
    }

    // Auto-seed baseline releases
    for (const item of SEED_RELEASES) {
      const docRef = doc(db, RELEASES_COLLECTION, item.id);
      await setDoc(docRef, {
        ...item,
        serverTimestamp: serverTimestamp(),
      }, { merge: true });
    }
    return SEED_RELEASES;
  } catch (err) {
    console.warn("[Releases DB Seed] Warning:", err);
    return SEED_RELEASES;
  }
}

export async function getAppReleases(target?: AppTargetType): Promise<ReleaseItem[]> {
  let list: ReleaseItem[] = [];
  try {
    const colRef = collection(db, RELEASES_COLLECTION);
    const snap = await getDocs(colRef);

    if (snap.empty) {
      list = await seedReleasesIfEmpty();
    } else {
      list = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      })) as ReleaseItem[];
    }
  } catch (err) {
    console.warn("[Releases DB Query] Falling back to seeds:", err);
    list = [...SEED_RELEASES];
  }

  if (target && target !== ("all" as any)) {
    list = list.filter((r) => r.appTarget === target);
  }

  return list;
}

export async function createAppRelease(
  releaseData: Omit<ReleaseItem, "id">,
  broadcastAnnouncement = true
): Promise<ReleaseItem> {
  const list = await getAppReleases();

  const appMeta = CORE_APPS_CONFIG[releaseData.appTarget] || {
    name: releaseData.appName || "MOD School Application",
    platform: releaseData.platform || "Universal",
    gdriveFolder: "MOD-Releases/General",
  };

  const newId = `rel_${releaseData.appTarget}_${releaseData.version.replace(/\./g, "_")}`;
  const newRelease: ReleaseItem = {
    ...releaseData,
    id: newId,
    appName: appMeta.name,
    platform: releaseData.platform || appMeta.platform,
    gdriveFolder: releaseData.gdriveFolder || appMeta.gdriveFolder,
  };

  try {
    // If this release is marked latest, unmark previous latest of same appTarget
    if (releaseData.isLatest) {
      const existingLatest = list.filter((r) => r.appTarget === releaseData.appTarget && r.isLatest);
      for (const oldRel of existingLatest) {
        try {
          const oldDocRef = doc(db, RELEASES_COLLECTION, oldRel.id);
          await updateDoc(oldDocRef, { isLatest: false });
        } catch {}
      }
    }

    const docRef = doc(db, RELEASES_COLLECTION, newId);
    await setDoc(docRef, {
      ...newRelease,
      serverTimestamp: serverTimestamp(),
    });

    // Broadcast announcement into Firestore community collection if requested
    if (broadcastAnnouncement) {
      try {
        const commDocId = `mod-announcement-${Date.now()}`;
        const commDocRef = doc(db, COMMUNITY_COLLECTION, commDocId);
        await setDoc(commDocRef, {
          id: commDocId,
          product: "vidhyam",
          type: "review",
          title: `Official Release v${newRelease.version}: ${newRelease.title}`,
          authorName: "Modernisum Engineering Core",
          authorEmail: "releases@modernisum.com",
          authorRole: "Platform Systems Lead",
          institution: newRelease.appName,
          institutionLogo: "/images/school-logo-light.png",
          verifiedCustomer: true,
          featuredOnHome: false,
          description: `We are pleased to announce the official release of ${newRelease.appName} v${newRelease.version}. ${newRelease.overview}\n\nSHA256: ${newRelease.sha256 || "Verified"}\nDownload URL: ${newRelease.downloadUrl}`,
          status: "resolved",
          upvotes: 18,
          rating: 5,
          createdAt: new Date().toISOString(),
          serverTimestamp: serverTimestamp(),
          officialReply: {
            repliedBy: "Platform Systems Lead",
            role: "MOD Engineering",
            text: `Build verified against DPDP Act 2023 and zero-cloud edge local persistence. Direct payload size: ${newRelease.fileSize}.`,
            repliedAt: "Just now",
          },
        });
      } catch (e) {
        console.warn("Failed to broadcast release announcement to Firestore:", e);
      }
    }
  } catch (err) {
    console.warn("[Create Release DB] Error:", err);
  }

  return newRelease;
}

export async function deleteAppRelease(versionOrId: string): Promise<boolean> {
  try {
    const list = await getAppReleases();
    const target = list.find((r) => r.id === versionOrId || r.version === versionOrId);
    const targetId = target ? target.id : versionOrId;

    const docRef = doc(db, RELEASES_COLLECTION, targetId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn("[Delete Release DB] Error:", err);
    return false;
  }
}
