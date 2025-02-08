import { auth } from "@/auth";
import Unauthorized from "@/components/ui/unauthorized";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  if (session.user.role !== "instructor") {
    return <Unauthorized />;
  }

  return <>{children}</>;
};

export default Layout;
