import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { tagSlugs } from "./config/tags";

const tagEnum = z.enum(tagSlugs as [string, ...string[]]);

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(tagEnum).default([]),
    series: reference("series").optional(),
    relatedProjects: z.array(reference("projects")).default([]),
    language: z.enum(["ko", "en", "mixed"]).default("mixed"),
    featured: z.boolean().default(false),
    primaryLabel: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["Exploring", "Building", "Maintained", "Paused"]),
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    startedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    tags: z.array(tagEnum).default([]),
    relatedWriting: z.array(reference("writing")).default([]),
  }),
});

const series = defineCollection({
  loader: glob({ base: "./src/content/series", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["Active", "Paused", "Complete"]).default("Active"),
    featured: z.boolean().default(false),
  }),
});

export const collections = { writing, projects, series };
