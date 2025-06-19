import CourseSectionLink from "@/components/shared/courses-page/course-section-link";
import ProjectNavLink from "@/components/shared/projects-page/project-nav-link";
import SidebarCreateBtn from "@/components/shared/projects-page/sidebar-create-btn";
import { getProjectsOfUser } from "@/lib/project";
import { getOptimisticUser } from "@/lib/user";
import React from "react";
import SidebarBackBtn from "./sidebar-back-btn";

const ProjectsSidebar = async () => {
  const user = await getOptimisticUser();
  const { success: projects, error: projectsError } = await getProjectsOfUser(
    user.id
  );

  if (projectsError) {
    return <h1>{projectsError}</h1>;
  }

  if (!projects) {
    return <h1>No projects found</h1>;
  }

  return (
    <aside className="flex flex-col gap-4 bg-background shadow-sm py-6 border border-border rounded-xl h-full">
      <SidebarBackBtn />
      <div className="flex flex-col gap-2 px-4">
        <CourseSectionLink segments={["projects"]} href="/projects">
          Home
        </CourseSectionLink>
        <CourseSectionLink segments={["archive"]} href="/projects/archive">
          Archive
        </CourseSectionLink>
      </div>
      <div className="flex justify-between items-center px-4">
        <h1 className="font-semibold">Projects</h1>
        <SidebarCreateBtn />
      </div>
      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectNavLink key={project.id} href={`/projects/${project.id}`}>
            {project.title}
          </ProjectNavLink>
        ))}
      </div>
    </aside>
  );
};

export default ProjectsSidebar;
