import { renderToStaticMarkup } from "react-dom/server";

import { Typography } from "./typography";

describe("Typography", () => {
  it("applies heading scale and title font for headings", () => {
    const html = renderToStaticMarkup(
      <Typography variant="heading-xl" as="h2">
        Section
      </Typography>,
    );

    expect(html).toContain("text-heading-xl");
    expect(html).toContain("font-title");
    expect(html).toContain("font-semibold");
    expect(html).toMatch(/<h2[^>]*>/);
  });

  it("applies body scale and text font for body copy", () => {
    const html = renderToStaticMarkup(
      <Typography variant="body-base">Paragraph</Typography>,
    );

    expect(html).toContain("text-body-base");
    expect(html).toContain("font-text");
    expect(html).toContain("font-normal");
    expect(html).toMatch(/<p[^>]*>/);
  });

  it("applies semibold weight for label variants", () => {
    const html = renderToStaticMarkup(
      <Typography variant="label-sm" as="span">
        Nav item
      </Typography>,
    );

    expect(html).toContain("text-label-sm");
    expect(html).toContain("font-semibold");
  });
});
