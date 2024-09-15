import { useState } from "react";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import { useThemeStore } from "@src/zustand_stores/Theme";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { ROUTES_URL } from "@src/routes";

export default function TruthTable() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  const handleAnswerChange = (question: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [question]: answer }));
  };

  const correctAnswers = {
    q1: "1",
    q2: "0",
    q3: "0",
    q4: "1",
  };

  const { primaryColor } = useThemeStore((state) => state);

  return (
    <>
      <Head>
        <title>Truth Table</title>
        <meta name="description" content="Truth Table page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 md:p-6 min-h-full">
        <Typography variant="h2">Truth Table</Typography>
        <Typography variant="body1">
          <strong>Understanding Truth Tables</strong>
        </Typography>
        <Typography variant="body1">
          Truth tables are used to represent the output of a logic gate or a
          logical expression based on all possible combinations of its inputs.
          They are essential tools for designing and analyzing logic circuits.
        </Typography>

        <Typography variant="h3">Example Truth Tables</Typography>
        <Typography variant="body1">
          Below are the truth tables for basic logic gates:
        </Typography>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  A
                </th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  B
                </th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  A AND B
                </th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  A OR B
                </th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                  NOT A
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  1
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                  0
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Typography variant="h3">Practice Questions</Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>Question</strong>: What is the output of A + B when A = 0
              and B = 1?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="0"
                    onChange={() => handleAnswerChange("q1", "0")}
                    className="mr-2"
                  />
                  0
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="1"
                    onChange={() => handleAnswerChange("q1", "1")}
                    className="mr-2"
                  />
                  1
                </label>
              </li>
            </ul>
            {selectedAnswers.q1 && (
              <Typography variant="body1" className="pl-4">
                {selectedAnswers.q1 === correctAnswers.q1
                  ? "Correct!"
                  : `Incorrect. The correct answer is ${correctAnswers.q1}.`}
              </Typography>
            )}
          </li>
          <li>
            <Typography variant="body1">
              <strong>Question</strong>: What is the output of AB when A = 1 and
              B = 0?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="0"
                    onChange={() => handleAnswerChange("q2", "0")}
                    className="mr-2"
                  />
                  0
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="1"
                    onChange={() => handleAnswerChange("q2", "1")}
                    className="mr-2"
                  />
                  1
                </label>
              </li>
            </ul>
            {selectedAnswers.q2 && (
              <Typography variant="body1" className="pl-4">
                {selectedAnswers.q2 === correctAnswers.q2
                  ? "Correct!"
                  : `Incorrect. The correct answer is ${correctAnswers.q2}.`}
              </Typography>
            )}
          </li>
          <li>
            <Typography variant="body1">
              <strong>Question</strong>: What is the output of A' when A = 1?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="0"
                    onChange={() => handleAnswerChange("q3", "0")}
                    className="mr-2"
                  />
                  0
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="1"
                    onChange={() => handleAnswerChange("q3", "1")}
                    className="mr-2"
                  />
                  1
                </label>
              </li>
            </ul>
            {selectedAnswers.q3 && (
              <Typography variant="body1" className="pl-4">
                {selectedAnswers.q3 === correctAnswers.q3
                  ? "Correct!"
                  : `Incorrect. The correct answer is ${correctAnswers.q3}.`}
              </Typography>
            )}
          </li>
          <li>
            <Typography variant="body1">
              <strong>Question</strong>: What is the output of A'B + AB' when A
              = 0 and B = 1?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="0"
                    onChange={() => handleAnswerChange("q4", "0")}
                    className="mr-2"
                  />
                  0
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="1"
                    onChange={() => handleAnswerChange("q4", "1")}
                    className="mr-2"
                  />
                  1
                </label>
              </li>
            </ul>
            {selectedAnswers.q4 && (
              <Typography variant="body1" className="pl-4">
                {selectedAnswers.q4 === correctAnswers.q4
                  ? "Correct!"
                  : `Incorrect. The correct answer is ${correctAnswers.q4}.`}
              </Typography>
            )}
          </li>
        </ol>
        <HelperNavigation
          previousRoute={ROUTES_URL.booleanAlgebra}
          previousRouteLabel="Boolean Algebra"
          nextRoute={ROUTES_URL.andGate}
          NextRouteLabel="AND Gate"
        />
      </Paper>
    </>
  );
}
