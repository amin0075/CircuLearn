import { vi } from "vitest";

import {
  exportCircuitSnapshot,
  getExportDimensions,
  shouldIncludeExportDomNode,
} from "./exportCircuitSnapshot";

const toPngMock = vi.fn(() => Promise.resolve("data:image/png;base64,mock"));

vi.mock("html-to-image", () => ({
  toPng: (...args: unknown[]) => toPngMock(...args),
}));

vi.mock("@xyflow/react", () => ({
  getNodesBounds: vi.fn(() => ({ x: 200, y: 20, width: 500, height: 100 })),
  getViewportForBounds: vi.fn(() => ({ x: 10, y: 20, zoom: 1.1 })),
}));

describe("shouldIncludeExportDomNode", () => {
  it("excludes react-flow UI chrome", () => {
    const minimap = document.createElement("div");
    minimap.classList.add("react-flow__minimap");

    const controls = document.createElement("div");
    controls.classList.add("react-flow__controls");

    expect(shouldIncludeExportDomNode(minimap)).toBe(false);
    expect(shouldIncludeExportDomNode(controls)).toBe(false);
  });

  it("includes normal nodes", () => {
    const node = document.createElement("div");
    node.classList.add("react-flow__node");

    expect(shouldIncludeExportDomNode(node)).toBe(true);
  });
});

describe("getExportDimensions", () => {
  it("sizes the image from node bounds with padding, not a huge fixed canvas", () => {
    const { width, height } = getExportDimensions({
      x: 200,
      y: 20,
      width: 500,
      height: 100,
    });

    expect(width).toBe(620);
    expect(height).toBe(300);
  });
});

describe("exportCircuitSnapshot", () => {
  beforeEach(() => {
    toPngMock.mockClear();
  });

  it("throws when there are no nodes", async () => {
    await expect(
      exportCircuitSnapshot({} as HTMLElement, []),
    ).rejects.toThrow("Add at least one component");
  });

  it("throws when the viewport element is missing", async () => {
    const flowRoot = {
      querySelector: () => null,
    } as unknown as HTMLElement;

    await expect(
      exportCircuitSnapshot(flowRoot, [
        { id: "1", position: { x: 0, y: 0 }, data: {} },
      ]),
    ).rejects.toThrow("Could not find the simulator canvas");
  });

  it("captures viewport with computed dimensions", async () => {
    const viewport = document.createElement("div");
    viewport.className = "react-flow__viewport";

    const flowRoot = {
      querySelector: (selector: string) =>
        selector === ".react-flow__viewport" ? viewport : null,
    } as unknown as HTMLElement;

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      backgroundColor: "rgb(255, 255, 255)",
    } as CSSStyleDeclaration);

    const dataUrl = await exportCircuitSnapshot(flowRoot, [
      { id: "1", position: { x: 0, y: 0 }, data: {} },
    ]);

    expect(dataUrl).toBe("data:image/png;base64,mock");
    expect(toPngMock).toHaveBeenCalledWith(
      viewport,
      expect.objectContaining({
        width: 620,
        height: 300,
        pixelRatio: 2,
        filter: shouldIncludeExportDomNode,
      }),
    );
  });
});
