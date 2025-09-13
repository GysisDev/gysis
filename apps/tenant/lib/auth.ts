import { auth } from "@clerk/nextjs/server";
import { api } from "../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { headers } from "next/headers";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

export async function requireTenantRole(roles: Array<"owner" | "admin" | "editor" | "member">) {
  const { userId } = await auth();
  console.log("userId", userId);
  if (!userId) return null;

  const host = (await headers()).get("host") || "";
  const client = new ConvexHttpClient(convexUrl);
  const tenant = await client.query(api.seed.getTenantByHost, { host });
  if (!tenant) throw new Error("Unknown tenant");

  // lookup user by clerkUserId then membership
  const users = await client.query(api.users.getByClerkId, { clerkUserId: userId });
  if (!users) throw new Error("User not registered");
  const membership = await client.query(api.memberships.getByUserAndTenant, {
    userId: users._id,
    tenantId: tenant._id
  });
  if (!membership || !roles.includes(membership.role)) {
    throw new Error("Forbidden");
  }

  return { tenant, userId: users._id, role: membership.role };
}