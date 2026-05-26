"use client";

import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";

type QuizQuestionCardProps = {
  questionNumber: number;
  question: ReactNode;
  children: ReactNode;
  hasError?: boolean;
  className?: string;
};

export function QuizQuestionCard({
  questionNumber,
  question,
  children,
  hasError = false,
  className,
}: QuizQuestionCardProps) {
  return (
    <Card
      className={cn(
        hasError && "ring-1 ring-destructive/30 border-destructive/50",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-start gap-3 pb-2">
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary"
        >
          {questionNumber}
        </span>
        <CardTitle className="flex-1 text-base leading-snug font-normal">
          <Typography variant="body-base" as="span">
            {question}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}
