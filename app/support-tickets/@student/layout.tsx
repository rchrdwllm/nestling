import Unauthorized from "@/components/ui/unauthorized";
import { getOptimisticUser } from "@/lib/user";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getOptimisticUser();

  if (user.role !== "student") return <Unauthorized />;

  return <>{children}</>;
};

export default Layout;
