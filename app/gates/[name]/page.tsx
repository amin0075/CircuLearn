import type { Metadata } from "next";

import gatesData from "@src/lib/gates.json";
import type { GateLesson } from "@src/lib/gates/types";
import { findBySlug } from "@src/lib/slug";

import GatePageContent from "./gate-content";

const gates = gatesData as GateLesson[];

type PageProps = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const gate = findBySlug(gates, name);

  if (!gate) {
    return { title: "Gate not found" };
  }

  return {
    title: gate.name,
    description: `Learn about ${gate.name}`,
  };
}

export default function GatePage() {
  return <GatePageContent />;
}
