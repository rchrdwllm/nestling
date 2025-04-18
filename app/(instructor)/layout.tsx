"use client";

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
    if (session.user.role !== "instructor") {
      return <Unauthorized />;
    }
  }

  if (!session) return null;

  return (
    <div className="min-h-screen flex items-stretch bg-secondary p-2 gap-2">
      <Sidebar />
      <div className="w-full bg-background border border-border rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;
