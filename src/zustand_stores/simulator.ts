// src/zustand_stores/simulator.ts
import create from "zustand";
import { addEdge, Connection, Edge, Node } from "react-flow-renderer";
import {
  calculateAND,
  calculateOR,
  calculateNOT,
  calculateNAND,
  calculateNOR,
  calculateXOR,
  calculateXNOR,
} from "@src/utils/gateLogic";

interface SimulatorState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  addEdge: (params: Edge<any> | Connection) => void;
  evaluateCircuit: () => void;
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
    get().evaluateCircuit();
  },
  addEdge: (params) => {
    set((state) => ({
      edges: addEdge(params, state.edges),
    }));
    get().evaluateCircuit();
  },
  evaluateCircuit: () => {
    set((state) => {
      const updatedNodes = [...state.nodes];
      const updatedEdges = [...state.edges];

      updatedNodes.forEach((node) => {
        if (node.type === "gateNode") {
          const inputEdges = updatedEdges.filter(
            (edge) => edge.target === node.id
          );
          const inputValues = inputEdges.map((edge) => {
            const sourceNode = updatedNodes.find((n) => n.id === edge.source);
            return sourceNode?.data.value === 1;
          });

          let outputValue = 0;
          switch (node.data.gateType) {
            case "and":
              outputValue = calculateAND(inputValues) ? 1 : 0;
              break;
            case "or":
              outputValue = calculateOR(inputValues) ? 1 : 0;
              break;
            case "not":
              outputValue = calculateNOT(inputValues) ? 1 : 0;
              break;
            case "nand":
              outputValue = calculateNAND(inputValues) ? 1 : 0;
              break;
            case "nor":
              outputValue = calculateNOR(inputValues) ? 1 : 0;
              break;
            case "xor":
              outputValue = calculateXOR(inputValues) ? 1 : 0;
              break;
            case "xnor":
              outputValue = calculateXNOR(inputValues) ? 1 : 0;
              break;
            default:
              outputValue = 0;
          }

          node.data.value = outputValue;
        }

        if (node.type === "outputNode") {
          const inputEdge = updatedEdges.find(
            (edge) => edge.target === node.id
          );
          if (inputEdge) {
            const sourceNode = updatedNodes.find(
              (n) => n.id === inputEdge.source
            );
            node.data.value = sourceNode?.data.value || 0;
          }
        }
      });

      updatedEdges.forEach((edge) => {
        const sourceNode = updatedNodes.find((n) => n.id === edge.source);
        edge.animated = sourceNode?.data.value === 1;
      });

      return { nodes: updatedNodes, edges: updatedEdges };
    });
  },
}));
