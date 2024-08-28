import React, { useCallback, useState } from "react";
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
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "react-flow-renderer";
import { initialNodes, initialEdges } from "./initialData";
import GateNode from "./GateNode";
import InputNode from "./InputNode";
import OutputNode from "./OutputNode";
import {
  calculateAND,
  calculateOR,
  calculateNOT,
  calculateNAND,
  calculateNOR,
  calculateXOR,
  calculateXNOR,
} from "@src/utils/gateLogic";
import {
  LogicGateAnd,
  LogicGateOr,
  LogicGateNot,
  LogicGateNand,
  LogicGateNor,
  LogicGateXor,
  LogicGateXnor,
  LightBulbOff,
  Close,
} from "@src/assets/icons";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";

const nodeTypes = {
  gateNode: GateNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};

const Simulator: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [inputCount, setInputCount] = useState(1);
  const [outputCount, setOutputCount] = useState(1);
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State to manage drawer

  const evaluateCircuit = useCallback(
    (updatedNodes: Node[], updatedEdges: Edge[]) => {
      const nodesCopy = updatedNodes.map((node) => ({ ...node }));
      const edgesCopy = updatedEdges.map((edge) => ({ ...edge }));

      // Sort nodes in topological order based on edges
      const sortedNodes = topologicalSort(nodesCopy, edgesCopy);

      sortedNodes.forEach((node) => {
        if (node.type === "gateNode") {
          const inputEdges = edgesCopy.filter(
            (edge) => edge.target === node.id
          );
          const inputValues = inputEdges.map((edge) => {
            const sourceNode = nodesCopy.find((n) => n.id === edge.source);
            return sourceNode?.data?.value === 1;
          });

          let outputValue: number;
          switch (node.data?.gateType) {
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
          node.data = { ...node.data, value: outputValue };
        }

        if (node.type === "outputNode") {
          const inputEdge = edgesCopy.find((edge) => edge.target === node.id);
          if (inputEdge) {
            const sourceNode = nodesCopy.find((n) => n.id === inputEdge.source);
            node.data = { ...node.data, value: sourceNode?.data?.value || 0 };
          }
        }
      });

      edgesCopy.forEach((edge) => {
        const sourceNode = nodesCopy.find((n) => n.id === edge.source);
        edge.animated = sourceNode?.data?.value === 1;
        edge.label = sourceNode?.data?.value === 1 ? "1" : "0"; // Label the wire
      });

      // Force a re-render by updating the nodes and edges states
      setNodes((nds) =>
        nds.map((node) => {
          const updatedNode = nodesCopy.find((n) => n.id === node.id);
          return updatedNode ? { ...node, data: updatedNode.data } : node;
        })
      );
      setEdges(edgesCopy);
    },
    [setNodes, setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params: Edge<any> | Connection) => {
      const updatedEdges = addEdge(params, edges);
      evaluateCircuit(nodes, updatedEdges);
    },
    [nodes, edges, evaluateCircuit]
  );

  const onNodesChangeHandler: OnNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      evaluateCircuit(nodes, edges);
    },
    [onNodesChange, nodes, edges, evaluateCircuit]
  );

  const onEdgesChangeHandler: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
      evaluateCircuit(nodes, edges);
    },
    [onEdgesChange, nodes, edges, evaluateCircuit]
  );

  const addNode = (nodeType: string, gateType?: string) => {
    let label;
    if (nodeType === "inputNode") {
      label = `Input ${inputCount}`;
      setInputCount(inputCount + 1);
    } else if (nodeType === "outputNode") {
      label = `Lamp ${outputCount}`;
      setOutputCount(outputCount + 1);
    } else {
      label = gateType ? `${gateType.toUpperCase()} Gate` : "";
    }

    const newNode: Node = {
      id: (Math.random() * 10000).toFixed(0),
      type: nodeType,
      data: { gateType: gateType || "", value: 0, label },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      draggable: true, // Ensures that the node is draggable
    };
    setNodes((nds) => nds.concat(newNode));

    // Close the drawer after adding the node
    setDrawerOpen(false);
  };

  // Helper function to topologically sort the nodes based on edges
  const topologicalSort = (nodes: Node[], edges: Edge[]): Node[] => {
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
  };

  return (
    <div className="flex h-[calc(100vh-175px)] relative">
      {/* Drawer for Mobile/Tablet */}
      <div className="md:hidden absolute top-4 left-4 z-10">
        <Button
          variant="contained"
          className="px-2"
          onClick={() => setDrawerOpen(true)}
        >
          <Typography variant="body2" className="text-white text-nowrap">
            Add Elements
          </Typography>
          <Close className="rotate-45 w-6 h-6" />
        </Button>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-backgroundDark dark:bg-white p-4 z-50 transition-transform transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <aside className="md:w-[240px] p-4 bg-backgroundDark dark:bg-white text-white rounded-l-10 max-h-full overflow-y-auto">
          <Typography variant="h4" className="mb-2 text-white dark:text-black">
            Elements
          </Typography>
          <Typography
            variant="caption"
            className="mb-2 text-white dark:text-black"
          >
            Click on the buttons to add elements to the canvas to create your
            customized logic circuit.
          </Typography>
          <ul>
            <li className="mb-2">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("inputNode")}
              >
                Add Input
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "and")}
              >
                <LogicGateAnd className="mr-2 w-6 h-6" />
                Add AND Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "or")}
              >
                <LogicGateOr className="mr-2 w-6 h-6" />
                Add OR Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "not")}
              >
                <LogicGateNot className="mr-2 w-6 h-6" />
                Add NOT Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "nand")}
              >
                <LogicGateNand className="mr-2 w-6 h-6" />
                Add NAND Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "nor")}
              >
                <LogicGateNor className="mr-2 w-6 h-6" />
                Add NOR Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "xor")}
              >
                <LogicGateXor className="mr-2 w-6 h-6" />
                Add XOR Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("gateNode", "xnor")}
              >
                <LogicGateXnor className="mr-2 w-6 h-6" />
                Add XNOR Gate
              </button>
            </li>
            <li className="mb-2">
              <button
                className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex items-center justify-center"
                onClick={() => addNode("outputNode")}
              >
                <LightBulbOff className="mr-2 w-6 h-6" />
                Add Output (Lamp)
              </button>
            </li>
          </ul>
        </aside>
      </div>

      <div className="flex-grow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChangeHandler}
          onConnect={onConnect}
          className="bg-white dark:bg-customGrayDark rounded-r-10 z-0"
          nodeTypes={nodeTypes}
          nodesDraggable={true} // Enable dragging for all nodes
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
