import type { Metadata } from "next";

import IntroductionContent from "./introduction-content";

export const metadata: Metadata = {
  title: "Introduction to logic circuits page",
  description: "Introduction to logic circuits page",
};

export default function IntroductionPage() {
  return <IntroductionContent />;
}
