"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

import Layout from "@src/layout";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Layout>{children}</Layout>
      <ToastContainer closeButton={false} />
    </>
  );
}
