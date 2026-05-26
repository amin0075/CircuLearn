import type { ReactNode } from "react"

import { Separator } from "@src/components/ui/separator"
import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

type LessonSectionProps = {
  title?: string
  description?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}

export function LessonSection({
  title,
  description,
  children,
  className,
  id,
}: LessonSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col gap-4 border-b px-4 py-6 last:border-b-0 md:px-8 md:py-8",
        className,
      )}
    >
      {title ? (
        <div className="flex flex-col gap-2">
          <Typography variant="heading-xl" as="h2">
            {title}
          </Typography>
          {description ? (
            <Typography variant="body-base" className="text-muted-foreground">
              {description}
            </Typography>
          ) : null}
          <Separator className="max-w-16 bg-primary/40" />
        </div>
      ) : null}
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}
