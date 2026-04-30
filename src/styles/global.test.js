import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const globalCss = readFileSync(new URL("./global.css", import.meta.url), "utf8");

describe("global layout rhythm", () => {
  it("keeps page-frame child spacing scoped out of the site header", () => {
    expect(globalCss).toContain("main .page-frame > * + *");
    expect(globalCss).not.toMatch(/(^|\n|,)\s*\.page-frame > \* \+ \*/);
  });
});
