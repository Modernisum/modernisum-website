import { connectToDatabase } from "@/lib/db";
import { SchoolTenant } from "@/lib/models/SchoolTenant";
import { Coupon } from "@/lib/models/Coupon";
import { AuditLog } from "@/lib/models/AuditLog";
import {
  SEED_SCHOOL_TENANTS,
  SEED_COUPONS,
  SEED_AUDIT_LOGS,
  SeedSchoolTenant,
} from "@/lib/seed-platform-schools";

/**
 * Resilient School Tenants Fetcher
 */
export async function getSchoolTenants(filter?: {
  status?: "all" | "active" | "suspended";
  search?: string;
}): Promise<SeedSchoolTenant[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const query: any = {};
      if (filter?.status === "active") {
        query.isActive = true;
        query.isSuspended = false;
      } else if (filter?.status === "suspended") {
        query.isSuspended = true;
      }

      if (filter?.search) {
        query.$or = [
          { name: new RegExp(filter.search, "i") },
          { schoolCode: new RegExp(filter.search, "i") },
          { district: new RegExp(filter.search, "i") },
          { affiliationBoard: new RegExp(filter.search, "i") },
        ];
      }

      const raw = await SchoolTenant.find(query).sort({ createdAt: -1 }).lean();
      if (raw && raw.length > 0) {
        return JSON.parse(JSON.stringify(raw)).map((s: any) => ({
          id: String(s._id || s.id),
          schoolCode: s.schoolCode,
          name: s.name,
          affiliationBoard: s.affiliationBoard,
          affiliationNumber: s.affiliationNumber || "",
          streams: s.streams || [],
          contactEmail: s.contactEmail,
          contactPhone: s.contactPhone,
          adminName: s.adminName,
          adminEmail: s.adminEmail,
          state: s.state,
          district: s.district,
          city: s.city,
          pincode: s.pincode,
          address: s.address,
          subscriptionTier: s.subscriptionTier,
          subscriptionPriceYearly: s.subscriptionPriceYearly,
          isActive: Boolean(s.isActive),
          isSuspended: Boolean(s.isSuspended),
          suspendedReason: s.suspendedReason,
          rateLimitRpm: s.rateLimitRpm || 120,
          createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("⚠️ MongoDB SchoolTenants query error, falling back to seed data:", err);
  }

  let list = SEED_SCHOOL_TENANTS;
  if (filter?.status === "active") {
    list = list.filter((s) => s.isActive && !s.isSuspended);
  } else if (filter?.status === "suspended") {
    list = list.filter((s) => s.isSuspended);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.schoolCode.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.affiliationBoard.toLowerCase().includes(q)
    );
  }

  return list;
}

/**
 * Resilient Overview Statistics for Platform Fleet
 */
export async function getPlatformFleetStats() {
  const schools = await getSchoolTenants();
  const activeCount = schools.filter((s) => s.isActive && !s.isSuspended).length;
  const suspendedCount = schools.filter((s) => s.isSuspended).length;
  const totalMrr = schools
    .filter((s) => s.isActive && !s.isSuspended)
    .reduce((acc, s) => acc + Math.round((s.subscriptionPriceYearly || 35000) / 12), 0);

  return {
    totalSchools: schools.length,
    activeSchools: activeCount,
    suspendedSchools: suspendedCount,
    estimatedMrr: totalMrr,
    fleetHealth: activeCount > 0 ? Math.round((activeCount / schools.length) * 100) : 100,
  };
}

/**
 * Resilient Coupons Fetcher
 */
export async function getPlatformCoupons() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const raw = await Coupon.find({}).sort({ createdAt: -1 }).lean();
      if (raw && raw.length > 0) {
        return JSON.parse(JSON.stringify(raw));
      }
    }
  } catch (err) {
    console.warn("⚠️ MongoDB Coupons fallback:", err);
  }
  return SEED_COUPONS;
}

/**
 * Resilient Audit Logs Fetcher
 */
export async function getPlatformAuditLogs() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const raw = await AuditLog.find({}).sort({ createdAt: -1 }).limit(50).lean();
      if (raw && raw.length > 0) {
        return JSON.parse(JSON.stringify(raw));
      }
    }
  } catch (err) {
    console.warn("⚠️ MongoDB AuditLog fallback:", err);
  }
  return SEED_AUDIT_LOGS;
}
