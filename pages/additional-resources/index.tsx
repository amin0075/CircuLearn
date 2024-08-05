import { GetServerSidePropsContext } from "next";

import { useEffect } from "react";

// utils
import { useRouter } from "next/router";

// components

export default function AdditionalResources() {
  const router = useRouter();

  useEffect(() => {
    router.push("/additional-resources/glossary");
  }, []);

  return <></>;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/additional-resources/glossary",
      permanent: false,
    },
  };
};
