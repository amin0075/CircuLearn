"use client";

import { useState, type RefObject } from "react";

import { notify } from "@src/utils/notify";

import {
  downloadDataUrl,
  exportCircuitSnapshot,
} from "./exportCircuitSnapshot";

type UseCircuitSnapshotExportOptions = {
  reactFlowWrapper: RefObject<HTMLDivElement | null>;
  getNodes: () => import("@xyflow/react").Node[];
};

export function useCircuitSnapshotExport({
  reactFlowWrapper,
  getNodes,
}: UseCircuitSnapshotExportOptions) {
  const [isExporting, setIsExporting] = useState(false);

  const downloadCanvasImage = async () => {
    const flowRoot = reactFlowWrapper.current?.querySelector<HTMLElement>(
      ".react-flow",
    );
    if (!flowRoot || isExporting) return;

    setIsExporting(true);
    try {
      const dataUrl = await exportCircuitSnapshot(flowRoot, getNodes());
      const date = new Date().toISOString().slice(0, 10);
      downloadDataUrl(dataUrl, `circuit-snapshot-${date}.png`);
    } catch (error) {
      notify({
        message:
          error instanceof Error
            ? error.message
            : "Could not download the circuit snapshot.",
        type: "error",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, downloadCanvasImage };
}
