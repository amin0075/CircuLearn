export const calculateAND = (inputs: boolean[]): boolean =>
  inputs.every((input) => input);

export const calculateNAND = (inputs: boolean[]): boolean =>
  !inputs.every((input) => input);

export const calculateOR = (inputs: boolean[]): boolean =>
  inputs.some((input) => input);

export const calculateNOR = (inputs: boolean[]): boolean =>
  !inputs.some((input) => input);

export const calculateXOR = (inputs: boolean[]): boolean =>
  inputs.filter((input) => input).length % 2 === 1;

export const calculateXNOR = (inputs: boolean[]): boolean =>
  inputs.filter((input) => input).length % 2 === 0;

export const calculateNOT = (inputs: boolean[]): boolean => !inputs[0];

export type LogicGateId =
  | "and"
  | "or"
  | "not"
  | "nand"
  | "nor"
  | "xor"
  | "xnor";

const LOGIC_GATE_IDS: readonly LogicGateId[] = [
  "and",
  "or",
  "not",
  "nand",
  "nor",
  "xor",
  "xnor",
];

export function isLogicGateId(value: string): value is LogicGateId {
  return (LOGIC_GATE_IDS as readonly string[]).includes(value);
}

/** Evaluates a gate from boolean inputs; returns 0 or 1 for the simulator. */
export function evaluateGate(
  gateType: LogicGateId,
  inputValues: boolean[],
): 0 | 1 {
  if (gateType === "not") {
    return calculateNOT(inputValues) ? 1 : 0;
  }
  if (inputValues.length < 2) {
    return 0;
  }

  switch (gateType) {
    case "and":
      return calculateAND(inputValues) ? 1 : 0;
    case "or":
      return calculateOR(inputValues) ? 1 : 0;
    case "nand":
      return calculateNAND(inputValues) ? 1 : 0;
    case "nor":
      return calculateNOR(inputValues) ? 1 : 0;
    case "xor":
      return calculateXOR(inputValues) ? 1 : 0;
    case "xnor":
      return calculateXNOR(inputValues) ? 1 : 0;
    default:
      return 0;
  }
}
