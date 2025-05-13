"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar/sidebar";
import { ScrollArea } from "./scroll-area";
import { useUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { user } = useUser();

  if (
    !user ||
    pathname === "/api/auth/signin" ||
    pathname === "/api/auth/signup"
  )
    return children;

  return (
    <main className="min-h-screen flex items-stretch bg-secondary p-2 gap-2">
      <Sidebar />
      <ScrollArea className="w-full h-[calc(100vh-1rem)] bg-background border border-border rounded-xl">
        {children}
      </ScrollArea>
    </main>
  );
};

export default LayoutWrapper;
