export type QuizQuestionType =
  | "multiple_choice"
  | "drag_and_drop"
  | "gate_simulation";

export type QuizQuestion = {
  num: number;
  id: string;
  question: string;
  type: QuizQuestionType;
  options?: string[];
  correctAnswer?: string | string[];
  items?: string[];
  randomGates?: string[];
  inputs?: boolean[];
  output?: boolean;
};

export type QuizSection = {
  section: string;
  questions: QuizQuestion[];
};

export type QuizEvaluation = {
  evaluation: QuizSection[];
};

export type GradedQuestionResult = {
  questionId: string;
  question: string;
  userAnswer: string | string[];
  correctAnswer: string | string[] | undefined;
  isCorrect: boolean;
};

export type GradedQuiz = {
  score: number;
  result: GradedQuestionResult[][];
};
