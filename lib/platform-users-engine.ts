import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export type UserRole = "super_admin" | "school_admin" | "teacher" | "farmer" | "lead";

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  organization?: string;
  institutionLogo?: string;
  productsActive: string[];
  totalSpend: number;
  accountStatus: "active" | "invited" | "dormant";
  joinedDate: string;
  lastActive: string;
  source: string;
  featuredOnHome?: boolean;
  orderOnHome?: number;
}

export const SEED_PLATFORM_USERS: PlatformUser[] = [
  {
    id: "USR-0001",
    name: "Modernisum Platform Admin",
    email: "admin@modernisum.com",
    phone: "+91 98765 43210",
    role: "super_admin",
    organization: "Modernisum Technologies",
    productsActive: ["MOD School Suite", "MOD Farmer Agro-Tech", "Central Console"],
    totalSpend: 0,
    accountStatus: "active",
    joinedDate: "January 15, 2026",
    lastActive: "Just now",
    source: "System Superuser",
    featuredOnHome: false,
  },
  {
    id: "USR-0102",
    name: "Dr. Rajeshwar Sharma",
    email: "principal@delhipublic.ac.in",
    phone: "+91 98112 34567",
    role: "school_admin",
    organization: "Delhi Public Academy, Meerut",
    institutionLogo: "/images/school-logo-light.png",
    productsActive: ["MOD School Desktop OS", "Employee App", "Parent Portal"],
    totalSpend: 522000,
    accountStatus: "active",
    joinedDate: "April 02, 2026",
    lastActive: "12 mins ago",
    source: "B2B Enterprise License",
    featuredOnHome: true,
    orderOnHome: 1,
  },
  {
    id: "USR-0103",
    name: "Fr. Thomas Anthony",
    email: "admin@stxavier.edu.in",
    phone: "+91 94150 98765",
    role: "school_admin",
    organization: "St. Xavier's Model Senior Secondary, Agra",
    institutionLogo: "/images/school-logo-light.png",
    productsActive: ["MOD School Desktop OS", "Parent Portal"],
    totalSpend: 306000,
    accountStatus: "active",
    joinedDate: "April 18, 2026",
    lastActive: "1 hour ago",
    source: "B2B Enterprise License",
    featuredOnHome: true,
    orderOnHome: 2,
  },
  {
    id: "USR-0104",
    name: "Sunita Sharma",
    email: "sunita.sharma@delhipublic.ac.in",
    phone: "+91 98712 11223",
    role: "teacher",
    organization: "Delhi Public Academy, Meerut",
    productsActive: ["Employee App (Faculty Seat)"],
    totalSpend: 0,
    accountStatus: "active",
    joinedDate: "May 02, 2026",
    lastActive: "25 mins ago",
    source: "School Admin Invite",
    featuredOnHome: false,
  },
  {
    id: "USR-0105",
    name: "Col. Sanjeev Varma (Retd)",
    email: "director@greenwoodhigh.ac.in",
    phone: "+91 99190 44556",
    role: "school_admin",
    organization: "Greenwood High International School, Lucknow",
    institutionLogo: "/images/school-logo-light.png",
    productsActive: ["MOD School Desktop OS", "Employee App", "Student App", "Clerk Co-Pilot"],
    totalSpend: 756000,
    accountStatus: "active",
    joinedDate: "March 10, 2026",
    lastActive: "3 hours ago",
    source: "B2B Enterprise License",
    featuredOnHome: true,
    orderOnHome: 3,
  },
  {
    id: "USR-0106",
    name: "Vikram Rathore",
    email: "vikram.rathore@greenwoodhigh.ac.in",
    phone: "+91 98100 77889",
    role: "teacher",
    organization: "Greenwood High International School, Lucknow",
    productsActive: ["Employee App (Faculty Seat)"],
    totalSpend: 0,
    accountStatus: "active",
    joinedDate: "March 15, 2026",
    lastActive: "Yesterday",
    source: "School Admin Invite",
    featuredOnHome: false,
  },
  {
    id: "USR-0107",
    name: "Ramesh Patel",
    email: "ramesh.patel@kisanagro.in",
    phone: "+91 94250 12345",
    role: "farmer",
    organization: "Patel Organic Agri Farm, Gujarat",
    productsActive: ["MOD Farmer AI Crop Doctor", "Soil Telemetry"],
    totalSpend: 18000,
    accountStatus: "active",
    joinedDate: "June 20, 2026",
    lastActive: "2 hours ago",
    source: "Agro Direct Registration",
    featuredOnHome: true,
    orderOnHome: 4,
  },
  {
    id: "USR-0108",
    name: "Harpreet Singh",
    email: "harpreet.singh@punjabfields.in",
    phone: "+91 98761 99887",
    role: "farmer",
    organization: "Doaba Green Farms, Ludhiana",
    productsActive: ["MOD Farmer AI Crop Doctor"],
    totalSpend: 12000,
    accountStatus: "active",
    joinedDate: "July 05, 2026",
    lastActive: "4 days ago",
    source: "Agro Direct Registration",
    featuredOnHome: false,
  },
  {
    id: "USR-0109",
    name: "Rahul Mehta (Trustee)",
    email: "rahul.mehta@gmail.com",
    phone: "+91 98200 45678",
    role: "lead",
    organization: "Upcoming Gurukul Campus, Pune",
    productsActive: [],
    totalSpend: 0,
    accountStatus: "dormant",
    joinedDate: "August 12, 2026",
    lastActive: "1 week ago",
    source: "Quote Calculator Lead",
    featuredOnHome: false,
  },
  {
    id: "USR-0110",
    name: "Ananya Verma",
    email: "ananya.verma@outlook.com",
    phone: "+91 97110 33445",
    role: "lead",
    organization: "Independent Educator / Consultant",
    productsActive: [],
    totalSpend: 0,
    accountStatus: "invited",
    joinedDate: "August 28, 2026",
    lastActive: "3 days ago",
    source: "Website Sign Up Modal",
    featuredOnHome: false,
  },
  {
    id: "USR-0111",
    name: "Deepak Saini",
    email: "deepak.saini@brightminds.org",
    phone: "+91 99350 66778",
    role: "lead",
    organization: "Bright Minds Early Learning Trust",
    productsActive: [],
    totalSpend: 0,
    accountStatus: "dormant",
    joinedDate: "September 02, 2026",
    lastActive: "August 14, 2026",
    source: "Brochure PDF Download",
    featuredOnHome: false,
  },
  {
    id: "USR-0112",
    name: "Alok Kumar Saxena",
    email: "manager@sarvodayavidya.org",
    phone: "+91 98390 11223",
    role: "school_admin",
    organization: "Sarvodaya Inter College & Vidyamandir, Kanpur",
    institutionLogo: "/images/school-logo-light.png",
    productsActive: ["MOD School Desktop OS", "Parent Portal"],
    totalSpend: 234000,
    accountStatus: "active",
    joinedDate: "May 12, 2026",
    lastActive: "5 hours ago",
    source: "B2B Enterprise License",
    featuredOnHome: true,
    orderOnHome: 5,
  },
  {
    id: "USR-0113",
    name: "Manish Chaurasia",
    email: "bursar@heritageheritage.edu.in",
    phone: "+91 98890 22334",
    role: "school_admin",
    organization: "The Heritage International Public School, Varanasi",
    institutionLogo: "/images/school-logo-light.png",
    productsActive: ["MOD School Desktop OS", "Employee App", "Parent Portal"],
    totalSpend: 234000,
    accountStatus: "active",
    joinedDate: "June 01, 2026",
    lastActive: "Yesterday",
    source: "B2B Enterprise License",
    featuredOnHome: true,
    orderOnHome: 6,
  },
];

