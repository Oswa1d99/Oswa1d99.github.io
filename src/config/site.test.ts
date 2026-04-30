import { describe, expect, it } from "vitest";
import {
  aboutPage,
  footerCopy,
  homeHero,
  navigation,
  site,
  socialLinks,
} from "./site";
import { siteContent } from "./site-content";
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

  it("keeps editable UI text in the site content authoring surface", () => {
    expect(siteContent.homeHero.promptThesis).toBe(
      "public technical record, kept honest by status.",
    );
    expect(siteContent.emptyStates.searchNoMatch).toBe(
      "No records matched this search. Try a broader term.",
    );
    expect(siteContent.searchPage.clear).toBe("Clear");
    expect(siteContent.searchPage.fallbackSuffix).toBe(" instead.");
  });

  it("documents empty-state copy used by rendering sites", () => {
    const linkedEmptyStateKeys = [
      "homeNoProof",
      "recordsNoPublished",
      "buildNoPublicThread",
      "tagNoRecords",
      "seriesNoRecords",
    ] as const;

    for (const key of linkedEmptyStateKeys) {
      expect(siteContent.emptyStates[key]).toEqual({
        title: expect.any(String),
        message: expect.any(String),
        href: expect.any(String),
        action: expect.any(String),
      });
    }

    expect(siteContent.emptyStates.recordFilterNoMatch).toEqual(
      expect.any(String),
    );
    expect(siteContent.emptyStates.pageNotFound).toEqual({
      title: expect.any(String),
      description: expect.any(String),
      message: expect.any(String),
      recordsHref: expect.any(String),
      recordsAction: expect.any(String),
      homeHref: expect.any(String),
      homeAction: expect.any(String),
    });
  });
});
