import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  reviews: defineTable({
    userId: v.id("users"),
    authorName: v.string(),
    rating: v.number(),
    comment: v.string(),
    isVisible: v.boolean(),
  }).index("by_visible", ["isVisible"]),

  pageVisits: defineTable({
    page: v.string(),
    sessionId: v.string(),
    visitedAt: v.string(),
  })
    .index("by_session_page", ["sessionId", "page"])
    .index("by_page_and_time", ["page", "visitedAt"])
    .index("by_time", ["visitedAt"]),
});
