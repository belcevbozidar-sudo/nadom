import { usePageTracking } from "@/hooks/use-page-tracking.ts";

const HAS_CONVEX_BACKEND = Boolean(import.meta.env.VITE_CONVEX_URL);

/**
 * Invisible component that records page visits for analytics.
 * Must be placed inside <BrowserRouter>.
 */
function LivePageTracker() {
  usePageTracking();
  return null;
}

export function PageTracker() {
  if (!HAS_CONVEX_BACKEND) return null;
  return <LivePageTracker />;
}
