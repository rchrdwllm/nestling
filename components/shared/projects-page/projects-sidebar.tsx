import CourseSectionLink from "@/components/shared/courses-page/course-section-link";
import ProjectNavLink from "@/components/shared/projects-page/project-nav-link";
import SidebarCreateBtn from "@/components/shared/projects-page/sidebar-create-btn";
import { getProjectsOfUser } from "@/lib/project";
import { getOptimisticUser } from "@/lib/user";
import React from "react";

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
    <aside className="overflow-y-auto flex flex-col gap-4 py-6 border rounded-xl border-border bg-background h-full shadow-sm">
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
