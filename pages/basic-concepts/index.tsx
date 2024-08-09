import { GetServerSidePropsContext } from "next";

import { useEffect } from "react";

// utils
import { useRouter } from "next/router";

// components

export default function BasicConcepts() {
  const router = useRouter();

  useEffect(() => {
    router.push("/basic-concepts/binary-system");
  }, []);

  return <></>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/basic-concepts/binary-systemy",
      permanent: false,
    },
  };
};
