import type { Metadata } from "next";

import QuizContent from "./quiz-content";

export const metadata: Metadata = {
  title: "Quiz page",
  description: "Quiz page",
};

export default function QuizPage() {
  return <QuizContent />;
}
