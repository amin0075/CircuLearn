import type { ComponentType } from "react";

import { gateSvgIcons } from "@src/lib/gates/gate-svg-icons";
import { ROUTES_URL } from "@src/routes";
import {
  evaluateGate as evaluateGateLogic,
  type LogicGateId,
} from "@src/utils/gateLogic";

import { GATE_METADATA, type QuizGateKey } from "./gate-metadata";

export type { LogicGateId };
export type { QuizGateKey };
export {
  displayNameToGateId,
  gateIdToQuizKey,
  quizKeyToGateId,
} from "./gate-id-conversion";

type GateDefinition = {
  id: LogicGateId;
  label: string;
  quizKey: QuizGateKey;
  lessonUrl: string;
  Icon: ComponentType<{ className?: string }>;
};

const gateIcons = gateSvgIcons;

const gateLessonUrls: Record<LogicGateId, string> = {
  and: ROUTES_URL.andGate,
  or: ROUTES_URL.orGate,
  not: ROUTES_URL.notGate,
  nand: ROUTES_URL.nandGate,
  nor: ROUTES_URL.norGate,
  xor: ROUTES_URL.xorGate,
  xnor: ROUTES_URL.xnorGate,
};

export const LOGIC_GATES: readonly GateDefinition[] = GATE_METADATA.map(
  (gate) => ({
    ...gate,
    lessonUrl: gateLessonUrls[gate.id],
    Icon: gateIcons[gate.id],
  }),
);

const gateById = new Map(LOGIC_GATES.map((gate) => [gate.id, gate]));

export function isLogicGateId(value: string): value is LogicGateId {
  return gateById.has(value as LogicGateId);
}

export function getGateDefinition(id: LogicGateId) {
  return gateById.get(id);
}

export function getGateLessonUrl(gateType: string): string | undefined {
  if (!isLogicGateId(gateType)) return undefined;
  return getGateDefinition(gateType)?.lessonUrl;
}

export function evaluateGate(
  gateType: LogicGateId,
  inputValues: boolean[],
): 0 | 1 {
  return evaluateGateLogic(gateType, inputValues);
}

export function getGateIcon(id: LogicGateId) {
  return getGateDefinition(id)?.Icon;
}

export { GateIcon } from "./gate-icon";