const COLLECTION_NAME = "platform_users";

/**
 * Seed initial platform users into Firestore if collection is empty
 */
export async function seedPlatformUsersIfEmpty(): Promise<PlatformUser[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as PlatformUser[];
    }

    // Auto-seed into Firestore
    for (const user of SEED_PLATFORM_USERS) {
      const docRef = doc(db, COLLECTION_NAME, user.id);
      await setDoc(docRef, {
        ...user,
        serverTimestamp: serverTimestamp(),
      }, { merge: true });
    }
    return SEED_PLATFORM_USERS;
  } catch (err) {
    console.warn("[Platform Users Seed] Warning:", err);
    return SEED_PLATFORM_USERS;
  }
}

export async function getPlatformUsers(filter?: {
  role?: string;
  hasProduct?: "all" | "active_products" | "zero_products";
  search?: string;
  featuredOnHome?: boolean;
}): Promise<PlatformUser[]> {
  let users: PlatformUser[] = [];
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snap = await getDocs(colRef);

    if (snap.empty) {
      users = await seedPlatformUsersIfEmpty();
    } else {
      users = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      })) as PlatformUser[];
    }
  } catch (err) {
    console.warn("[Platform Users DB Query] Falling back to seeds:", err);
    users = [...SEED_PLATFORM_USERS];
  }

  if (filter?.role && filter.role !== "all") {
    users = users.filter((u) => u.role === filter.role);
  }

  if (filter?.hasProduct === "active_products") {
    users = users.filter((u) => u.productsActive && u.productsActive.length > 0);
  } else if (filter?.hasProduct === "zero_products") {
    users = users.filter((u) => !u.productsActive || u.productsActive.length === 0);
  }

  if (filter?.featuredOnHome !== undefined) {
    users = users.filter((u) => Boolean(u.featuredOnHome) === filter.featuredOnHome);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        (u.organization && u.organization.toLowerCase().includes(q))
    );
  }

  return users;
}

