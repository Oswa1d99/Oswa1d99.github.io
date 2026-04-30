import { describe, expect, it } from "vitest";
import {
  getCanonicalUrl,
  getDeployableHref,
  getInternalPath,
  getPagefindAssetPath,
  getSearchableContentPath,
} from "./deployment";

describe("deployment paths", () => {
  it("keeps root-relative paths unchanged for the user-site deployment", () => {
    expect(getInternalPath("/records/")).toBe("/records/");
    expect(getPagefindAssetPath()).toBe("/pagefind/pagefind.js");
    expect(getCanonicalUrl("/records/published-new/")).toBe(
      "https://oswa1d99.github.io/records/published-new/",
    );
  });

  it("can prefix paths for project-page deployment", () => {
    const projectBase = "/portfolio";
    expect(getInternalPath("/records/", projectBase)).toBe(
      "/portfolio/records/",
    );
    expect(getPagefindAssetPath(projectBase)).toBe(
      "/portfolio/pagefind/pagefind.js",
    );
    expect(
      getCanonicalUrl("/records/published-new/", {
        site: "https://oswa1d99.github.io",
        base: projectBase,
      }),
    ).toBe("https://oswa1d99.github.io/portfolio/records/published-new/");
  });

  it("does not double-prefix paths that already include the project base", () => {
    const projectBase = "/portfolio";

    expect(getInternalPath("/portfolio/records/", projectBase)).toBe(
      "/portfolio/records/",
    );
    expect(
      getCanonicalUrl("/portfolio/records/published-new/", {
        site: "https://oswa1d99.github.io",
        base: projectBase,
      }),
    ).toBe("https://oswa1d99.github.io/portfolio/records/published-new/");
  });

  it("handles root paths and trailing-slash project base variants", () => {
    expect(getInternalPath("/", "/portfolio/")).toBe("/portfolio/");
    expect(getInternalPath("/portfolio/", "/portfolio/")).toBe("/portfolio/");
    expect(getPagefindAssetPath("/portfolio/")).toBe(
      "/portfolio/pagefind/pagefind.js",
    );
  });

  it("normalizes only root-relative internal hrefs for deployment", () => {
    const projectBase = "/portfolio";

    expect(getDeployableHref("/about/", projectBase)).toBe("/portfolio/about/");
    expect(getDeployableHref("/portfolio/about/", projectBase)).toBe(
      "/portfolio/about/",
    );
    expect(getDeployableHref("https://example.com", projectBase)).toBe(
      "https://example.com",
    );
    expect(getDeployableHref("#records", projectBase)).toBe("#records");
    expect(getDeployableHref("mailto:hello@example.com", projectBase)).toBe(
      "mailto:hello@example.com",
    );
    expect(getDeployableHref("tel:+15555550123", projectBase)).toBe(
      "tel:+15555550123",
    );
  });

  it("accepts deployed and source Pagefind result paths under a project base", () => {
    const projectBase = "/portfolio";

    expect(
      getSearchableContentPath("/records/foo/?q=1#match", {
        base: projectBase,
        origin: "https://oswa1d99.github.io",
      }),
    ).toBe("/portfolio/records/foo/?q=1#match");
    expect(
      getSearchableContentPath("/portfolio/build/foo/", {
        base: projectBase,
        origin: "https://oswa1d99.github.io",
      }),
    ).toBe("/portfolio/build/foo/");
    expect(
      getSearchableContentPath("/portfolio/records/", {
        base: projectBase,
        origin: "https://oswa1d99.github.io",
      }),
    ).toBeNull();
    expect(
      getSearchableContentPath("/about/", {
        base: projectBase,
        origin: "https://oswa1d99.github.io",
      }),
    ).toBeNull();
  });
});
