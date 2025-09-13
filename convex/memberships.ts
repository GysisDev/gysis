import { query } from "./_generated/server";
import { v } from "convex/values";

export const getByUserAndTenant = query({
  args: { userId: v.id("users"), tenantId: v.id("tenants") },
  handler: async (ctx, { userId, tenantId }) => {
    return await ctx.db
      .query("memberships")
      .withIndex("by_user_tenant", q => q.eq("userId", userId).eq("tenantId", tenantId))
      .first();
  }
});