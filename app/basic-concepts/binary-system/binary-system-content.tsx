"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

import {
  ExampleBlock,
  KeyPointList,
  LessonHero,
  LessonPage,
  LessonSection,
  PracticeQuestion,
} from "@src/components/content";
import BinaryToDecimalConverter from "@src/components/global/Simulations/BinaryToDecimalConverter";
import DecimalToBinaryConverter from "@src/components/global/Simulations/DecimalToBinaryConverter";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { Typography } from "@src/components/ui/typography";
import { ROUTES_URL } from "@src/routes";

const whyBinary = [
  {
    title: "Simplicity",
    description:
      "Digital hardware maps cleanly to two voltage levels—0 and 1.",
  },
  {
    title: "Reliability",
    description: "Fewer states mean fewer errors in noisy environments.",
  },
  {
    title: "Efficiency",
    description:
      "Binary arithmetic is faster to implement in silicon than decimal.",
  },
];

const practiceQuestions = [
  {
    id: "q1",
    question: (
      <>
        Convert 1010<sub>2</sub> to decimal.
      </>
    ),
    options: [
      { value: "8", label: "8" },
      { value: "10", label: "10" },
      { value: "12", label: "12" },
      { value: "14", label: "14" },
    ],
    correct: "10",
  },
  {
    id: "q2",
    question: (
      <>
        Convert 23<sub>10</sub> to binary.
      </>
    ),
    options: [
      { value: "10111_2", label: <>10111<sub>2</sub></> },
      { value: "10110_2", label: <>10110<sub>2</sub></> },
      { value: "11001_2", label: <>11001<sub>2</sub></> },
      { value: "11101_2", label: <>11101<sub>2</sub></> },
    ],
    correct: "10111_2",
  },
  {
    id: "q3",
    question: "What is the binary representation of the decimal number 15?",
    options: [
      { value: "1111_2", label: <>1111<sub>2</sub></> },
      { value: "1100_2", label: <>1100<sub>2</sub></> },
      { value: "1001_2", label: <>1001<sub>2</sub></> },
      { value: "1110_2", label: <>1110<sub>2</sub></> },
    ],
    correct: "1111_2",
  },
  {
    id: "q4",
    question: (
      <>
        What is the decimal representation of the binary number 1110<sub>2</sub>
        ?
      </>
    ),
    options: [
      { value: "14", label: "14" },
      { value: "15", label: "15" },
      { value: "16", label: "16" },
      { value: "17", label: "17" },
    ],
    correct: "14",
  },
] as const;

export default function BinarySystemContent() {
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
          previousRoute={ROUTES_URL.introduction}
          previousRouteLabel="Introduction"
          nextRoute={ROUTES_URL.truthTable}
          NextRouteLabel="Truth Table"
        />
      }
    >
      <LessonHero
        badge="Basic concepts"
        title="Binary System"
        description="Every digital device speaks in 0s and 1s. Learn how base-2 numbers work and practice converting between binary and decimal."
      />

      <LessonSection
        title="What is the Binary System?"
        description="A base-2 numeral system—the foundation of digital electronics."
      >
        <Typography variant="body-base">
          Each digit is a <strong>bit</strong> (binary digit). Unlike decimal
          (base-10), binary uses only 0 and 1.
        </Typography>
      </LessonSection>

      <LessonSection
        title="How Binary Numbers Work"
        description="Each position is a power of 2, starting from 2⁰ on the right."
      >
        <ExampleBlock title="Example">
          <Typography variant="body-sm" as="p">
            1011₂ = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11₁₀
          </Typography>
        </ExampleBlock>
      </LessonSection>

      <LessonSection title="Converting Binary to Decimal">
        <Typography variant="body-base">
          Sum the powers of 2 for every bit that is 1.
        </Typography>
        <ExampleBlock title="Example">
          <Typography variant="body-sm" as="p">
            1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13₁₀
          </Typography>
        </ExampleBlock>
      </LessonSection>

      <LessonSection title="Converting Decimal to Binary">
        <Typography variant="body-base">
          Repeatedly divide by 2 and record remainders. Read remainders from
          bottom to top.
        </Typography>
        <ExampleBlock title="Example: 13₁₀ → binary">
          <Typography variant="body-sm" as="p" className="space-y-1">
            <span className="block">13 ÷ 2 = 6 remainder 1</span>
            <span className="block">6 ÷ 2 = 3 remainder 0</span>
            <span className="block">3 ÷ 2 = 1 remainder 1</span>
            <span className="block">1 ÷ 2 = 0 remainder 1</span>
            <span className="mt-2 block font-medium text-foreground">
              Result: 1101₂
            </span>
          </Typography>
        </ExampleBlock>
      </LessonSection>

      <LessonSection title="Why Use Binary?">
        <KeyPointList items={whyBinary} columns={2} />
      </LessonSection>

      <LessonSection
        title="Interactive Converters"
        description="Try your own values and see results instantly."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border/80 bg-muted/15 p-4">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Calculator className="size-4" aria-hidden />
              <Typography variant="label-base" as="span">
                Binary → Decimal
              </Typography>
            </div>
            <BinaryToDecimalConverter />
          </div>
          <div className="rounded-lg border border-border/80 bg-muted/15 p-4">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Calculator className="size-4" aria-hidden />
              <Typography variant="label-base" as="span">
                Decimal → Binary
              </Typography>
            </div>
            <DecimalToBinaryConverter />
          </div>
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
