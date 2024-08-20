// src/pages/simulator.tsx
import React, { useState } from "react";
import ReactFlow, { addEdge, Connection, Edge } from "react-flow-renderer";
import NavBar from "@src/components/global/Simulations/LogicCircuitSimulator/NavigationBar";
import { nodeTypes } from "@src/@types/simulator";
import {
  calculateAND,
  calculateOR,
  calculateNOT,
  calculateNAND,
  calculateNOR,
  calculateXOR,
  calculateXNOR,
} from "@src/utils/gateLogic";

const Simulator: React.FC = () => {
  const [elements, setElements] = useState<any[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const addElement = (type: string) => {
    const id = `el-${elements.length}`;
    let label = "";

    switch (type) {
      case "input":
        label = "Input";
        break;
      case "output":
        label = "Output";
        break;
      case "AND":
        label = "AND Gate";
        break;
      case "OR":
        label = "OR Gate";
        break;
      case "NOT":
        label = "NOT Gate";
        break;
      case "NAND":
        label = "NAND Gate";
        break;
      case "NOR":
        label = "NOR Gate";
        break;
      case "XOR":
        label = "XOR Gate";
        break;
      case "XNOR":
        label = "XNOR Gate";
        break;
      default:
        break;
    }

    setElements([
      ...elements,
      {
        id,
        type: "logicNode",
        position: { x: 250, y: 250 },
        data: { label, type, id },
      },
    ]);
  };

  const onConnect = (params: Edge | Connection) => {
    // @ts-ignore
    setConnections((eds) => addEdge(params, eds));

    const fromNode = elements.find((el: any) => el.id === params.source);
    const toNode = elements.find((el: any) => el.id === params.target);

    if (fromNode && toNode) {
      const inputValues = connections
        .filter((c) => c.target === toNode.id)
        .map(
          (c) => elements.find((el: any) => el.id === c.source)?.data.output
        );

      switch (toNode.data.type) {
        case "AND":
          toNode.data.output = calculateAND(inputValues);
          break;
        case "OR":
          toNode.data.output = calculateOR(inputValues);
          break;
        case "NOT":
          toNode.data.output = calculateNOT(inputValues[0]);
          break;
        case "NAND":
          toNode.data.output = calculateNAND(inputValues);
          break;
        case "NOR":
          toNode.data.output = calculateNOR(inputValues);
          break;
        case "XOR":
          toNode.data.output = calculateXOR(inputValues);
          break;
        case "XNOR":
          toNode.data.output = calculateXNOR(inputValues);
          break;
        default:
          break;
      }

      setElements([...elements]);
    }
  };

  return (
    <div className="flex flex-col gap-3 min-h-screen">
      <NavBar onAddElement={addElement} />
      <ReactFlow
        {...{ elements }}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        className="w-full flex-1 bg-black"
      />
    </div>
  );
};

export default Simulator;
