"use client";

import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Label } from "@src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@src/components/ui/radio-group";
import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";

export type PracticeOption = {
  value: string;
  label: ReactNode;
};

type PracticeQuestionProps = {
  questionNumber: number;
  question: ReactNode;
  name: string;
  options: PracticeOption[];
  value: string;
  onValueChange: (value: string) => void;
  correctAnswer?: string;
  showFeedback?: boolean;
  disabled?: boolean;
  className?: string;
};

export function PracticeQuestion({
  questionNumber,
  question,
  name,
  options,
  value,
  onValueChange,
  correctAnswer,
  showFeedback = false,
  disabled = false,
  className,
}: PracticeQuestionProps) {
  const isCorrect = showFeedback && value && correctAnswer === value;

  return (
    <Card
      className={cn(className)}
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
      <CardContent className="flex flex-col gap-3 pt-0">
        <RadioGroup
          name={name}
          value={value}
          onValueChange={onValueChange}
          className="gap-2"
          disabled={disabled}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 transition-colors has-[[data-state=checked]]:border-primary/25 has-[[data-state=checked]]:bg-primary/5"
            >
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
                disabled={disabled}
              />
              <Label
                htmlFor={`${name}-${option.value}`}
                className="cursor-pointer font-normal"
              >
                <Typography variant="body-sm" as="span">
                  {option.label}
                </Typography>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showFeedback && value ? (
          <Typography
            variant="body-sm"
            className={cn(isCorrect ? "text-primary" : "text-destructive")}
          >
            {isCorrect
              ? "Correct!"
              : `Incorrect. The correct answer is ${correctAnswer}.`}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}
