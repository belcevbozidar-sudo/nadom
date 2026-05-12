import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getVisibleReviews = query({
  args: {},
  handler: async (ctx) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_visible", (q) => q.eq("isVisible", true))
      .order("desc")
      .collect();
    return reviews;
  },
});

export const getAllReviews = query({
  args: {},
  handler: async (ctx) => {
    const reviews = await ctx.db.query("reviews").order("desc").collect();
    return reviews;
  },
});

export const createReview = mutation({
  args: {
    authorName: v.optional(v.string()),
    rating: v.number(),
    comment: v.string(),
    isVisible: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (args.rating < 1 || args.rating > 5) {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Оценката трябва да е между 1 и 5.",
      });
    }

    if (args.comment.trim().length === 0) {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Моля, напишете коментар.",
      });
    }

    const user = identity
      ? await ctx.db
          .query("users")
          .withIndex("by_token", (q) =>
            q.eq("tokenIdentifier", identity.tokenIdentifier),
          )
          .unique()
      : null;

    return await ctx.db.insert("reviews", {
      userId: user?._id,
      authorName:
        args.authorName?.trim() || user?.name || identity?.name || "Клиент",
      rating: Math.round(args.rating),
      comment: args.comment.trim(),
      isVisible: args.isVisible ?? true,
    });
  },
});

export const updateReview = mutation({
  args: {
    reviewId: v.id("reviews"),
    authorName: v.string(),
    rating: v.number(),
    comment: v.string(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    if (args.rating < 1 || args.rating > 5) {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Оценката трябва да е между 1 и 5.",
      });
    }

    await ctx.db.patch(args.reviewId, {
      authorName: args.authorName.trim() || "Клиент",
      rating: Math.round(args.rating),
      comment: args.comment.trim(),
      isVisible: args.isVisible,
    });
  },
});

export const toggleVisibility = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Ревюто не е намерено.",
      });
    }
    await ctx.db.patch(args.reviewId, { isVisible: !review.isVisible });
  },
});

export const deleteReview = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Ревюто не е намерено.",
      });
    }
    await ctx.db.delete(args.reviewId);
  },
});
