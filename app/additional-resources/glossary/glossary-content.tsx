"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";

import { LessonHero, LessonPage, LessonSection } from "@src/components/content";
import { Input } from "@src/components/ui/input";
import { Typography } from "@src/components/ui/typography";
import { cn } from "@src/lib/utils";
import data from "@src/lib/glossary.json";

type GlossaryItem = (typeof data.glossary)[number];

function groupByLetter(items: GlossaryItem[]) {
  return items.reduce<Record<string, GlossaryItem[]>>((acc, item) => {
    const firstLetter = item.term[0]?.toUpperCase() ?? "#";
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});
}

export default function GlossaryContent() {
  const [searchTerm, setSearchTerm] = useState("");

  const query = searchTerm.trim().toLowerCase();
  const filteredItems = data.glossary.filter((item) =>
    item.term.toLowerCase().includes(query),
  );
  const groupedData = groupByLetter(filteredItems);
  const letters = Object.keys(groupedData).sort();

  return (
    <LessonPage>
      <LessonHero
        badge="Reference"
        title="Glossary of Terms"
        description="Look up definitions for logic-circuit vocabulary used throughout the course."
      />

      <LessonSection>
      <div className="relative max-w-md">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search here..."
          aria-label="Search glossary terms"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="pl-8"
        />
      </div>

      {letters.length === 0 ? (
        <Typography variant="body-sm" className="text-muted-foreground">
          No terms match your search.
        </Typography>
      ) : (
        <div className="flex flex-col gap-6">
          {letters.map((letter) => (
            <section key={letter} className="flex flex-col gap-2">
              <Typography variant="heading-xl" as="h2" fontWeight="semibold">
                {letter}
              </Typography>
              <ul className="flex flex-col gap-2">
                {groupedData[letter].map((item) => (
                  <li
                    key={item.term}
                    className="flex flex-col gap-3 rounded-lg border border-border/80 bg-muted/20 p-4 sm:flex-row sm:items-start sm:gap-4"
                  >
                    <Typography
                      variant="label-base"
                      fontWeight="semibold"
                      className={cn(
                        "shrink-0 rounded-lg border border-border bg-card px-4 py-2",
                      )}
                    >
                      {item.term}
                    </Typography>
                    <Typography variant="body-sm">{item.definition}</Typography>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      </LessonSection>
    </LessonPage>
  );
}
