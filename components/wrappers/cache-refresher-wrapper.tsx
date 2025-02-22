"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const CacheRefresherWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleRevalidate = async () => {
    const res = await fetch(`/api/revalidate`, {
      method: "POST",
      body: JSON.stringify({ pathname }),
    });
    const data = await res.json();

    if (data.error) {
      console.error(data.error);
    } else if (data.success) {
      router.refresh();
    }
  };

  useEffect(() => {
    if (
      (performance.getEntriesByType("navigation")[0] as any).type === "reload"
    ) {
      handleRevalidate();
    }
  }, []);

  return <>{children}</>;
};

export default CacheRefresherWrapper;
