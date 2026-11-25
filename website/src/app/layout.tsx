import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import SwRegister from "@/components/sw-register";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: site.shortName },
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description, url: "/" },
  twitter: { card: "summary", title: site.name, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Dark by default; runs before paint so there is no flash.
const themeScript = `try{if(localStorage.getItem("theme")!=="light")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
