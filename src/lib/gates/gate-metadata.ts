import type { LogicGateId } from "@src/utils/gateLogic";

export type QuizGateKey =
  | "AND"
  | "OR"
  | "NOT"
  | "NAND"
  | "NOR"
  | "XOR"
  | "XNOR";

export type GateMetadataEntry = {
  id: LogicGateId;
  label: string;
  quizKey: QuizGateKey;
};

export const GATE_METADATA = [
  { id: "and", label: "AND Gate", quizKey: "AND" },
  { id: "or", label: "OR Gate", quizKey: "OR" },
  { id: "not", label: "NOT Gate", quizKey: "NOT" },
  { id: "nand", label: "NAND Gate", quizKey: "NAND" },
  { id: "nor", label: "NOR Gate", quizKey: "NOR" },
  { id: "xor", label: "XOR Gate", quizKey: "XOR" },
  { id: "xnor", label: "XNOR Gate", quizKey: "XNOR" },
] as const satisfies readonly GateMetadataEntry[];
