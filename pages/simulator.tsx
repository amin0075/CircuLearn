import Simulator from "@src/components/global/Simulations/LogicCircuitSimulator";
import React, { ReactNode } from "react";
import Head from "next/head";

interface IProps {
  children?: ReactNode;
}

const SimulatorPage: React.FC<IProps> = () => {
  return (
    <>
      <Head>
        <title>Simulator</title>
        <meta name="description" content="Simulator" />
      </Head>
      <Simulator />
    </>
  );
};

export default SimulatorPage;
