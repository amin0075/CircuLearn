import { GATE_METADATA } from "./gate-metadata";
import {
  displayNameToGateId,
  gateIdToQuizKey,
  quizKeyToGateId,
} from "./gate-id-conversion";

describe("displayNameToGateId", () => {
  it.each(GATE_METADATA.map((gate) => [gate.label, gate.id] as const))(
    "maps %s to %s",
    (label, id) => {
      expect(displayNameToGateId(label)).toBe(id);
    },
  );

  it("maps stripped quiz-style names without the Gate suffix", () => {
    expect(displayNameToGateId("AND")).toBe("and");
    expect(displayNameToGateId("xor")).toBe("xor");
  });

  it("returns undefined for unknown names", () => {
    expect(displayNameToGateId("MAYBE Gate")).toBeUndefined();
    expect(displayNameToGateId("")).toBeUndefined();
  });
});

describe("quiz key round-trips", () => {
  it.each(GATE_METADATA.map((gate) => [gate.id, gate.quizKey] as const))(
    "gateIdToQuizKey(%s) and quizKeyToGateId(%s) round-trip",
    (id, quizKey) => {
      expect(gateIdToQuizKey(id)).toBe(quizKey);
      expect(quizKeyToGateId(quizKey)).toBe(id);
    },
  );
});
