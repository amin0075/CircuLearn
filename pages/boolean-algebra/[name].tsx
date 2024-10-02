import { useRouter } from "next/router";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import lawsData from "@src/lib/booleanAlgebra.json"; // Your newly created JSON file for Boolean Algebra laws
import { useState, useEffect } from "react";
import Button from "@src/components/Button";
import { useThemeStore } from "@src/zustand_stores/Theme";
import Simulator from "@src/components/global/Simulations/LogicCircuitSimulator";
import { ReactFlowProvider } from "react-flow-renderer";
import HelperNavigation from "@src/components/global/HelperNavigation";

export default function LawPage() {
  const router = useRouter();
  const { name } = router.query;
  const { primaryColor } = useThemeStore((state) => state);
  const law = lawsData.find(
    (l) => l.name.toLowerCase().replace(/ /g, "-") === name
  );
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    if (law) {
      setSelectedAnswers(law.questions.map(() => ""));
      setShowAnswers(false);
    }
  }, [name]);

  const handleAnswerChange = (questionIndex: number, option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const checkAnswers = () => {
    setShowAnswers(true);
  };

  if (!law) {
    return <div>Law not found</div>;
  }

  return (
    <>
      <Head>
        <title>{law.name}</title>
        <meta name="description" content={`Learn about ${law.name}`} />
      </Head>

      <div className="w-full flex flex-col gap-4 min-h-full">
        {/* Law Description */}
        <Paper className="p-4 md:p-6 w-full flex flex-col gap-4 slg:w-full">
          <Typography variant="h2">{law.name}</Typography>
          <Typography variant="body1">{law.description}</Typography>

          {law.equation.or && (
            <Typography variant="body2">
              Equation (OR): {law.equation.or}
            </Typography>
          )}

          {law.equation.and && (
            <Typography variant="body2">
              Equation (AND): {law.equation.and}
            </Typography>
          )}

          {law.equation.negation && (
            <Typography variant="body2">
              Equation (Negation): {law.equation.negation}
            </Typography>
          )}

          {law.equation.first && (
            <Typography variant="body2">
              Equation (First): {law.equation.first}
            </Typography>
          )}

          {law.equation.second && (
            <Typography variant="body2">
              Equation (Second): {law.equation.second}
            </Typography>
          )}
        </Paper>

        {/* Circuit Design */}
        <Paper className="p-4 md:p-6 w-full slg:w-full flex flex-col gap-4">
          <Typography variant="h3">Circuit Design</Typography>
          <Typography variant="body1">
            {law.circuitDesign.description}
          </Typography>
          <ReactFlowProvider>
            <Simulator
              key={law.name}
              isReadOnly
              initialData={law.circuitDesign.initialData}
            />
          </ReactFlowProvider>
        </Paper>

        <div className="flex w-full gap-4 flex-wrap">
          {/* Truth Table */}
          <Paper className="p-4 md:p-6 w-[calc(55%-8px)] flex flex-col gap-4 slg:w-full">
            <Typography variant="h3">Truth Table</Typography>
            <div className="overflow-x-auto">
              <table className="bg-white min-w-full dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white">
                <thead>
                  <tr>
                    {Object.keys(law.truthTable[0]).map((header) => (
                      <th
                        key={header}
                        className="py-2 px-4 border-b border-gray-300 dark:border-gray-700"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {law.truthTable.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>

          {/* Practice Questions */}
          <Paper className="p-4 md:p-6 w-[calc(45%-8px)] flex flex-col gap-4 slg:w-full">
            <Typography variant="h3">Practice Questions</Typography>
            {law.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <Typography variant="body1" className="mb-2">
                  {questionIndex + 1}. {question.question}
                </Typography>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`question-${questionIndex}-option-${optionIndex}`}
                      name={`question-${questionIndex}`}
                      value={option}
                      checked={selectedAnswers[questionIndex] === option}
                      onChange={() => handleAnswerChange(questionIndex, option)}
                    />
                    <label
                      htmlFor={`question-${questionIndex}-option-${optionIndex}`}
                      className="ml-2 text-black dark:text-white"
                    >
                      {option}
                    </label>
                  </div>
                ))}
                {showAnswers && (
                  <Typography
                    variant="body2"
                    className={`mt-2 ${
                      selectedAnswers[questionIndex] === question.correctAnswer
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedAnswers[questionIndex] === question.correctAnswer
                      ? "Correct!"
                      : `Incorrect. The correct answer is ${question.correctAnswer}.`}
                  </Typography>
                )}
              </div>
            ))}
            <Button
              variant="contained"
              onClick={checkAnswers}
              className="mt-4 px-4 py-2 text-white rounded-md"
            >
              Check Answers
            </Button>
          </Paper>
        </div>
        <HelperNavigation
          hasPrevious={law.hasPrevious}
          hasNext={law.hasNext}
          previousRoute={law.previousRoute}
          previousRouteLabel={law.previousRouteLabel}
          NextRouteLabel={law.nextRouteLabel}
          nextRoute={law.nextRoute}
        />
      </div>
    </>
  );
}
