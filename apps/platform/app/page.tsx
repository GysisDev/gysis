import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { requirePlatformAdmin } from "../lib/auth";

export default function PlatformHome() {
  const isAuthenticated = requirePlatformAdmin();
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Platform</h1>
        <SignInButton />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Platform</h1>
      <SignOutButton />
    </div>
  );
}
