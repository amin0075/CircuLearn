import type { IColor } from "@src/@types/color";

/** @deprecated Accent is fixed to shadcn `--primary`; color arg is ignored. */
const textColor = (_color?: IColor) => "text-primary";

/** @deprecated Accent is fixed to shadcn `--primary`; color arg is ignored. */
const borderColor = (_color?: IColor) =>
  "border-primary hover:border-primary/50";

/** @deprecated Accent is fixed to shadcn `--primary`; color arg is ignored. */
const bgGradient = (_color?: IColor) => "bg-primary";

/** @deprecated Accent is fixed to shadcn `--primary`; color arg is ignored. */
const bgColor = (_color?: IColor, opacity?: string) =>
  "bg-primary" + (opacity ? `/[${opacity}]` : "");

export { textColor, borderColor, bgGradient, bgColor };
