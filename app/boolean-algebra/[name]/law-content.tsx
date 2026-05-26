"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";

import {
  LessonHero,
  LessonPage,
  LessonSection,
  PracticeQuestion,
} from "@src/components/content";
import { TruthTableFromRows } from "@src/components/content/truth-table-from-rows";
import Simulator from "@src/components/global/Simulations/LogicCircuitSimulator/LogicCircuitSimulatorLazy";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { Button } from "@src/components/ui/button";
import { Typography } from "@src/components/ui/typography";
import lawsData from "@src/lib/booleanAlgebra.json";
import type { BooleanLaw } from "@src/lib/gates/types";
import { findBySlug } from "@src/lib/slug";

const laws = lawsData as BooleanLaw[];

function LawPageInner({ lawName }: { lawName: string }) {
  const law = findBySlug(laws, lawName);

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    () => law?.questions.map(() => "") ?? [],
  );
  const [showAnswers, setShowAnswers] = useState(false);

  if (!law) {
    return (
      <LessonPage>
        <LessonHero title="Law not found" description="This law page does not exist." />
      </LessonPage>
    );
  }

  const handleAnswerChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = option;
      return next;
    });
  };

  return (
    <LessonPage
      footer={
        <HelperNavigation
          hasPrevious={law.hasPrevious}
          hasNext={law.hasNext}
          previousRoute={law.previousRoute}
          previousRouteLabel={law.previousRouteLabel}
          NextRouteLabel={law.nextRouteLabel}
          nextRoute={law.nextRoute}
        />
      }
    >
      <LessonHero
        badge="Boolean laws"
        title={law.name}
        description={law.description}
      />

      {(law.equation.or ||
        law.equation.and ||
        law.equation.negation ||
        law.equation.first ||
        law.equation.second) && (
        <LessonSection title="Equations">
          <div className="flex flex-col gap-2 rounded-lg border border-border/80 bg-muted/20 p-4 font-mono text-body-sm">
            {law.equation.or ? (
              <Typography variant="body-sm" as="p">
                OR: {law.equation.or}
              </Typography>
            ) : null}
            {law.equation.and ? (
              <Typography variant="body-sm" as="p">
                AND: {law.equation.and}
              </Typography>
            ) : null}
            {law.equation.negation ? (
              <Typography variant="body-sm" as="p">
                Negation: {law.equation.negation}
              </Typography>
            ) : null}
            {law.equation.first ? (
              <Typography variant="body-sm" as="p">
                First: {law.equation.first}
              </Typography>
            ) : null}
            {law.equation.second ? (
              <Typography variant="body-sm" as="p">
                Second: {law.equation.second}
              </Typography>
            ) : null}
          </div>
        </LessonSection>
      )}

      <LessonSection
        title="Circuit Design"
        description={law.circuitDesign.description}
      >
        <div className="overflow-hidden rounded-lg border border-border/80 bg-muted/15 p-2">
          <ReactFlowProvider>
            <Simulator
              key={law.name}
              isReadOnly
              initialData={law.circuitDesign.initialData}
            />
          </ReactFlowProvider>
        </div>
      </LessonSection>

      <LessonSection title="Truth Table">
        <TruthTableFromRows rows={law.truthTable} />
      </LessonSection>

      <LessonSection title="Practice Questions">
        <ol className="flex list-none flex-col gap-4 p-0">
          {law.questions.map((question, questionIndex) => (
            <PracticeQuestion
              key={question.question}
              questionNumber={questionIndex + 1}
              name={`law-q-${questionIndex}`}
              question={question.question}
              options={question.options.map((option) => ({
                value: option,
                label: option,
              }))}
              value={selectedAnswers[questionIndex] ?? ""}
              onValueChange={(value) =>
                handleAnswerChange(questionIndex, value)
              }
              correctAnswer={question.correctAnswer}
              showFeedback={showAnswers}
            />
          ))}
        </ol>
        <Button type="button" onClick={() => setShowAnswers(true)} className="w-fit">
          Check answers
        </Button>
      </LessonSection>
    </LessonPage>
  );
}

export default function LawPageContent() {
  const { name } = useParams<{ name: string }>();
  return <LawPageInner key={name} lawName={name ?? ""} />;
}
