"use client";

import React, { createContext, useContext } from "react";

type Tenant = {
  _id: string;
  slug: string;
  hostnames?: string[];
  brand?: {
    name: string;
    logoUrl?: string;
    colors?: { primary: string; surface?: string; text?: string };
  };
  features?: { blog?: boolean; ecommerce?: boolean; members?: boolean };
  gtmId?: string | null;
};

const TenantContext = createContext<Tenant | null>(null);

export function TenantProvider({
  value,
  children,
}: {
  value: Tenant;
  children: React.ReactNode;
}) {
  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant(): Tenant {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error("useTenant must be used within <TenantProvider />");
  }
  return ctx;
}