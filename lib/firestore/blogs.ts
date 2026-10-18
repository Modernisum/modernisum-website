import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FirestoreBlog {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  coverImage: string;
  readTime: string;
  published: boolean;
  publishedAt?: any;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  targetPlatform?: "global" | "school" | "farmer" | "research" | string;
  createdAt?: any;
  updatedAt?: any;
}

const COLLECTION_NAME = "blogs";

/**
 * Fetch all published blogs for the public /blog listing page
 * Non-blocking, directly queries Firestore CDN with 0 server overhead
 */
export async function fetchPublishedBlogs(): Promise<FirestoreBlog[]> {
  try {
    const blogsRef = collection(db, COLLECTION_NAME);
    const q = query(
      blogsRef,
      where("published", "==", true),
      orderBy("publishedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as FirestoreBlog[];
  } catch (error: any) {
    if (error?.code === "permission-denied") {
      // Quiet fallback when Firestore security rules are restricted or pending deployment
      return [];
    }
    console.warn("[Firestore] Blog fetch fallback:", error?.message || error);
    return [];
  }
}

/**
 * Fetch single blog post by unique slug
 */
export async function fetchBlogBySlug(slug: string): Promise<FirestoreBlog | null> {
  try {
    const blogsRef = collection(db, COLLECTION_NAME);
    const q = query(blogsRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const docSnap = snapshot.docs[0];
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as FirestoreBlog;
  } catch (error: any) {
    if (error?.code === "permission-denied") {
      return null;
    }
    console.warn(`[Firestore] Blog fetch fallback for "${slug}":`, error?.message || error);
    return null;
  }
}

/**
 * Fetch recent blogs (e.g. for homepage or sidebar)
 */
export async function fetchRecentBlogs(count = 3): Promise<FirestoreBlog[]> {
  try {
    const blogsRef = collection(db, COLLECTION_NAME);
    const q = query(
      blogsRef,
      where("published", "==", true),
      orderBy("publishedAt", "desc"),
      limit(count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as FirestoreBlog[];
  } catch (error) {
    console.error("[Firestore] Error fetching recent blogs:", error);
    return [];
  }
}

/**
 * Save or update blog post (Used by Local Admin Platform)
 */
export async function upsertBlog(blog: FirestoreBlog): Promise<string> {
  const docId = blog.slug || doc(collection(db, COLLECTION_NAME)).id;
  const docRef = doc(db, COLLECTION_NAME, docId);

  await setDoc(
    docRef,
    {
      ...blog,
      updatedAt: serverTimestamp(),
      publishedAt: blog.publishedAt || serverTimestamp(),
    },
    { merge: true }
  );

  return docId;
}

/**
 * Delete a blog post (Used by Local Admin Platform)
 */
export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
