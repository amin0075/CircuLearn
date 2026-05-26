import type { Metadata } from "next";

import FaqContent from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "FAQ",
};

export default function FaqPage() {
  return <FaqContent />;
}
