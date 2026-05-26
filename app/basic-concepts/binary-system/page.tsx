import type { Metadata } from "next";

import BinarySystemContent from "./binary-system-content";

export const metadata: Metadata = {
  title: "Binary System",
  description: "Binary System",
};

export default function BinarySystemPage() {
  return <BinarySystemContent />;
}
