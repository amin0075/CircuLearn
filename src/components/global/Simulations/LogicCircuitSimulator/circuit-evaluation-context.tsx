"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Node } from "@xyflow/react";

import type { CircuitNodeData } from "@src/lib/circuit/types";

type CircuitContextValue = {
  runEvaluation: () => void;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  updateNodeData: (nodeId: string, partial: Partial<CircuitNodeData>) => void;
};

const CircuitContext = createContext<CircuitContextValue | null>(null);

export function CircuitEvaluationProvider({
  runEvaluation,
  setNodes,
  children,
}: {
  runEvaluation: () => void;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  children: ReactNode;
}) {
  const updateNodeData = useCallback(
    (nodeId: string, partial: Partial<CircuitNodeData>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...partial } }
            : node,
        ),
      );
    },
    [setNodes],
  );

  const value = useMemo(
    () => ({ runEvaluation, setNodes, updateNodeData }),
    [runEvaluation, setNodes, updateNodeData],
  );

  return (
    <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
  );
}

function useCircuitContext() {
  const ctx = useContext(CircuitContext);
  if (!ctx) {
    throw new Error(
      "Circuit hooks must be used within CircuitEvaluationProvider",
    );
  }
  return ctx;
}

export function useCircuitEvaluation() {
  return useCircuitContext().runEvaluation;
}

export function useCircuitNodes() {
  const { setNodes, updateNodeData } = useCircuitContext();
  return { setNodes, updateNodeData };
}
