import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ProjectsSidebar from "@/components/shared/projects-page/projects-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  return (
    <>
      {user.role === "student" && student}
      {user.role !== "student" && (
        <main className="grid grid-cols-8 gap-x-2 bg-secondary">
          <ScrollArea className="sidebar-scroll-area col-span-2 h-[calc(100vh-1rem)]">
            <ProjectsSidebar />
          </ScrollArea>
          <ScrollArea className="overflow-y-auto col-span-6 h-[calc(100vh-1rem)] shadow-sm border border-border rounded-xl bg-background">
            {user.role === "admin" ? admin : instructor}
          </ScrollArea>
        </main>
      )}
    </>
  );
};

export default Layout;
