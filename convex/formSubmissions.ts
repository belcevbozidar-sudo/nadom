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

export const create = mutation({
  args: {
    fullName: v.string(),
    service: v.string(),
    address: v.string(),
    region: v.string(),
    buildingType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.fullName.trim().length === 0) {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Моля, въведете име.",
      });
    }

    return await ctx.db.insert("formSubmissions", {
      fullName: args.fullName.trim(),
      service: args.service.trim(),
      address: args.address.trim(),
      region: args.region.trim(),
      buildingType: args.buildingType.trim(),
      message: args.message.trim(),
      status: "new",
      createdAt: new Date().toISOString(),
    });
  },
});

export const list = query({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    return await ctx.db
      .query("formSubmissions")
      .withIndex("by_time")
      .order("desc")
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    adminPassword: v.string(),
    submissionId: v.id("formSubmissions"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    await ctx.db.patch(args.submissionId, { status: args.status });
  },
});

export const remove = mutation({
  args: {
    adminPassword: v.string(),
    submissionId: v.id("formSubmissions"),
  },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    await ctx.db.delete(args.submissionId);
  },
});
