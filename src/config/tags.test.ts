import { describe, expect, it } from "vitest";
import {
  getFocusGroups,
  getPrimaryFormatTag,
  getTagDefinition,
  getTagLabel,
  getTagsByRole,
  hasKnownTag,
  tagSlugs,
} from "./tags";

describe("taxonomy", () => {
  const taxonomySlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  it("answers tag facts through the taxonomy interface", () => {
    expect(hasKnownTag("study-note")).toBe(true);
    expect(hasKnownTag("unknown")).toBe(false);
    expect(hasKnownTag("toString")).toBe(false);
    expect(getTagDefinition("build-log")).toEqual({
      label: "Build log",
      role: "format",
    });
    expect(getTagLabel("unknown")).toBe("unknown");
  });

  it("returns stable role and focus group views", () => {
    expect(getTagsByRole("format").map((tag) => tag.slug)).toEqual([
      "study-note",
      "engineering-memo",
      "diagram",
      "reflection",
      "build-log",
    ]);
    expect(getFocusGroups()[0]).toEqual({
      label: "LLM serving",
      slug: "llm-serving",
      tags: ["llm-serving", "latency", "evaluation"],
    });
  });

  it("only exposes known tags in focus groups", () => {
    for (const group of getFocusGroups()) {
      expect(group.tags.every(hasKnownTag)).toBe(true);
    }
  });

  it("keeps authored tag slugs and labels stable for non-developers", () => {
    for (const slug of tagSlugs) {
      expect(slug).toMatch(taxonomySlugPattern);
      expect(getTagLabel(slug).trim()).not.toBe("");
    }
  });

  it("keeps authored focus group slugs and labels stable for non-developers", () => {
    for (const group of getFocusGroups()) {
      expect(group.slug).toMatch(taxonomySlugPattern);
      expect(group.label.trim()).not.toBe("");
    }
  });

  it("derives a record format tag from taxonomy roles", () => {
    expect(getPrimaryFormatTag(["latency", "engineering-memo"])).toBe(
      "engineering-memo",
    );
    expect(getPrimaryFormatTag(["latency", "evaluation"])).toBeUndefined();
  });

  it("loads Tags from the editable taxonomy authoring surface", () => {
    expect(tagSlugs).toContain("llm-serving");
    expect(getTagLabel("llm-serving")).toBe("LLM serving");
    expect(getTagsByRole("focus").map((tag) => tag.slug)).toEqual([
      "llm-serving",
      "system-design",
      "cs-fundamentals",
      "ai-engineering",
    ]);
  });
});
