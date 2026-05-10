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
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        code: "UNAUTHENTICATED",
        message: "Трябва да влезете в акаунта си, за да оставите ревю.",
      });
    }

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

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Потребителят не е намерен.",
      });
    }

    return await ctx.db.insert("reviews", {
      userId: user._id,
      authorName: user.name ?? identity.name ?? "Анонимен",
      rating: Math.round(args.rating),
      comment: args.comment.trim(),
      isVisible: true,
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
