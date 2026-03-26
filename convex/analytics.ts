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

    // Check if this session already visited this page within the last 10 minutes
    const recentVisit = await ctx.db
      .query("pageVisits")
      .withIndex("by_session_page", (q) =>
        q.eq("sessionId", args.sessionId).eq("page", args.page),
      )
      .order("desc")
      .first();

    if (recentVisit && recentVisit.visitedAt > tenMinutesAgo) {
      // Already recorded within 10 minutes, skip
      return null;
    }

    return await ctx.db.insert("pageVisits", {
      page: args.page,
      sessionId: args.sessionId,
      visitedAt: now.toISOString(),
    });
  },
});

export const getAnalytics = query({
  args: {
    days: v.number(),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const sinceDate = new Date(
      now.getTime() - args.days * 24 * 60 * 60 * 1000,
    ).toISOString();

    // Get all visits since the date
    const visits = await ctx.db
      .query("pageVisits")
      .withIndex("by_time", (q) => q.gte("visitedAt", sinceDate))
      .collect();

    // Total unique sessions
    const uniqueSessions = new Set(visits.map((v) => v.sessionId));

    // Per-page stats
    const pageMap = new Map<string, Set<string>>();
    for (const visit of visits) {
      if (!pageMap.has(visit.page)) {
        pageMap.set(visit.page, new Set());
      }
      pageMap.get(visit.page)!.add(visit.sessionId);
    }

    const perPage: Array<{ page: string; sessions: number; views: number }> = [];
    for (const [page, sessions] of pageMap) {
      const pageViews = visits.filter((v) => v.page === page).length;
      perPage.push({
        page,
        sessions: sessions.size,
        views: pageViews,
      });
    }

    // Sort by views descending
    perPage.sort((a, b) => b.views - a.views);

    return {
      totalSessions: uniqueSessions.size,
      totalViews: visits.length,
      perPage,
    };
  },
});
