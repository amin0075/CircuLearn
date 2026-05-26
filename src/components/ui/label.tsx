"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { Typography } from "@/components/ui/typography";
import { cn } from "@src/lib/utils";

function Label({
  className,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root asChild data-slot="label" {...props}>
      <Typography
        as="label"
        variant="label-sm"
        className={cn(
          "flex select-none items-center gap-2 leading-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className,
        )}
      >
        {children}
      </Typography>
    </LabelPrimitive.Root>
  );
}

export { Label };