export async function getPlatformUserStats() {
  const allUsers = await getPlatformUsers();
  const totalUsers = allUsers.length;
  const activeProductUsers = allUsers.filter((u) => u.productsActive && u.productsActive.length > 0).length;
  const zeroProductUsers = allUsers.filter((u) => !u.productsActive || u.productsActive.length === 0).length;
  const totalRevenueSpend = allUsers.reduce((sum, u) => sum + (u.totalSpend || 0), 0);
  const leadsCount = allUsers.filter((u) => u.role === "lead").length;
  const featuredOnHomeCount = allUsers.filter((u) => u.featuredOnHome).length;

  return {
    totalUsers,
    activeProductUsers,
    zeroProductUsers,
    totalRevenueSpend,
    leadsCount,
    featuredOnHomeCount,
  };
}

export async function toggleUserFeaturedOnHome(userId: string, featured: boolean): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, { featuredOnHome: featured });
      return true;
    } else {
      const seedUser = SEED_PLATFORM_USERS.find((u) => u.id === userId);
      if (seedUser) {
        await setDoc(docRef, { ...seedUser, featuredOnHome: featured }, { merge: true });
        return true;
      }
    }
  } catch (err) {
    console.warn("[Toggle User Home DB] Error:", err);
  }
  return false;
}

export async function createPlatformUser(
  userData: Omit<PlatformUser, "id"> & { id?: string }
): Promise<PlatformUser> {
  const newId = userData.id || `USR-${Date.now().toString(36).toUpperCase()}`;
  const newUser: PlatformUser = {
    ...userData,
    id: newId,
  };

  try {
    const docRef = doc(db, COLLECTION_NAME, newId);
    await setDoc(docRef, {
      ...newUser,
      serverTimestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn("[Create User DB] Error:", err);
  }

  return newUser;
}

export async function updatePlatformUser(
  userId: string,
  updates: Partial<PlatformUser>
): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      await updateDoc(docRef, updates);
      return true;
    } else {
      const seedUser = SEED_PLATFORM_USERS.find((u) => u.id === userId);
      if (seedUser) {
        await setDoc(docRef, { ...seedUser, ...updates }, { merge: true });
        return true;
      }
    }
  } catch (err) {
    console.warn("[Update User DB] Error:", err);
  }
  return false;
}

export async function deletePlatformUser(userId: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn("[Delete User DB] Error:", err);
    return false;
  }
}
