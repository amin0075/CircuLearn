import type { Metadata } from "next";

import BooleanAlgebraIntroContent from "./introduction-content";

export const metadata: Metadata = {
  title: "Boolean Algebra Introduction",
  description: "Boolean Algebra Introduction",
};

export default function BooleanAlgebraIntroductionPage() {
  return <BooleanAlgebraIntroContent />;
}
