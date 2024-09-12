import { useState } from "react";
import Image from "next/image";

// utils
import Button from "@src/components/Button";
import Link from "next/link";
import { ROUTES_URL } from "@src/routes";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import Tooltip from "@src/components/Tooltip";
import BinaryToDecimalConverter from "@src/components/global/Simulations/BinaryToDecimalConverter";
import DecimalToBinaryConverter from "@src/components/global/Simulations/DecimalToBinaryConverter";
import HelperNavigation from "@src/components/global/HelperNavigation";

// components

export default function BinarySystem() {
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
    q1: "10",
    q2: "10111_2",
    q3: "1111_2",
    q4: "14",
  };

  return (
    <>
      <Head>
        <title>Binary System</title>
        <meta name="description" content="Binary System page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 md:p-6 min-h-full">
        <Typography variant="h2">Binary System</Typography>
        <Typography variant="body1">
          <strong>Understanding the Binary System</strong>
        </Typography>
        <Typography variant="body1">
          The binary system is a base-2 numeral system that uses only two
          digits, 0 and 1. It is the foundation of digital electronics and
          computing systems because it is straightforward to implement with
          digital electronic circuitry.
        </Typography>

        <Typography variant="h3">What is the Binary System?</Typography>
        <Typography variant="body1">
          The binary system represents values using two symbols: 0 and 1. Each
          digit in a binary number is referred to as a bit. A bit is the
          smallest unit of data in computing and digital communications.
        </Typography>
        <Typography variant="body1">
          <strong>Base-2 System</strong>: Unlike the decimal system, which is
          base-10 and uses ten digits (0-9), the binary system is base-2 and
          uses only two digits (0 and 1).
        </Typography>

        <Typography variant="h3">How Binary Numbers Work</Typography>
        <Typography variant="body1">
          In the binary system, each bit represents an increasing power of 2,
          starting from the rightmost bit, which represents 2^0. For example,
          the binary number 1011 represents:
        </Typography>
        <Typography variant="body1" className="pl-4">
          1 × 2^3 + 0 × 2^2 + 1 × 2^1 + 1 × 2^0 = 8 + 0 + 2 + 1 = 11
        </Typography>
        <Typography variant="body1" className="pl-4">
          So, 1011<sub>2</sub> = 11<sub>10</sub>.
        </Typography>

        <Typography variant="h3">Converting Binary to Decimal</Typography>
        <Typography variant="body1">
          To convert a binary number to a decimal number, sum the values of the
          bits that are set to 1, each multiplied by the power of 2
          corresponding to its position.
        </Typography>
        <Typography variant="body1" className="pl-4">
          <strong>Example</strong>: Convert 1101<sub>2</sub> to decimal.
        </Typography>
        <Typography variant="body1" className="pl-4">
          1 × 2^3 + 1 × 2^2 + 0 × 2^1 + 1 × 2^0 = 8 + 4 + 0 + 1 = 13
          <sub>10</sub>
        </Typography>

        <Typography variant="h3">Converting Decimal to Binary</Typography>
        <Typography variant="body1">
          To convert a decimal number to a binary number, repeatedly divide the
          number by 2 and record the remainder. Read the remainders from bottom
          to top to get the binary equivalent.
        </Typography>
        <Typography variant="body1" className="pl-4">
          <strong>Example</strong>: Convert 13<sub>10</sub> to binary.
        </Typography>
        <Typography variant="body1" className="pl-4">
          13 ÷ 2 = 6 remainder 1 <br />
          6 ÷ 2 = 3 remainder 0 <br />
          3 ÷ 2 = 1 remainder 1 <br />
          1 ÷ 2 = 0 remainder 1 <br />
          Reading from bottom to top, 13<sub>10</sub> = 1101<sub>2</sub>.
        </Typography>

        <Typography variant="h3">Why Use Binary?</Typography>
        <Typography variant="body1">
          <strong>Simplicity</strong>: Digital electronics use two voltage
          levels, which can be easily represented by binary digits (0 and 1).
          <br />
          <strong>Reliability</strong>: Binary systems are less prone to errors
          because they have only two states.
          <br />
          <strong>Efficiency</strong>: Binary arithmetic operations are simpler
          and faster compared to decimal operations in digital systems.
        </Typography>

        <div className="flex flex-col gap-3">
          <Typography variant="h3">Convertors</Typography>
          <BinaryToDecimalConverter />
          <DecimalToBinaryConverter />
        </div>

        <Typography variant="h3">Practice Questions</Typography>
        <ol>
          <li>
            <Typography variant="body1">
              <strong>Question</strong>: Convert 1010<sub>2</sub> to decimal.
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="8"
                    onChange={() => handleAnswerChange("q1", "8")}
                    className="mr-2"
                  />
                  8
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="10"
                    onChange={() => handleAnswerChange("q1", "10")}
                    className="mr-2"
                  />
                  10
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="12"
                    onChange={() => handleAnswerChange("q1", "12")}
                    className="mr-2"
                  />
                  12
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="14"
                    onChange={() => handleAnswerChange("q1", "14")}
                    className="mr-2"
                  />
                  14
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
              <strong>Question</strong>: Convert 23<sub>10</sub> to binary.
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="10111_2"
                    onChange={() => handleAnswerChange("q2", "10111_2")}
                    className="mr-2"
                  />
                  10111<sub>2</sub>
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="10110_2"
                    onChange={() => handleAnswerChange("q2", "10110_2")}
                    className="mr-2"
                  />
                  10110<sub>2</sub>
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="11001_2"
                    onChange={() => handleAnswerChange("q2", "11001_2")}
                    className="mr-2"
                  />
                  11001<sub>2</sub>
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q2"
                    value="11101_2"
                    onChange={() => handleAnswerChange("q2", "11101_2")}
                    className="mr-2"
                  />
                  11101<sub>2</sub>
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
              <strong>Question</strong>: What is the binary representation of
              the decimal number 15?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="1111_2"
                    onChange={() => handleAnswerChange("q3", "1111_2")}
                    className="mr-2"
                  />
                  1111<sub>2</sub>
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="1100_2"
                    onChange={() => handleAnswerChange("q3", "1100_2")}
                    className="mr-2"
                  />
                  1100<sub>2</sub>
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="1001_2"
                    onChange={() => handleAnswerChange("q3", "1001_2")}
                    className="mr-2"
                  />
                  1001<sub>2</sub>
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q3"
                    value="1110_2"
                    onChange={() => handleAnswerChange("q3", "1110_2")}
                    className="mr-2"
                  />
                  1110<sub>2</sub>
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
              <strong>Question</strong>: What is the decimal representation of
              the binary number 1110<sub>2</sub>?
            </Typography>
            <ul>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="14"
                    onChange={() => handleAnswerChange("q4", "14")}
                    className="mr-2"
                  />
                  14
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="15"
                    onChange={() => handleAnswerChange("q4", "15")}
                    className="mr-2"
                  />
                  15
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="16"
                    onChange={() => handleAnswerChange("q4", "16")}
                    className="mr-2"
                  />
                  16
                </label>
              </li>
              <li>
                <label className="text-black dark:text-white">
                  <input
                    type="radio"
                    name="q4"
                    value="17"
                    onChange={() => handleAnswerChange("q4", "17")}
                    className="mr-2"
                  />
                  17
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
          previousRoute={ROUTES_URL.introduction}
          previousRouteLabel="Introduction"
          nextRoute={ROUTES_URL.booleanAlgebra}
          NextRouteLabel="Boolean Algebra"
        />
      </Paper>
    </>
  );
}
