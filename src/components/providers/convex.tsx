import { ConvexProviderWithHerculesAuth } from "@usehercules/auth/convex-react";
import {
  ConvexProvider as BaseConvexProvider,
  ConvexReactClient,
} from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL ?? "http://localhost:3000";
const convex = new ConvexReactClient(convexUrl);

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  const hasHerculesAuth =
    Boolean(import.meta.env.VITE_HERCULES_OIDC_AUTHORITY) &&
    Boolean(import.meta.env.VITE_HERCULES_OIDC_CLIENT_ID);

  if (!hasHerculesAuth) {
    return <BaseConvexProvider client={convex}>{children}</BaseConvexProvider>;
  }

  return (
    <ConvexProviderWithHerculesAuth client={convex}>
      {children}
    </ConvexProviderWithHerculesAuth>
  );
}
