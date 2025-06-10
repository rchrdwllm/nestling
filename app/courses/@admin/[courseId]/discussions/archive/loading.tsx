import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-3/5" />
        <hr />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <article className="border border-border rounded-xl p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
          </div>
        </article>
      </div>
    </div>
  );
};

export default Loading;
