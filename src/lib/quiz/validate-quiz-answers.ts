import type { QuizEvaluation } from "./types";

export const QUIZ_EMPTY_ANSWER_MESSAGE = "Please answer this question.";

export function validateQuizAnswers(
  answers: Record<string, string | string[]>,
  evaluation: QuizEvaluation,
): { errors: Record<string, string>; firstErrorKey: string | null } {
  const errors: Record<string, string> = {};
  let firstErrorKey: string | null = null;

  evaluation.evaluation.forEach((section, sectionIndex) => {
    section.questions.forEach((_question, questionIndex) => {
      const answer = answers[`${sectionIndex}-${questionIndex}`];
      if (!answer || (Array.isArray(answer) && answer.length === 0)) {
        const errorKey = `${sectionIndex}-${questionIndex}`;
        errors[errorKey] = QUIZ_EMPTY_ANSWER_MESSAGE;
        if (!firstErrorKey) {
          firstErrorKey = errorKey;
        }
      }
    });
  });

  return { errors, firstErrorKey };
}
