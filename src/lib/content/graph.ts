import type { CollectionEntry } from "astro:content";
import { getTagLabel, hasKnownTag } from "../../config/tags";

type ReferenceLike<Collection extends string = string> = {
  collection: Collection;
  id: string;
};

export type WritingEntryLike = {
  id: string;
  body?: string;
  collection: "writing";
  data: {
    title: string;
    description: string;
    publishedAt: Date;
    updatedAt?: Date;
    draft: boolean;
    tags: string[];
    series?: ReferenceLike<"series">;
    relatedProjects: ReferenceLike<"projects">[];
    language: "ko" | "en" | "mixed";
    featured: boolean;
    primaryLabel?: string;
  };
};

export type ProjectEntryLike = {
  id: string;
  body?: string;
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
    relatedWriting: ReferenceLike<"writing">[];
  };
};

export type SeriesEntryLike = {
  id: string;
  body?: string;
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

export type HomePageSelection = HomeSelection & {
  relatedBuildRecords: WritingEntryLike[];
};

export type BuildOverviewItem = {
  build: ProjectEntryLike;
  relatedRecords: WritingEntryLike[];
};

export type TagViewSelection = {
  tag: string;
  label: string;
  records: WritingEntryLike[];
};

export type SeriesViewSelection = {
  series?: SeriesEntryLike;
  records: WritingEntryLike[];
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

export function getPublicRecordEntry(entry: WritingEntryLike | undefined) {
  if (!entry || entry.data.draft) {
    return undefined;
  }

  return entry;
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

export function getRecordHref(entry: WritingEntryLike) {
  return `/records/${entry.id}/`;
}

export function getBuildHref(entry: ProjectEntryLike) {
  return `/build/${entry.id}/`;
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
    .filter(([slug]) => hasKnownTag(slug))
    .map(([slug, count]) => ({ slug, label: getTagLabel(slug), count }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function getHomeSelection(input: {
  writing: WritingEntryLike[];
  projects: ProjectEntryLike[];
  series: SeriesEntryLike[];
}): HomeSelection {
  return {
    records: prepareWritingEntries(input.writing).slice(0, 3),
    build:
      getProjectsForBuild(input.projects).find(
        (entry) => entry.data.featured,
      ) ?? getProjectsForBuild(input.projects)[0],
    series: input.series.filter((entry) => entry.data.featured),
  };
}

export function getRelatedRecordsForBuild(
  writing: WritingEntryLike[],
  build: ProjectEntryLike,
) {
  const recordsById = new Map(
    prepareWritingEntries(writing).map((record) => [record.id, record]),
  );

  return build.data.relatedWriting
    .map((ref) => recordsById.get(ref.id))
    .filter((record): record is WritingEntryLike => Boolean(record));
}

export function getHomePageSelection(input: {
  writing: WritingEntryLike[];
  projects: ProjectEntryLike[];
  series: SeriesEntryLike[];
}): HomePageSelection {
  const home = getHomeSelection(input);

  return {
    ...home,
    relatedBuildRecords: home.build
      ? getRelatedRecordsForBuild(input.writing, home.build)
      : [],
  };
}

export function getBuildOverviewSelection(input: {
  writing: WritingEntryLike[];
  projects: ProjectEntryLike[];
}): BuildOverviewItem[] {
  return getProjectsForBuild(input.projects).map((build) => ({
    build,
    relatedRecords: getRelatedRecordsForBuild(input.writing, build),
  }));
}

export function getTagViewSelection(
  input: { writing: WritingEntryLike[] },
  tag: string,
): TagViewSelection {
  return {
    tag,
    label: getTagLabel(tag),
    records: getRecordsForTag(input.writing, tag),
  };
}

export function getSeriesViewSelection(
  input: { writing: WritingEntryLike[]; series: SeriesEntryLike[] },
  seriesId: string,
): SeriesViewSelection {
  return {
    series: input.series.find((entry) => entry.id === seriesId),
    records: getRecordsForSeries(input.writing, seriesId),
  };
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

export async function getPublicRecordStaticPaths() {
  const { getCollection } = await import("astro:content");
  const entries = await getCollection("writing");
  return prepareWritingEntries(entries as WritingEntryLike[]).map((record) => ({
    params: { slug: record.id },
    props: { record },
  }));
}

export async function getBuildStaticPaths() {
  const { getCollection } = await import("astro:content");
  const entries = await getCollection("projects");
  return getProjectsForBuild(entries as ProjectEntryLike[]).map((build) => ({
    params: { slug: build.id },
    props: { build },
  }));
}

export async function getSeriesStaticPaths() {
  const series = await getAllSeries();
  return series.map((item) => ({
    params: { slug: item.id },
    props: { series: item },
  }));
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

export async function getHomePageContent() {
  const { getCollection } = await import("astro:content");
  const [writing, projects, series] = await Promise.all([
    getCollection("writing"),
    getCollection("projects"),
    getCollection("series"),
  ]);
  return getHomePageSelection({
    writing: writing as WritingEntryLike[],
    projects: projects as ProjectEntryLike[],
    series: series as SeriesEntryLike[],
  });
}

export async function getBuildOverviewContent() {
  const { getCollection } = await import("astro:content");
  const [writing, projects] = await Promise.all([
    getCollection("writing"),
    getCollection("projects"),
  ]);
  return getBuildOverviewSelection({
    writing: writing as WritingEntryLike[],
    projects: projects as ProjectEntryLike[],
  });
}

export async function getTagPageContent(tag: string) {
  const { getCollection } = await import("astro:content");
  const writing = await getCollection("writing");
  return getTagViewSelection({ writing: writing as WritingEntryLike[] }, tag);
}

export async function getSeriesPageContent(seriesId: string) {
  const { getCollection } = await import("astro:content");
  const [writing, series] = await Promise.all([
    getCollection("writing"),
    getCollection("series"),
  ]);
  return getSeriesViewSelection(
    {
      writing: writing as WritingEntryLike[],
      series: series as SeriesEntryLike[],
    },
    seriesId,
  );
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

export async function getRecordById(id: string) {
  const { getEntry } = await import("astro:content");
  const entry = (await getEntry("writing", id)) as
    | CollectionEntry<"writing">
    | undefined;
  return getPublicRecordEntry(entry as WritingEntryLike | undefined) as
    | CollectionEntry<"writing">
    | undefined;
}

export async function getBuildById(id: string) {
  const { getEntry } = await import("astro:content");
  return (await getEntry("projects", id)) as
    | CollectionEntry<"projects">
    | undefined;
}
