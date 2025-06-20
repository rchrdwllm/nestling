import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="w-3/5 h-8" />
        <hr />
      </div>
      <div className="gap-4 grid grid-cols-1">
        <article className="flex flex-col gap-4 p-4 border border-border rounded-xl">
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="w-1/2 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-1/3 h-4" />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Loading;
