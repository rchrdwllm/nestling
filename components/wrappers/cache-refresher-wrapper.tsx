"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const CacheRefresherWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const navEntries = performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && (navEntries[0] as any).type === "reload") {
        fetch(`/api/revalidate`, {
          method: "POST",
          body: JSON.stringify({ pathname }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) router.refresh();
            else console.error(data.error);
          })
          .catch(console.error);
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default CacheRefresherWrapper;
