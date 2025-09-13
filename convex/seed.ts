import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTenantByHost = query({
  args: { host: v.string() },
  handler: async (ctx, { host }) => {
    const all = await ctx.db.query("tenants").collect();
    return all.find(t =>
      (t.hostnames || []).some(h => h.toLowerCase() === host.toLowerCase())
    ) ?? null;
  }
});

export const createTenant = internalMutation({
  args: {
    slug: v.string(),
    hostnames: v.array(v.string()),
    brandName: v.string()
  },
  handler: async (ctx, { slug, hostnames, brandName }) => {
    return await ctx.db.insert("tenants", {
      slug,
      hostnames,
      brand: { name: brandName },
      features: { blog: true, ecommerce: false, members: false }
    });
  }
});