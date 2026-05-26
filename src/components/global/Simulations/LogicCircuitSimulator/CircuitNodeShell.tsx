import type { ReactNode } from "react";

import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";

interface CircuitNodeShellProps {
  selected?: boolean;
  className?: string;
  children: ReactNode;
}

export function CircuitNodeShell({
  selected,
  className,
  children,
}: CircuitNodeShellProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card p-2 text-card-foreground shadow-sm",
        selected && "ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SignalValueBadgeProps {
  value?: number;
}

export function SignalValueBadge({ value = 0 }: SignalValueBadgeProps) {
  const isHigh = value === 1;

  return (
    <Typography
      as="span"
      variant="body-xs"
      fontWeight="medium"
      className={cn(
        "rounded-md px-2 py-0.5 tabular-nums",
        isHigh
          ? "bg-muted font-semibold text-foreground"
          : "bg-muted/60 text-muted-foreground",
      )}
    >
      {value}
    </Typography>
  );
}
