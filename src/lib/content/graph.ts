import type { CollectionEntry } from "astro:content";
import { getTagLabel, tagDefinitions, type TagSlug } from "../../config/tags";

type ReferenceLike = { collection: string; id: string };

export type WritingEntryLike = {
  id: string;
  slug: string;
  collection: "writing";
  data: {
    title: string;
    description: string;
    publishedAt: Date;
    updatedAt?: Date;
    draft: boolean;
    tags: string[];
    series?: ReferenceLike;
    relatedProjects: ReferenceLike[];
    language: "ko" | "en" | "mixed";
    featured: boolean;
    primaryLabel?: string;
  };
};

export type ProjectEntryLike = {
  id: string;
  slug: string;
  collection: "projects";
  data: {
    title: string;
    description: string;
    status: "Exploring" | "Building" | "Maintained" | "Paused";
    featured: boolean;
    stack: string[];
    githubUrl?: string;
    demoUrl?: string;
    startedAt: Date;
    updatedAt: Date;
    tags: string[];
    relatedWriting: ReferenceLike[];
  };
};

export type SeriesEntryLike = {
  id: string;
  slug: string;
  collection: "series";
  data: {
    title: string;
    description: string;
    status: "Active" | "Paused" | "Complete";
    featured: boolean;
  };
};

export type HomeSelection = {
  records: WritingEntryLike[];
  build?: ProjectEntryLike;
  series: SeriesEntryLike[];
};

export type TagIndexItem = {
  slug: string;
  label: string;
  count: number;
};

function byNewestWriting(a: WritingEntryLike, b: WritingEntryLike) {
  return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
}

function byOldestWriting(a: WritingEntryLike, b: WritingEntryLike) {
  return a.data.publishedAt.getTime() - b.data.publishedAt.getTime();
}

function byUpdatedProject(a: ProjectEntryLike, b: ProjectEntryLike) {
  return b.data.updatedAt.getTime() - a.data.updatedAt.getTime();
}

export function prepareWritingEntries(entries: WritingEntryLike[]) {
  return entries.filter((entry) => !entry.data.draft).sort(byNewestWriting);
}

export function getFeaturedWriting(entries: WritingEntryLike[], limit = 4) {
  return prepareWritingEntries(entries)
    .filter((entry) => entry.data.featured)
    .slice(0, limit);
}

export function getRecordsForTag(entries: WritingEntryLike[], tag: string) {
  return prepareWritingEntries(entries).filter((entry) =>
    entry.data.tags.includes(tag),
  );
}

export function getRecordsForSeries(
  entries: WritingEntryLike[],
  seriesId: string,
) {
  return prepareWritingEntries(entries)
    .filter((entry) => entry.data.series?.id === seriesId)
    .sort(byOldestWriting);
}

export function getProjectsForBuild(entries: ProjectEntryLike[]) {
  return [...entries].sort(byUpdatedProject);
}

export function buildTagIndex(
  writing: WritingEntryLike[],
  projects: ProjectEntryLike[] = [],
) {
  const counts = new Map<string, number>();

  for (const entry of prepareWritingEntries(writing)) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  for (const entry of projects) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([slug]) => slug in tagDefinitions)
    .map(([slug, count]) => ({ slug, label: getTagLabel(slug), count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getHomeSelection(input: {
  writing: WritingEntryLike[];
  projects: ProjectEntryLike[];
  series: SeriesEntryLike[];
}): HomeSelection {
  return {
    records: prepareWritingEntries(input.writing).slice(0, 4),
    build:
      getProjectsForBuild(input.projects).find(
        (entry) => entry.data.featured,
      ) ?? getProjectsForBuild(input.projects)[0],
    series: input.series.filter((entry) => entry.data.featured),
  };
}

export function hasKnownTag(tag: string): tag is TagSlug {
  return tag in tagDefinitions;
}

export async function getAllRecords() {
  const { getCollection } = await import("astro:content");
  const entries = await getCollection("writing");
  return prepareWritingEntries(entries as WritingEntryLike[]);
}

export async function getAllBuildEntries() {
  const { getCollection } = await import("astro:content");
  const entries = await getCollection("projects");
  return getProjectsForBuild(entries as ProjectEntryLike[]);
}

export async function getAllSeries() {
  const { getCollection } = await import("astro:content");
  return (await getCollection("series")) as SeriesEntryLike[];
}

export async function getHomeContent() {
  const { getCollection } = await import("astro:content");
  const [writing, projects, series] = await Promise.all([
    getCollection("writing"),
    getCollection("projects"),
    getCollection("series"),
  ]);
  return getHomeSelection({
    writing: writing as WritingEntryLike[],
    projects: projects as ProjectEntryLike[],
    series: series as SeriesEntryLike[],
  });
}

export async function getTagIndex() {
  const { getCollection } = await import("astro:content");
  const [writing, projects] = await Promise.all([
    getCollection("writing"),
    getCollection("projects"),
  ]);
  return buildTagIndex(
    writing as WritingEntryLike[],
    projects as ProjectEntryLike[],
  );
}

export async function getRecordBySlug(slug: string) {
  const { getEntry } = await import("astro:content");
  return (await getEntry("writing", slug)) as
    | CollectionEntry<"writing">
    | undefined;
}

export async function getBuildBySlug(slug: string) {
  const { getEntry } = await import("astro:content");
  return (await getEntry("projects", slug)) as
    | CollectionEntry<"projects">
    | undefined;
}
