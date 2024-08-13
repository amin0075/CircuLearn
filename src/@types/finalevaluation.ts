interface Question {
  question: string;
  type: "multiple_choice" | "drag_and_drop";
  options?: string[]; // For multiple choice
  correctAnswer?: string | string[]; // Can be string or array of strings for drag_and_drop
  items?: string[]; // For drag_and_drop
  correctOrder?: string[]; // For drag_and_drop
}

interface Section {
  section: string;
  questions: Question[];
}

interface FinalEvaluationData {
  evaluation: Section[];
}
