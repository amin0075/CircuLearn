import { Edge, Node, Position } from "react-flow-renderer";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "inputNode",
    data: { label: "Input 1", value: 0 },
    position: { x: 250, y: 5 },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "inputNode",
    data: { label: "Input 2", value: 0 },
    position: { x: 250, y: 100 },
    sourcePosition: Position.Right,
  },
  {
    id: "3",
    type: "gateNode",
    data: { gateType: "and", value: 0, label: "AND Gate" },
    position: { x: 440, y: 50 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: "4",
    type: "outputNode",
    data: { label: "Lamp 1", value: 0 },
    position: { x: 600, y: 50 },
    targetPosition: Position.Left,
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-3",
    source: "1",
    target: "3",
    sourceHandle: "a",
    targetHandle: "input1",
    animated: false,
    label: "0",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "a",
    targetHandle: "input2",
    animated: false,
    label: "0",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "output",
    targetHandle: "a",
    animated: false,
    label: "0",
  },
];
