"use client";

import * as React from "react";

import { CircleAlertIcon } from "lucide-react";
import { Input } from "@src/components/ui/input";
import { Textarea } from "@src/components/ui/textarea";
import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";

interface FieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size"
  > {
  variant?: "default" | "bordered" | "underline";
  label?: React.ReactNode;
  multiLine?: boolean;
  rows?: number;
  errorText?: string;
  error?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  isSensitive?: boolean;
}

const Field = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  (
    {
      variant = "default",
      label,
      className,
      multiLine = false,
      rows = 4,
      errorText,
      error,
      iconLeft,
      iconRight,
      isSensitive = false,
      ...rest
    },
    ref,
  ) => {
    const borderClass =
      variant === "bordered"
        ? cn(
            "rounded-md border p-2",
            error ? "border-destructive" : "border-input",
          )
        : variant === "underline"
          ? cn(
              "rounded-none border-0 border-b",
              error ? "border-destructive" : "border-input",
            )
          : "";

    const controlClass = cn(
      "w-full bg-transparent",
      variant === "default" && "border-0",
      className,
    );

    return (
      <div className="flex w-full flex-1 flex-col items-start gap-2">
        {label}
        <div
          className={cn(
            "relative flex w-full gap-2",
            multiLine ? "items-start" : "items-center",
            borderClass,
            isSensitive && "bg-muted/30",
          )}
        >
          {error ? (
            <CircleAlertIcon
              className={cn("size-6 shrink-0 text-destructive", multiLine && "mt-2")}
              aria-hidden
            />
          ) : (
            iconLeft
          )}
          {multiLine ? (
            <Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              aria-invalid={error || undefined}
              className={controlClass}
              {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <Input
              ref={ref as React.Ref<HTMLInputElement>}
              aria-invalid={error || undefined}
              className={controlClass}
              {...rest}
            />
          )}
          {iconRight}
          {isSensitive ? (
            <span className="absolute inset-0 rounded-md backdrop-blur-sm" />
          ) : null}
        </div>
        {error && errorText ? (
          <Typography variant="body-xs" className="text-destructive">
            {errorText}
          </Typography>
        ) : null}
      </div>
    );
  },
);
Field.displayName = "Field";

export { Field };
