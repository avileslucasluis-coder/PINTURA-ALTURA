"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double tracking in React Strict Mode on initial render
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Do not track visits to admin paths to avoid inflating visitor stats
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ path: pathname })
        });
      } catch (err) {
        console.error("Failed to track page view:", err);
      }
    };

    trackPageView();
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AnalyticsTracker />
      {children}
    </SessionProvider>
  );
}
