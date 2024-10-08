import { GetServerSidePropsContext } from "next";

import { useEffect } from "react";

// utils
import { useRouter } from "next/router";

// components

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/introduction");
  }, []);

  return <></>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/introduction",
      permanent: false,
    },
  };
};
