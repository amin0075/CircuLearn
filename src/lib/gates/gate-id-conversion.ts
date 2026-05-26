import type { LogicGateId } from "@src/utils/gateLogic";

import {
  GATE_METADATA,
  type QuizGateKey,
} from "./gate-metadata";

const gateById = new Map(GATE_METADATA.map((gate) => [gate.id, gate]));
const gateByLabel = new Map<string, (typeof GATE_METADATA)[number]>(
  GATE_METADATA.map((gate) => [gate.label, gate]),
);
const gateByQuizKey = new Map(
  GATE_METADATA.map((gate) => [gate.quizKey, gate]),
);

/** Lesson display name (e.g. `"AND Gate"`) → simulator gate id (`"and"`). */
export function displayNameToGateId(
  displayName: string,
): LogicGateId | undefined {
  const byLabel = gateByLabel.get(displayName);
  if (byLabel) return byLabel.id;

  const quizKey = displayName.replace(/ Gate$/i, "").toUpperCase();
  return quizKeyToGateId(quizKey);
}

export function quizKeyToGateId(quizKey: string): LogicGateId | undefined {
  const gate = gateByQuizKey.get(quizKey as QuizGateKey);
  return gate?.id;
}

export function gateIdToQuizKey(gateId: LogicGateId): QuizGateKey {
  const gate = gateById.get(gateId);
  if (!gate) {
    throw new Error(`Unknown gate id: ${gateId}`);
  }
  return gate.quizKey;
}
