"use client";

import { useState } from "react";

import {
  KeyPointList,
  LessonHero,
  LessonPage,
  LessonSection,
  PracticeQuestion,
} from "@src/components/content";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { Typography } from "@src/components/ui/typography";
import { bgColor } from "@src/utils/colorUtils";
import { ROUTES_URL } from "@src/routes";

const basicOperations = [
  {
    title: "AND",
    description: "True only when both operands are true.",
  },
  {
    title: "OR",
    description: "True when at least one operand is true.",
  },
  {
    title: "NOT",
    description: "Inverts the operand (true ↔ false).",
  },
];

const booleanLaws = [
  { title: "Commutative Law", description: "A + B = B + A and AB = BA" },
  {
    title: "Associative Law",
    description: "(A + B) + C = A + (B + C) and (AB)C = A(BC)",
  },
  { title: "Distributive Law", description: "A(B + C) = AB + AC" },
  { title: "Identity Law", description: "A + 0 = A and A·1 = A" },
  { title: "Annulment Law", description: "A + 1 = 1 and A·0 = 0" },
  { title: "Complement Law", description: "A + A' = 1 and AA' = 0" },
  { title: "Double Negation Law", description: "A'' = A" },
  {
    title: "Absorptive Law",
    description: "A + (A·B) = A and A·(A + B) = A",
  },
  {
    title: "De Morgan's Theorem",
    description: "(A·B)' = A' + B' and (A + B)' = A'·B'",
  },
  { title: "Idempotent Law", description: "A + A = A and A·A = A" },
];

const trueFalseOptions = [
  { value: "True", label: "True" },
  { value: "False", label: "False" },
];

const practiceQuestions = [
  {
    id: "q1",
    question: "Is the expression A + A' always true?",
    correct: "True",
  },
  {
    id: "q2",
    question: "Is the expression AB = BA true?",
    correct: "True",
  },
  {
    id: "q3",
    question: "Is the expression A + 1 = 1 always true?",
    correct: "True",
  },
  {
    id: "q4",
    question: "Is the expression A + 0 = A always true?",
    correct: "True",
  },
] as const;

export default function BooleanAlgebraIntroContent() {
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
          previousRoute={ROUTES_URL.truthTable}
          previousRouteLabel="Truth Table"
          nextRoute={ROUTES_URL.AnnulmentLaw}
          NextRouteLabel="Annulment Law"
        />
      }
    >
      <LessonHero
        badge="Boolean algebra"
        title="Boolean Algebra"
        description="Variables are only true or false. Master the operations and laws that power every digital circuit."
      />

      <LessonSection title="Basic Operations">
        <KeyPointList items={basicOperations} columns={1} />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border/80 bg-muted/15 p-4">
            <Typography variant="heading-sm" as="h3">
              AND (A · B)
            </Typography>
            <div className="relative size-48 border border-border rounded-lg">
              <div className="absolute size-24 rounded-full border border-border top-12 left-4" />
              <div className="absolute size-24 rounded-full border border-border top-12 right-3" />
              <div
                className={`absolute size-[52px] ${bgColor()} border border-border rounded-tl-full rounded-br-full -rotate-45 top-[70px] left-[70px]`}
              />
              <Typography variant="label-sm" className="absolute top-32 left-8">
                A
              </Typography>
              <Typography variant="label-sm" className="absolute top-32 right-8">
                B
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border/80 bg-muted/15 p-4">
            <Typography variant="heading-sm" as="h3">
              OR (A + B)
            </Typography>
            <div className="relative size-48 border border-border rounded-lg">
              <div
                className={`absolute size-24 ${bgColor()} rounded-full border border-border top-12 left-4 opacity-50`}
              />
              <div
                className={`absolute size-24 ${bgColor()} rounded-full border border-border top-12 left-16 opacity-50`}
              />
              <Typography variant="label-sm" className="absolute top-32 left-8">
                A
              </Typography>
              <Typography variant="label-sm" className="absolute top-32 right-8">
                B
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-lg border border-border/80 bg-muted/15 p-4">
            <Typography variant="heading-sm" as="h3">
              NOT (A&apos;)
            </Typography>
            <div
              className={`relative size-48 border border-border rounded-lg ${bgColor()}`}
            >
              <div className="absolute size-24 rounded-full border border-border bg-card top-12 left-12" />
              <Typography variant="label-sm" className="absolute top-32 left-6">
                A
              </Typography>
              <Typography variant="label-sm" className="absolute top-2 left-28">
                NOT A
              </Typography>
            </div>
          </div>
        </div>
      </LessonSection>

      <LessonSection
        title="Laws of Boolean Algebra"
        description="Use these identities to simplify expressions and prove equivalences."
      >
        <KeyPointList items={booleanLaws} columns={2} />
      </LessonSection>

      <LessonSection title="Practice Questions">
        <ol className="flex list-none flex-col gap-4 p-0">
          {practiceQuestions.map((item, index) => (
            <PracticeQuestion
              key={item.id}
              questionNumber={index + 1}
              name={item.id}
              question={item.question}
              options={trueFalseOptions}
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
