import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@src/components/ui/button"
import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

interface HelperNavigationProps {
  hasPrevious?: boolean
  hasNext?: boolean
  previousRoute?: string
  previousRouteLabel?: string
  NextRouteLabel?: string
  nextRoute?: string
  className?: string
}

const HelperNavigation = ({
  hasPrevious = true,
  hasNext = true,
  previousRoute = "",
  previousRouteLabel = "",
  NextRouteLabel = "",
  nextRoute = "",
  className,
}: HelperNavigationProps) => {
  return (
    <nav
      aria-label="Lesson navigation"
      className={cn(
        "flex w-full flex-wrap items-center gap-3",
        !hasPrevious && hasNext ? "justify-end" : "justify-between",
        className,
      )}
    >
      {hasPrevious ? (
        <Button asChild variant="outline" size="lg" className="gap-1.5">
          <Link href={previousRoute}>
            <ChevronLeft className="size-4" aria-hidden />
            <Typography variant="label-sm" as="span">
              {previousRouteLabel}
            </Typography>
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {hasNext ? (
        <Button asChild size="lg" className="gap-1.5">
          <Link href={nextRoute}>
            <Typography variant="label-sm" as="span">
              {NextRouteLabel}
            </Typography>
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </Button>
      ) : null}
    </nav>
  )
}

export default HelperNavigation
