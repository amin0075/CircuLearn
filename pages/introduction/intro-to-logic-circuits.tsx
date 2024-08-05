import { useRef, useEffect } from "react";

// utils
import Button from "@src/components/Button";
import Link from "next/link";
import { ROUTES_URL } from "@src/routes";
import Head from "next/head";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import data from "@src/lib/faq.json";

// components

export default function IntroToLogicCircuits() {
  return (
    <>
      <Head>
        <title>Introduction to logic circuits page</title>
        <meta
          name="description"
          content="Introduction to logic circuits page"
        />
      </Head>
      <Paper className="w-full flex flex-col gap-4 p-4 min-h-full">
        <Typography variant="h2">Introduction to logic circuits</Typography>
      </Paper>
    </>
  );
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   return {};
// };
