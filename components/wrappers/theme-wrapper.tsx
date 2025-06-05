"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { ComponentProps, useMemo } from "react";

const excluded = [
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/forgot-password",
  "/api/auth/reset-password-verification",
];

const ThemeWrapper = ({
  children,
  ...props
}: ComponentProps<typeof ThemeProvider>) => {
  const pathname = usePathname();
  const forceLight = useMemo(() => {
    return excluded.includes(pathname);
  }, [pathname]);

  return (
    <ThemeProvider {...props} forcedTheme={forceLight ? "light" : undefined}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
