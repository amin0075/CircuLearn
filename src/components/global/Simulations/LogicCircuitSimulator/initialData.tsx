import { Edge, Node, Position } from "react-flow-renderer";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "inputNode", // Custom input node type
    data: { label: "Input A", value: 0 }, // Include value for the input
    position: { x: 250, y: 5 },
    sourcePosition: Position.Right,
  },
  {
    id: "2",
    type: "inputNode", // Custom input node type
    data: { label: "Input B", value: 0 }, // Include value for the input
    position: { x: 250, y: 100 },
    sourcePosition: Position.Right,
  },
  {
    id: "3",
    type: "gateNode", // Custom gate node
    data: { gateType: "and" }, // Specify the gate type here
    position: { x: 440, y: 50 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: "4",
    type: "outputNode", // Custom output node type
    data: { label: "Lamp", value: 0 },
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
    animated: false, // Animation depends on data.value
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "a",
    targetHandle: "input2",
    animated: false, // Animation depends on data.value
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "output",
    targetHandle: "a",
    animated: false, // Animation depends on data.value
  },
];
