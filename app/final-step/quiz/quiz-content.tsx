"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import Consents from "@src/components/global/Consents";
import DragAndDrop from "@src/components/global/DragAndDrop";
import DragAndDropGateQuiz from "@src/components/global/Simulations/DragAndDropGateQuiz";
import HelperNavigation from "@src/components/global/HelperNavigation";
import {
  LessonHero,
  LessonPage,
  LessonSection,
  PracticeQuestion,
  QuizQuestionCard,
} from "@src/components/content";
import { Separator } from "@src/components/ui/separator";
import { Typography } from "@src/components/ui/typography";
import {
  formatQuizAnswer,
  getDefaultQuizAnswers,
  gradeQuiz,
  QUIZ_MAX_SCORE,
  QUIZ_PASS_THRESHOLD,
} from "@src/lib/quiz/grade-quiz";
import { validateQuizAnswers } from "@src/lib/quiz/validate-quiz-answers";
import type {
  GradedQuestionResult,
  GradedQuiz,
  QuizEvaluation,
} from "@src/lib/quiz/types";
import quiz from "@src/lib/quiz.json";
import { cn } from "@src/lib/utils";
import { ROUTES_URL } from "@src/routes";
import { notify } from "@src/utils/notify";

const evaluation = quiz as QuizEvaluation;

