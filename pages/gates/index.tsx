import { GetServerSidePropsContext } from "next";

import { useEffect } from "react";

// utils
import { useRouter } from "next/router";

// components

export default function GatesMainPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/gates/and-gate");
  }, []);

  return <></>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/gates/and-gate",
      permanent: false,
    },
  };
};
