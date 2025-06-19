import { getCurrentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ProjectsSidebar from "@/components/shared/projects-page/projects-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarCollapseBtn from "@/components/shared/projects-page/sidebar-collapse-btn";
import ProjectsSidebarCollapser from "@/components/shared/projects-page/projects-sidebar-collapser";
import ProjectsAreaExpander from "@/components/shared/projects-page/projects-area-expander";

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
        <main className="gap-x-2 grid grid-cols-8 bg-secondary">
          <ProjectsSidebarCollapser>
            <ScrollArea className="col-span-2 h-[calc(100vh-1rem)] sidebar-scroll-area">
              <ProjectsSidebar />
            </ScrollArea>
          </ProjectsSidebarCollapser>
          <ProjectsAreaExpander>
            <ScrollArea className="bg-background shadow-sm border border-border rounded-xl h-[calc(100vh-1rem)] overflow-y-auto">
              <div className="px-3 pt-6">
                <SidebarCollapseBtn />
              </div>
              {user.role === "admin" ? admin : instructor}
            </ScrollArea>
          </ProjectsAreaExpander>
        </main>
      )}
    </>
  );
};

export default Layout;
