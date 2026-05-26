import type { Metadata } from "next";

import GlossaryContent from "./glossary-content";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Glossary",
};

export default function GlossaryPage() {
  return <GlossaryContent />;
}
