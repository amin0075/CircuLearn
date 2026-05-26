import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserPreferencesState = {
  hasAcceptedCookies: boolean;
  hasSeenUserGuide: boolean;
  setHasAcceptedCookies: (accepted: boolean) => void;
  setHasSeenUserGuide: (seen: boolean) => void;
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      hasAcceptedCookies: false,
      hasSeenUserGuide: false,
      setHasAcceptedCookies: (hasAcceptedCookies) => set({ hasAcceptedCookies }),
      setHasSeenUserGuide: (hasSeenUserGuide) => set({ hasSeenUserGuide }),
    }),
    { name: "circulearn-preferences" },
  ),
);
