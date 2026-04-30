import { describe, expect, it } from "vitest";
import { homeHero } from "./site-content";
import { site } from "./site";

describe("homeHero", () => {
  it("keeps Home hero copy editable outside page layout files", () => {
    expect(homeHero.brand).toBe(site.name);
    expect(homeHero.editorialClaim).toHaveLength(2);
    for (const line of homeHero.editorialClaim) {
      expect(line.trim().length).toBeGreaterThan(0);
    }
    expect(homeHero.promptThesis.trim().length).toBeGreaterThan(0);
  });

  it("stores prompt thesis without the visual marker", () => {
    expect(homeHero.promptThesis.startsWith(">")).toBe(false);
  });

  it("keeps Home thesis copy out of the global site config", () => {
    expect("thesisKo" in site).toBe(false);
    expect("thesisEn" in site).toBe(false);
  });
});
