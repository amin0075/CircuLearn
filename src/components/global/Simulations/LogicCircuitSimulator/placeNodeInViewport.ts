import type { ReactFlowInstance } from "@xyflow/react";

const FALLBACK_BASE_X = 200;
const FALLBACK_BASE_Y = 80;
const FALLBACK_ROW_HEIGHT = 60;

export function fallbackNodePosition(nodeCount: number): { x: number; y: number } {
  return {
    x: FALLBACK_BASE_X,
    y: FALLBACK_BASE_Y + nodeCount * FALLBACK_ROW_HEIGHT,
  };
}

type ScreenToFlow = ReactFlowInstance["screenToFlowPosition"];

export function placeNodeInViewport(
  wrapper: HTMLElement | null,
  screenToFlowPosition: ScreenToFlow,
  nodeCount: number,
): { x: number; y: number } {
  if (!wrapper) {
    return fallbackNodePosition(nodeCount);
  }

  const rect = wrapper.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return fallbackNodePosition(nodeCount);
  }

  const clientX = rect.left + rect.width / 2;
  const clientY = rect.top + rect.height / 2;

  try {
    return screenToFlowPosition({ x: clientX, y: clientY });
  } catch {
    return fallbackNodePosition(nodeCount);
  }
}
