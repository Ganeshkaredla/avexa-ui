"use client";
import { Switch, FormControlLabel } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
      }
      label={isDark ? "Dark" : "Light"}
    />
  );
}
