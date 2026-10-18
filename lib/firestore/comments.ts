import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FirestoreComment {
  id?: string;
  blogSlug: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  rating?: number;
  commentText: string;
  createdAt?: any;
  isApproved: boolean;
}

const COLLECTION_NAME = "blog_comments";

/**
 * Fetch approved comments for a specific blog post
 */
export async function fetchCommentsForBlog(blogSlug: string): Promise<FirestoreComment[]> {
  try {
    const commentsRef = collection(db, COLLECTION_NAME);
    const q = query(
      commentsRef,
      where("blogSlug", "==", blogSlug),
      where("isApproved", "==", true),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as FirestoreComment[];
  } catch (error) {
    console.error("[Firestore] Error fetching comments:", error);
    return [];
  }
}

/**
 * Subscribe to real-time comments for a blog post (live updates without page refresh)
 */
export function subscribeToComments(
  blogSlug: string,
  callback: (comments: FirestoreComment[]) => void
) {
  const commentsRef = collection(db, COLLECTION_NAME);
  const q = query(
    commentsRef,
    where("blogSlug", "==", blogSlug),
    where("isApproved", "==", true),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const comments = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as FirestoreComment[];
      callback(comments);
    },
    (error) => {
      console.error("[Firestore] Realtime comments error:", error);
    }
  );
}

/**
 * Submit a new comment directly from client browser
 * Free Spark plan, zero backend server required!
 */
export async function submitBlogComment({
  blogSlug,
  authorName,
  authorEmail,
  authorAvatar,
  rating,
  commentText,
}: {
  blogSlug: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  rating?: number;
  commentText: string;
}): Promise<string> {
  if (!authorName.trim() || !commentText.trim()) {
    throw new Error("Name and comment text are required.");
  }

  const commentsRef = collection(db, COLLECTION_NAME);
  const newDoc = await addDoc(commentsRef, {
    blogSlug,
    authorName: authorName.trim(),
    authorEmail: authorEmail.trim(),
    ...(authorAvatar ? { authorAvatar } : {}),
    ...(rating ? { rating } : {}),
    commentText: commentText.trim(),
    isApproved: true, // Auto-approve or queue for moderation
    createdAt: serverTimestamp(),
  });

  return newDoc.id;
}

/**
 * Delete a comment (Local Admin moderation)
 */
export async function deleteComment(commentId: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION_NAME, commentId));
}
