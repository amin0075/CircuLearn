import type { Metadata } from "next";

import TruthTableContent from "./truth-table-content";

export const metadata: Metadata = {
  title: "Truth Table",
  description: "Truth Table",
};

export default function TruthTablePage() {
  return <TruthTableContent />;
}
