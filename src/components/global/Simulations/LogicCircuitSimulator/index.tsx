"use client";

import React, { useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  useReactFlow,
} from "@xyflow/react";

import GateNode from "./GateNode";
import InputNode from "./InputNode";
import OutputNode from "./OutputNode";
import { getGateLessonUrl } from "@src/lib/gates/registry";
import { Button } from "@src/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@src/components/ui/tooltip";
import { Typography } from "@src/components/ui/typography";
import SimulatorDrawer from "./SimulatorDrawer";
import { CircuitEvaluationProvider } from "./circuit-evaluation-context";
import { useCircuitGraph } from "./useCircuitGraph";
import { useCircuitSnapshotExport } from "./useCircuitSnapshotExport";
import { useReactFlowTouchCompat } from "./useReactFlowTouchCompat";
import {
  CopyIcon,
  DownloadIcon,
  InfoIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { cn } from "@src/lib/utils";

const nodeTypes = {
  gateNode: GateNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};

interface SimulatorProps {
  isReadOnly?: boolean;
  initialData?: { nodes: Node[]; edges: Edge[] };
  /** Fills the simulator route card; embedded instances keep a fixed min-height. */
  fillViewport?: boolean;
  className?: string;
}

function SimulatorInner({
  initialData,
  isReadOnly,
  fillViewport = false,
  className,
}: SimulatorProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  const {
    nodes,
    edges,
    selectedNode,
    isDrawerOpen,
    setDrawerOpen,
    onInit,
    onConnect,
    onNodesChangeHandler,
    onEdgesChangeHandler,
    onSelectionChange,
    onPaneClick,
    addNode,
    duplicateNode,
    deleteNode,
    runEvaluation,
    setNodes,
    fitViewOptions,
  } = useCircuitGraph({
    initialData,
    isReadOnly,
    reactFlowWrapper,
    screenToFlowPosition: reactFlowInstance.screenToFlowPosition,
    getNodes: reactFlowInstance.getNodes,
    getEdges: reactFlowInstance.getEdges,
  });

  const { isExporting, downloadCanvasImage } = useCircuitSnapshotExport({
    reactFlowWrapper,
    getNodes: reactFlowInstance.getNodes,
  });

  useReactFlowTouchCompat(reactFlowWrapper);

  return (
    <CircuitEvaluationProvider runEvaluation={runEvaluation} setNodes={setNodes}>
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col md:flex-row",
          fillViewport
            ? "h-full min-h-[min(640px,calc(100dvh-11rem))] flex-1"
            : "min-h-[min(720px,calc(100dvh-12rem))]",
          className,
        )}
      >
        {!isReadOnly && (
          <div className="absolute top-4 left-4 z-10 md:hidden">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5"
              onClick={() => setDrawerOpen(true)}
            >
              <PlusIcon className="size-4" />
              <Typography variant="body-sm" className="text-nowrap">
                Add Elements
              </Typography>
            </Button>
          </div>
        )}

        {!isReadOnly && (
          <div className="absolute top-4 right-4 z-9 flex items-center gap-2">
            {selectedNode ? (
              <div className="flex h-6 items-center gap-0.5 rounded-md border border-border bg-card/95 shadow-sm backdrop-blur-sm">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 border-0 p-0"
                      onClick={duplicateNode}
                      aria-label="Duplicate node"
                    >
                      <CopyIcon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Duplicate Node</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 border-0 p-0"
                      onClick={deleteNode}
                      aria-label="Delete node"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete Node</TooltipContent>
                </Tooltip>

                {selectedNode.type === "gateNode" && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-6 border-0 p-0"
                        aria-label="Gate information"
                        onClick={() => {
                          const gateType = String(
                            selectedNode.data?.gateType || "",
                          );
                          const infoUrl = getGateLessonUrl(gateType);
                          if (infoUrl) {
                            window.open(infoUrl, "_blank");
                          }
                        }}
                      >
                        <InfoIcon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Gate Information</TooltipContent>
                  </Tooltip>
                )}
              </div>
            ) : null}

            <Button
              variant="default"
              size="sm"
              className="gap-1.5 shadow-sm"
              onClick={downloadCanvasImage}
              disabled={isExporting}
              aria-busy={isExporting}
            >
              <DownloadIcon className="size-4" />
              <Typography variant="body-xs" className="hidden md:inline">
                {isExporting ? "Exporting…" : "Download"}
              </Typography>
            </Button>
          </div>
        )}

        {!isReadOnly && (
          <SimulatorDrawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            addNode={addNode}
          />
        )}

        <div className="min-h-0 flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            {...(isReadOnly ? { deleteKeyCode: null } : {})}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChangeHandler}
            onEdgesChange={onEdgesChangeHandler}
            onConnect={onConnect}
            onInit={onInit}
            onSelectionChange={onSelectionChange}
            onPaneClick={onPaneClick}
            elementsSelectable={!isReadOnly}
            minZoom={0.25}
            maxZoom={2}
            fitViewOptions={fitViewOptions}
            className={cn(
              "logic-circuit-flow z-0 h-full w-full rounded-r-lg border border-border bg-muted/40",
              isReadOnly && "rounded-l-lg",
            )}
            nodeTypes={nodeTypes}
          >
            <MiniMap className="h-28 w-40 rounded-md border-border bg-card shadow-sm" />
            <Controls />
            <Background gap={20} />
          </ReactFlow>
        </div>
      </div>
    </CircuitEvaluationProvider>
  );
}

const Simulator: React.FC<SimulatorProps> = (props) => <SimulatorInner {...props} />;

export default Simulator;
