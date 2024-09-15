// react
import React from "react";

// nextjs
import type { AppProps } from "next/app";
import Script from "next/script";
import Link from "next/link";
import Head from "next/head";
import type { NextComponentType } from "next";
import { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import type { Page } from "../next-env";

// global css
import "../styles/globals.css";

// layout
import Layout from "@src/layout";

// types
import { Page } from "@src/@types/page";

// react-toastify
import { ToastContainer } from "react-toastify";

type Props = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: Props) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta
          name="description"
          content="CircuLearn - learn simple logic circuits"
        />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndProvider backend={HTML5Backend}>
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer closeButton={false} />
      </DndProvider>
    </>
  );
};

export default App;
