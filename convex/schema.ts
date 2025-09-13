import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  tenants: defineTable({
    slug: v.string(), // e.g., "alpha"
    hostnames: v.array(v.string()), // e.g., ["alpha.gysis.dev", "alpha.com"]
    brand: v.optional(
      v.object({
        name: v.string(),
        logoUrl: v.optional(v.string()),
        colors: v.optional(
          v.object({
            primary: v.string(),
            surface: v.optional(v.string()),
            text: v.optional(v.string())
          })
        )
      })
    ),
    features: v.optional(
      v.object({
        blog: v.boolean(),
        ecommerce: v.boolean(),
        members: v.boolean()
      })
    ),
    mollieApiKey: v.optional(v.string()), // stored encrypted by Convex
    resend: v.optional(
      v.object({
        fromEmail: v.string(),
        domainVerified: v.optional(v.boolean())
      })
    ),
    gtmId: v.optional(v.string())
  }).index("by_slug", ["slug"]),
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string()
  }).index("by_email", ["email"]).index("by_clerk", ["clerkUserId"]),
  memberships: defineTable({
    userId: v.id("users"),
    tenantId: v.id("tenants"),
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("editor"),
      v.literal("member")
    )
  })
  .index("by_user", ["userId"])
  .index("by_tenant", ["tenantId"])
  .index("by_user_tenant", ["userId", "tenantId"]),
  pages: defineTable({
    tenantId: v.id("tenants"),
    slug: v.string(), // "/about"
    title: v.string(),
    contentJson: v.any(),
    published: v.boolean()
  }).index("by_tenant_slug", ["tenantId", "slug"])
});     

export default schema;