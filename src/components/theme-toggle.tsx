"use client";

import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@src/components/ui/button";
import { useHydrated } from "@src/hooks/useHydrated";
import { useThemeToggleTransition } from "@src/hooks/useThemeToggleTransition";

export function ThemeToggle() {
  const mounted = useHydrated();
  const { isDark, handleThemeToggle } = useThemeToggleTransition();

  if (!mounted) {
    return (
      <div
        className="size-9 shrink-0 animate-pulse rounded-md bg-muted/40"
        aria-hidden
      />
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={handleThemeToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <SunIcon className="size-4 shrink-0" aria-hidden />
      ) : (
        <MoonIcon className="size-4 shrink-0" aria-hidden />
      )}
    </Button>
  );
}
