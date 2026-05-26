import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Typography variant guide:
 * | UI role          | variant       | as   | fontFamily      |
 * |------------------|---------------|------|-----------------|
 * | Page title       | heading-2xl   | h1   | title (auto)    |
 * | Section title    | heading-xl    | h2   | title (auto)    |
 * | Subsection       | heading-sm    | h3   | title (auto)    |
 * | Body paragraph   | body-base     | p    | text (default)  |
 * | Term emphasis    | label-base    | span | text            |
 * | Nav / meta       | label-sm      | span | text            |
 * | Fine print       | body-xs       | span | text            |
 */
const typographyVariants = cva("", {
  variants: {
    variant: {
      "label-xs": "text-label-xs",
      "label-sm": "text-label-sm",
      "label-base": "text-label-base",
      "body-xs": "text-body-xs",
      "body-sm": "text-body-sm",
      "body-base": "text-body-base",
      "body-lg": "text-body-lg",
      "heading-xs": "text-heading-xs",
      "heading-sm": "text-heading-sm",
      "heading-md": "text-heading-md",
      "heading-lg": "text-heading-lg",
      "heading-xl": "text-heading-xl",
      "heading-2xl": "text-heading-2xl",
      "heading-3xl": "text-heading-3xl",
    },
    fontFamily: {
      title: "font-title",
      text: "font-text",
    },
    fontWeight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
  },
  defaultVariants: {
    variant: "body-base",
    fontFamily: "text",
  },
  compoundVariants: [
    {
      variant: [
        "heading-xs",
        "heading-sm",
        "heading-md",
        "heading-lg",
        "heading-xl",
        "heading-2xl",
        "heading-3xl",
      ],
      class: "font-title",
    },
    {
      variant: ["label-xs", "label-sm", "label-base"],
      class: "font-semibold",
    },
    {
      variant: ["body-xs", "body-sm", "body-base", "body-lg"],
      class: "font-normal",
    },
    {
      variant: [
        "heading-xs",
        "heading-sm",
        "heading-md",
        "heading-lg",
        "heading-xl",
        "heading-2xl",
        "heading-3xl",
      ],
      class: "font-semibold",
    },
  ],
});

const defaultElementByVariant: Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  React.ElementType
> = {
  "label-xs": "span",
  "label-sm": "span",
  "label-base": "span",
  "body-xs": "p",
  "body-sm": "p",
  "body-base": "p",
  "body-lg": "p",
  "heading-xs": "h3",
  "heading-sm": "h3",
  "heading-md": "h2",
  "heading-lg": "h2",
  "heading-xl": "h2",
  "heading-2xl": "h1",
  "heading-3xl": "h1",
};

interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  children?: React.ReactNode;
}

export const Typography = ({
  className,
  variant = "body-base",
  fontFamily,
  fontWeight,
  as,
  children,
  ...props
}: TypographyProps) => {
  const resolvedVariant = variant ?? "body-base";
  const Component =
    as ?? defaultElementByVariant[resolvedVariant] ?? "p";

  return (
    <Component
      className={cn(
        typographyVariants({ variant, fontFamily, fontWeight }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
