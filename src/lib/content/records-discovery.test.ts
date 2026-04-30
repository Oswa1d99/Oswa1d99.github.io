import { describe, expect, it } from "vitest";
import type { RecordListItem } from "./graph";
import { filterRecordItems, sortRecordItems } from "./records-discovery";

const records: RecordListItem[] = [
  {
    id: "new",
    href: "/records/new/",
    title: "New",
    description: "New",
    publishedAt: new Date("2026-04-29"),
    tags: ["llm-serving", "latency", "study-note"],
    formatTag: "study-note",
  },
  {
    id: "old",
    href: "/records/old/",
    title: "Old",
    description: "Old",
    publishedAt: new Date("2026-04-27"),
    tags: ["system-design", "queues", "engineering-memo"],
    formatTag: "engineering-memo",
  },
];

describe("records discovery", () => {
  it("filters by focus, format, and tag", () => {
    expect(
      filterRecordItems(records, {
        focus: ["llm-serving", "evaluation"],
        format: "study-note",
        tag: "latency",
      }).map((record) => record.id),
    ).toEqual(["new"]);
  });

  it("sorts records by published date", () => {
    expect(
      sortRecordItems(records, "oldest").map((record) => record.id),
    ).toEqual(["old", "new"]);
    expect(
      sortRecordItems(records, "newest").map((record) => record.id),
    ).toEqual(["new", "old"]);
  });
});
