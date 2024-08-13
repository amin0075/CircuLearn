import { GetServerSidePropsContext } from "next";

import { useEffect } from "react";

// utils
import { useRouter } from "next/router";

// components

export default function BasicConcepts() {
  const router = useRouter();

  useEffect(() => {
    router.push("/final-step/quiz");
  }, []);

  return <></>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/final-step/quiz",
      permanent: false,
    },
  };
};
