import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  Position,
} from "react-flow-renderer";
import { initialNodes, initialEdges } from "./initialData";
import GateNode from "./GateNode"; // Import custom node
import InputNode from "./InputNode"; // Custom input node
import OutputNode from "./OutputNode"; // Custom output node
import {
  calculateAND,
  calculateOR,
  calculateNOT,
  calculateNAND,
  calculateNOR,
  calculateXOR,
  calculateXNOR,
} from "@src/utils/gateLogic"; // Import gate logic functions
import {
  LogicGateAnd,
  LogicGateOr,
  LogicGateNot,
  LogicGateNand,
  LogicGateNor,
  LogicGateXor,
  LogicGateXnor,
  LightBulbOff,
} from "@src/assets/icons";
import Typography from "@src/components/Typography";

const nodeTypes = {
  gateNode: GateNode, // Register custom gate node
  inputNode: InputNode, // Register custom input node
  outputNode: OutputNode, // Register custom output node
};

const Simulator: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [triggerUpdate, setTriggerUpdate] = useState(false); // State to trigger re-render

  // Function to evaluate the entire circuit
  // const evaluateCircuit = useCallback(() => {
  //   const updatedNodes = [...nodes];
  //   const updatedEdges = [...edges];

  //   // Logic to evaluate each gate and output node
  //   updatedNodes.forEach((node) => {
  //     if (node.type === "gateNode") {
  //       const inputEdges = updatedEdges.filter(
  //         (edge) => edge.target === node.id
  //       );
  //       const inputValues = inputEdges.map((edge) => {
  //         const sourceNode = updatedNodes.find((n) => n.id === edge.source);
  //         return sourceNode?.data.value === 1;
  //       });

  //       // Calculate the output based on the gate type
  //       let outputValue;
  //       switch (node.data.gateType) {
  //         case "and":
  //           outputValue = calculateAND(inputValues) ? 1 : 0;
  //           break;
  //         case "or":
  //           outputValue = calculateOR(inputValues) ? 1 : 0;
  //           break;
  //         case "not":
  //           outputValue = calculateNOT(inputValues) ? 1 : 0;
  //           break;
  //         case "nand":
  //           outputValue = calculateNAND(inputValues) ? 1 : 0;
  //           break;
  //         case "nor":
  //           outputValue = calculateNOR(inputValues) ? 1 : 0;
  //           break;
  //         case "xor":
  //           outputValue = calculateXOR(inputValues) ? 1 : 0;
  //           break;
  //         case "xnor":
  //           outputValue = calculateXNOR(inputValues) ? 1 : 0;
  //           break;
  //         default:
  //           outputValue = 0;
  //       }
  //       node.data.value = outputValue;
  //     }

  //     // Update the output nodes
  //     if (node.type === "outputNode") {
  //       const inputEdge = updatedEdges.find((edge) => edge.target === node.id);
  //       if (inputEdge) {
  //         const sourceNode = updatedNodes.find(
  //           (n) => n.id === inputEdge.source
  //         );
  //         node.data.value = sourceNode?.data.value || 0;
  //       }
  //     }
  //   });

  //   // Update the animation state of edges based on the output
  //   updatedEdges.forEach((edge) => {
  //     const sourceNode = updatedNodes.find((n) => n.id === edge.source);
  //     edge.animated = sourceNode?.data.value === 1;
  //   });

  //   setNodes(updatedNodes);
  //   setEdges(updatedEdges);
  //   setTriggerUpdate((prev) => !prev); // Trigger ReactFlow re-render
  // }, [nodes, edges, setNodes, setEdges]);

  // useEffect(() => {
  //   evaluateCircuit();
  // }, [nodes, edges, evaluateCircuit]);

  // const onConnect = useCallback(
  //   (params: Edge<any> | Connection) => {
  //     setEdges((eds) => addEdge(params, eds));
  //     evaluateCircuit(); // Re-evaluate the circuit on connect
  //   },
  //   [setEdges, evaluateCircuit]
  // );

  // const addNode = (nodeType: string, gateType?: string) => {
  //   const newNode: Node = {
  //     id: (Math.random() * 10000).toFixed(0),
  //     type: nodeType,
  //     data: { gateType: gateType || "", value: 0 }, // Pass gateType if provided
  //     position: { x: Math.random() * 400, y: Math.random() * 400 },
  //   };
  //   setNodes((nds) => nds.concat(newNode));
  // };

  return (
    <div className="flex h-[calc(100vh-175px)]">
      <aside className="w-[240px] p-4 bg-backgroundDark dark:bg-white text-white rounded-l-10 max-h-full overflow-y-auto">
        <Typography variant="h4" className="mb-2 text-white dark:text-black">
          Elements
        </Typography>
        <Typography
          variant="caption"
          className="mb-2 text-white dark:text-black"
        >
          {/* these are just buttons when they are clicked they will be added to the canvas (its not drag and drop) let the user know how to use them */}
          Click on the buttons to add elements to the canvas to create your
          customized logic circuit.
        </Typography>
        <ul>
          <li className="mb-2">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("inputNode")}
            >
              Add Input
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "and")}
            >
              <LogicGateAnd className="mr-2 w-6 h-6" />
              Add AND Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "or")}
            >
              <LogicGateOr className="mr-2 w-6 h-6" />
              Add OR Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "not")}
            >
              <LogicGateNot className="mr-2 w-6 h-6" />
              Add NOT Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "nand")}
            >
              <LogicGateNand className="mr-2 w-6 h-6" />
              Add NAND Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "nor")}
            >
              <LogicGateNor className="mr-2 w-6 h-6" />
              Add NOR Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "xor")}
            >
              <LogicGateXor className="mr-2 w-6 h-6" />
              Add XOR Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("gateNode", "xnor")}
            >
              <LogicGateXnor className="mr-2 w-6 h-6" />
              Add XNOR Gate
            </button>
          </li>
          <li className="mb-2">
            <button
              className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex items-center justify-center"
              // onClick={() => addNode("outputNode")}
            >
              <LightBulbOff className="mr-2 w-6 h-6" />
              Add Output (Lamp)
            </button>
          </li>
        </ul>
      </aside>

      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          // fitView
          className="bg-white dark:bg-customGrayDark rounded-r-10 z-0"
          nodeTypes={nodeTypes} // Pass custom node types
        >
          <MiniMap className="bg-white border rounded" />
          <Controls className="bg-white border rounded" />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Simulator;
