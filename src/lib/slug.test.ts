import { findBySlug, titleToSlug } from "./slug";

describe("titleToSlug", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(titleToSlug("AND Gate")).toBe("and-gate");
    expect(titleToSlug("Annulment Law")).toBe("annulment-law");
  });
});

describe("findBySlug", () => {
  const items = [
    { name: "AND Gate", id: 1 },
    { name: "OR Gate", id: 2 },
  ];

  it("returns the matching item", () => {
    expect(findBySlug(items, "or-gate")).toEqual({ name: "OR Gate", id: 2 });
  });

  it("returns undefined when no match", () => {
    expect(findBySlug(items, "xor-gate")).toBeUndefined();
  });
});
