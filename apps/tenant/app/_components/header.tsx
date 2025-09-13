"use client";
import { useTenant } from "../../lib/TenantContext";

export default function Header() {
  const tenant = useTenant();
  console.log("Tenant", tenant);
  return (
    <header className="p-4 border-b text-brand-text text-2xl">
      <strong>{tenant.brand?.name ?? tenant.slug}</strong>
    </header>
  );
}