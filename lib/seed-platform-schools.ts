export interface SeedSchoolTenant {
  id: string;
  schoolCode: string;
  name: string;
  affiliationBoard: string;
  affiliationNumber: string;
  streams: string[];
  contactEmail: string;
  contactPhone: string;
  adminName: string;
  adminEmail: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  address: string;
  subscriptionTier: "Starter" | "Growth" | "Enterprise";
  subscriptionPriceYearly: number;
  isActive: boolean;
  isSuspended: boolean;
  suspendedReason?: string;
  rateLimitRpm: number;
  createdAt: string;
}

export const SEED_SCHOOL_TENANTS: SeedSchoolTenant[] = [
  {
    id: "sch-001",
    schoolCode: "SCH-1081",
    name: "Vidhyam International Academy",
    affiliationBoard: "CBSE",
    affiliationNumber: "213089",
    streams: ["PCM", "PCB", "Commerce", "Arts"],
    contactEmail: "contact@vidhyam.modernisum.com",
    contactPhone: "+91 98765 43210",
    adminName: "Dr. Rajeshwar Sharma",
    adminEmail: "principal@vidhyam.modernisum.com",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Dehradun",
    pincode: "248001",
    address: "Rajpur Road Campus, Modernisum Tech Park",
    subscriptionTier: "Enterprise",
    subscriptionPriceYearly: 75000,
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 240,
    createdAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "sch-002",
    schoolCode: "SCH-1082",
    name: "Doon Heritage Global School",
    affiliationBoard: "ICSE",
    affiliationNumber: "UT-042",
    streams: ["PCM", "PCB", "Commerce"],
    contactEmail: "info@doonheritage.edu.in",
    contactPhone: "+91 98112 88442",
    adminName: "Sister Mary Augustine",
    adminEmail: "admin@doonheritage.edu.in",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Mussoorie",
    pincode: "248179",
    address: "Camel's Back Road Campus",
    subscriptionTier: "Growth",
    subscriptionPriceYearly: 35000,
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 120,
    createdAt: "2026-05-12T14:30:00Z",
  },
  {
    id: "sch-003",
    schoolCode: "SCH-1083",
    name: "St. Xavier's World Academy",
    affiliationBoard: "CBSE",
    affiliationNumber: "213455",
    streams: ["PCM", "PCB", "Commerce", "Arts"],
    contactEmail: "admissions@stxaviersmeerut.org",
    contactPhone: "+91 98220 11993",
    adminName: "Fr. Anthony D'Souza",
    adminEmail: "director@stxaviersmeerut.org",
    state: "Uttar Pradesh",
    district: "Meerut",
    city: "Meerut",
    pincode: "250001",
    address: "Civil Lines, Near University Road",
    subscriptionTier: "Enterprise",
    subscriptionPriceYearly: 75000,
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 240,
    createdAt: "2026-06-01T09:15:00Z",
  },
  {
    id: "sch-004",
    schoolCode: "SCH-1084",
    name: "Delhi Public School Cantt",
    affiliationBoard: "CBSE",
    affiliationNumber: "213902",
    streams: ["PCM", "PCB", "Commerce"],
    contactEmail: "admin@dpscantt.edu.in",
    contactPhone: "+91 98334 22110",
    adminName: "Mrs. Vandana Sehgal",
    adminEmail: "principal@dpscantt.edu.in",
    state: "Delhi",
    district: "New Delhi",
    city: "New Delhi",
    pincode: "110010",
    address: "Sector 4, Cantonment Enclave",
    subscriptionTier: "Growth",
    subscriptionPriceYearly: 35000,
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 120,
    createdAt: "2026-07-15T11:00:00Z",
  },
  {
    id: "sch-005",
    schoolCode: "SCH-1085",
    name: "Modern Academy of Science & Arts",
    affiliationBoard: "State Board",
    affiliationNumber: "UP-9844",
    streams: ["Arts", "Commerce"],
    contactEmail: "contact@modernacademy.org",
    contactPhone: "+91 98445 77665",
    adminName: "Rakesh Verma",
    adminEmail: "r.verma@modernacademy.org",
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    city: "Ghaziabad",
    pincode: "201001",
    address: "Raj Nagar Extension",
    subscriptionTier: "Starter",
    subscriptionPriceYearly: 15000,
    isActive: false,
    isSuspended: true,
    suspendedReason: "Pending annual compliance verification and subscription renewal grace period exceeded.",
    rateLimitRpm: 60,
    createdAt: "2026-08-01T16:00:00Z",
  },
];

export const SEED_COUPONS = [
  {
    code: "MODERN2026",
    discountPercent: 20,
    validUntil: "2026-12-31T23:59:59Z",
    maxUses: 100,
    usedCount: 14,
    isActive: true,
    notes: "New Institutional Onboarding Promotion 2026",
  },
  {
    code: "CBSE_ANNUAL",
    discountPercent: 15,
    validUntil: "2026-11-30T23:59:59Z",
    maxUses: 50,
    usedCount: 8,
    isActive: true,
    notes: "Affiliated Schools Special Discount",
  },
  {
    code: "FOUNDER_VIP",
    discountPercent: 30,
    validUntil: "2026-10-31T23:59:59Z",
    maxUses: 20,
    usedCount: 5,
    isActive: true,
    notes: "Exclusive Invitation Discount",
  },
];

export const SEED_AUDIT_LOGS = [
  {
    action: "SCHOOL_REGISTERED",
    category: "Schools",
    actor: "Self-Serve Onboarding",
    target: "SCH-1084",
    details: "Delhi Public School Cantt registered on Growth Plan tier.",
    ip: "103.21.144.22",
    createdAt: "2026-07-15T11:00:00Z",
  },
  {
    action: "SCHOOL_SUSPENDED",
    category: "Schools",
    actor: "compliance@modernisum.com",
    target: "SCH-1085",
    details: "Suspension enforced: Pending annual compliance verification.",
    ip: "103.22.155.10",
    createdAt: "2026-08-01T16:00:00Z",
  },
  {
    action: "COUPON_APPLIED",
    category: "Billing",
    actor: "System Billing Engine",
    target: "MODERN2026",
    details: "Coupon MODERN2026 (20% off) redeemed for SCH-1083.",
    ip: "103.21.144.18",
    createdAt: "2026-06-01T09:15:00Z",
  },
];
