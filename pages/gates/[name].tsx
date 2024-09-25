import { useRouter } from "next/router";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import gatesData from "@src/lib/gates.json"; // Make sure to create this file
import { useState, useEffect } from "react";
import Button from "@src/components/Button";
import { useThemeStore } from "@src/zustand_stores/Theme";
import GateSimulation from "@src/components/global/Simulations/GateSimulation";
import HelperNavigation from "@src/components/global/HelperNavigation";

export default function GatePage() {
  const router = useRouter();
  const { name } = router.query;

  const { primaryColor } = useThemeStore((state) => state);
  const gate = gatesData.find(
    (g) => g.name.toLowerCase().replace(/ /g, "-") === name
  );

  // State initialization
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  // Reset state when the route changes
  useEffect(() => {
    if (gate) {
      setSelectedAnswers(gate.questions.map(() => ""));
      setShowAnswers(false);
    }
  }, [name]); // Dependency on `name` (route param)

  const handleAnswerChange = (questionIndex: number, option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const checkAnswers = () => {
    setShowAnswers(true);
  };

  if (!gate) {
    return <div>Gate not found</div>;
  }

  return (
    <>
      <Head>
        <title>{gate.name}</title>
        <meta name="description" content={`Learn about ${gate.name}`} />
      </Head>

      <div className="w-full flex flex-col gap-4 min-h-full">
        <div className="flex w-full gap-4 flex-wrap">
          {/* Gate Description */}
          <Paper className="p-4 md:p-6 w-[calc(50%-8px)] flex flex-col gap-4 slg:w-full">
            <Typography variant="h2">{gate.name}</Typography>
            <Typography variant="body1">{gate.description}</Typography>
          </Paper>

          {/* Simulation */}
          <Paper className="p-4 md:p-6 w-[calc(50%-8px)] sm:min-w-[550px] slg:w-full flex flex-col gap-4">
            <Typography variant="h3">Simulation</Typography>
            <GateSimulation
              gate={gate.name}
              inputLabels={gate.simulation.inputLabels}
              outputLabel={gate.simulation.outputLabel}
            />
          </Paper>
        </div>

        <div className="flex w-full gap-4 flex-wrap">
          {/* Truth Table */}
          <Paper className="p-4 md:p-6 w-[calc(55%-8px)] flex flex-col gap-4 slg:w-full">
            <Typography variant="h3">Truth Table</Typography>
            <div className="overflow-x-auto">
              <table className="bg-white min-w-full dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white">
                <thead>
                  <tr>
                    {Object.keys(gate.truthTable[0]).map((header) => (
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
                  {gate.truthTable.map((row, index) => (
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
            {gate.questions.map((question, questionIndex) => (
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
          <HelperNavigation
            hasPrevious={gate.hasPrevious}
            hasNext={gate.hasNext}
            previousRoute={gate.previousRoute}
            previousRouteLabel={gate.previousRouteLabel}
            NextRouteLabel={gate.nextRouteLabel}
            nextRoute={gate.nextRoute}
          />
        </div>
      </div>
    </>
  );
}
