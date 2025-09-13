import { auth } from "@clerk/nextjs/server";

const ADMINS = (process.env.GYSIS_ADMINS || "").split(",").map(e => e.trim().toLowerCase());

export async function requirePlatformAdmin() {
  const { userId, sessionClaims } = await auth();
  if (!userId) return null;
  const email = (sessionClaims?.email as string | undefined)?.toLowerCase();
  console.log("email", email);
  if (!email || !ADMINS.includes(email)) return null;
  return { userId, email };
}