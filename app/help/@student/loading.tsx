"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";

const Loading = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex flex-col p-6 gap-10 transition-opacity duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* User Manual skeleton */}
      <Skeleton className="h-10 w-1/3 mb-6 mx-auto" />
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="flex flex-col items-center text-center flex-1 h-56 w-full md:w-64 rounded-xl p-6"
          >
            <Skeleton className="h-10 w-10 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </Skeleton>
        ))}
      </div>
      {/* Help | FAQs title skeleton */}
      <div className="flex items-center gap-4 mb-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
      <Skeleton className="h-1 w-full mb-6" />
      {/* FAQ title skeleton */}
      <Skeleton className="h-8 w-2/5 mb-6" />
      {/* FAQ items skeleton */}
      <Skeleton className="flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded" />
        ))}
      </Skeleton>
    </div>
  );
};

export default Loading;
