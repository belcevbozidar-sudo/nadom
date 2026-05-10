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

const serviceFields = {
  category: v.string(),
  title: v.string(),
  description: v.string(),
  image: v.optional(v.string()),
  href: v.optional(v.string()),
  icon: v.string(),
  order: v.number(),
  isVisible: v.boolean(),
};

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();
    return services
      .filter((service) => service.isVisible)
      .sort(
        (a, b) => a.category.localeCompare(b.category) || a.order - b.order,
      );
  },
});

export const listAdmin = query({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    const services = await ctx.db.query("services").collect();
    return services.sort(
      (a, b) => a.category.localeCompare(b.category) || a.order - b.order,
    );
  },
});

export const seedDefaults = mutation({
  args: {
    adminPassword: v.string(),
    services: v.array(v.object(serviceFields)),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    const existing = await ctx.db.query("services").first();
    if (existing) return null;

    for (const service of args.services) {
      await ctx.db.insert("services", service);
    }
  },
});

export const create = mutation({
  args: {
    adminPassword: v.string(),
    service: v.object(serviceFields),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    return await ctx.db.insert("services", args.service);
  },
});

export const update = mutation({
  args: {
    adminPassword: v.string(),
    serviceId: v.id("services"),
    service: v.object(serviceFields),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    await ctx.db.patch(args.serviceId, args.service);
  },
});

export const remove = mutation({
  args: {
    adminPassword: v.string(),
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    await ctx.db.delete(args.serviceId);
  },
});
