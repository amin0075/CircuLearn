import { beforeEach, vi } from "vitest";

import { createCircuitNode } from "./createCircuitNode";

beforeEach(() => {
  vi.stubGlobal("crypto", {
    randomUUID: () => "test-uuid",
  });
});

describe("createCircuitNode", () => {
  it("creates a fixed high input", () => {
    const node = createCircuitNode("inputNode", "high", { x: 0, y: 0 });

    expect(node.type).toBe("inputNode");
    expect(node.data?.label).toBe("High (1)");
    expect(node.data?.value).toBe(1);
    expect(node.data?.isDynamic).toBe(false);
    expect(node.data?.gateType).toBe("high");
  });

  it("creates a fixed low input", () => {
    const node = createCircuitNode("inputNode", "low", { x: 0, y: 0 });

    expect(node.data?.label).toBe("Low (0)");
    expect(node.data?.value).toBe(0);
    expect(node.data?.isDynamic).toBe(false);
  });

  it("creates a dynamic input by default", () => {
    const node = createCircuitNode("inputNode", "", { x: 10, y: 20 });

    expect(node.data?.label).toBe("Input");
    expect(node.data?.value).toBe(0);
    expect(node.data?.isDynamic).toBe(true);
    expect(node.position).toEqual({ x: 10, y: 20 });
  });

  it("labels gate nodes from gate type", () => {
    const node = createCircuitNode("gateNode", "and", { x: 0, y: 0 });

    expect(node.type).toBe("gateNode");
    expect(node.data?.label).toBe("AND Gate");
    expect(node.data?.gateType).toBe("and");
    expect(node.id).toBe("gateNode-test-uuid");
  });
});
