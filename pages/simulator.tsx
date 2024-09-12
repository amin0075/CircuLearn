import Simulator from "@src/components/global/Simulations/LogicCircuitSimulator";
import React, { ReactNode } from "react";
import Head from "next/head";
import { ReactFlowProvider } from "react-flow-renderer";

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
      <ReactFlowProvider>
        <Simulator />
      </ReactFlowProvider>
    </>
  );
};

export default SimulatorPage;
