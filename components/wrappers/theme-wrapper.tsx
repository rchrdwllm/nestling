"use client";

import { ThemeProvider } from "next-themes";
import { ComponentProps, ReactNode } from "react";

const ThemeWrapper = ({
  children,
  ...props
}: ComponentProps<typeof ThemeProvider>) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
