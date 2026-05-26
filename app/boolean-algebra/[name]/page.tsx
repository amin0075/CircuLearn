import type { Metadata } from "next";

import lawsData from "@src/lib/booleanAlgebra.json";
import type { BooleanLaw } from "@src/lib/gates/types";
import { findBySlug } from "@src/lib/slug";

import LawPageContent from "./law-content";

const laws = lawsData as BooleanLaw[];

type PageProps = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const law = findBySlug(laws, name);

  if (!law) {
    return { title: "Law not found" };
  }

  return {
    title: law.name,
    description: `Learn about ${law.name}`,
  };
}

export default function LawPage() {
  return <LawPageContent />;
}
