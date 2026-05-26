import type { Edge, Node } from "@xyflow/react";

import { evaluateGate, isLogicGateId } from "@src/utils/gateLogic";

export const EDGE_LABEL_STYLE = { fontSize: 10, fontWeight: 500 };
export const EDGE_LABEL_BG_STYLE = {
  fill: "var(--card)",
  fillOpacity: 0.92,
};

export function topologicalSort(nodes: Node[], edges: Edge[]): Node[] {
  const sorted: Node[] = [];
  const visited = new Set<string>();

  const visit = (node: Node) => {
    if (visited.has(node.id)) return;
    visited.add(node.id);

    const outgoingEdges = edges.filter((edge) => edge.source === node.id);
    outgoingEdges.forEach((edge) => {
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (targetNode) visit(targetNode);
    });

    sorted.push(node);
  };

  nodes.forEach((node) => visit(node));

  return sorted.reverse();
}

function getSourceValue(nodes: Node[], nodeId: string): number {
  const sourceNode = nodes.find((n) => n.id === nodeId);
  return sourceNode?.data?.value === 1 ? 1 : 0;
}

/** Pure circuit evaluation: updates gate/output values and edge labels. */
export function evaluateCircuit(
  allNodes: Node[],
  edges: Edge[],
): { nodes: Node[]; edges: Edge[] } {
  const nodesCopy = allNodes.map((node) => ({
    ...node,
    data: { ...node.data },
  }));

  const connectedIds = new Set<string>();
  edges.forEach((edge) => {
    connectedIds.add(edge.source);
    connectedIds.add(edge.target);
  });

  const validNodes = nodesCopy.filter((node) => connectedIds.has(node.id));
  const sortedNodes = topologicalSort(validNodes, edges);

  sortedNodes.forEach((node) => {
    if (node.type === "gateNode") {
      const gateType = String(node.data?.gateType ?? "");
      if (!isLogicGateId(gateType)) {
        node.data = { ...node.data, value: 0 };
        return;
      }

      const inputEdges = edges.filter((edge) => edge.target === node.id);
      const inputValues = inputEdges.map((edge) => {
        return getSourceValue(nodesCopy, edge.source) === 1;
      });

      const outputValue = evaluateGate(gateType, inputValues);
      node.data = { ...node.data, value: outputValue };
      return;
    }

    if (node.type === "outputNode") {
      const inputEdge = edges.find((edge) => edge.target === node.id);
      const value = inputEdge
        ? getSourceValue(nodesCopy, inputEdge.source)
        : 0;
      node.data = { ...node.data, value };
    }
  });

  const nodes = allNodes.map((node) => {
    const updatedNode = nodesCopy.find((n) => n.id === node.id);
    if (!updatedNode || !connectedIds.has(node.id)) {
      return node;
    }

    if (node.type === "inputNode") {
      return {
        ...node,
        data: { ...node.data, value: updatedNode.data?.value },
      };
    }

    if (node.type === "gateNode" || node.type === "outputNode") {
      return { ...node, data: { ...node.data, ...updatedNode.data } };
    }

    return node;
  });

  const updatedEdges = edges.map((edge) => {
    const isHigh = getSourceValue(nodesCopy, edge.source) === 1;
    return {
      ...edge,
      animated: isHigh,
      label: isHigh ? "1" : "0",
      labelStyle: EDGE_LABEL_STYLE,
      labelShowBg: true,
      labelBgStyle: EDGE_LABEL_BG_STYLE,
    };
  });

  return { nodes, edges: updatedEdges };
}
