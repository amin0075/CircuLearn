import quizData from "@src/lib/quiz.json";

import type { GradedQuiz, QuizEvaluation } from "./types";

export const QUIZ_MAX_SCORE = 9;
export const QUIZ_PASS_THRESHOLD = 5;

const defaultEvaluation = quizData as QuizEvaluation;

function arraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function isAnswerCorrect(
  userAnswer: string | string[] | undefined,
  correctAnswer: string | string[] | undefined,
): boolean {
  if (userAnswer === undefined || correctAnswer === undefined) return false;

  if (Array.isArray(correctAnswer)) {
    return Array.isArray(userAnswer) && arraysEqual(correctAnswer, userAnswer);
  }

  return userAnswer === correctAnswer;
}

/** Seeds drag-and-drop answers with the visible starting order (no drag required). */
export function getDefaultQuizAnswers(
  evaluation: QuizEvaluation = defaultEvaluation,
): Record<string, string | string[]> {
  const answers: Record<string, string | string[]> = {};

  evaluation.evaluation.forEach((section, sectionIndex) => {
    section.questions.forEach((question, questionIndex) => {
      if (question.type === "drag_and_drop" && question.items?.length) {
        answers[`${sectionIndex}-${questionIndex}`] = [...question.items];
      }
    });
  });

  return answers;
}

export function formatQuizAnswer(answer: string | string[] | undefined): string {
  if (answer === undefined || answer === "") return "No answer";
  if (Array.isArray(answer)) return answer.join(", ");
  return answer;
}

export function gradeQuiz(
  answers: Record<string, string | string[]>,
  evaluation: QuizEvaluation = defaultEvaluation,
): GradedQuiz {
  const result = evaluation.evaluation.map((section, sectionIndex) =>
    section.questions.map((question, questionIndex) => {
      const userAnswer = answers[`${sectionIndex}-${questionIndex}`];
      const correctAnswer = question.correctAnswer;
      const isCorrect = isAnswerCorrect(userAnswer, correctAnswer);

      return {
        questionId: question.id,
        question: question.question,
        userAnswer:
          userAnswer ??
          (Array.isArray(correctAnswer) ? ([] as string[]) : ""),
        correctAnswer,
        isCorrect,
      };
    }),
  );

  const score = result.flat().filter((row) => row.isCorrect).length;

  return { score, result };
}
