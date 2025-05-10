"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/ui/sidebar/sidebar";
import Unauthorized from "@/components/ui/unauthorized";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
    }
  }, [session, status]);

  if (status === "loading") return null;

  if (session) {
    if (session.user.role !== "admin") {
      return <Unauthorized />;
    }
  }

  return (
    <main className="min-h-screen flex items-stretch bg-secondary p-2 gap-2">
      <Sidebar />
      <ScrollArea className="w-full h-[calc(100vh-1rem)] bg-background border border-border rounded-xl">
        {children}
      </ScrollArea>
    </main>
  );
};

export default Layout;
