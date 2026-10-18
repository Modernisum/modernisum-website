import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FirestoreEnquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  serviceNeeded?: string;
  budgetRange?: string;
  projectDescription: string;
  status?: "new" | "reviewed" | "contacted" | "approved" | "in_progress" | "resolved" | "refunded";
  quotationDetails?: any;
  approvedStartDate?: string;
  assignedPod?: string;
  createdAt?: any;
}

const COLLECTION_NAME = "enquiries";

/**
 * Submit an institutional enquiry or demo request directly to Firestore
 */
export async function submitEnquiry(enquiry: Omit<FirestoreEnquiry, "id" | "createdAt">): Promise<string> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, {
      ...enquiry,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    console.warn("[Firestore] Enquiry write fallback:", error?.message || error);
    return `fallback-${Date.now()}`;
  }
}

/**
 * Fetch all enquiries for admin portal
 */
export async function fetchAllEnquiries(): Promise<FirestoreEnquiry[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as FirestoreEnquiry[];
  } catch (error: any) {
    console.warn("[Firestore] Fetch enquiries fallback:", error?.message || error);
    return [];
  }
}
