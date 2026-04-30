import { describe, expect, it } from "vitest";
import {
  buildTagIndex,
  getFeaturedWriting,
  getBuildHref,
  getHomeSelection,
  getProjectsForBuild,
  getPublicRecordEntry,
  getRecordHref,
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

  it("builds public hrefs from entry ids", () => {
    expect(getRecordHref(writing[0])).toBe("/records/published-new/");
    expect(getBuildHref(projects[0])).toBe("/build/project-one/");
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

  it("limits Home records to three recent public entries", () => {
    const extraWriting: WritingEntryLike[] = [
      ...writing,
      {
        id: "published-fourth",
        collection: "writing",
        data: {
          title: "Published Fourth",
          description: "Fourth public record",
          publishedAt: new Date("2026-04-26"),
          draft: false,
          tags: ["reflection"],
          relatedProjects: [],
          language: "mixed",
          featured: false,
        },
      },
    ];

    const home = getHomeSelection({
      writing: extraWriting,
      projects,
      series,
    });

    expect(home.records.map((entry) => entry.id)).toEqual([
      "published-new",
      "published-old",
      "published-featured-oldest",
    ]);
  });

  it("supports Home proof shelf partial and empty content", () => {
    expect(
      getHomeSelection({ writing, projects: [], series }).build,
    ).toBeUndefined();

    const emptyHome = getHomeSelection({
      writing: [],
      projects: [],
      series: [],
    });

    expect(emptyHome.records).toEqual([]);
    expect(emptyHome.build).toBeUndefined();
    expect(emptyHome.series).toEqual([]);
  });
});
