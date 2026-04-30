import { describe, expect, it } from "vitest";
import {
  getResultDescription,
  getResultTags,
  getSearchableContentUrl,
} from "./static-search";

describe("static search", () => {
  it("accepts Record and Build detail URLs from the current origin", () => {
    expect(
      getSearchableContentUrl(
        "https://oswa1d99.github.io/records/published-new/",
        "https://oswa1d99.github.io",
      ),
    ).toBe("/records/published-new/");
    expect(
      getSearchableContentUrl(
        "https://oswa1d99.github.io/build/project-one/",
        "https://oswa1d99.github.io",
      ),
    ).toBe("/build/project-one/");
  });

  it("rejects indexes, external URLs, and malformed URLs", () => {
    expect(
      getSearchableContentUrl(
        "https://oswa1d99.github.io/records/",
        "https://oswa1d99.github.io",
      ),
    ).toBeNull();
    expect(
      getSearchableContentUrl(
        "https://example.com/records/a/",
        "https://oswa1d99.github.io",
      ),
    ).toBeNull();
    expect(
      getSearchableContentUrl(":", "https://oswa1d99.github.io"),
    ).toBeNull();
  });

  it("normalizes result metadata", () => {
    expect(getResultTags({ tags: "LLM serving, Latency" })).toEqual([
      "LLM serving",
      "Latency",
    ]);
    expect(getResultTags({ tags: ["Build log", "Agents"] })).toEqual([
      "Build log",
      "Agents",
    ]);
    expect(getResultDescription({ description: "  Useful  " })).toBe("Useful");
  });
});
