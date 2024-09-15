import React, { useCallback, useState, useEffect, useRef } from "react";
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
  useReactFlow,
  ReactFlowInstance,
} from "react-flow-renderer";
import html2canvas from "html2canvas";
import { initialNodes, initialEdges } from "./initialData";
import GateNode from "./GateNode";
import InputNode from "./InputNode";
import OutputNode from "./OutputNode";
import {
  calculateAND,
  calculateOR,
  calculateNAND,
  calculateNOR,
  calculateXOR,
  calculateXNOR,
} from "@src/utils/gateLogic";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import SimulatorDrawer from "./SimulatorDrawer";
import { Close, Delete, Download, Duplicate, Info } from "@src/assets/icons";
import Tooltip from "@src/components/Tooltip";
import { notify } from "@src/utils/notify";
import { useRouter } from "next/router";

const nodeTypes = {
  gateNode: GateNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};

const Simulator: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isFitViewDone, setIsFitViewDone] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const reactFlowInstance = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Initialize the view, ensuring the circuit fits within the screen on load
  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      if (!isFitViewDone) {
        instance.fitView({ padding: 0.1 });
        setIsFitViewDone(true);
      }
    },
    [isFitViewDone]
  );

  // Evaluate the circuit based on node connections and set the output values
  const evaluateCircuit = (nodesCopy: Node[], edgesCopy: Edge[]) => {
    const connectedNodes = new Set<string>();
    edgesCopy.forEach((edge) => {
      connectedNodes.add(edge.source);
      connectedNodes.add(edge.target);
    });
    const validNodes = nodesCopy.filter((node) => connectedNodes.has(node.id));

    // Perform topological sort to ensure proper evaluation order of nodes
    const sortedNodes = topologicalSort(validNodes, edgesCopy);

    sortedNodes.forEach((node) => {
      if (node.type === "gateNode") {
        const inputEdges = edgesCopy.filter((edge) => edge.target === node.id);
        const inputValues = inputEdges.map((edge) => {
          const sourceNode = nodesCopy.find((n) => n.id === edge.source);
          return sourceNode?.data?.value === 1;
        });

        let outputValue = 0;

        // Evaluate gate node logic
        if (node.data?.gateType === "not") {
          outputValue = inputValues[0] === false ? 1 : 0;
        } else if (inputValues.length >= 2) {
          switch (node.data?.gateType) {
            case "and":
              outputValue = calculateAND(inputValues) ? 1 : 0;
              break;
            case "or":
              outputValue = calculateOR(inputValues) ? 1 : 0;
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
        } else {
          outputValue = 0;
        }

        node.data = { ...node.data, value: outputValue };
      }

      // Update output node values
      if (node.type === "outputNode") {
        const inputEdge = edgesCopy.find((edge) => edge.target === node.id);
        if (inputEdge) {
          const sourceNode = nodesCopy.find((n) => n.id === inputEdge.source);
          node.data = { ...node.data, value: sourceNode?.data?.value || 0 };
        } else {
          node.data = { ...node.data, value: 0 };
        }
      }
    });

    // Update edge labels and animations
    edgesCopy.forEach((edge) => {
      const sourceNode = nodesCopy.find((n) => n.id === edge.source);
      edge.animated = sourceNode?.data?.value === 1;
      edge.label = sourceNode?.data?.value === 1 ? "1" : "0";
    });

    // Set updated nodes and edges in state
    setNodes((nds) =>
      nds.map((node) => {
        const updatedNode = validNodes.find((n) => n.id === node.id);
        return updatedNode ? { ...node, data: updatedNode.data } : node;
      })
    );

    setEdges(edgesCopy);
  };

  // Handle connecting nodes
  const onConnect: OnConnect = useCallback(
    (params: Edge<any> | Connection) => {
      // Prevent connecting a gate to itself
      if (params.source === params.target) {
        notify({
          message: "Cannot connect a gate to itself",
          type: "error",
          router,
        });
        return;
      }

      setEdges((eds) => {
        // Remove existing edges connected to the same source or target
        const updatedEdges = eds.filter(
          (edge) =>
            !(
              edge.target === params.target &&
              edge.targetHandle === params.targetHandle
            ) &&
            !(
              edge.source === params.source &&
              edge.sourceHandle === params.sourceHandle
            )
        );

        const newEdges = addEdge(params, updatedEdges);

        evaluateCircuit([...nodes], newEdges);
        return newEdges;
      });
    },
    [nodes, evaluateCircuit]
  );

  // Handle node changes (e.g., addition or removal)
  const onNodesChangeHandler: OnNodesChange = (changes) => {
    onNodesChange(changes);

    changes.forEach((change) => {
      if (change.type === "remove") {
        setIsDeleting(true);
      }
    });
    evaluateCircuit([...nodes], [...edges]);
  };

  // Handle edge changes
  const onEdgesChangeHandler: OnEdgesChange = (changes) => {
    onEdgesChange(changes);
  };

  // Handle node selection
  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Re-evaluate circuit when nodes are deleted
  useEffect(() => {
    if (isDeleting) {
      evaluateCircuit([...nodes], [...edges]);
      setIsDeleting(false);
    }
  }, [isDeleting]);

  // Add new node to the circuit
  const addNode = useCallback(
    (nodeType: string, gateType: string = "") => {
      let label;
      if (nodeType === "inputNode") {
        label = `Input`;
      } else if (nodeType === "outputNode") {
        label = `Lamp`;
      } else {
        label = gateType ? `${gateType.toUpperCase()} Gate` : "";
      }

      const centerX = window.innerWidth / 4;
      const centerY = window.innerHeight / 4;
      const { x, y } = reactFlowInstance.project({ x: centerX, y: centerY });

      const newNode: Node = {
        id: (Math.random() * 10000).toFixed(0),
        type: nodeType,
        data: { gateType, value: 0, label },
        position: { x, y },
        draggable: true,
      };

      setNodes((nds) => nds.concat(newNode));
      setDrawerOpen(false);
    },
    [reactFlowInstance, setNodes]
  );

  // Duplicate selected node
  const duplicateNode = useCallback(() => {
    if (!selectedNode) return;

    const { type, data } = selectedNode;
    if (type && data?.gateType !== undefined) {
      addNode(type, data.gateType);
    } else {
      addNode(type || "inputNode");
    }
  }, [selectedNode, addNode]);

  // Delete selected node
  const deleteNode = useCallback(() => {
    if (!selectedNode) return;

    setNodes((nds) => {
      const updatedNodes = nds.filter((node) => node.id !== selectedNode.id);
      return updatedNodes;
    });

    setEdges((eds) => {
      const updatedEdges = eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      );
      return updatedEdges;
    });
    setIsDeleting(true);
    evaluateCircuit([...nodes], [...edges]);
    setSelectedNode(null);
  }, [selectedNode, edges, evaluateCircuit, setNodes, setEdges]);

  // Perform topological sorting of nodes for correct evaluation order
  const topologicalSort = useCallback(
    (nodes: Node[], edges: Edge[]): Node[] => {
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
    },
    []
  );

  useEffect(() => {
    evaluateCircuit([...nodes], [...edges]);
  }, []);

  // Download the current canvas as an image
  const downloadCanvasImage = async () => {
    if (!reactFlowWrapper.current) return;

    const canvas = await html2canvas(reactFlowWrapper.current);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "circuit-snapshot.png";
    link.click();
  };

  // Convert touch events to mouse events for mobile compatibility
  const simulateTouchToMouse = (e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch || !e.target) return; // Add a guard clause to handle null

    const simulatedEvent = new MouseEvent("mousedown", {
      bubbles: true,
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    (e.target as HTMLElement).dispatchEvent(simulatedEvent);
  };

  // Handle touch end events for mobile compatibility
  const simulateTouchEndToMouse = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    if (!touch || !e.target) return; // Add a guard clause to handle null

    const simulatedEvent = new MouseEvent("mouseup", {
      bubbles: true,
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    (e.target as HTMLElement).dispatchEvent(simulatedEvent);
  };

  // Add event listeners for touch events on component mount
  useEffect(() => {
    const reactFlowContainer = reactFlowWrapper.current;
    if (reactFlowContainer) {
      reactFlowContainer.addEventListener("touchstart", simulateTouchToMouse);
      reactFlowContainer.addEventListener("touchend", simulateTouchEndToMouse);

      return () => {
        reactFlowContainer.removeEventListener(
          "touchstart",
          simulateTouchToMouse
        );
        reactFlowContainer.removeEventListener(
          "touchend",
          simulateTouchEndToMouse
        );
      };
    }
  }, []);

  // Deselect nodes when clicking on empty space
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex h-[calc(100vh-175px)] relative">
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

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 ssm:flex-col-reverse">
        {selectedNode && (
          <>
            <Tooltip title="Duplicate Node" className="text-nowrap">
              <Button
                variant="contained"
                className="px-2"
                onClick={duplicateNode}
              >
                <Duplicate className="w-6 h-6" />
              </Button>
            </Tooltip>

            <Tooltip title="Delete Node" className="text-nowrap">
              <Button variant="contained" className="px-2" onClick={deleteNode}>
                <Delete className="w-6 h-6" />
              </Button>
            </Tooltip>
            {selectedNode.type === "gateNode" && (
              <Tooltip title="Gate Information" className="text-nowrap">
                <Button
                  variant="contained"
                  className="px-2"
                  onClick={() => {
                    const gateType = selectedNode.data?.gateType || "";
                    const gateUrlMap: Record<string, string> = {
                      and: "/gates/and-gate",
                      or: "/gates/or-gate",
                      not: "/gates/not-gate",
                      nand: "/gates/nand-gate",
                      nor: "/gates/nor-gate",
                      xor: "/gates/xor-gate",
                      xnor: "/gates/xnor-gate",
                    };
                    const infoUrl = gateUrlMap[gateType];
                    if (infoUrl) {
                      window.open(infoUrl, "_blank");
                    }
                  }}
                >
                  <Info className="w-6 h-6" />
                </Button>
              </Tooltip>
            )}
          </>
        )}
        <Button
          variant="contained"
          className="px-2 flex items-center gap-1"
          onClick={downloadCanvasImage}
        >
          <Download className="w-6 h-6" />
          <Typography variant="caption" className="text-white smd:hidden">
            Download
          </Typography>
        </Button>
      </div>

      <SimulatorDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        addNode={addNode}
      />

      <div className="flex-grow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeHandler}
          onEdgesChange={onEdgesChangeHandler}
          onConnect={onConnect}
          onInit={onInit}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          className="bg-white dark:bg-customGrayDark rounded-r-10 z-0"
          nodeTypes={nodeTypes}
        >
          <MiniMap className="bg-white dark:bg-customGrayDark border rounded w-40 h-28" />
          <Controls className="bg-white border rounded" />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Simulator;
