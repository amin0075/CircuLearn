"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import {
  LessonHero,
  LessonPage,
  LessonSection,
  PracticeQuestion,
} from "@src/components/content";
import { TruthTableFromRows } from "@src/components/content/truth-table-from-rows";
import GateSimulation from "@src/components/global/Simulations/GateSimulation";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { Button } from "@src/components/ui/button";
import gatesData from "@src/lib/gates.json";
import type { GateLesson } from "@src/lib/gates/types";
import { findBySlug } from "@src/lib/slug";

const gates = gatesData as GateLesson[];

function GatePageInner({ gateName }: { gateName: string }) {
  const gate = findBySlug(gates, gateName);

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    () => gate?.questions.map(() => "") ?? [],
  );
  const [showAnswers, setShowAnswers] = useState(false);

  if (!gate) {
    return (
      <LessonPage>
        <LessonHero title="Gate not found" description="This gate page does not exist." />
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
          hasPrevious={gate.hasPrevious}
          hasNext={gate.hasNext}
          previousRoute={gate.previousRoute}
          previousRouteLabel={gate.previousRouteLabel}
          NextRouteLabel={gate.nextRouteLabel}
          nextRoute={gate.nextRoute}
        />
      }
    >
      <LessonHero
        badge="Logic gates"
        title={gate.name}
        description={gate.description}
      />

      <LessonSection
        title="Interactive Simulation"
        description="Toggle inputs and observe how the gate responds in real time."
      >
        <div className="rounded-lg border border-border/80 bg-muted/15 p-4">
          <GateSimulation
            key={gate.name}
            gate={gate.name}
            inputLabels={gate.simulation.inputLabels}
            outputLabel={gate.simulation.outputLabel}
          />
        </div>
      </LessonSection>

      <LessonSection title="Truth Table">
        <TruthTableFromRows rows={gate.truthTable} />
      </LessonSection>

      <LessonSection title="Practice Questions">
        <ol className="flex list-none flex-col gap-4 p-0">
          {gate.questions.map((question, questionIndex) => (
            <PracticeQuestion
              key={question.question}
              questionNumber={questionIndex + 1}
              name={`gate-q-${questionIndex}`}
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

export default function GatePageContent() {
  const { name } = useParams<{ name: string }>();

  return <GatePageInner key={name} gateName={name ?? ""} />;
}
