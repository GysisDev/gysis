import { requireTenantRole } from "../../lib/auth";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

export default async function AdminHome() {
  const isAuthenticated = await requireTenantRole(["owner", "admin"]);
  if (!isAuthenticated) {
    return (<>
      <h1>Not authenticated</h1>
         <SignInButton />
      </>
    )
  }
  return (<>
      <h1>Authenticated as {isAuthenticated.role}</h1> 
       <SignOutButton />
    </>
  )
}