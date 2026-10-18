import type { NextConfig } from "next";

const isPublicExport = process.env.BUILD_TARGET === "public";

const nextConfig: NextConfig = {
  ...(isPublicExport ? { output: "export" } : {}),
  devIndicators: false,
  images: {
    unoptimized: isPublicExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  ...(!isPublicExport
    ? {
        async redirects() {
          return [
            {
              source: "/modern-school",
              destination: "/mod-school",
              permanent: true,
            },
            {
              source: "/vidhyam",
              destination: "/mod-school",
              permanent: true,
            },
            {
              source: "/vidhyam/:path*",
              destination: "/mod-school/:path*",
              permanent: true,
            },
            {
              source: "/agronomi",
              destination: "/mod-farmer",
              permanent: true,
            },
            {
              source: "/agronomi/:path*",
              destination: "/mod-farmer/:path*",
              permanent: true,
            },
          ];
        },
        async rewrites() {
          return [
            // Legacy / Friendly Aliases mapping to /mod-school
            { source: "/school", destination: "/mod-school" },
            { source: "/school/:path*", destination: "/mod-school/:path*" },

            // Legacy / Friendly Aliases mapping to /mod-farmer
            { source: "/agromi", destination: "/mod-farmer" },
            { source: "/agromi/:path*", destination: "/mod-farmer/:path*" },
            { source: "/farmer", destination: "/mod-farmer" },
            { source: "/farmer/:path*", destination: "/mod-farmer/:path*" },
            { source: "/agro", destination: "/mod-farmer" },
            { source: "/agro/:path*", destination: "/mod-farmer/:path*" },

            // Downloads binary proxy to API
            { source: "/downloads/:filename", destination: "/api/download/:filename" },

            // School Subdomain rewrites (Only when accessing school.modernisum.com)
            {
              source: "/",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school",
            },
            {
              source: "/contact",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school/contact",
            },
            {
              source: "/terms",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school/terms",
            },
            {
              source: "/privacy",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school/privacy",
            },
            {
              source: "/subscription",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school/subscription",
            },
            {
              source: "/about",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school/about",
            },
            {
              source: "/community",
              has: [{ type: "host", value: "school\\..*" }],
              destination: "/mod-school/community",
            },
            {
              source: "/contact",
              has: [{ type: "query", key: "subdomain", value: "school" }],
              destination: "/mod-school/contact",
            },
            {
              source: "/terms",
              has: [{ type: "query", key: "subdomain", value: "school" }],
              destination: "/mod-school/terms",
            },
            {
              source: "/privacy",
              has: [{ type: "query", key: "subdomain", value: "school" }],
              destination: "/mod-school/privacy",
            },
            {
              source: "/subscription",
              has: [{ type: "query", key: "subdomain", value: "school" }],
              destination: "/mod-school/subscription",
            },
            {
              source: "/about",
              has: [{ type: "query", key: "subdomain", value: "school" }],
              destination: "/mod-school/about",
            },
            {
              source: "/community",
              has: [{ type: "query", key: "subdomain", value: "school" }],
              destination: "/mod-school/community",
            },

            // School OS dedicated feature routes
            { source: "/features", destination: "/mod-school/features" },
            { source: "/pricing", destination: "/mod-school/pricing" },
            { source: "/download", destination: "/mod-school/download" },
            { source: "/docs", destination: "/mod-school/docs" },
            { source: "/releases", destination: "/mod-school/releases" },
            { source: "/register", destination: "/mod-school/register" },
            { source: "/support", destination: "/mod-school/support" },
            { source: "/apps/:path*", destination: "/mod-school/apps/:path*" },
          ];
        },
      }
    : {}),
};

export default nextConfig;
