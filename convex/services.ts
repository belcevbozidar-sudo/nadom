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

async function getImageUrl(ctx: any, value?: string) {
  if (!value) return undefined;
  if (/^(https?:|data:)/.test(value)) return value;
  return (await ctx.storage.getUrl(value as Id<"_storage">)) ?? value;
}

export const listPublic = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();
    const visibleServices = services
      .filter((service) => service.isVisible)
      .sort(
        (a, b) => a.category.localeCompare(b.category) || a.order - b.order,
      );
    return await Promise.all(
      visibleServices.map(async (service) => ({
        ...service,
        imageUrl: await getImageUrl(ctx, service.image),
      })),
    );
  },
});

export const listAdmin = query({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    const services = await ctx.db.query("services").collect();
    const sortedServices = services.sort(
      (a, b) => a.category.localeCompare(b.category) || a.order - b.order,
    );
    return await Promise.all(
      sortedServices.map(async (service) => ({
        ...service,
        imageUrl: await getImageUrl(ctx, service.image),
      })),
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
