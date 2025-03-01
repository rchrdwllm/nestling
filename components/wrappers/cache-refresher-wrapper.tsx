"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const CacheRefresherWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const handleBeforeUnload = () => {
    fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pathname }),
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};

export default CacheRefresherWrapper;
