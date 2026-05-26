"use client";

import { useState } from "react";

import { LogicTruthTable } from "@src/components/content/logic-truth-table";
import {
  LessonHero,
  LessonPage,
  LessonSection,
  PracticeQuestion,
} from "@src/components/content";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { Typography } from "@src/components/ui/typography";
import { ROUTES_URL } from "@src/routes";

const practiceQuestions = [
  {
    id: "q1",
    question: "What is the output of A + B when A = 0 and B = 1?",
    options: [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
    ],
    correct: "1",
  },
  {
    id: "q2",
    question: "What is the output of AB when A = 1 and B = 0?",
    options: [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
    ],
    correct: "0",
  },
  {
    id: "q3",
    question: "What is the output of A' when A = 1?",
    options: [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
    ],
    correct: "0",
  },
  {
    id: "q4",
    question: "What is the output of A'B + AB' when A = 0 and B = 1?",
    options: [
      { value: "0", label: "0" },
      { value: "1", label: "1" },
    ],
    correct: "1",
  },
] as const;

export default function TruthTableContent() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  const handleAnswerChange = (question: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  return (
    <LessonPage
      footer={
        <HelperNavigation
          previousRoute={ROUTES_URL.binarySystem}
          previousRouteLabel="Binary System"
          nextRoute={ROUTES_URL.booleanAlgebraIntro}
          NextRouteLabel="Boolean Algebra"
        />
      }
    >
      <LessonHero
        badge="Basic concepts"
        title="Truth Tables"
        description="See every possible input combination and the output it produces—your map for designing and checking logic circuits."
      />

      <LessonSection>
        <Typography variant="body-base">
          A truth table lists all input combinations and the resulting output.
          They are essential for analyzing gates and building larger circuits.
        </Typography>
      </LessonSection>

      <LessonSection
        title="Example Truth Tables"
        description="Combined outputs for AND, OR, and NOT on the same inputs."
      >
        <div className="rounded-lg border border-border/80 bg-muted/15 p-2">
          <LogicTruthTable />
        </div>
      </LessonSection>

      <LessonSection title="Practice Questions">
        <ol className="flex list-none flex-col gap-4 p-0">
          {practiceQuestions.map((item, index) => (
            <PracticeQuestion
              key={item.id}
              questionNumber={index + 1}
              name={item.id}
              question={item.question}
              options={[...item.options]}
              value={selectedAnswers[item.id as keyof typeof selectedAnswers]}
              onValueChange={(value) => handleAnswerChange(item.id, value)}
              correctAnswer={item.correct}
              showFeedback={Boolean(
                selectedAnswers[item.id as keyof typeof selectedAnswers],
              )}
            />
          ))}
        </ol>
      </LessonSection>
    </LessonPage>
  );
}
