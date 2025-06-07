import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({
  children,
  admin,
  instructor,
  student,
}: {
  children: ReactNode;
  admin: ReactNode;
  instructor: ReactNode;
  student: ReactNode;
}) => {
  const user = await getCurrentUser();

  if (!user) return redirect("/api/auth/signin");

  return user.role === "student"
    ? student
    : user.role === "instructor"
    ? instructor
    : user.role === "admin"
    ? admin
    : null;
};

export default Layout;
