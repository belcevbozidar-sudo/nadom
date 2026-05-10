import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ADMIN_PASSWORD = "1122334455";

function assertAdmin(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Нямате достъп до тази операция.",
    });
  }
}

const propertyFields = {
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
};

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("properties")
      .withIndex("by_visible", (q) => q.eq("isVisible", true))
      .order("asc")
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const property = await ctx.db
      .query("properties")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return property?.isVisible ? property : null;
  },
});

export const listAdmin = query({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    const properties = await ctx.db.query("properties").collect();
    return properties.sort((a, b) => a.order - b.order);
  },
});

export const seedDefaults = mutation({
  args: {
    adminPassword: v.string(),
    properties: v.array(v.object(propertyFields)),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    const existing = await ctx.db.query("properties").first();
    if (existing) return null;

    for (const property of args.properties) {
      await ctx.db.insert("properties", property);
    }
  },
});

export const create = mutation({
  args: {
    adminPassword: v.string(),
    property: v.object(propertyFields),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    return await ctx.db.insert("properties", args.property);
  },
});

export const update = mutation({
  args: {
    adminPassword: v.string(),
    propertyId: v.id("properties"),
    property: v.object(propertyFields),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    await ctx.db.patch(args.propertyId, args.property);
  },
});

export const remove = mutation({
  args: {
    adminPassword: v.string(),
    propertyId: v.id("properties"),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    await ctx.db.delete(args.propertyId);
  },
});
