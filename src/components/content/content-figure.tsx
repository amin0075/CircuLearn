import Image from "next/image"

import { Typography } from "@src/components/ui/typography"
import { cn } from "@src/lib/utils"

type ContentFigureProps = {
  src: string
  alt: string
  caption?: string
  credit?: string
  className?: string
  aspectClassName?: string
  priority?: boolean
}

export function ContentFigure({
  src,
  alt,
  caption,
  credit,
  className,
  aspectClassName = "aspect-[4/3]",
  priority = false,
}: ContentFigureProps) {
  return (
    <figure className={cn("flex w-full max-w-md flex-col gap-2", className)}>
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-lg border bg-muted/40 shadow-sm ring-1 ring-border/70",
          aspectClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="flex flex-col gap-0.5">
          {caption ? (
            <Typography variant="body-sm" className="text-foreground">
              {caption}
            </Typography>
          ) : null}
          {credit ? (
            <Typography variant="body-xs" className="text-muted-foreground">
              {credit}
            </Typography>
          ) : null}
        </figcaption>
      )}
    </figure>
  )
}
