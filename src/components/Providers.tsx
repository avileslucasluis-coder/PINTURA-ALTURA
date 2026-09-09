"use client";

import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { CookieBanner, CookieConsent } from "@/components/CookieBanner";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleTagId = googleAnalyticsId || googleAdsId;

function AnalyticsTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Avoid double tracking in React Strict Mode on initial render
    if (!enabled || lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Do not track visits to admin paths to avoid inflating visitor stats
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    trackEvent({ action: "page_view", label: pathname });

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
  }, [enabled, pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [cookieConsent, setCookieConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setCookieConsent(savedConsent);
    }
  }, []);

  return (
    <SessionProvider>
      {cookieConsent === "accepted" && googleTagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; window.gtag = function(){dataLayer.push(arguments);}; window.gtag('js', new Date()); ${googleAnalyticsId ? `window.gtag('config', '${googleAnalyticsId}', { send_page_view: false });` : ""} ${googleAdsId ? `window.gtag('config', '${googleAdsId}');` : ""}`}
          </Script>
        </>
      )}
      <AnalyticsTracker enabled={cookieConsent === "accepted"} />
      <CookieBanner onChange={setCookieConsent} />
      {children}
    </SessionProvider>
  );
}
