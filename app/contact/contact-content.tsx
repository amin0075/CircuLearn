"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { LessonHero, LessonPage, LessonSection } from "@src/components/content";
import { Typography } from "@/components/ui/typography";
import { Button } from "@src/components/ui/button";

const CONTACT_EMAIL = "aminkeshavarzi.dev@gmail.com";

export default function ContactContent() {
  return (
    <LessonPage>
      <LessonHero
        badge="Support"
        title="Contact"
        description="Questions, feedback, or issues with CircuLearn? We'd love to hear from you."
      />
      <LessonSection>
        <div className="flex flex-col items-start gap-4 rounded-lg border border-border/80 bg-muted/20 p-6">
          <Mail className="size-8 text-primary" aria-hidden />
          <Typography variant="body-base" className="text-muted-foreground">
            Email us at{" "}
            <Link
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </Link>
            .
          </Typography>
          <Button asChild>
            <Link href={`mailto:${CONTACT_EMAIL}`}>Send an email</Link>
          </Button>
        </div>
      </LessonSection>
    </LessonPage>
  );
}
