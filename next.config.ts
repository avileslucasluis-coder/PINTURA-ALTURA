import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-DNS-Prefetch-Control", value: "off" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net",
            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googleadservices.com",
            "img-src 'self' data: blob: https:",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self' data:",
            "media-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
          ].join("; "),
        },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
      ],
    }];
  },
};

export default nextConfig;
