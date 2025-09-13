import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk", q => q.eq("clerkUserId", clerkUserId))
      .unique();
  }
});