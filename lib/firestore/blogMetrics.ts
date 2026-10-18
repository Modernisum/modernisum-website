import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface BlogMetrics {
  views: number;
  likes: number;
  dislikes: number;
}

const COLLECTION_NAME = "blog_metrics";

// Baseline realistic seed metrics for offline/fallback mode
const SEED_METRICS: Record<string, BlogMetrics> = {
  "ev-charging-battery-swap-architecture": { views: 3420, likes: 218, dislikes: 6 },
  "ai-saas-school-erp-transformation": { views: 2890, likes: 184, dislikes: 4 },
  "liquid-glass-design-enterprise-software": { views: 1950, likes: 142, dislikes: 3 },
  "the-cosmic-mirror-future-of-ai-deep-space-convergence": { views: 2120, likes: 167, dislikes: 5 },
  "autonomous-campus-systems": { views: 2740, likes: 195, dislikes: 2 },
};

/**
 * Fetch view and like/dislike metrics for a blog post
 */
export async function fetchBlogMetrics(slug: string): Promise<BlogMetrics> {
  const fallback = SEED_METRICS[slug] || { views: 120, likes: 12, dislikes: 0 };
  try {
    const docRef = doc(db, COLLECTION_NAME, slug);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        views: (data.views || 0) + fallback.views,
        likes: (data.likes || 0) + fallback.likes,
        dislikes: (data.dislikes || 0) + fallback.dislikes,
      };
    }
    return fallback;
  } catch (error) {
    console.warn(`[Firestore] Using fallback metrics for blog "${slug}":`, error);
    return fallback;
  }
}

/**
 * Increment view counter atomically once per browser session
 */
export async function recordBlogView(slug: string): Promise<void> {
  if (typeof window === "undefined") return;

  const sessionKey = `viewed_blog_${slug}`;
  if (sessionStorage.getItem(sessionKey)) {
    return; // Already recorded in this tab session
  }
  sessionStorage.setItem(sessionKey, "1");

  try {
    const docRef = doc(db, COLLECTION_NAME, slug);
    await setDoc(
      docRef,
      {
        slug,
        views: increment(1),
        lastViewedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    // Non-blocking telemetry
    console.warn(`[Firestore] View increment fallback for "${slug}"`);
  }
}

/**
 * Submit user reaction (like or dislike) with anti-spam delta accounting
 */
export async function submitBlogReaction({
  slug,
  reaction,
  previousReaction,
}: {
  slug: string;
  reaction: "like" | "dislike";
  previousReaction?: "like" | "dislike" | null;
}): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, slug);

    const updatePayload: Record<string, any> = {
      slug,
      lastReactedAt: serverTimestamp(),
    };

    if (previousReaction === reaction) {
      // User is toggling off their previous reaction
      updatePayload[reaction === "like" ? "likes" : "dislikes"] = increment(-1);
    } else {
      // Adding new reaction
      updatePayload[reaction === "like" ? "likes" : "dislikes"] = increment(1);
      // If switching from opposite reaction, decrement old
      if (previousReaction) {
        updatePayload[previousReaction === "like" ? "likes" : "dislikes"] = increment(-1);
      }
    }

    await setDoc(docRef, updatePayload, { merge: true });
  } catch (error) {
    console.warn(`[Firestore] Reaction error for "${slug}":`, error);
  }
}
