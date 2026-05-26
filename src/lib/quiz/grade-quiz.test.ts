import {
  formatQuizAnswer,
  getDefaultQuizAnswers,
  gradeQuiz,
  QUIZ_MAX_SCORE,
  QUIZ_PASS_THRESHOLD,
} from "./grade-quiz";
import quizData from "@src/lib/quiz.json";
import type { QuizEvaluation } from "./types";

const miniQuiz: QuizEvaluation = {
  evaluation: [
    {
      section: "Test",
      questions: [
        {
          num: 1,
          id: "mcq_1",
          question: "MCQ question",
          type: "multiple_choice",
          options: ["A", "B"],
          correctAnswer: "A",
        },
        {
          num: 2,
          id: "dnd_1",
          question: "Order question",
          type: "drag_and_drop",
          items: ["1", "0"],
          correctAnswer: ["0", "1"],
        },
        {
          num: 3,
          id: "gate_1",
          question: "Gate question",
          type: "gate_simulation",
          correctAnswer: "AND",
        },
      ],
    },
  ],
};

describe("gradeQuiz", () => {
  it("scores all correct answers", () => {
    const { score, result } = gradeQuiz(
      {
        "0-0": "A",
        "0-1": ["0", "1"],
        "0-2": "AND",
      },
      miniQuiz,
    );

    expect(score).toBe(3);
    expect(result[0].every((q) => q.isCorrect)).toBe(true);
    expect(result[0][0].questionId).toBe("mcq_1");
  });

  it("marks incorrect MCQ and drag-and-drop answers", () => {
    const { score, result } = gradeQuiz(
      {
        "0-0": "B",
        "0-1": ["1", "0"],
        "0-2": "AND",
      },
      miniQuiz,
    );

    expect(score).toBe(1);
    expect(result[0][0].isCorrect).toBe(false);
    expect(result[0][1].isCorrect).toBe(false);
    expect(result[0][2].isCorrect).toBe(true);
  });

  it("marks incorrect gate answer", () => {
    const { score, result } = gradeQuiz(
      {
        "0-0": "A",
        "0-1": ["0", "1"],
        "0-2": "OR",
      },
      miniQuiz,
    );

    expect(score).toBe(2);
    expect(result[0][2].isCorrect).toBe(false);
  });

  it("uses full quiz with nine questions", () => {
    const { score, result } = gradeQuiz({});
    expect(result.flat()).toHaveLength(QUIZ_MAX_SCORE);
    expect(score).toBe(0);
  });
});

describe("getDefaultQuizAnswers", () => {
  it("seeds drag-and-drop questions with their initial item order", () => {
    const defaults = getDefaultQuizAnswers();
    expect(defaults["0-1"]).toEqual(["1", "1", "0", "0"]);
    expect(defaults["0-0"]).toBeUndefined();
  });
});

describe("quiz thresholds", () => {
  it("defines pass threshold consistent with prior results page", () => {
    expect(QUIZ_PASS_THRESHOLD).toBe(5);
    expect(QUIZ_MAX_SCORE).toBe(9);
  });
});

describe("formatQuizAnswer", () => {
  it("formats missing and empty answers", () => {
    expect(formatQuizAnswer(undefined)).toBe("No answer");
    expect(formatQuizAnswer("")).toBe("No answer");
  });

  it("joins array answers", () => {
    expect(formatQuizAnswer(["0", "1"])).toBe("0, 1");
  });

  it("returns string answers as-is", () => {
    expect(formatQuizAnswer("AND")).toBe("AND");
  });
});

describe("gradeQuiz empty answers", () => {
  it("marks missing MCQ as incorrect", () => {
    const { result } = gradeQuiz({}, miniQuiz);
    expect(result[0][0].isCorrect).toBe(false);
    expect(result[0][0].userAnswer).toBe("");
  });

  it("marks empty drag-and-drop array as incorrect", () => {
    const { result } = gradeQuiz({ "0-0": "A", "0-1": [], "0-2": "AND" }, miniQuiz);
    expect(result[0][1].isCorrect).toBe(false);
  });
});

describe("gradeQuiz with full quiz fixture", () => {
  it("grades nine questions using sectionIndex-questionIndex keys", () => {
    const { score, result } = gradeQuiz({});
    const flat = result.flat();

    expect(flat).toHaveLength(QUIZ_MAX_SCORE);
    expect(score).toBe(0);
    expect(quizData.evaluation.length).toBeGreaterThan(0);
    expect(flat[0].questionId).toBe(
      quizData.evaluation[0]?.questions[0]?.id,
    );
  });
});
