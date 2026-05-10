import { usePageTracking } from "@/hooks/use-page-tracking.ts";

/**
 * Invisible component that records page visits for analytics.
 * Must be placed inside <BrowserRouter>.
 */
export function PageTracker() {
  usePageTracking();
  return null;
}
