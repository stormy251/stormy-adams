"use client";

import React, { FC, PropsWithChildren } from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const AppThemeProvider: FC<ThemeProviderProps & PropsWithChildren> = function ({
  children,
  ...props
}) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default AppThemeProvider;
