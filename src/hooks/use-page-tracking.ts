import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";

function getDeviceId(): string {
  const key = "nadom_device_id";
  let deviceId = localStorage.getItem(key);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(key, deviceId);
  }
  return deviceId;
}

/**
 * Tracks visits to the homepage only.
 * Each device is counted once every 10 minutes (deduplication on the backend).
 */
export function usePageTracking() {
  const location = useLocation();
  const recordVisit = useMutation(api.analytics.recordVisit);

  useEffect(() => {
    // Only track the homepage
    if (location.pathname !== "/") return;

    const deviceId = getDeviceId();
    recordVisit({ page: "/", sessionId: deviceId }).catch(() => {
      // Silently fail - analytics should never break the app
    });
  }, [location.pathname, recordVisit]);
}
