import React from "react";

export type NavbarVariant = "modernisum" | "school" | "agromi" | "farmer" | "vidhyam";

export interface ActivityItem {
  title: string;
  desc?: string;
  href: string;
  date?: string;
  tag?: string;
}

export interface ItemPreviewData {
  title: string;
  subtitle: string;
  tag: string;
  tagColor?: string;
  visualType?: "desktop" | "mobile" | "extension" | "hardware" | "generic";
  highlights?: { label: string; val: string }[];
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export interface DropdownItem {
  name: string;
  desc?: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
  badge?: string;
  badgeColor?: string;
  isDownload?: boolean;
  activities?: ActivityItem[];
  preview?: ItemPreviewData;
}

export interface DropdownColumn {
  category: string;
  icon?: React.ComponentType<{ className?: string }>;
  subtitle?: string;
  items: DropdownItem[];
  moreLink?: {
    label: string;
    href: string;
  };
}

export interface DropdownGroup {
  id: string;
  label?: string;
  badge?: string;
  hasPreview?: boolean;
  hasCascadingEcosystem?: boolean;
  columns: DropdownColumn[];
}

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  dropdown?: DropdownGroup;
  isDownload?: boolean;
}

export interface NavDomainConfig {
  variant: NavbarVariant;
  brandTitle: string;
  brandSubtitle: string;
  brandBadge: string | null;
  homeHref: string;
  accentColor: string;
  activePillBg: string;
  brandLogoNode: React.ReactNode;
  brandPillLogoNode: React.ReactNode;
  primaryCtaText: string;
  themeTopBar: string;
  themeActivePill: string;
  themeBadgeClass: string;
  themeHoverItem: string;
  themeIconBox: string;
  themeItemTitleHover: string;
  themeSpotlightGlow: string;
  themePillBg: string;
  themePillBorder: string;
  themePillShadow: string;
  navItems: NavItem[];
}
