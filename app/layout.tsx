import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/wrappers/session-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CacheRefresherWrapper from "@/components/wrappers/cache-refresher-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nestling",
  description: "A Web-based Learning Management System for Leave a Nest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} antialiased overflow-x-hidden`}
      >
        <SessionWrapper session={session}>
          <NextTopLoader showSpinner={false} color="#df1514" />
          <CacheRefresherWrapper>{children}</CacheRefresherWrapper>
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
