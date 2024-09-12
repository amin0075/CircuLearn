import { useState } from "react";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { textColor, bgColor } from "@src/utils/colorUtils";
import HelperNavigation from "@src/components/global/HelperNavigation";
import { ROUTES_URL } from "@src/routes";

export default function BooleanAlgebra() {
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
    q1: "True",
    q2: "True",
    q3: "True",
    q4: "True",
  };

  const { primaryColor } = useThemeStore((state) => state);

  return (
    <>
      <Head>
        <title>Boolean Algebra</title>
        <meta name="description" content="Boolean Algebra page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 md:p-6 min-h-full">
        <Typography variant="h2">Boolean Algebra</Typography>
        <Typography variant="body1">
          <strong>Understanding Boolean Algebra</strong>
        </Typography>
        <Typography variant="body1">
          Boolean algebra is a branch of mathematics that deals with variables
          that have two possible values: true or false. It is the foundation of
          digital logic and computer science.
        </Typography>
        <Typography variant="h3">Basic Operations</Typography>
        <Typography variant="body1">
          The basic operations in Boolean algebra are AND, OR, and NOT.
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>AND</strong>: The result is true if both operands are
              true.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>OR</strong>: The result is true if at least one operand is
              true.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>NOT</strong>: The result is the inverse of the operand.
            </Typography>
          </li>
        </ul>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="text-center">
            <Typography variant="h4">AND Operation (A AND B)</Typography>
            <div className="relative w-48 h-48 mt-4 border border-black dark:border-white rounded-lg">
              <div className="absolute w-full h-full">
                <div
                  className={`absolute w-24 h-24 border border-black dark:border-white rounded-full top-12 left-4`}
                ></div>
                <div
                  className={`absolute w-24 h-24 border border-black dark:border-white rounded-full top-12 right-3`}
                ></div>
                <div
                  className={`absolute w-[52px] h-[52px] ${bgColor(primaryColor)} border border-black dark:border-white rounded-tl-full rounded-br-full -rotate-[45deg] top-[70px] left-[70px]`}
                ></div>
                <div className="absolute top-32 left-8 transform translate-x-2 -translate-y-6">
                  <Typography variant="body1">A</Typography>
                </div>
                <div className="absolute top-32 right-8 transform -translate-x-2 -translate-y-6">
                  <Typography variant="body1">B</Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Typography variant="h4">OR Operation (A OR B)</Typography>
            <div className="relative w-48 h-48 mt-4 border border-black dark:border-white rounded-lg">
              <div
                className={`absolute w-24 h-24 ${bgColor(primaryColor)} border border-black dark:border-white rounded-full top-12 left-4 opacity-50`}
              ></div>
              <div
                className={`absolute w-24 h-24 ${bgColor(primaryColor)} border border-black dark:border-white rounded-full top-12 left-16 opacity-50`}
              ></div>
              <div className="absolute top-32 left-8 transform translate-x-2 -translate-y-6">
                <Typography variant="body1">A</Typography>
              </div>
              <div className="absolute top-32 right-8 transform -translate-x-2 -translate-y-6">
                <Typography variant="body1">B</Typography>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Typography variant="h4">NOT Operation (NOT A)</Typography>
            <div
              className={`relative w-48 h-48 mt-4 border border-black dark:border-white rounded-lg ${bgColor(primaryColor)}`}
            >
              <div
                className={`absolute w-24 h-24 bg-white border border-black dark:border-white rounded-full top-12 left-12`}
              ></div>
              <div className="absolute top-32 left-6 transform translate-x-2 -translate-y-6">
                <Typography variant="body1">A</Typography>
              </div>
              <div className="absolute top-2 left-32 transform -translate-x-2 -translate-y-2">
                <Typography variant="body1">NOT A</Typography>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
        <Typography variant="h3">Laws of Boolean Algebra</Typography>
        <Typography variant="body1">
          Boolean algebra follows certain laws that are used to simplify
          expressions.
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">
              <strong>Commutative Law</strong>: A + B = B + A and AB = BA
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Associative Law</strong>: (A + B) + C = A + (B + C) and
              (AB)C = A(BC)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Distributive Law</strong>: A(B + C) = AB + AC
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Identity Law</strong>: A + 0 = A and A1 = A
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Null Law</strong>: A + 1 = 1 and A0 = 0
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Complement Law</strong>: A + A' = 1 and AA' = 0
            </Typography>
          </li>
        </ul>
        <Typography variant="h3">Practice Questions</Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>Question</strong>: Is the expression A + A' always true?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="True"
                    onChange={() => handleAnswerChange("q1", "True")}
                    className="mr-2"
                  />
                  True
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="False"
                    onChange={() => handleAnswerChange("q1", "False")}
                    className="mr-2"
                  />
                  False
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
              <strong>Question</strong>: Is the expression AB = BA true?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="True"
                    onChange={() => handleAnswerChange("q2", "True")}
                    className="mr-2"
                  />
                  True
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="False"
                    onChange={() => handleAnswerChange("q2", "False")}
                    className="mr-2"
                  />
                  False
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
              <strong>Question</strong>: Is the expression A + 1 = 1 always
              true?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="True"
                    onChange={() => handleAnswerChange("q3", "True")}
                    className="mr-2"
                  />
                  True
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="False"
                    onChange={() => handleAnswerChange("q3", "False")}
                    className="mr-2"
                  />
                  False
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
              <strong>Question</strong>: Is the expression A + 0 = A always
              true?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="True"
                    onChange={() => handleAnswerChange("q4", "True")}
                    className="mr-2"
                  />
                  True
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="False"
                    onChange={() => handleAnswerChange("q4", "False")}
                    className="mr-2"
                  />
                  False
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
          previousRoute={ROUTES_URL.binarySystem}
          previousRouteLabel="Binary System"
          nextRoute={ROUTES_URL.truthTable}
          NextRouteLabel="Truth Table"
        />
      </Paper>
    </>
  );
}
