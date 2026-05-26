import type { Edge, Node } from "@xyflow/react";

import type { LogicGateId } from "@src/utils/gateLogic";

export type CircuitNodeType = "inputNode" | "gateNode" | "outputNode";

export type InputLevelId = "high" | "low" | "";

export type InputNodeData = {
  label: string;
  value: number;
  isDynamic?: boolean;
  gateType?: InputLevelId;
};

export type GateNodeData = {
  gateType: LogicGateId;
  value: number;
  label?: string;
  isDynamic?: boolean;
};

export type OutputNodeData = {
  label: string;
  value: number;
  gateType?: string;
  isDynamic?: boolean;
};

export type CircuitNodeData = InputNodeData | GateNodeData | OutputNodeData;

export type CircuitSnapshot = {
  nodes: Node[];
  edges: Edge[];
};
