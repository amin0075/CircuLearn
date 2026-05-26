import type { ReactNode } from "react"

import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

type ExampleBlockProps = {
  title?: string
  children: ReactNode
  className?: string
}

export function ExampleBlock({ title = "Example", children, className }: ExampleBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/80 bg-muted/25 px-4 py-3 font-mono text-body-sm",
        className,
      )}
    >
      <Typography variant="label-sm" className="mb-2 block text-primary">
        {title}
      </Typography>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}
