import type { Metadata } from "next";

import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
