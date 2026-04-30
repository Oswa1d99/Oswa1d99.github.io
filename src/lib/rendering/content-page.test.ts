import { describe, expect, it } from "vitest";
import { getContentPageMeta, hasMermaidBlock } from "./content-page";

describe("content page rendering", () => {
  it("detects Mermaid blocks without route-level string checks", () => {
    expect(hasMermaidBlock("```mermaid\ngraph TD\nA-->B\n```")).toBe(true);
    expect(hasMermaidBlock("```ts\nconsole.log('x')\n```")).toBe(false);
  });

  it("projects Writing and Build metadata for ContentLayout", () => {
    expect(
      getContentPageMeta({
        title: "Record",
        description: "Record description",
        date: new Date("2026-04-29"),
        tags: ["study-note"],
        body: "Body",
      }),
    ).toEqual({
      title: "Record",
      description: "Record description",
      date: new Date("2026-04-29"),
      tags: ["study-note"],
      hasMermaid: false,
    });
  });
});
