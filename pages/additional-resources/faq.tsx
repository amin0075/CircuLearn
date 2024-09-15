import { useRef, useState, useLayoutEffect } from "react";

// utils
import Button from "@src/components/Button";
import Link from "next/link";
import { ROUTES_URL } from "@src/routes";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import data from "@src/lib/faq.json";
import IconButton from "@src/components/IconButton";
import { Close } from "@src/assets/icons";

export default function FAQ() {
  const [toggle, setToggle] = useState<boolean[]>(
    new Array(data.faq.length).fill(false)
  );
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    const newHeights = refs.current.map((ref) => ref?.scrollHeight || 0);
    setHeights(newHeights);
  }, []);

  const toggleAnswer = (index: number) => {
    setToggle((prev) => {
      const newToggle = [...prev];
      newToggle[index] = !newToggle[index];
      return newToggle;
    });
  };

  return (
    <>
      <Head>
        <title>FAQ page</title>
        <meta name="description" content="FAQ page" />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">Frequently Asked Questions</Typography>
        {data.faq.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-4 p-4 bg-gray-200 dark:bg-customGrayDark rounded-lg"
          >
            <div
              className="w-full flex items-center justify-between gap-2"
              tabIndex={0}
              role="button"
              aria-label="toggle answer"
              onClick={() => toggleAnswer(index)}
            >
              <Typography variant="h4">{item.question}</Typography>
              <Close
                className={`w-8 h-8 text-black dark:text-white transition-all ease-in-out duration-300 ${toggle[index] ? "" : "rotate-45"}`}
              />
            </div>
            <div
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="overflow-hidden transition-all ease-in-out duration-300"
              style={{
                height: toggle[index] ? `${heights[index]}px` : "0px",
              }}
            >
              <Typography variant="body2">{item.answer}</Typography>
            </div>
          </div>
        ))}
      </Paper>
    </>
  );
}
