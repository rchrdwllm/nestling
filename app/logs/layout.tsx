import Unauthorized from "@/components/ui/unauthorized";
import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/api/auth/signin");

  if (user.role !== "admin") return <Unauthorized />;

  return <>{children}</>;
};

export default Layout;
