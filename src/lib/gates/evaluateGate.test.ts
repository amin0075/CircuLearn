import { evaluateGate } from "@src/utils/gateLogic";

describe("evaluateGate", () => {
  it("evaluates AND with two inputs", () => {
    expect(evaluateGate("and", [true, true])).toBe(1);
    expect(evaluateGate("and", [true, false])).toBe(0);
  });

  it("evaluates OR with two inputs", () => {
    expect(evaluateGate("or", [false, true])).toBe(1);
    expect(evaluateGate("or", [false, false])).toBe(0);
  });

  it("evaluates NOT with one input", () => {
    expect(evaluateGate("not", [false])).toBe(1);
    expect(evaluateGate("not", [true])).toBe(0);
  });

  it("returns 0 for multi-input gates with fewer than two inputs", () => {
    expect(evaluateGate("and", [true])).toBe(0);
    expect(evaluateGate("xor", [])).toBe(0);
  });

  it("evaluates NAND, NOR, XOR, and XNOR", () => {
    expect(evaluateGate("nand", [true, true])).toBe(0);
    expect(evaluateGate("nor", [false, false])).toBe(1);
    expect(evaluateGate("xor", [true, false])).toBe(1);
    expect(evaluateGate("xnor", [true, true])).toBe(1);
  });
});
