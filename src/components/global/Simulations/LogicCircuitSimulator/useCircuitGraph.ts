"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
  type OnSelectionChangeFunc,
  type ReactFlowInstance,
} from "@xyflow/react";

import type { CircuitNodeType, InputLevelId } from "@src/lib/circuit/types";
import type { LogicGateId } from "@src/lib/gates/registry";
import { notify } from "@src/utils/notify";

import { createCircuitNode } from "./createCircuitNode";
import { evaluateCircuit } from "./evaluateCircuit";
import { initialEdges, initialNodes } from "./initialData";
import { placeNodeInViewport } from "./placeNodeInViewport";

const FIT_VIEW_OPTIONS = { padding: 0.35, maxZoom: 0.85, duration: 150 };

type UseCircuitGraphOptions = {
  initialData?: { nodes: Node[]; edges: Edge[] };
  isReadOnly?: boolean;
  reactFlowWrapper: RefObject<HTMLDivElement | null>;
  screenToFlowPosition: ReactFlowInstance["screenToFlowPosition"];
  getNodes: () => Node[];
  getEdges: () => Edge[];
};

export function useCircuitGraph({
  initialData,
  isReadOnly,
  reactFlowWrapper,
  screenToFlowPosition,
  getNodes,
  getEdges,
}: UseCircuitGraphOptions) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialData?.nodes ?? initialNodes,
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialData?.edges ?? initialEdges,
  );
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isFitViewDone, setIsFitViewDone] = useState(false);

  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      if (!isFitViewDone) {
        instance.fitView(FIT_VIEW_OPTIONS);
        setIsFitViewDone(true);
      }
    },
    [isFitViewDone],
  );

  const runEvaluation = useCallback(() => {
    const result = evaluateCircuit(getNodes(), getEdges());
    setNodes(result.nodes);
    setEdges(result.edges);
  }, [getEdges, getNodes, setEdges, setNodes]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      if (isReadOnly) return;

      if (params.source === params.target) {
        notify({
          message: "Cannot connect a gate to itself",
          type: "error",
        });
        return;
      }

      setEdges((eds) => {
        const updatedEdges = eds.filter(
          (edge) =>
            !(
              edge.target === params.target &&
              edge.targetHandle === params.targetHandle
            ) &&
            !(
              edge.source === params.source &&
              edge.sourceHandle === params.sourceHandle
            ),
        );
        return addEdge(params, updatedEdges);
      });
      queueMicrotask(() => runEvaluation());
    },
    [isReadOnly, runEvaluation, setEdges],
  );

  const onNodesChangeHandler: OnNodesChange = (changes) => {
    onNodesChange(changes);
    if (changes.some((change) => change.type === "remove")) {
      queueMicrotask(() => runEvaluation());
    }
  };

  const onEdgesChangeHandler: OnEdgesChange = (changes) => {
    if (!isReadOnly) {
      onEdgesChange(changes);
      queueMicrotask(() => runEvaluation());
    }
  };

  const onSelectionChange: OnSelectionChangeFunc = useCallback(({ nodes: selected }) => {
    setSelectedNode(selected.length === 1 ? selected[0]! : null);
  }, []);

  const clearNodeSelection = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) =>
        node.selected ? { ...node, selected: false } : node,
      ),
    );
  }, [setNodes]);

  const addNode = useCallback(
    (nodeType: CircuitNodeType, gateType: LogicGateId | InputLevelId = "") => {
      setNodes((nds) => {
        const position = placeNodeInViewport(
          reactFlowWrapper.current,
          screenToFlowPosition,
          nds.length,
        );
        return nds.concat(createCircuitNode(nodeType, gateType, position));
      });
      setDrawerOpen(false);
      queueMicrotask(() => runEvaluation());
    },
    [reactFlowWrapper, runEvaluation, screenToFlowPosition, setNodes],
  );

  const duplicateNode = useCallback(() => {
    if (!selectedNode) return;

    const { type, data } = selectedNode;
    if (type && data?.gateType !== undefined) {
      addNode(
        type as CircuitNodeType,
        String(data.gateType) as LogicGateId | InputLevelId,
      );
    } else {
      addNode((type || "inputNode") as CircuitNodeType);
    }
  }, [addNode, selectedNode]);

  const deleteNode = useCallback(() => {
    if (!selectedNode) return;

    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id,
      ),
    );
    setSelectedNode(null);
    clearNodeSelection();
    queueMicrotask(() => runEvaluation());
  }, [clearNodeSelection, runEvaluation, selectedNode, setEdges, setNodes]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    clearNodeSelection();
  }, [clearNodeSelection]);

  useEffect(() => {
    runEvaluation();
  }, [runEvaluation]);

  return {
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
    fitViewOptions: FIT_VIEW_OPTIONS,
  };
}
