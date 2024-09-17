import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
// types
import { IColor } from "@src/@types/color";

interface ThemeState {
  primaryColor: IColor;
  darkMode: boolean;
  sidebarTransparent: boolean;
  hideSensitiveValue: boolean;
  sidebarExpand: boolean;
  fullscreen: boolean;
  isFirstVisit: boolean;
  hasAcceptedCookies: boolean; // New state for tracking cookie acceptance
  changePrimaryColor: (color: IColor) => void;
  changeDarkMode: () => void;
  changeSidebarBg: (value: boolean) => void;
  changeHideSensitiveValue: () => void;
  changeSidebarExpantion: (value: boolean) => void;
  setFullscreen: (value: boolean) => void;
  setFirstVisit: (value: boolean) => void;
  setHasAcceptedCookies: (value: boolean) => void; // New setter function for cookie state
}

const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        primaryColor: "red",
        darkMode: true,
        sidebarTransparent: false,
        hideSensitiveValue: false,
        sidebarExpand: true,
        fullscreen: false,
        isFirstVisit: true,
        hasAcceptedCookies: false,
        changePrimaryColor: (color: IColor) =>
          set((_) => ({ primaryColor: color })),
        changeDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        changeHideSensitiveValue: () =>
          set((state) => ({ hideSensitiveValue: !state.hideSensitiveValue })),
        changeSidebarBg: (value: boolean) =>
          set((_) => ({ sidebarTransparent: value })),
        changeSidebarExpantion: (value: boolean) =>
          set((_) => ({ sidebarExpand: value })),
        setFullscreen: (value: boolean) => set((_) => ({ fullscreen: value })),
        setFirstVisit: (value: boolean) =>
          set((_) => ({ isFirstVisit: value })),
        setHasAcceptedCookies: (value: boolean) =>
          set((_) => ({ hasAcceptedCookies: value })),
      }),
      {
        name: "theme-storage", // Persist data to localStorage
      }
    )
  )
);

export { useThemeStore };
