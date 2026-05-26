import type { Metadata } from "next";

import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact page",
  description: "Contact page",
};

export default function ContactPage() {
  return <ContactContent />;
}
