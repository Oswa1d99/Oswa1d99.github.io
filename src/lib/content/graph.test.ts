import { describe, expect, it } from "vitest";
import {
  buildTagIndex,
  getFeaturedWriting,
  getHomeSelection,
  getProjectsForBuild,
  getPublicRecordEntry,
  getRecordsForSeries,
  getRecordsForTag,
  prepareWritingEntries,
  type ProjectEntryLike,
  type SeriesEntryLike,
  type WritingEntryLike,
} from "./graph";

const writing: WritingEntryLike[] = [
  {
    id: "published-new",
    slug: "published-new",
    collection: "writing",
    data: {
      title: "Published New",
      description: "New public record",
      publishedAt: new Date("2026-04-29"),
      updatedAt: new Date("2026-04-29"),
      draft: false,
      tags: ["llm-serving", "latency", "study-note"],
      series: { collection: "series", id: "series-one" },
      relatedProjects: [{ collection: "projects", id: "project-one" }],
      language: "mixed",
      featured: true,
      primaryLabel: "LLM serving",
    },
  },
  {
    id: "published-old",
    slug: "published-old",
    collection: "writing",
    data: {
      title: "Published Old",
      description: "Old public record",
      publishedAt: new Date("2026-04-28"),
      draft: false,
      tags: ["system-design", "queues", "engineering-memo"],
      series: { collection: "series", id: "series-one" },
      relatedProjects: [],
      language: "mixed",
      featured: false,
    },
  },
  {
    id: "published-featured-oldest",
    slug: "published-featured-oldest",
    collection: "writing",
    data: {
      title: "Published Featured Oldest",
      description: "Older featured public record",
      publishedAt: new Date("2026-04-27"),
      draft: false,
      tags: ["evaluation", "study-note"],
      relatedProjects: [],
      language: "mixed",
      featured: true,
    },
  },
  {
    id: "draft",
    slug: "draft",
    collection: "writing",
    data: {
      title: "Draft",
      description: "Draft",
      publishedAt: new Date("2026-04-30"),
      draft: true,
      tags: ["reflection"],
      relatedProjects: [],
      language: "mixed",
      featured: true,
    },
  },
];

const projects: ProjectEntryLike[] = [
  {
    id: "project-one",
    slug: "project-one",
    collection: "projects",
    data: {
      title: "Project One",
      description: "Build thread",
      status: "Building",
      featured: true,
      stack: ["Astro"],
      startedAt: new Date("2026-04-28"),
      updatedAt: new Date("2026-04-29"),
      tags: ["ai-engineering", "build-log"],
      relatedWriting: [{ collection: "writing", id: "published-new" }],
    },
  },
  {
    id: "project-old",
    slug: "project-old",
    collection: "projects",
    data: {
      title: "Project Old",
      description: "Older build thread",
      status: "Maintained",
      featured: true,
      stack: ["TypeScript"],
      startedAt: new Date("2026-04-25"),
      updatedAt: new Date("2026-04-26"),
      tags: ["ai-engineering"],
      relatedWriting: [],
    },
  },
];

const series: SeriesEntryLike[] = [
  {
    id: "series-one",
    slug: "series-one",
    collection: "series",
    data: {
      title: "Series One",
      description: "Series",
      status: "Active",
      featured: true,
    },
  },
];

describe("content graph", () => {
  it("excludes drafts and sorts published records newest first", () => {
    const records = prepareWritingEntries(writing);
    expect(records.map((entry) => entry.id)).toEqual([
      "published-new",
      "published-old",
      "published-featured-oldest",
    ]);
  });

  it("orders featured writing newest first", () => {
    const featured = getFeaturedWriting(writing);
    expect(featured.map((entry) => entry.id)).toEqual([
      "published-new",
      "published-featured-oldest",
    ]);
  });

  it("returns undefined for draft record entries", () => {
    expect(
      getPublicRecordEntry(writing.find((entry) => entry.id === "draft")),
    ).toBeUndefined();
    expect(
      getPublicRecordEntry(
        writing.find((entry) => entry.id === "published-new"),
      )?.id,
    ).toBe("published-new");
  });

  it("builds a stable tag index without draft metadata", () => {
    const index = buildTagIndex(writing, projects);
    expect(index.map((item) => item.slug)).toContain("llm-serving");
    expect(
      index.find((item) => item.slug === "reflection")?.count,
    ).toBeUndefined();
  });

  it("filters Records by tag", () => {
    expect(
      getRecordsForTag(writing, "queues").map((entry) => entry.id),
    ).toEqual(["published-old"]);
  });

  it("orders Records in a series by published date", () => {
    expect(
      getRecordsForSeries(writing, "series-one").map((entry) => entry.id),
    ).toEqual(["published-old", "published-new"]);
  });

  it("returns Build entries updated-newest first", () => {
    expect(getProjectsForBuild(projects).map((entry) => entry.id)).toEqual([
      "project-one",
      "project-old",
    ]);
  });

  it("creates stable Home selection with available content", () => {
    const home = getHomeSelection({ writing, projects, series });
    expect(home.records.map((entry) => entry.id)).toEqual([
      "published-new",
      "published-old",
      "published-featured-oldest",
    ]);
    expect(home.build?.id).toBe("project-one");
  });
});
