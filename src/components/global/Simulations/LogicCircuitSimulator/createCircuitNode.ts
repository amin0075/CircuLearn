import type { Node } from "@xyflow/react";

import type {
  CircuitNodeType,
  InputLevelId,
} from "@src/lib/circuit/types";
import type { LogicGateId } from "@src/lib/gates/registry";

export type CircuitGateType = LogicGateId | InputLevelId;

export function createCircuitNode(
  nodeType: CircuitNodeType,
  gateType: CircuitGateType = "",
  position: { x: number; y: number },
): Node {
  let label: string;
  let value: number;
  let isDynamic = true;

  if (nodeType === "inputNode") {
    if (gateType === "high") {
      label = "High (1)";
      value = 1;
      isDynamic = false;
    } else if (gateType === "low") {
      label = "Low (0)";
      value = 0;
      isDynamic = false;
    } else {
      label = "Input";
      value = 0;
    }
  } else if (nodeType === "outputNode") {
    label = "Lamp";
    value = 0;
  } else {
    label = gateType ? `${gateType.toUpperCase()} Gate` : "";
    value = 0;
  }

  return {
    id: `${nodeType}-${crypto.randomUUID()}`,
    type: nodeType,
    data: { gateType, value, label, isDynamic },
    position,
    draggable: true,
  };
}
