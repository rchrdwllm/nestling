import { getArchivedCourseModules } from "@/lib/module";
import React from "react";
import ModuleCard from "./module-card/module-card";

const ArchivedModules = async ({ courseId }: { courseId: string }) => {
  const { success: archivedModules, error } = await getArchivedCourseModules(
    courseId
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!archivedModules) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {archivedModules.map((module) => (
        <ModuleCard key={module.id} {...module} />
      ))}
    </div>
  );
};

export default ArchivedModules;
