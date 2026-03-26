import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";

function getSessionId(): string {
  const key = "nadom_session_id";
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
}

/**
 * Tracks page visits per session. Each page is counted once per session
 * every 10 minutes (deduplication happens on the backend).
 */
export function usePageTracking() {
  const location = useLocation();
  const recordVisit = useMutation(api.analytics.recordVisit);
  const lastTracked = useRef<string>("");

  useEffect(() => {
    const page = location.pathname;

    // Skip tracking for admin and auth pages
    if (page.startsWith("/admin") || page.startsWith("/auth")) {
      return;
    }

    // Avoid double-tracking on strict mode re-renders for the same path
    if (lastTracked.current === page) return;
    lastTracked.current = page;

    const sessionId = getSessionId();
    recordVisit({ page, sessionId }).catch(() => {
      // Silently fail - analytics should never break the app
    });
  }, [location.pathname, recordVisit]);
}
