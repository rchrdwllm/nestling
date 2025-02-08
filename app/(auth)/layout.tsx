import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    if (session.user.role === "student") {
      return redirect("/student-dashboard");
    }

    if (session.user.role === "instructor") {
      return redirect("/instructor-dashboard");
    }

    if (session.user.role === "admin") {
      return redirect("/admin-dashboard");
    }
  }

  return <>{children}</>;
};

export default Layout;
