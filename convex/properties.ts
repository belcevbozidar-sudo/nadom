import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

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

async function getImageUrl(ctx: any, value: string) {
  if (/^(https?:|data:)/.test(value)) return value;
  return (await ctx.storage.getUrl(value as Id<"_storage">)) ?? value;
}

async function withImageUrls(ctx: any, property: any) {
  return {
    ...property,
    imageUrl: await getImageUrl(ctx, property.image),
    galleryUrls: await Promise.all(
      property.gallery.map((image: string) => getImageUrl(ctx, image)),
    ),
  };
}

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const properties = await ctx.db
      .query("properties")
      .withIndex("by_visible", (q) => q.eq("isVisible", true))
      .order("asc")
      .collect();
    return await Promise.all(
      properties.map((property) => withImageUrls(ctx, property)),
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const property = await ctx.db
      .query("properties")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return property?.isVisible ? await withImageUrls(ctx, property) : null;
  },
});

export const listAdmin = query({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    const properties = await ctx.db.query("properties").collect();
    const sortedProperties = properties.sort((a, b) => a.order - b.order);
    return await Promise.all(
      sortedProperties.map((property) => withImageUrls(ctx, property)),
    );
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
