export type AnalyticsEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  window.gtag?.("event", action, { event_category: category, event_label: label, value });
}

export function trackContactConversion() {
  trackEvent({ action: "generate_lead", category: "contact", label: "contact_form" });

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (conversionId && conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
    });
  }
}