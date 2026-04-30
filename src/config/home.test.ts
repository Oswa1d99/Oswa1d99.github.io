import { describe, expect, it } from "vitest";
import { homeHero } from "./home";
import { site } from "./site";

describe("homeHero", () => {
  it("keeps Home hero copy editable outside page layout files", () => {
    expect(homeHero).toEqual({
      brand: "Jay Baek.dev",
      editorialClaim: ["Practical AI systems,", "edited into evidence."],
      promptThesis: "public technical record, kept honest by status.",
    });
  });

  it("stores prompt thesis without the visual marker", () => {
    expect(homeHero.promptThesis.startsWith(">")).toBe(false);
  });

  it("keeps Home thesis copy out of the global site config", () => {
    expect("thesisKo" in site).toBe(false);
    expect("thesisEn" in site).toBe(false);
  });
});
