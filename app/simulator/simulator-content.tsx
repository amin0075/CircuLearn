"use client";

import { ReactFlowProvider } from "@xyflow/react";

import { LessonPage } from "@src/components/content";
import Simulator from "@src/components/global/Simulations/LogicCircuitSimulator/LogicCircuitSimulatorLazy";

export default function SimulatorContent() {
  return (
    <LessonPage className="flex min-h-[min(100%,calc(100dvh-11rem))] flex-col gap-0 py-0">
      <ReactFlowProvider>
        <Simulator fillViewport />
      </ReactFlowProvider>
    </LessonPage>
  );
}
