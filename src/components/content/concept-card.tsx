import type { LucideIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card"
import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

type ConceptCardProps = {
  title: string
  description: string
  icon?: LucideIcon
  className?: string
}

export function ConceptCard({
  title,
  description,
  icon: Icon,
  className,
}: ConceptCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "h-full border-primary/15 bg-muted/25 shadow-none ring-0",
        className,
      )}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Icon className="size-4" aria-hidden />
            </span>
          ) : null}
          <CardTitle>
            <Typography variant="heading-sm" as="span">
              {title}
            </Typography>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Typography variant="body-sm" className="text-muted-foreground">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}
