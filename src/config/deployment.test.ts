import { describe, expect, it } from "vitest";
import {
  getCanonicalUrl,
  getInternalPath,
  getPagefindAssetPath,
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
});
