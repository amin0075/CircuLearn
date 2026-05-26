import { vi } from "vitest";

import {
  fallbackNodePosition,
  placeNodeInViewport,
} from "./placeNodeInViewport";

describe("placeNodeInViewport", () => {
  it("uses pane center client coordinates for screenToFlowPosition", () => {
    const screenToFlowPosition = vi.fn(() => ({ x: 42, y: 84 }));
    const wrapper = {
      getBoundingClientRect: () => ({
        left: 100,
        top: 50,
        width: 400,
        height: 300,
        right: 500,
        bottom: 350,
        x: 100,
        y: 50,
        toJSON: () => ({}),
      }),
    } as HTMLElement;

    const position = placeNodeInViewport(wrapper, screenToFlowPosition, 3);

    expect(screenToFlowPosition).toHaveBeenCalledWith({ x: 300, y: 200 });
    expect(position).toEqual({ x: 42, y: 84 });
  });

  it("falls back when wrapper has no measurable size", () => {
    const screenToFlowPosition = vi.fn();
    const wrapper = {
      getBoundingClientRect: () => ({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        right: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    } as HTMLElement;

    expect(placeNodeInViewport(wrapper, screenToFlowPosition, 2)).toEqual(
      fallbackNodePosition(2),
    );
    expect(screenToFlowPosition).not.toHaveBeenCalled();
  });
});
