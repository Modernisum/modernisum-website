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
  const totalSpend = schools.reduce((acc, s) => acc + (s.totalSpend || 0), 0);
  const totalStudents = schools.reduce((acc, s) => acc + (s.studentCount || 0), 0);
  const totalMrr = schools
    .filter((s) => s.isActive && !s.isSuspended)
    .reduce((acc, s) => acc + Math.round((s.subscriptionPriceYearly || 35000) / 12), 0);

  return {
    totalSchools: schools.length,
    activeSchools: activeCount,
    suspendedSchools: suspendedCount,
    totalSpend,
    totalStudents,
    estimatedMrr: totalMrr,
    fleetHealth: activeCount > 0 ? Math.round((activeCount / schools.length) * 100) : 100,
  };
}

/**
 * Resilient Coupons Fetcher
 */
export async function getPlatformCoupons() {
  return SEED_COUPONS;
}

/**
 * Resilient Audit Logs Fetcher
 */
export async function getPlatformAuditLogs() {
  return SEED_AUDIT_LOGS;
}
