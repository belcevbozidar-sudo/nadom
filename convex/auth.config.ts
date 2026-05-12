import { AuthConfig } from "convex/server";

const authority = process.env.HERCULES_OIDC_AUTHORITY;
const clientId = process.env.HERCULES_OIDC_CLIENT_ID;

export default {
  providers:
    authority && clientId
      ? [
          {
            domain: authority,
            applicationID: clientId,
          },
        ]
      : [],
} satisfies AuthConfig;
