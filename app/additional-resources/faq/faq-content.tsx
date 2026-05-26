"use client";

import { PlusIcon } from "lucide-react";
import { LessonHero, LessonPage, LessonSection } from "@src/components/content";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@src/components/ui/collapsible";
import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";
import data from "@src/lib/faq.json";

export default function FaqContent() {
  return (
    <LessonPage>
      <LessonHero
        badge="Help center"
        title="Frequently Asked Questions"
        description="Quick answers about using CircuLearn, lessons, and the simulator."
      />
      <LessonSection>
        <div className="flex flex-col gap-3">
          {data.faq.map((item) => (
            <Collapsible
              key={item.question}
              className="group/faq-item rounded-lg border border-border/80 bg-muted/20"
            >
              <div className="flex flex-col p-4">
                <CollapsibleTrigger
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-md text-left",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                >
                  <Typography variant="heading-sm" as="h2">
                    {item.question}
                  </Typography>
                  <PlusIcon
                    aria-hidden
                    className="size-6 shrink-0 text-muted-foreground transition-transform duration-300 ease-in-out group-data-[state=closed]/faq-item:rotate-45"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Typography variant="body-sm" className="pt-3 text-muted-foreground">
                    {item.answer}
                  </Typography>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </LessonSection>
    </LessonPage>
  );
}
