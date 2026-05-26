import type { CircuitSnapshot } from "@src/lib/circuit/types";

export type TruthTableRow = Record<string, string | number>;

export type LessonQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type LessonNavigation = {
  hasPrevious: boolean;
  hasNext: boolean;
  previousRoute: string;
  previousRouteLabel: string;
  nextRoute: string;
  nextRouteLabel: string;
};

export type GateSimulationConfig = {
  inputLabels: string[];
  outputLabel: string;
};

export type GateLesson = LessonNavigation & {
  name: string;
  description: string;
  truthTable: TruthTableRow[];
  simulation: GateSimulationConfig;
  questions: LessonQuestion[];
};

export type BooleanLawEquation = {
  or?: string;
  and?: string;
  negation?: string;
  first?: string;
  second?: string;
};

export type BooleanLawCircuitDesign = {
  description: string;
  initialData: CircuitSnapshot;
};

export type BooleanLaw = LessonNavigation & {
  name: string;
  description: string;
  equation: BooleanLawEquation;
  circuitDesign: BooleanLawCircuitDesign;
  truthTable: TruthTableRow[];
  questions: LessonQuestion[];
};
