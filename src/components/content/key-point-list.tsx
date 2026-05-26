import { Check } from "lucide-react"

import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

export type KeyPoint = {
  title: string
  description?: string
}

type KeyPointListProps = {
  items: KeyPoint[]
  className?: string
  columns?: 1 | 2
}

export function KeyPointList({
  items,
  className,
  columns = 1,
}: KeyPointListProps) {
  return (
    <ul
      className={cn(
        "grid list-none gap-3 p-0",
        columns === 2 && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className="flex gap-3 rounded-lg border border-border/80 bg-muted/20 p-3"
        >
          <span
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
            aria-hidden
          >
            <Check className="size-3.5" />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <Typography variant="label-base" as="span">
              {item.title}
            </Typography>
            {item.description ? (
              <Typography variant="body-sm" className="text-muted-foreground">
                {item.description}
              </Typography>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}
