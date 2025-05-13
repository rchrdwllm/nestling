import ModuleCard from "@/components/instructor-access/courses-page/module-card/module-card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-3/5" />
        <hr />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};

export default Loading;
