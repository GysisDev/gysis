import { headers } from "next/headers";
import { api } from "../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

export async function getCurrentTenant() {
  const headersList = await headers();
  const host = headersList.get("x-tenant-host") || headersList.get("host") || "";
  const client = new ConvexHttpClient(convexUrl);
  const tenant = await client.query(api.seed.getTenantByHost, { host });
  if (!tenant) {
    return null;
  }
  return tenant;
}