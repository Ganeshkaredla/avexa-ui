"use client";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";
import { useMemo } from "react";
export default function MUIThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useNextTheme();
  const muiTheme = useMemo(
    () =>
      createTheme({ palette: { mode: theme === "dark" ? "dark" : "light" } }),
    [theme]
  );
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
