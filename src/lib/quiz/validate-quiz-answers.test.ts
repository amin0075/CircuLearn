import { validateQuizAnswers } from "./validate-quiz-answers";
import type { QuizEvaluation } from "./types";

const miniQuiz: QuizEvaluation = {
  evaluation: [
    {
      section: "Test",
      questions: [
        {
          num: 1,
          id: "mcq_1",
          question: "MCQ",
          type: "multiple_choice",
          options: ["A", "B"],
          correctAnswer: "A",
        },
        {
          num: 2,
          id: "dnd_1",
          question: "Order",
          type: "drag_and_drop",
          items: ["1", "0"],
          correctAnswer: ["0", "1"],
        },
      ],
    },
  ],
};

describe("validateQuizAnswers", () => {
  it("returns no errors when all questions are answered", () => {
    const result = validateQuizAnswers(
      { "0-0": "A", "0-1": ["0", "1"] },
      miniQuiz,
    );

    expect(result.errors).toEqual({});
    expect(result.firstErrorKey).toBeNull();
  });

  it("flags missing string answers and records first error key", () => {
    const result = validateQuizAnswers({ "0-1": ["0", "1"] }, miniQuiz);

    expect(result.errors["0-0"]).toBe("Please answer this question.");
    expect(result.firstErrorKey).toBe("0-0");
  });

  it("flags empty drag-and-drop arrays", () => {
    const result = validateQuizAnswers(
      { "0-0": "A", "0-1": [] },
      miniQuiz,
    );

    expect(result.errors["0-1"]).toBe("Please answer this question.");
    expect(result.firstErrorKey).toBe("0-1");
  });
});
