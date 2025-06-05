"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";

const ThemeWrapper = ({
  children,
  ...props
}: ComponentProps<typeof ThemeProvider>) => {
  const pathname = usePathname();
  const forceLight = useMemo(() => {
    return pathname === "/api/auth/signin" || pathname === "/api/auth/signup";
  }, [pathname]);

  return (
    <ThemeProvider {...props} forcedTheme={forceLight ? "light" : undefined}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
