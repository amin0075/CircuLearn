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
  changePrimaryColor: (color: IColor) => void;
  changeDarkMode: () => void;
  changeSidebarBg: (value: boolean) => void;
  changeHideSensitiveValue: () => void;
  changeSidebarExpantion: (value: boolean) => void;
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
        changePrimaryColor: (color: IColor) =>
          set((_) => ({ primaryColor: color })),
        changeDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
        changeHideSensitiveValue: () =>
          set((state) => ({ hideSensitiveValue: !state.hideSensitiveValue })),
        changeSidebarBg: (value: boolean) =>
          set((_) => ({ sidebarTransparent: value })),
        changeSidebarExpantion: (value: boolean) =>
          set((_) => ({ sidebarExpand: value })),
      }),
      {
        name: "theme-storage",
      }
    )
  )
);

export { useThemeStore };
