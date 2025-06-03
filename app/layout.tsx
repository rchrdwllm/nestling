import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Space_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionWrapper from "@/components/wrappers/session-wrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CacheRefresherWrapper from "@/components/wrappers/cache-refresher-wrapper";
import ThemeWrapper from "@/components/wrappers/theme-wrapper";
import NotificationWrapper from "@/components/wrappers/notification-wrapper";
import NativeNotificationWrapper from "@/components/wrappers/native-notification-wrapper";
import { getCurrentUser } from "@/lib/user";
import LayoutWrapper from "@/components/ui/layout-wrapper";
import UserCheckWrapper from "@/components/wrappers/user-check-wrapper";

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

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
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
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${montserrat.className} bg-secondary antialiased overflow-x-hidden`}
      >
        <SessionWrapper session={session}>
          <ThemeWrapper attribute="class" defaultTheme="light">
            <NextTopLoader showSpinner={false} color="#df1514" />
            <CacheRefresherWrapper>
              <NotificationWrapper authUser={JSON.stringify(user)}>
                <NativeNotificationWrapper authUser={JSON.stringify(user)}>
                  <UserCheckWrapper>
                    <LayoutWrapper>{children}</LayoutWrapper>
                  </UserCheckWrapper>
                </NativeNotificationWrapper>
              </NotificationWrapper>
            </CacheRefresherWrapper>
            <Toaster />
          </ThemeWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
