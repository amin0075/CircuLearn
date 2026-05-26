import type { ReactNode } from "react"

import { Badge } from "@src/components/ui/badge"
import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

type LessonHeroProps = {
  title: string
  description?: ReactNode
  badge?: string
  className?: string
}

export function LessonHero({
  title,
  description,
  badge,
  className,
}: LessonHeroProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b bg-gradient-to-br from-primary/12 via-background to-muted/50 px-4 py-8 md:px-8 md:py-10",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-0 size-48 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative flex max-w-3xl flex-col gap-3">
        {badge ? (
          <Badge variant="secondary" className="w-fit">
            {badge}
          </Badge>
        ) : null}
        <Typography variant="heading-2xl" as="h1">
          {title}
        </Typography>
        {description ? (
          <Typography
            variant="body-base"
            className="text-pretty text-muted-foreground"
          >
            {description}
          </Typography>
        ) : null}
      </div>
    </header>
  )
}
