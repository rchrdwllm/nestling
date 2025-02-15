"use client";

import Unauthorized from "@/components/ui/unauthorized";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
    }

    console.log(session);
  }, [session, status]);

  if (status === "loading") return null;

  if (session) {
    if (session.user.role !== "student") {
      return <Unauthorized />;
    }
  }

  return <>{children}</>;
};

export default Layout;
