"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "@/components/ui/sidebar/sidebar";
import Unauthorized from "@/components/ui/unauthorized";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
    }
  }, [session, status]);

  if (status === "loading") return null;

  if (session) {
    if (session.user.role !== "student") {
      return <Unauthorized />;
    }
  }

  if (!session) return null;

  return (
    <div className="min-h-screen flex items-stretch bg-secondary p-2 gap-2">
      <Sidebar />
      <ScrollArea
        className={cn(
          "w-full h-[calc(100vh-1rem)] bg-background",
          segment !== "inbox" ? "border border-border rounded-xl" : null,
        )}
      >
        {children}
      </ScrollArea>
    </div>
  );
};

export default Layout;
