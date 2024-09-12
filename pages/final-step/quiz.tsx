import React, { useState, useRef } from "react";
import axios from "axios";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import RadioButton from "@src/components/RadioButton";
import DragAndDrop from "@src/components/global/DragAndDrop";
import quiz from "@src/lib/quiz.json";
import DragAndDropGateQuiz from "@src/components/global/Simulations/DragAndDropGateQuiz";
import Checkbox from "@src/components/Checkbox"; // Assuming you're using a Checkbox component
import Head from "next/head";
import { notify } from "@src/utils/notify";
import { useRouter } from "next/router";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { ROUTES_URL } from "@src/routes";

type Question = {
  num: number;
  id: string;
  question: string;
  type: "multiple_choice" | "drag_and_drop" | "gate_simulation";
  options?: string[];
  correctAnswer?: string | string[];
  items?: string[];
  randomGates?: string[];
  inputs?: boolean[];
  output?: boolean;
};

interface Section {
  section: string;
  questions: Question[];
}

interface FinalEvaluationData {
  evaluation: Section[];
}

const FinalEvaluationPage: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [results, setResults] = useState<
    | null
    | {
        question: string;
        userAnswer: string | string[];
        correctAnswer: string | string[] | undefined;
        isCorrect: boolean;
      }[][]
  >(null);
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );

  // Consent states
  const [consent, setConsent] = useState([false, false, false]);
  const [consentErrors, setConsentErrors] = useState<string[]>([]);

  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleAnswerChange = (
    sectionIndex: number,
    questionIndex: number,
    answer: string | string[]
  ) => {
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
    const newErrors: Record<string, string> = {};
    let firstErrorKey: string | null = null;

    (quiz as FinalEvaluationData).evaluation.forEach(
      (section, sectionIndex) => {
        section.questions.forEach((question, questionIndex) => {
          const answer = answers[`${sectionIndex}-${questionIndex}`];
          if (!answer) {
            const errorKey = `${sectionIndex}-${questionIndex}`;
            newErrors[errorKey] = "Please answer this question.";
            if (!firstErrorKey) {
              firstErrorKey = errorKey;
            }
          }
        });
      }
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

  const onSubmit = async () => {
    if (validateAnswers()) {
      try {
        // axios.defaults.withCredentials = true;
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers,
          }),
          credentials: "same-origin",
        });
        notify({
          message: "Quiz submitted successfully",
          router,
          type: "success",
        });
        // fill out the reuslt with answers
        const newResults = (quiz as FinalEvaluationData).evaluation.map(
          (section, sectionIndex) => {
            return section.questions.map((question, questionIndex) => {
              const userAnswer = answers[
                `${sectionIndex}-${questionIndex}`
              ] as string;
              const correctAnswer = question.correctAnswer;
              const isCorrect = Array.isArray(correctAnswer)
                ? correctAnswer.includes(userAnswer)
                : correctAnswer === userAnswer;
              return {
                question: question.question,
                userAnswer,
                correctAnswer,
                isCorrect,
              };
            });
          }
        );
        setResults(newResults);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data.code === "Session_Exists_in_DB"
        ) {
          notify({
            message: "You have already submitted the quiz",
            router,
            type: "error",
          });
        } else {
          notify({
            message: "Error submitting quiz",
            router,
            type: "error",
          });
        }
      }
    }
  };

  const allConsentsChecked = consent.every(Boolean); // Ensure all consents are checked

  return (
    <>
      <Head>
        <title>Quiz page</title>
        <meta name="description" content="Quiz page" />
      </Head>
      <Paper className="p-4 md:p-6 w-full flex flex-col gap-4">
        <Typography variant="h2">Quiz</Typography>
        {(quiz as FinalEvaluationData).evaluation.map(
          (section, sectionIndex) => (
            <div key={section.section} className="w-full flex flex-col gap-1">
              <Typography variant="h4" fontweight="semiBold">
                {section.section}
              </Typography>
              {section.questions.map((question, questionIndex) => (
                <div
                  key={question.id}
                  className="mb-4 flex flex-col gap-2"
                  ref={(el) => {
                    if (el) {
                      questionRefs.current[`${sectionIndex}-${questionIndex}`] =
                        el;
                    }
                  }}
                >
                  <Typography variant="body1">
                    {question.num}. {question.question}
                  </Typography>
                  {question.type === "multiple_choice" && question.options && (
                    <div className="flex flex-col mt-2">
                      {question.options.map((option) => (
                        <RadioButton
                          key={option}
                          name={`${sectionIndex}-${questionIndex}`}
                          value={option}
                          onChange={() =>
                            handleAnswerChange(
                              sectionIndex,
                              questionIndex,
                              option
                            )
                          }
                        >
                          {option}
                        </RadioButton>
                      ))}
                    </div>
                  )}

                  {question.type === "drag_and_drop" &&
                    question.items &&
                    question.correctAnswer && (
                      <DragAndDrop
                        items={question.items}
                        correctOrder={question.correctAnswer as string[]}
                        onDrop={(order) =>
                          handleAnswerChange(sectionIndex, questionIndex, order)
                        }
                      />
                    )}

                  {question.type === "gate_simulation" && (
                    <DragAndDropGateQuiz
                      randomGates={question.randomGates || []}
                      correctGate={(question.correctAnswer as string) || ""}
                      inputs={question.inputs || []}
                      output={question.output || false}
                      onDrop={(isCorrect) =>
                        handleAnswerChange(
                          sectionIndex,
                          questionIndex,
                          isCorrect
                        )
                      }
                    />
                  )}
                  {errorMessages[`${sectionIndex}-${questionIndex}`] && (
                    <Typography variant="caption" className="!text-red-500">
                      {errorMessages[`${sectionIndex}-${questionIndex}`]}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* Consent Section */}
        <section className="flex flex-col gap-2">
          <Typography variant="h4">Consent Section</Typography>
          <div className="flex flex-col gap-2">
            {[
              "I consent to the collection of my feedback for research purposes.",
              "I understand that my participation is voluntary and that I can withdraw at any time without giving a reason.",
              "I agree that the data collected will be used for academic purposes and may be published in an anonymous form.",
            ].map((text, index) => (
              <div key={index}>
                <Checkbox
                  name={`consent.${index}`}
                  checked={consent[index]}
                  onChange={() =>
                    setConsent((prev) => {
                      const newConsent = [...prev];
                      newConsent[index] = !newConsent[index];
                      return newConsent;
                    })
                  }
                >
                  {text}
                </Checkbox>
                {consentErrors[index] && (
                  <Typography className="!text-red-500" variant="caption">
                    {consentErrors[index]}
                  </Typography>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Submit Button (disabled if consents are not checked) */}
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!allConsentsChecked} // Disable button if consents are not all checked
        >
          Submit
        </Button>

        {results && (
          <>
            <div className="p-4 mt-4">
              <Typography variant="h3">Results</Typography>
              {results.map((sectionResults, sectionIndex) => (
                <div key={sectionIndex} className="flex flex-col gap-3">
                  <Typography
                    variant="h4"
                    fontweight="semiBold"
                    className="mt-4"
                  >
                    {quiz.evaluation[sectionIndex].section}
                  </Typography>
                  {sectionResults.map((result, questionIndex) => {
                    return (
                      <div className="flex flex-col gap-2" key={questionIndex}>
                        <Typography variant="body2">
                          {result.question}{" "}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={`${
                            result.isCorrect ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {result.isCorrect
                            ? "Correct!"
                            : `Incorrect. Your answer: ${
                                Array.isArray(result.userAnswer)
                                  ? result.userAnswer.join(", ")
                                  : result.userAnswer || "You did not answer"
                              }. Correct answer: ${
                                Array.isArray(result.correctAnswer)
                                  ? result.correctAnswer.join(", ")
                                  : result.correctAnswer
                              }.`}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <HelperNavigation
              previousRoute={ROUTES_URL.xnorGate}
              previousRouteLabel="XNOR Gate"
              nextRoute={ROUTES_URL.feedback}
              NextRouteLabel="Feedback about the application"
            />
          </>
        )}
      </Paper>
    </>
  );
};

export default FinalEvaluationPage;