function QuizQuestionReview({
  result,
  questionNum,
}: {
  result: GradedQuestionResult;
  questionNum: number;
}) {
  return (
    <Card
      size="sm"
      className={cn(
        "gap-3",
        result.isCorrect
          ? "ring-primary/30 bg-primary/5"
          : "ring-destructive/30 bg-destructive/5",
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-0">
        <CardTitle className="text-sm font-medium leading-snug">
          <Typography variant="label-base" as="span" className="mr-1">
            {questionNum}.
          </Typography>
          {result.question}
        </CardTitle>
        <Badge variant={result.isCorrect ? "default" : "outline"}>
          {result.isCorrect ? (
            <>
              <CheckCircle2 />
              Correct
            </>
          ) : (
            <>
              <XCircle />
              Incorrect
            </>
          )}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 pt-0">
        {result.isCorrect ? (
          <Typography variant="body-sm" className="text-primary">
            Your answer: {formatQuizAnswer(result.userAnswer)}
          </Typography>
        ) : (
          <>
            <Typography variant="body-sm" className="text-destructive">
              Your answer: {formatQuizAnswer(result.userAnswer)}
            </Typography>
            <Typography variant="body-sm">
              Correct answer: {formatQuizAnswer(result.correctAnswer)}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function QuizContent() {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(
    () => getDefaultQuizAnswers(evaluation),
  );
  const [graded, setGraded] = useState<GradedQuiz | null>(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>({});
  const [consentAgreed, setConsentAgreed] = useState(false);

  const questionRefs = useRef<Record<string, HTMLElement | null>>({});
  const submitted = graded !== null;
  const passed = graded ? graded.score >= QUIZ_PASS_THRESHOLD : false;

  const handleAnswerChange = (
    sectionIndex: number,
    questionIndex: number,
    answer: string | string[],
  ) => {
    if (submitted) return;

    setAnswers({
      ...answers,
      [`${sectionIndex}-${questionIndex}`]: answer,
    });
    setErrorMessages((prev) => ({
      ...prev,
      [`${sectionIndex}-${questionIndex}`]: "",
    }));
  };

  const validateAnswers = () => {
    const { errors: newErrors, firstErrorKey } = validateQuizAnswers(
      answers,
      evaluation,
    );
    setErrorMessages(newErrors);

    if (firstErrorKey && questionRefs.current[firstErrorKey]) {
      questionRefs.current[firstErrorKey]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (!validateAnswers()) return;

    setGraded(gradeQuiz(answers, evaluation));
    notify({
      message: "Quiz submitted successfully",
      type: "success",
    });
  };

  return (
    <LessonPage
      footer={
        submitted ? (
          <HelperNavigation
            previousRoute={ROUTES_URL.xnorGate}
            previousRouteLabel="XNOR Gate"
            nextRoute={ROUTES_URL.glossary}
            NextRouteLabel="Glossary of terms"
          />
        ) : undefined
      }
    >
      <LessonHero
        badge="Final step"
        title="Course Quiz"
        description="Test what you've learned across logic gates, binary, and Boolean algebra."
      />
      <LessonSection>
        <div
          className={cn(
            "flex flex-col gap-6",
            submitted && "pointer-events-none opacity-80",
          )}
          aria-disabled={submitted}
        >
          {evaluation.evaluation.map((section, sectionIndex) => (
            <div key={section.section} className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Typography variant="heading-xl" as="h2" fontWeight="semibold">
                  {section.section}
                </Typography>
                <Separator className="max-w-16 bg-primary/40" />
              </div>
              <ol className="flex list-none flex-col gap-4 p-0">
                {section.questions.map((question, questionIndex) => {
                  const answerKey = `${sectionIndex}-${questionIndex}`;
                  const hasError = Boolean(errorMessages[answerKey]);

                  return (
                    <li
                      key={question.id}
                      ref={(el) => {
                        if (el) {
                          questionRefs.current[answerKey] = el;
                        }
                      }}
                    >
                      {question.type === "multiple_choice" && question.options ? (
                        <PracticeQuestion
                          questionNumber={question.num}
                          name={`quiz-${answerKey}`}
                          question={question.question}
                          options={question.options.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          value={(answers[answerKey] as string) ?? ""}
                          onValueChange={(value) =>
                            handleAnswerChange(
                              sectionIndex,
                              questionIndex,
                              value,
                            )
                          }
                          disabled={submitted}
                          className={cn(
                            hasError &&
                              "border-destructive/50 ring-1 ring-destructive/20",
                          )}
                        />
                      ) : (
                        <QuizQuestionCard
                          questionNumber={question.num}
                          question={question.question}
                          hasError={hasError}
                        >
                          {question.type === "drag_and_drop" &&
                            question.items &&
                            question.correctAnswer && (
                              <DragAndDrop
                                items={question.items}
                                order={
                                  (answers[answerKey] as string[] | undefined) ??
                                  question.items
                                }
                                correctOrder={
                                  question.correctAnswer as string[]
                                }
                                onDrop={(order) =>
                                  handleAnswerChange(
                                    sectionIndex,
                                    questionIndex,
                                    order,
                                  )
                                }
                              />
                            )}

                          {question.type === "gate_simulation" && (
                            <DragAndDropGateQuiz
                              randomGates={question.randomGates || []}
                              correctGate={
                                (question.correctAnswer as string) || ""
                              }
                              inputs={question.inputs || []}
                              output={question.output || false}
                              onDrop={(gate) =>
                                handleAnswerChange(
                                  sectionIndex,
                                  questionIndex,
                                  gate,
                                )
                              }
                            />
                          )}
                        </QuizQuestionCard>
                      )}

                      {hasError && (
                        <Typography
                          variant="body-xs"
                          className="mt-2 text-destructive"
                        >
                          {errorMessages[answerKey]}
                        </Typography>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>

        <Consents
          context="quiz"
          idPrefix="quiz"
          agreed={consentAgreed}
          onAgreedChange={setConsentAgreed}
        />

        {!submitted && (
          <Button onClick={onSubmit} disabled={!consentAgreed} className="mt-4">
            Submit
          </Button>
        )}

        {graded && (
          <div className="mt-8 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Typography variant="heading-xl" as="p" fontWeight="semibold">
                  {graded.score} / {QUIZ_MAX_SCORE}
                </Typography>
                <Badge variant={passed ? "default" : "outline"}>
                  {passed ? "Pass" : "Needs review"}
                </Badge>
                <Typography variant="body-sm" className="text-muted-foreground">
                  {passed
                    ? "You met the passing threshold. Review any missed questions below."
                    : `A score of ${QUIZ_PASS_THRESHOLD} or higher is needed to pass. Review the questions below to see what to study next.`}
                </Typography>
              </CardContent>
            </Card>

            <Typography variant="heading-xl" as="h2">
              Question review
            </Typography>

            {graded.result.map((sectionResults, sectionIndex) => (
              <div key={sectionIndex} className="flex flex-col gap-3">
                <Typography variant="heading-sm" as="h3" fontWeight="semibold">
                  {evaluation.evaluation[sectionIndex].section}
                </Typography>
                {sectionResults.map((result, questionIndex) => (
                  <QuizQuestionReview
                    key={result.questionId}
                    result={result}
                    questionNum={
                      evaluation.evaluation[sectionIndex].questions[questionIndex]
                        .num
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </LessonSection>
    </LessonPage>
  );
}
