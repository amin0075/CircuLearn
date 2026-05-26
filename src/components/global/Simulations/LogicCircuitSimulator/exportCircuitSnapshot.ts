import { getNodesBounds, getViewportForBounds, type Node } from "@xyflow/react";

/** Fractional inset around the diagram (0–1). Do not pass pixel values here. */
const VIEWPORT_PADDING_RATIO = 0.12;
const MIN_EXPORT_WIDTH = 400;
const MIN_EXPORT_HEIGHT = 300;
const MAX_EXPORT_DIMENSION = 4096;
const EXPORT_MIN_ZOOM = 1;
const EXPORT_MAX_ZOOM = 4;
const PIXEL_RATIO = 2;

const UI_CLASS_NAMES_TO_EXCLUDE = [
  "react-flow__minimap",
  "react-flow__controls",
  "react-flow__panel",
  "react-flow__attribution",
] as const;

export function shouldIncludeExportDomNode(domNode: unknown): boolean {
  if (!(domNode instanceof HTMLElement)) {
    return true;
  }

  return !UI_CLASS_NAMES_TO_EXCLUDE.some((className) =>
    domNode.classList.contains(className),
  );
}

function resolveExportBackground(flowRoot: HTMLElement): string {
  const pane = flowRoot.querySelector<HTMLElement>(".react-flow__pane");
  const source = pane ?? flowRoot;
  const { backgroundColor } = getComputedStyle(source);

  if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)") {
    return backgroundColor;
  }

  return getComputedStyle(document.documentElement).backgroundColor;
}

export function getExportDimensions(
  nodesBounds: ReturnType<typeof getNodesBounds>,
) {
  const paddedWidth = Math.ceil(
    nodesBounds.width * (1 + VIEWPORT_PADDING_RATIO * 2),
  );
  const paddedHeight = Math.ceil(
    nodesBounds.height * (1 + VIEWPORT_PADDING_RATIO * 2),
  );

  return {
    width: Math.min(
      MAX_EXPORT_DIMENSION,
      Math.max(MIN_EXPORT_WIDTH, paddedWidth),
    ),
    height: Math.min(
      MAX_EXPORT_DIMENSION,
      Math.max(MIN_EXPORT_HEIGHT, paddedHeight),
    ),
  };
}

/** Captures the full circuit diagram (all nodes) as a PNG data URL. */
export async function exportCircuitSnapshot(
  flowRoot: HTMLElement,
  nodes: Node[],
): Promise<string> {
  if (nodes.length === 0) {
    throw new Error(
      "Add at least one component before downloading a snapshot.",
    );
  }

  const viewport = flowRoot.querySelector<HTMLElement>(".react-flow__viewport");
  if (!viewport) {
    throw new Error("Could not find the simulator canvas to capture.");
  }

  const nodesBounds = getNodesBounds(nodes);
  const { width, height } = getExportDimensions(nodesBounds);
  const { x, y, zoom } = getViewportForBounds(
    nodesBounds,
    width,
    height,
    EXPORT_MIN_ZOOM,
    EXPORT_MAX_ZOOM,
    VIEWPORT_PADDING_RATIO,
  );

  const { toPng } = await import("html-to-image");

  return toPng(viewport, {
    backgroundColor: resolveExportBackground(flowRoot),
    width,
    height,
    pixelRatio: PIXEL_RATIO,
    cacheBust: true,
    filter: shouldIncludeExportDomNode,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x}px, ${y}px) scale(${zoom})`,
    },
  });
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
