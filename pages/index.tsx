import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import Script from "next/script";

import { useRef, useEffect } from "react";

// hooks
import useHasHydrated from "@src/hooks/useHasHydrated";

// utils
import { ssrAuthHandler } from "@src/utils/ssrAuthHandler";
import Button from "@src/components/Button";
import Link from "next/link";
import { ROUTES_URL } from "@src/routes";

// components

export default function Home() {
  return <div className="flex gap-5 items-center p-5">hello</div>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // const queryClient = new QueryClient();
  const { locale, query } = ctx;
  // let forceLogout = false;
  // try {
  //   await queryClient.fetchQuery<{ results: IJobPost[] }>(['get-job-posts'], () => getJobPosts());
  // } catch (error: any) {
  //   console.log(' ssr error:', error);
  //   if (error.response?.data?.error?.status === 403) {
  //     forceLogout = true;
  //   }
  // }

  return ssrAuthHandler({
    ctx,
    props: {
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    // forceLogout,
  });
};
