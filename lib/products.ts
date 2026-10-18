/**
 * Modernisum Product Ecosystem & Brand Registry
 *
 * Modernisum is the parent company / holding entity for AI & Software Solutions.
 * Each child product (such as Vidhyam School OS) operates as a focused product line
 * with its own dedicated route hierarchy, branding accents, and navigation, while sharing
 * unified authentication, single MongoDB database, and design system.
 */

export interface ProductConfig {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  basePath: string;
  parentBrand: {
    name: string;
    url: string;
    tagline: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    glowClass: string;
    badgeBorderClass: string;
    badgeBgClass: string;
    badgeTextClass: string;
  };
  navLinks: Array<{
    name: string;
    href: string;
    badge?: string;
  }>;
  primaryAction: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  };
  secondaryAction?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  };
}

export const PARENT_COMPANY = {
  name: "MODERNISUM",
  subname: "AI & Software Solutions",
  url: "/",
  description: "Enterprise AI-Integrated Software, SaaS Platforms, and Modern IT Solutions.",
  logo: "/logo.png",
};

export const PRODUCTS: Record<string, ProductConfig> = {
  vidhyam: {
    id: "vidhyam",
    name: "Modernisum School",
    badge: "school.modernisum.com",
    tagline: "The Autonomous School Operating System",
    description: "AI-driven school operating system engineered for Indian K-12 institutions.",
    basePath: "https://school.modernisum.com",
    parentBrand: {
      name: PARENT_COMPANY.name,
      url: PARENT_COMPANY.url,
      tagline: PARENT_COMPANY.subname,
    },
    theme: {
      primaryColor: "#0284c7", // Sky/Blue
      accentColor: "#38bdf8",
      glowClass: "from-sky-500/20 via-blue-500/15 to-transparent",
      badgeBorderClass: "border-sky-400/30",
      badgeBgClass: "bg-sky-500/15",
      badgeTextClass: "text-sky-600 dark:text-sky-300",
    },
    navLinks: [
      { name: "Overview", href: "/" },
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Download", href: "/download", badge: "Win" },
      { name: "Docs", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "Support", href: "/support" },
      { name: "Releases", href: "/releases", badge: "v2.8" },
      { name: "Contact", href: "/contact" },
    ],
    primaryAction: {
      label: "Register School",
      href: "/register",
      variant: "primary",
    },
    secondaryAction: {
      label: "Download App",
      href: "/download",
      variant: "secondary",
    },
  },
  agromi: {
    id: "agromi",
    name: "Agromi",
    badge: "AGRO-TECH OS",
    tagline: "Autonomous Agricultural Ecosystem & Precision Farming Platform",
    description: "Manage your agricultural ecosystem with IoT soil probes, drone multispectral analytics, crop disease diagnosis, and mandi yield forecasting.",
    basePath: "/agromi",
    parentBrand: {
      name: PARENT_COMPANY.name,
      url: PARENT_COMPANY.url,
      tagline: PARENT_COMPANY.subname,
    },
    theme: {
      primaryColor: "#16a34a", // Emerald/Green
      accentColor: "#22c55e",
      glowClass: "from-emerald-500/20 via-green-500/15 to-transparent",
      badgeBorderClass: "border-emerald-400/30",
      badgeBgClass: "bg-emerald-500/15",
      badgeTextClass: "text-emerald-600 dark:text-emerald-300",
    },
    navLinks: [
      { name: "Overview", href: "/agromi" },
      { name: "Features", href: "/agromi/features" },
      { name: "Pricing", href: "/agromi/pricing" },
      { name: "About", href: "/agromi/about" },
      { name: "Contact", href: "/agromi/contact" },
    ],
    primaryAction: {
      label: "Request Farm Pilot",
      href: "/agromi/contact",
      variant: "primary",
    },
    secondaryAction: {
      label: "View Telemetry",
      href: "/agromi#cockpit",
      variant: "secondary",
    },
  },
};

/**
 * Helper to get active product configuration from pathname
 */
export function getProductFromPath(pathname: string): ProductConfig | null {
  for (const product of Object.values(PRODUCTS)) {
    if (pathname === product.basePath || pathname.startsWith(`${product.basePath}/`)) {
      return product;
    }
  }
  return null;
}
