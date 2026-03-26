import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const recordVisit = mutation({
  args: {
    page: v.string(),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000).toISOString();

    // Check if this device already visited this page within the last 10 minutes
    const recentVisit = await ctx.db
      .query("pageVisits")
      .withIndex("by_session_page", (q) =>
        q.eq("sessionId", args.sessionId).eq("page", args.page),
      )
      .order("desc")
      .first();

    if (recentVisit && recentVisit.visitedAt > tenMinutesAgo) {
      return null;
    }

    return await ctx.db.insert("pageVisits", {
      page: args.page,
      sessionId: args.sessionId,
      visitedAt: now.toISOString(),
    });
  },
});

export const getSessionCount = query({
  args: {
    days: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const sinceDate = new Date(
      now.getTime() - args.days * 24 * 60 * 60 * 1000,
    ).toISOString();

    // Count only homepage visits for the main metric
    const homepageVisits = await ctx.db
      .query("pageVisits")
      .withIndex("by_page_and_time", (q) =>
        q.eq("page", "/").gte("visitedAt", sinceDate),
      )
      .collect();

    // Get all visits for per-page breakdown
    const allVisits = await ctx.db
      .query("pageVisits")
      .withIndex("by_time", (q) => q.gte("visitedAt", sinceDate))
      .collect();

    // Per-page session counts
    const pageMap = new Map<string, number>();
    for (const visit of allVisits) {
      pageMap.set(visit.page, (pageMap.get(visit.page) ?? 0) + 1);
    }

    const perPage: Array<{ page: string; sessions: number }> = [];
    for (const [page, count] of pageMap) {
      perPage.push({ page, sessions: count });
    }
    perPage.sort((a, b) => b.sessions - a.sessions);

    return {
      homepageSessions: homepageVisits.length,
      perPage,
    };
  },
});
