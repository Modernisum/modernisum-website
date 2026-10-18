import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ProjectMilestoneTask {
  id: string;
  title: string;
  weightPct: number;
  completed: boolean;
  completedAt?: string;
}

export interface PaymentMilestone {
  name: string;
  pct: number;
  amount: number;
  status: "pending" | "paid";
  paidAt?: string;
}

export interface WipScreenshot {
  url: string;
  caption: string;
  uploadedAt: string;
}

export interface FirestoreEnquiry {
  id?: string;
  orderId?: string;
  name: string;
  email: string;
  phone?: string;
  serviceNeeded?: string;
  budgetRange?: string;
  projectDescription: string;
  projectState?: "new" | "existing_legacy";
  referenceUrl?: string;
  surfaces?: string[];
  features?: string[];
  status?: "new" | "reviewed" | "contacted" | "approved" | "in_progress" | "resolved" | "refunded";
  quotationDetails?: any;
  approvedStartDate?: string;
  slaDeliveryDate?: string;
  assignedPod?: string;
  tasks?: ProjectMilestoneTask[];
  milestones?: PaymentMilestone[];
  screenshots?: WipScreenshot[];
  meetingUrl?: string;
  couponCode?: string;
  discountAmount?: number;
  partnerCommission?: number;
  progressPct?: number;
  tokenPaid?: boolean;
  tokenAmount?: number;
  advancePaid?: boolean;
  totalFixedPrice?: number;
  estimatedDays?: number;
  createdAt?: any;
}

const COLLECTION_NAME = "enquiries";

/**
 * Submit an institutional enquiry, quotation or order request directly to Firestore
 */
export async function submitEnquiry(enquiry: Omit<FirestoreEnquiry, "id" | "createdAt">): Promise<{ id: string; orderId: string }> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const orderId = enquiry.orderId || `MOD-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const docRef = await addDoc(colRef, {
      ...enquiry,
      orderId,
      status: enquiry.status || "new",
      progressPct: enquiry.progressPct || 0,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, orderId };
  } catch (error: any) {
    console.warn("[Firestore] Enquiry write fallback:", error?.message || error);
    const fallbackId = `fallback-${Date.now()}`;
    return { id: fallbackId, orderId: enquiry.orderId || `MOD-ORD-${Date.now().toString().slice(-6)}` };
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

/**
 * Fetch a specific order by its public Order ID or by email
 */
export async function fetchEnquiryByOrderId(orderIdOrEmail: string): Promise<FirestoreEnquiry | null> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const cleanQuery = orderIdOrEmail.trim();

    // 1. Try finding by orderId
    const qOrder = query(colRef, where("orderId", "==", cleanQuery));
    const snapOrder = await getDocs(qOrder);
    if (!snapOrder.empty) {
      const docSnap = snapOrder.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as FirestoreEnquiry;
    }

    // 2. Try finding by email (latest order)
    const qEmail = query(colRef, where("email", "==", cleanQuery.toLowerCase()));
    const snapEmail = await getDocs(qEmail);
    if (!snapEmail.empty) {
      const docSnap = snapEmail.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as FirestoreEnquiry;
    }

    // 3. Try finding by doc ID
    const docRef = doc(db, COLLECTION_NAME, cleanQuery);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as FirestoreEnquiry;
    }

    return null;
  } catch (error: any) {
    console.warn("[Firestore] fetchEnquiryByOrderId error:", error?.message || error);
    return null;
  }
}

/**
 * Update an existing order (tasks, screenshots, status, meetings, milestones)
 */
export async function updateEnquiryOrder(idOrOrderId: string, updates: Partial<FirestoreEnquiry>): Promise<boolean> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    let targetDocId = idOrOrderId;

    const directDocRef = doc(db, COLLECTION_NAME, idOrOrderId);
    const directSnap = await getDoc(directDocRef);
    if (!directSnap.exists()) {
      const q = query(colRef, where("orderId", "==", idOrOrderId));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        targetDocId = qSnap.docs[0].id;
      }
    }

    const docRef = doc(db, COLLECTION_NAME, targetDocId);
    await updateDoc(docRef, updates as any);
    return true;
  } catch (error: any) {
    console.warn("[Firestore] updateEnquiryOrder error:", error?.message || error);
    return false;
  }
}

