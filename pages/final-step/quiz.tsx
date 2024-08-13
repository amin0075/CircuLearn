import React, { useState } from "react";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import RadioButton from "@src/components/RadioButton";
import DragAndDrop from "@src/components/global/DragAndDrop";
import quiz from "@src/lib/quiz.json";
import DragAndDropGateQuiz from "@src/components/global/Simulations/DragAndDropGateQuiz";

type Question = {
  question: string;
  type: "multiple_choice" | "drag_and_drop" | "gate_simulation";
  options?: string[]; // for multiple choice
  correctAnswer?: string | string[]; // for multiple choice and drag and drop
  items?: string[]; // for drag and drop
  randomGates: string[]; // for gate simulation
  correctGate: string; // for gate simulation
  inputs: boolean[]; // for gate simulation
  output: boolean; // for gate simulation
};

interface Section {
  section: string;
  questions: Question[];
}

interface FinalEvaluationData {
  evaluation: Section[];
}

const FinalEvaluationPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [results, setResults] = useState<
    | null
    | {
        question: string;
        userAnswer: string | string[];
        correctAnswer: string | string[];
        isCorrect: boolean;
      }[][]
  >(null);

  const handleAnswerChange = (
    sectionIndex: number,
    questionIndex: number,
    answer: string | string[]
  ) => {
    setAnswers({
      ...answers,
      [`${sectionIndex}-${questionIndex}`]: answer,
    });
  };

  const handleSubmit = () => {
    const evaluationResults = (quiz as FinalEvaluationData).evaluation.map(
      (section, sectionIndex) => {
        return section.questions.map((question, questionIndex) => {
          const userAnswer = answers[`${sectionIndex}-${questionIndex}`];
          const isCorrect = Array.isArray(userAnswer)
            ? JSON.stringify(userAnswer) ===
              JSON.stringify(question.correctAnswer)
            : userAnswer === question.correctAnswer;

          return {
            question: question.question,
            userAnswer,
            correctAnswer: question.correctAnswer!,
            isCorrect,
          };
        });
      }
    );
    setResults(evaluationResults);
  };

  return (
    <Paper className="p-4 md:p-6 w-full flex flex-col gap-4">
      <Typography variant="h2">Quiz</Typography>
      {(quiz as FinalEvaluationData).evaluation.map((section, sectionIndex) => (
        <div key={section.section} className="w-full flex flex-col gap-1">
          <Typography variant="h4" fontweight="semiBold">
            {section.section}
          </Typography>
          {section.questions.map((question, questionIndex) => (
            <div key={question.question} className="mb-4 flex flex-col gap-2">
              <Typography variant="body1">
                {sectionIndex + questionIndex + 1}. {question.question}
              </Typography>
              {question.type === "multiple_choice" && question.options && (
                <div className="flex flex-col mt-2">
                  {question.options.map((option) => (
                    <RadioButton
                      key={option}
                      name={`${sectionIndex}-${questionIndex}`}
                      value={option}
                      // checked={
                      //   answers[`${sectionIndex}-${questionIndex}`] === option
                      // }
                      onChange={() =>
                        handleAnswerChange(sectionIndex, questionIndex, option)
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
                  randomGates={question.randomGates}
                  correctGate={question.correctGate}
                  inputs={question.inputs}
                  output={question.output}
                  onDrop={(isCorrect) =>
                    handleAnswerChange(sectionIndex, questionIndex, isCorrect)
                  }
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>

      {results && (
        <div className="p-4 mt-4">
          <Typography variant="h3">Results</Typography>
          {results.map((sectionResults, sectionIndex) => (
            <div key={sectionIndex} className="flex flex-col gap-3">
              <Typography variant="h4" fontweight="semiBold" className="mt-4">
                {quiz.evaluation[sectionIndex].section}
              </Typography>
              {sectionResults.map((result, questionIndex) => {
                return (
                  <div className="flex flex-col gap-2" key={questionIndex}>
                    <Typography variant="body2">{result.question} </Typography>
                    <Typography
                      variant="body2"
                      className={`${result.isCorrect ? "text-green-500" : "text-red-500"}`}
                    >
                      {result.isCorrect
                        ? "Correct!"
                        : `Incorrect. Your answer: ${Array.isArray(result.userAnswer) ? result.userAnswer.join(", ") : result.userAnswer || "You did not answer"}. Correct answer: ${Array.isArray(result.correctAnswer) ? result.correctAnswer.join(", ") : result.correctAnswer}.`}
                    </Typography>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default FinalEvaluationPage;
