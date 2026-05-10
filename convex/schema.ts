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

  formSubmissions: defineTable({
    fullName: v.string(),
    service: v.string(),
    address: v.string(),
    region: v.string(),
    buildingType: v.string(),
    message: v.string(),
    status: v.string(),
    createdAt: v.string(),
  })
    .index("by_time", ["createdAt"])
    .index("by_status", ["status"]),

  services: defineTable({
    category: v.string(),
    title: v.string(),
    description: v.string(),
    image: v.optional(v.string()),
    href: v.optional(v.string()),
    icon: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
  }).index("by_category", ["category", "order"]),

  properties: defineTable({
    slug: v.string(),
    type: v.string(),
    title: v.string(),
    location: v.string(),
    area: v.number(),
    rooms: v.string(),
    year: v.number(),
    material: v.string(),
    price: v.string(),
    phone: v.string(),
    description: v.string(),
    image: v.string(),
    gallery: v.array(v.string()),
    order: v.number(),
    isVisible: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_visible", ["isVisible", "order"]),
});
