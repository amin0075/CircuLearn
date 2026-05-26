/** URL slug from a display title (e.g. "AND Gate" → "and-gate"). */
export function titleToSlug(name: string): string {
  return name.toLowerCase().replace(/ /g, "-");
}

/** Find an item whose slugified `name` matches `slug`. */
export function findBySlug<T extends { name: string }>(
  items: readonly T[],
  slug: string,
): T | undefined {
  return items.find((item) => titleToSlug(item.name) === slug);
}
