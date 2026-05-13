import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

const ADMIN_PASSWORD = "1122334455";

function assertAdmin(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "Нямате достъп до тази операция.",
    });
  }
}

export const generateUploadUrl = mutation({
  args: { adminPassword: v.string() },
  handler: async (ctx, args) => {
    assertAdmin(args.adminPassword);
    return await ctx.storage.generateUploadUrl();
  },
});
