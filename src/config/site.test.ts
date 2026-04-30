import { describe, expect, it } from "vitest";
import {
  aboutPage,
  footerCopy,
  homeHero,
  navigation,
  site,
  socialLinks,
} from "./site";
import { deployment } from "../../deployment.config.mjs";

describe("site identity", () => {
  it("keeps public identity copy in one authoring surface", () => {
    expect(homeHero.brand).toBe(site.name);
    expect(aboutPage.title).toBe("About");
    expect(aboutPage.context.rows.map((row) => row.label)).toEqual([
      "Role",
      "Public surface",
      "Private boundary",
    ]);
    expect(aboutPage.workThemes.items.length).toBeGreaterThan(0);
    expect(footerCopy.summary).toContain("public record");
    expect(navigation.map((item) => item.label)).toEqual([
      "Records",
      "Build",
      "About",
    ]);
    expect(socialLinks).toEqual(site.links);
  });

  it("uses the active GitHub Pages origin", () => {
    expect(site.url).toBe(deployment.site);
    expect(site.url).toBe("https://oswa1d99.github.io");
  });
});
