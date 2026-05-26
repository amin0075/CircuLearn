import type { Edge, Node } from "@xyflow/react";

import { evaluateCircuit, topologicalSort } from "./evaluateCircuit";

function inputNode(id: string, value: number): Node {
  return {
    id,
    type: "inputNode",
    position: { x: 0, y: 0 },
    data: { label: "Input", value, isDynamic: true },
  };
}

function gateNode(id: string, gateType: string): Node {
  return {
    id,
    type: "gateNode",
    position: { x: 0, y: 0 },
    data: { gateType, value: 0, label: `${gateType} gate` },
  };
}

function outputNode(id: string): Node {
  return {
    id,
    type: "outputNode",
    position: { x: 0, y: 0 },
    data: { label: "Lamp", value: 0 },
  };
}

function edge(id: string, source: string, target: string): Edge {
  return { id, source, target };
}

describe("evaluateCircuit", () => {
  it("propagates AND gate output to lamp", () => {
    const nodes = [
      inputNode("in1", 1),
      inputNode("in2", 1),
      gateNode("and1", "and"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "and1"),
      edge("e2", "in2", "and1"),
      edge("e3", "and1", "out1"),
    ];

    const { nodes: resultNodes, edges: resultEdges } = evaluateCircuit(
      nodes,
      edges,
    );

    expect(resultNodes.find((n) => n.id === "and1")?.data?.value).toBe(1);
    expect(resultNodes.find((n) => n.id === "out1")?.data?.value).toBe(1);
    expect(resultEdges.find((e) => e.id === "e3")?.label).toBe("1");
    expect(resultEdges.find((e) => e.id === "e3")?.animated).toBe(true);
  });

  it("evaluates NOT gate", () => {
    const nodes = [inputNode("in1", 0), gateNode("not1", "not"), outputNode("out1")];
    const edges = [
      edge("e1", "in1", "not1"),
      edge("e2", "not1", "out1"),
    ];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "not1")?.data?.value).toBe(1);
    expect(resultNodes.find((n) => n.id === "out1")?.data?.value).toBe(1);
  });

  it("leaves disconnected nodes unchanged", () => {
    const nodes = [inputNode("in1", 1), gateNode("and1", "and")];
    const edges: Edge[] = [];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "and1")?.data?.value).toBe(0);
  });

  it("sets edge label to 0 when source is low", () => {
    const nodes = [inputNode("in1", 0), outputNode("out1")];
    const edges = [edge("e1", "in1", "out1")];

    const { edges: resultEdges } = evaluateCircuit(nodes, edges);

    expect(resultEdges[0]?.label).toBe("0");
    expect(resultEdges[0]?.animated).toBe(false);
  });

  it("propagates OR gate output", () => {
    const nodes = [
      inputNode("in1", 0),
      inputNode("in2", 1),
      gateNode("or1", "or"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "or1"),
      edge("e2", "in2", "or1"),
      edge("e3", "or1", "out1"),
    ];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "or1")?.data?.value).toBe(1);
    expect(resultNodes.find((n) => n.id === "out1")?.data?.value).toBe(1);
  });

  it("propagates XOR gate output", () => {
    const nodes = [
      inputNode("in1", 1),
      inputNode("in2", 0),
      gateNode("xor1", "xor"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "xor1"),
      edge("e2", "in2", "xor1"),
      edge("e3", "xor1", "out1"),
    ];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "xor1")?.data?.value).toBe(1);
  });

  it("propagates NAND gate output", () => {
    const nodes = [
      inputNode("in1", 1),
      inputNode("in2", 1),
      gateNode("nand1", "nand"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "nand1"),
      edge("e2", "in2", "nand1"),
      edge("e3", "nand1", "out1"),
    ];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "nand1")?.data?.value).toBe(0);
    expect(resultNodes.find((n) => n.id === "out1")?.data?.value).toBe(0);
  });

  it("sets invalid gate type output to 0", () => {
    const nodes = [
      inputNode("in1", 1),
      gateNode("bad1", "invalid-gate"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "bad1"),
      edge("e2", "bad1", "out1"),
    ];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "bad1")?.data?.value).toBe(0);
  });

  it("leaves lamp at 0 when output has no input edge", () => {
    const nodes = [outputNode("out1")];
    const edges: Edge[] = [];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "out1")?.data?.value).toBe(0);
  });

  it("evaluates a multi-hop chain in order", () => {
    const nodes = [
      inputNode("in1", 1),
      gateNode("not1", "not"),
      gateNode("not2", "not"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "not1"),
      edge("e2", "not1", "not2"),
      edge("e3", "not2", "out1"),
    ];

    const { nodes: resultNodes } = evaluateCircuit(nodes, edges);

    expect(resultNodes.find((n) => n.id === "not2")?.data?.value).toBe(1);
    expect(resultNodes.find((n) => n.id === "out1")?.data?.value).toBe(1);
  });
});

describe("topologicalSort", () => {
  it("orders nodes so sources are evaluated before targets", () => {
    const nodes = [
      inputNode("in1", 1),
      gateNode("g1", "and"),
      gateNode("g2", "or"),
      outputNode("out1"),
    ];
    const edges = [
      edge("e1", "in1", "g1"),
      edge("e2", "g1", "g2"),
      edge("e3", "g2", "out1"),
    ];

    const sorted = topologicalSort(nodes, edges);
    const ids = sorted.map((n) => n.id);

    expect(ids.indexOf("in1")).toBeLessThan(ids.indexOf("g1"));
    expect(ids.indexOf("g1")).toBeLessThan(ids.indexOf("g2"));
    expect(ids.indexOf("g2")).toBeLessThan(ids.indexOf("out1"));
  });

  it("includes fan-in targets after all sources", () => {
    const nodes = [
      inputNode("in1", 1),
      inputNode("in2", 0),
      gateNode("and1", "and"),
    ];
    const edges = [
      edge("e1", "in1", "and1"),
      edge("e2", "in2", "and1"),
    ];

    const sorted = topologicalSort(nodes, edges);
    const ids = sorted.map((n) => n.id);

    expect(ids.indexOf("in1")).toBeLessThan(ids.indexOf("and1"));
    expect(ids.indexOf("in2")).toBeLessThan(ids.indexOf("and1"));
  });
});
