import { GetServerSidePropsContext } from "next";

import { useEffect } from "react";

// utils
import { useRouter } from "next/router";

// components

export default function BooleanAlgebra() {
  const router = useRouter();

  useEffect(() => {
    router.push("/boolean-algebra/introduction");
  }, []);

  return <></>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/boolean-algebra/introduction",
      permanent: false,
    },
  };
};
