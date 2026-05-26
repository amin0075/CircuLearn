import type { Metadata } from "next";

import ReferencesContent from "./references-content";

export const metadata: Metadata = {
  title: "References",
  description: "References page",
};

export default function ReferencesPage() {
  return <ReferencesContent />;
}
