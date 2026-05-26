import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card"
import { Typography } from "@src/components/ui/typography"

import { ContentFigure } from "./content-figure"

export type ApplicationItem = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  credit?: string
}

type ApplicationShowcaseProps = {
  items: ApplicationItem[]
}

export function ApplicationShowcase({ items }: ApplicationShowcaseProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card
          key={item.title}
          size="sm"
          className="flex h-full flex-col overflow-hidden border-border/80 bg-card p-0 shadow-sm *:[img:first-child]:rounded-none"
        >
          <ContentFigure
            src={item.imageSrc}
            alt={item.imageAlt}
            credit={item.credit}
            aspectClassName="aspect-[4/3]"
            className="w-full max-w-none gap-1.5 rounded-none border-0 px-3 pt-3 shadow-none ring-0 [&>div:first-child]:rounded-md"
          />
          <CardHeader className="gap-1">
            <CardTitle className="text-heading-sm font-semibold">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Typography variant="body-sm" className="text-muted-foreground">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
