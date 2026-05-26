import { beforeEach, describe, expect, it } from "vitest";

import { useUserPreferencesStore } from "./user-preferences";

describe("useUserPreferencesStore", () => {
  beforeEach(() => {
    useUserPreferencesStore.setState({
      hasAcceptedCookies: false,
      hasSeenUserGuide: false,
    });
  });

  it("tracks cookie consent", () => {
    useUserPreferencesStore.getState().setHasAcceptedCookies(true);
    expect(useUserPreferencesStore.getState().hasAcceptedCookies).toBe(true);
  });

  it("tracks user guide as seen", () => {
    useUserPreferencesStore.getState().setHasSeenUserGuide(true);
    expect(useUserPreferencesStore.getState().hasSeenUserGuide).toBe(true);
  });
});
