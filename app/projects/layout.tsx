import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import AdminProjectSidebar from "@/components/admin-access/projects-page/admin-project-sidebar";

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

  //   return user.role === "student"
  //     ? student
  //     : user.role === "instructor"
  //       ? instructor
  //       : user.role === "admin"
  //         ? admin
  //         : null;
  return (
    <>
      {user.role === "student" && student}
      {user.role === "instructor" && instructor}
      {user.role === "admin" && (
        <main className="grid grid-cols-8 gap-x-2 bg-secondary h-[calc(100vh-1rem)]">
          <div className="col-span-2 h-full">
            <AdminProjectSidebar />
          </div>
          <div className="col-span-6 h-full shadow-sm border border-border rounded-xl bg-background">
            {admin}
          </div>
        </main>
      )}
    </>
  );
};

export default Layout;
