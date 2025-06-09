import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/api/auth/signin");

  return <>{children}</>;
};

export default Layout;
