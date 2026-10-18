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
  totalSpend: number;
  studentCount: number;
  facultyCount: number;
  billingCycle: "Annual Upfront (₹15/mo)" | "Quarterly Prepaid (₹20/mo)";
  lastPaymentDate: string;
  paymentStatus: "Paid / Active" | "Pending Renewal" | "Grace Period";
  isActive: boolean;
  isSuspended: boolean;
  suspendedReason?: string;
  rateLimitRpm: number;
  createdAt: string;
}

export const SEED_SCHOOL_TENANTS: SeedSchoolTenant[] = [
  {
    id: "sch-001",
    schoolCode: "MOD-SCH-213089",
    name: "Modern International Senior Secondary Academy",
    affiliationBoard: "CBSE",
    affiliationNumber: "CBSE-213089/LOC-901",
    streams: ["PCM", "PCB", "Commerce", "Humanities"],
    contactEmail: "principal@modernacademy-ddn.edu.in",
    contactPhone: "+91 93686 71007",
    adminName: "Dr. Rajeshwar Sharma",
    adminEmail: "r.sharma@modernacademy-ddn.edu.in",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Dehradun",
    pincode: "248001",
    address: "Rajpur Road Campus, Modernisum Knowledge Park",
    subscriptionTier: "Enterprise",
    subscriptionPriceYearly: 261000,
    totalSpend: 522000,
    studentCount: 1450,
    facultyCount: 78,
    billingCycle: "Annual Upfront (₹15/mo)",
    lastPaymentDate: "15 Oct 2026",
    paymentStatus: "Paid / Active",
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 240,
    createdAt: "2025-04-01T10:00:00Z",
  },
  {
    id: "sch-002",
    schoolCode: "MOD-SCH-UT0421",
    name: "Doon Heritage Global ICSE School",
    affiliationBoard: "ICSE",
    affiliationNumber: "CISCE-UT-042/2026",
    streams: ["Science", "Commerce"],
    contactEmail: "bursar@doonheritage.edu.in",
    contactPhone: "+91 98112 88442",
    adminName: "Sister Mary Augustine",
    adminEmail: "admin@doonheritage.edu.in",
    state: "Uttarakhand",
    district: "Dehradun",
    city: "Mussoorie",
    pincode: "248179",
    address: "Camel's Back Heights, Mussoorie Campus",
    subscriptionTier: "Growth",
    subscriptionPriceYearly: 153000,
    totalSpend: 306000,
    studentCount: 850,
    facultyCount: 52,
    billingCycle: "Annual Upfront (₹15/mo)",
    lastPaymentDate: "01 Sep 2026",
    paymentStatus: "Paid / Active",
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 180,
    createdAt: "2025-05-12T14:30:00Z",
  },
  {
    id: "sch-003",
    schoolCode: "MOD-SCH-213455",
    name: "St. Xavier's World Academy & Junior College",
    affiliationBoard: "CBSE",
    affiliationNumber: "CBSE-213455/LOC-412",
    streams: ["PCM", "PCB", "Commerce", "Arts"],
    contactEmail: "accounts@stxaviersmeerut.org",
    contactPhone: "+91 98220 11993",
    adminName: "Fr. Anthony D'Souza",
    adminEmail: "director@stxaviersmeerut.org",
    state: "Uttar Pradesh",
    district: "Meerut",
    city: "Meerut",
    pincode: "250001",
    address: "Civil Lines, University Circle Road",
    subscriptionTier: "Enterprise",
    subscriptionPriceYearly: 378000,
    totalSpend: 756000,
    studentCount: 2100,
    facultyCount: 110,
    billingCycle: "Annual Upfront (₹15/mo)",
    lastPaymentDate: "05 Aug 2026",
    paymentStatus: "Paid / Active",
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 240,
    createdAt: "2025-06-01T09:15:00Z",
  },
  {
    id: "sch-004",
    schoolCode: "MOD-SCH-213902",
    name: "Delhi Public School Cantonment Wing",
    affiliationBoard: "CBSE",
    affiliationNumber: "CBSE-213902/LOC-118",
    streams: ["PCM", "PCB", "Commerce"],
    contactEmail: "admin@dpscantt.edu.in",
    contactPhone: "+91 98334 22110",
    adminName: "Mrs. Vandana Sehgal",
    adminEmail: "principal@dpscantt.edu.in",
    state: "Delhi",
    district: "New Delhi",
    city: "New Delhi",
    pincode: "110010",
    address: "Sector 4, Cantonment Defense Enclave",
    subscriptionTier: "Growth",
    subscriptionPriceYearly: 225000,
    totalSpend: 360000,
    studentCount: 1250,
    facultyCount: 68,
    billingCycle: "Quarterly Prepaid (₹20/mo)",
    lastPaymentDate: "10 Oct 2026",
    paymentStatus: "Paid / Active",
    isActive: true,
    isSuspended: false,
    rateLimitRpm: 180,
    createdAt: "2025-07-15T11:00:00Z",
  },
  {
    id: "sch-005",
    schoolCode: "MOD-SCH-UP9844",
    name: "Modern Academy of Science & Commerce",
    affiliationBoard: "State Board",
    affiliationNumber: "UP-9844/DIOS-2024",
    streams: ["Commerce", "Arts"],
    contactEmail: "contact@modernacademy.org",
    contactPhone: "+91 98445 77665",
    adminName: "Rakesh Verma",
    adminEmail: "r.verma@modernacademy.org",
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    city: "Ghaziabad",
    pincode: "201001",
    address: "Raj Nagar Extension, Meerut Highway",
    subscriptionTier: "Starter",
    subscriptionPriceYearly: 108000,
    totalSpend: 108000,
    studentCount: 600,
    facultyCount: 32,
    billingCycle: "Annual Upfront (₹15/mo)",
    lastPaymentDate: "12 Apr 2026",
    paymentStatus: "Grace Period",
    isActive: false,
    isSuspended: true,
    suspendedReason: "Pending annual compliance verification and subscription renewal grace period exceeded (14 days past due).",
    rateLimitRpm: 60,
    createdAt: "2025-08-01T16:00:00Z",
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
