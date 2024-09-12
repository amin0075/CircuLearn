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
  fullscreen: boolean; // New state for fullscreen
  changePrimaryColor: (color: IColor) => void;
  changeDarkMode: () => void;
  changeSidebarBg: (value: boolean) => void;
  changeHideSensitiveValue: () => void;
  changeSidebarExpantion: (value: boolean) => void;
  setFullscreen: (value: boolean) => void; // New setter for fullscreen
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
        fullscreen: false, // Initialize as false
        changePrimaryColor: (color: IColor) =>
          set((_) => ({ primaryColor: color })),
        changeDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        changeHideSensitiveValue: () =>
          set((state) => ({ hideSensitiveValue: !state.hideSensitiveValue })),
        changeSidebarBg: (value: boolean) =>
          set((_) => ({ sidebarTransparent: value })),
        changeSidebarExpantion: (value: boolean) =>
          set((_) => ({ sidebarExpand: value })),
        setFullscreen: (value: boolean) => set((_) => ({ fullscreen: value })), // Setter for fullscreen
      }),
      {
        name: "theme-storage",
      }
    )
  )
);

export { useThemeStore };
