import type { Metadata } from "next";

import SimulatorContent from "./simulator-content";

export const metadata: Metadata = {
  title: "Simulator",
  description:
    "Build and test logic circuits with interactive gates, inputs, and outputs.",
};

export default function SimulatorPage() {
  return <SimulatorContent />;
}
