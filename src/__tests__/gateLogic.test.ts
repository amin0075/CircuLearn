import {
  calculateAND,
  calculateNAND,
  calculateOR,
  calculateNOR,
  calculateXOR,
  calculateXNOR,
  calculateNOT,
} from "../utils/gateLogic";

describe("Logic Gate Calculations", () => {
  // AND Gate Tests
  test("calculateAND should return true only if all inputs are true", () => {
    expect(calculateAND([true])).toBe(true);
    expect(calculateAND([false])).toBe(false);
    expect(calculateAND([true, true])).toBe(true);
    expect(calculateAND([true, false])).toBe(false);
    expect(calculateAND([false, false])).toBe(false);
    expect(calculateAND([true, true, true])).toBe(true);
    expect(calculateAND([true, true, false])).toBe(false);
  });

  // NAND Gate Tests
  test("calculateNAND should return false only if all inputs are true", () => {
    expect(calculateNAND([true])).toBe(false);
    expect(calculateNAND([false])).toBe(true);
    expect(calculateNAND([true, true])).toBe(false);
    expect(calculateNAND([true, false])).toBe(true);
    expect(calculateNAND([false, false])).toBe(true);
    expect(calculateNAND([true, true, true])).toBe(false);
    expect(calculateNAND([true, true, false])).toBe(true);
  });

  // OR Gate Tests
  test("calculateOR should return true if at least one input is true", () => {
    expect(calculateOR([true])).toBe(true);
    expect(calculateOR([false])).toBe(false);
    expect(calculateOR([false, false])).toBe(false);
    expect(calculateOR([true, false])).toBe(true);
    expect(calculateOR([false, true])).toBe(true);
    expect(calculateOR([true, true])).toBe(true);
    expect(calculateOR([true, false, false])).toBe(true);
  });

  // NOR Gate Tests
  test("calculateNOR should return true only if all inputs are false", () => {
    expect(calculateNOR([false])).toBe(true);
    expect(calculateNOR([true])).toBe(false);
    expect(calculateNOR([false, false])).toBe(true);
    expect(calculateNOR([true, false])).toBe(false);
    expect(calculateNOR([true, true])).toBe(false);
    expect(calculateNOR([false, false, false])).toBe(true);
    expect(calculateNOR([false, true, false])).toBe(false);
  });

  // XOR Gate Tests
  test("calculateXOR should return true if there is an odd number of true inputs", () => {
    expect(calculateXOR([false])).toBe(false);
    expect(calculateXOR([true])).toBe(true);
    expect(calculateXOR([true, false])).toBe(true);
    expect(calculateXOR([true, true])).toBe(false);
    expect(calculateXOR([true, false, false])).toBe(true);
    expect(calculateXOR([true, true, false])).toBe(false);
    expect(calculateXOR([true, true, true])).toBe(true);
  });

  // XNOR Gate Tests
  test("calculateXNOR should return true if there is an even number of true inputs", () => {
    expect(calculateXNOR([false])).toBe(true);
    expect(calculateXNOR([true])).toBe(false);
    expect(calculateXNOR([true, false])).toBe(false);
    expect(calculateXNOR([true, true])).toBe(true);
    expect(calculateXNOR([true, false, false])).toBe(false);
    expect(calculateXNOR([true, true, false])).toBe(true);
    expect(calculateXNOR([true, true, true])).toBe(false);
  });

  // NOT Gate Tests
  test("calculateNOT should return the opposite of the input", () => {
    expect(calculateNOT([true])).toBe(false);
    expect(calculateNOT([false])).toBe(true);
  });
});
