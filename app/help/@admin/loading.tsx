import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col p-6 gap-10">
      {/* Header skeleton */}
      <Skeleton className="h-10 w-1/3 mb-2" />
      <Skeleton className="h-1 w-full mb-6" />
      {/* FAQ title skeleton */}
      <Skeleton className="h-8 w-2/5 mb-6" />
      {/* FAQ items skeleton */}
      <Skeleton className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded" />
        ))}
      </Skeleton>
      {/* Button skeleton */}
      <Skeleton className="flex justify-center mt-8">
        <Skeleton className="h-12 w-72 rounded-full" />
      </Skeleton>
    </div>
  );
};

export default Loading;
