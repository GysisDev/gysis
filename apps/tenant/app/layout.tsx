import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getCurrentTenant } from "../lib/tenant";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Powered by Gysis Development",
  description: "Powered by Gysis Development",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const tenant = await getCurrentTenant();

  // Always define colors, but use fallback for each property individually
  const colors = {
    primary: tenant?.brand?.colors?.primary || "#0f766e",
    surface: tenant?.brand?.colors?.surface || "#ffffff",
    text: tenant?.brand?.colors?.text || "#0b1324"
  };
  console.log(colors);
  const name = tenant?.brand?.name || "Gysis Development";

  return (
    <ClerkProvider>
    <html lang="en">
     <body
  style={
    {
      "--brand-primary": colors.primary,
      "--brand-surface": colors.surface,
      "--brand-text": colors.text,
      "--color-brand-primary": colors.primary,
      "--color-brand-surface": colors.surface,
      "--color-brand-text": colors.text
    } as React.CSSProperties
  }
  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
>
        <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          <strong>{name}</strong>
        </header>
        <main style={{ maxWidth: 960, margin: "24px auto" }}>{children}</main>
      </body>
    </html>
    </ClerkProvider>  
  );
}
