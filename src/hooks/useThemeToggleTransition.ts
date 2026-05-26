"use client";

import type { MouseEvent } from "react";
import { useTheme } from "@wrksz/themes/client/use-theme";

import { useHydrated } from "@src/hooks/useHydrated";

type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
};

type ThemeMode = "light" | "dark";

const getNextTheme = (isDark: boolean): ThemeMode => (isDark ? "light" : "dark");

const getRevealOrigin = (element: HTMLButtonElement) => {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const getRevealRadius = (x: number, y: number) => {
  const maxDistanceX = Math.max(x, window.innerWidth - x);
  const maxDistanceY = Math.max(y, window.innerHeight - y);

  return Math.hypot(maxDistanceX, maxDistanceY);
};

const setRevealCssVars = (x: number, y: number, radius: number) => {
  document.documentElement.style.setProperty("--theme-reveal-x", `${x}px`);
  document.documentElement.style.setProperty("--theme-reveal-y", `${y}px`);
  document.documentElement.style.setProperty("--theme-reveal-radius", `${radius}px`);
};

const canUseViewTransition = (documentWithTransition: DocumentWithViewTransition) => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return (
    !prefersReducedMotion &&
    typeof documentWithTransition.startViewTransition === "function"
  );
};

export function useThemeToggleTransition() {
  const { setTheme, systemTheme, resolvedTheme } = useTheme();
  const hydrated = useHydrated();

  const actualTheme = hydrated ? resolvedTheme || systemTheme || "light" : "light";
  const isDark = actualTheme === "dark";

  const handleThemeToggle = (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = getNextTheme(isDark);
    const documentWithTransition = document as DocumentWithViewTransition;

    if (!canUseViewTransition(documentWithTransition)) {
      setTheme(nextTheme);
      return;
    }

    const { x, y } = getRevealOrigin(event.currentTarget);
    const revealRadius = getRevealRadius(x, y);

    setRevealCssVars(x, y, revealRadius);

    document.documentElement.setAttribute("data-vt-theme", "");

    const transition = documentWithTransition.startViewTransition(() => {
      setTheme(nextTheme);
    });

    void transition.finished.finally(() => {
      document.documentElement.removeAttribute("data-vt-theme");
    });
  };

  return { isDark, handleThemeToggle };
}
