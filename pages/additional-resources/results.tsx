import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import Head from "next/head";
import Divider from "@src/components/Divider";
import Table from "@src/components/Table";

interface QuizResult {
  score: number;
  result: any;
}

interface FeedbackEntry {
  feedback: {
    questionnaire: { answer: string }[];
    nielsen: { passFailVal: string }[];
    gestalt: { passFailVal: string }[];
  };
  createdAt: string;
}

const MAX_SCORE = 9;

const ResultsPage: React.FC = () => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch quiz results and feedback entries
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quiz results
        const quizResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quiz`,
          {
            credentials: "include",
          }
        );
        const quizData = await quizResponse.json();
        const sortedQuizResults = quizData.sort(
          (a: QuizResult, b: QuizResult) => b.score - a.score
        );
        setQuizResults(sortedQuizResults);

        // Fetch feedback entries
        const feedbackResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/feedback`
        );
        setFeedbackEntries(feedbackResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Flatten the quiz result structure to ensure 9 question columns
  const formatResultColumns = (result: any) => {
    const flattenedResults = result.flat();
    return flattenedResults.map((questionResult: any) => {
      return (
        <td key={questionResult.questionId} className="px-6 py-4">
          {questionResult.isCorrect ? "Correct" : "Incorrect"}
        </td>
      );
    });
  };

  // Aggregating feedback for the 3 tables: General Feedback, Nielsen, and Gestalt
  const generalFeedbackQuestions = [
    "The interactive application was easy to navigate.",
    "The content of the interactive application was clear and understandable.",
    "The interactive application effectively demonstrated the principles of simple logic circuits.",
    "The interactive application increased my understanding of simple logic circuits.",
  ];

  const generalFeedbackOptions = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree",
  ];

  const generalFeedbackSummary = generalFeedbackQuestions.map(
    (question, qIndex) => {
      const optionCounts: { [key: string]: number } = {
        "Strongly Agree": 0,
        Agree: 0,
        Neutral: 0,
        Disagree: 0,
        "Strongly Disagree": 0,
      };

      feedbackEntries.forEach((entry) => {
        const answer = entry.feedback.questionnaire[qIndex].answer;
        if (optionCounts[answer] !== undefined) {
          optionCounts[answer] += 1;
        }
      });

      return { question, optionCounts };
    }
  );

  // Nielsen's 10 Usability Heuristics Feedback Summary
  const nielsenFeedbackQuestions = [
    "Visibility of System Status",
    "User Control and Freedom",
    "Recognition Rather Than Recall",
    "Match Between System and the Real World",
    "Aesthetic and Minimalist Design",
  ];

  const nielsenFeedbackSummary = nielsenFeedbackQuestions.map(
    (heuristic, hIndex) => {
      const passFailCounts: { [key: string]: number } = { Pass: 0, Fail: 0 };
      feedbackEntries.forEach((entry) => {
        const passFail = entry.feedback.nielsen[hIndex].passFailVal;
        if (passFail === "pass") {
          passFailCounts.Pass += 1;
        } else if (passFail === "fail") {
          passFailCounts.Fail += 1;
        }
      });
      return { heuristic, passFailCounts };
    }
  );

  // Gestalt's Principles Feedback Summary
  const gestaltFeedbackQuestions = [
    "Law of Common Region",
    "Law of Proximity",
    "Law of Prägnanz",
    "Law of Similarity",
    "Law of Uniform Connectedness",
  ];

  const gestaltFeedbackSummary = gestaltFeedbackQuestions.map(
    (principle, pIndex) => {
      const passFailCounts: { [key: string]: number } = { Pass: 0, Fail: 0 };
      feedbackEntries.forEach((entry) => {
        const passFail = entry.feedback.gestalt[pIndex].passFailVal;
        if (passFail === "pass") {
          passFailCounts.Pass += 1;
        } else if (passFail === "fail") {
          passFailCounts.Fail += 1;
        }
      });
      return { principle, passFailCounts };
    }
  );

  return (
    <>
      <Head>
        <title>Results</title>
        <meta name="description" content="Results page" />
      </Head>
      <Paper className="flex flex-col gap-8 p-6 smd:p-4 w-full min-h-full">
        <Typography variant="h2" className="mb-4">
          Quiz Results and Feedback of the Application
        </Typography>

        {/* Quiz Results Section */}
        <section>
          <Typography variant="h4">
            Quiz Results (Max Score: {MAX_SCORE})
          </Typography>
          {quizResults.length > 0 ? (
            <Table
              tableHeads={
                <>
                  <th scope="col" className="px-6 py-3">
                    <Typography variant="body2" className="text-nowrap">
                      Score
                    </Typography>
                  </th>
                  {[...Array(9)].map((_, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                      <Typography variant="caption" className="text-nowrap">
                        Question {index + 1}
                      </Typography>
                    </th>
                  ))}
                </>
              }
              tableRows={quizResults.map((result, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    {result.score} / {MAX_SCORE}
                  </td>
                  {formatResultColumns(result.result)}
                </tr>
              ))}
            />
          ) : (
            <Typography variant="body2">No quiz results found.</Typography>
          )}
        </section>

        <Divider />

        {/* General Feedback Table */}
        <section>
          <Typography variant="h4">General Feedback</Typography>
          <Table
            tableHeads={
              <>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="body2" className="text-nowrap">
                    Question
                  </Typography>
                </th>
                {generalFeedbackOptions.map((option) => (
                  <th key={option} scope="col" className="px-6 py-3">
                    <Typography variant="caption" className="text-nowrap">
                      {option}
                    </Typography>
                  </th>
                ))}
              </>
            }
            tableRows={generalFeedbackSummary.map((summary, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{summary.question}</td>
                {generalFeedbackOptions.map((option) => (
                  <td key={option} className="px-6 py-4">
                    {summary.optionCounts[option]}
                  </td>
                ))}
              </tr>
            ))}
          />
        </section>

        <Divider />

        {/* Nielsen's 10 Usability Heuristics Table */}
        <section>
          <Typography variant="h4">
            Nielsen's 10 Usability Heuristics
          </Typography>
          <Table
            tableHeads={
              <>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="body2" className="text-nowrap">
                    Heuristic
                  </Typography>
                </th>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="caption" className="text-nowrap">
                    Pass
                  </Typography>
                </th>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="body2" className="text-nowrap">
                    Fail
                  </Typography>
                </th>
              </>
            }
            tableRows={nielsenFeedbackSummary.map((summary, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{summary.heuristic}</td>
                <td className="px-6 py-4">{summary.passFailCounts.Pass}</td>
                <td className="px-6 py-4">{summary.passFailCounts.Fail}</td>
              </tr>
            ))}
          />
        </section>

        <Divider />

        {/* Gestalt's Principles Table */}
        <section>
          <Typography variant="h4">Gestalt's Principles</Typography>
          <Table
            tableHeads={
              <>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="body2" className="text-nowrap">
                    Principle
                  </Typography>
                </th>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="caption" className="text-nowrap">
                    Pass
                  </Typography>
                </th>
                <th scope="col" className="px-6 py-3">
                  <Typography variant="caption" className="text-nowrap">
                    Fail
                  </Typography>
                </th>
              </>
            }
            tableRows={gestaltFeedbackSummary.map((summary, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{summary.principle}</td>
                <td className="px-6 py-4">{summary.passFailCounts.Pass}</td>
                <td className="px-6 py-4">{summary.passFailCounts.Fail}</td>
              </tr>
            ))}
          />
        </section>
      </Paper>
    </>
  );
};

export default ResultsPage;
