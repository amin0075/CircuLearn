import type { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardFooter,
} from "@src/components/ui/card"
import { cn } from "@src/lib/utils"

type LessonPageProps = {
  children: ReactNode
  className?: string
  footer?: ReactNode
}

export function LessonPage({ children, className, footer }: LessonPageProps) {
  return (
    <Card
      className={cn(
        "w-full min-h-full gap-0 overflow-hidden p-0 ring-1 ring-border/80",
        className,
      )}
    >
      <CardContent className="flex min-h-0 flex-1 flex-col gap-0 p-0">
        {children}
      </CardContent>
      {footer ? (
        <CardFooter className="border-t bg-muted/20 px-4 py-4 md:px-8">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  )
}
