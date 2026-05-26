"use client";

import { useEffect, type RefObject } from "react";

function simulateTouchToMouse(e: TouchEvent) {
  const touch = e.touches[0];
  if (!touch || !e.target) return;

  const simulatedEvent = new MouseEvent("mousedown", {
    bubbles: true,
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  (e.target as HTMLElement).dispatchEvent(simulatedEvent);
}

function simulateTouchEndToMouse(e: TouchEvent) {
  const touch = e.changedTouches[0];
  if (!touch || !e.target) return;

  const simulatedEvent = new MouseEvent("mouseup", {
    bubbles: true,
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  (e.target as HTMLElement).dispatchEvent(simulatedEvent);
}

export function useReactFlowTouchCompat(
  reactFlowWrapper: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const reactFlowContainer = reactFlowWrapper.current;
    if (!reactFlowContainer) return;

    reactFlowContainer.addEventListener("touchstart", simulateTouchToMouse);
    reactFlowContainer.addEventListener("touchend", simulateTouchEndToMouse);

    return () => {
      reactFlowContainer.removeEventListener("touchstart", simulateTouchToMouse);
      reactFlowContainer.removeEventListener("touchend", simulateTouchEndToMouse);
    };
  }, [reactFlowWrapper]);
}
