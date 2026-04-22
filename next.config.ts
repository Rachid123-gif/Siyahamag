import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Keep these out of the server bundle — they have native bindings or
  // runtime file lookups that break when bundled by Turbopack / webpack.
  // Required for Prisma + pg to work correctly on Netlify serverless functions.
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "pg",
    "pg-native",
  ],
  // Ensure the custom-output Prisma client ships in every serverless function.
  outputFileTracingIncludes: {
    "/**/*": ["./src/generated/prisma/**/*"],
  },
};

export default nextConfig;
