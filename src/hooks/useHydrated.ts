"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** True after client mount; avoids hydration mismatch for theme-dependent UI. */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
