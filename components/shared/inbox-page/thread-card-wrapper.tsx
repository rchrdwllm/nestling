"use client";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

type ThreadCardWrapperProps = {
  children: ReactNode;
  channelId: string;
};

const ThreadCardWrapper = ({ children, channelId }: ThreadCardWrapperProps) => {
  const params = useParams();

  return (
    <div
      className={cn(
        "h-auto p-4 border-b border-border cursor-pointer transition-colors hover:bg-secondary",
        params?.channelId === channelId && "bg-secondary"
      )}
    >
      {children}
    </div>
  );
};

export default ThreadCardWrapper;
