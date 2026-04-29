export const tagDefinitions = {
  "llm-serving": { label: "LLM serving", role: "focus" },
  "system-design": { label: "System design", role: "focus" },
  "cs-fundamentals": { label: "CS fundamentals", role: "focus" },
  "ai-engineering": { label: "AI engineering", role: "focus" },
  latency: { label: "Latency", role: "topic" },
  evaluation: { label: "Evaluation", role: "topic" },
  queues: { label: "Queues", role: "topic" },
  indexing: { label: "Indexing", role: "topic" },
  network: { label: "Network", role: "topic" },
  agents: { label: "Agents", role: "topic" },
  "study-note": { label: "Study note", role: "format" },
  "engineering-memo": { label: "Engineering memo", role: "format" },
  diagram: { label: "Diagram", role: "format" },
  reflection: { label: "Reflection", role: "format" },
  "build-log": { label: "Build log", role: "format" }
} as const;

export type TagSlug = keyof typeof tagDefinitions;

export const tagSlugs = Object.keys(tagDefinitions) as TagSlug[];

export const focusGroups = [
  {
    label: "LLM serving",
    slug: "llm-serving",
    tags: ["llm-serving", "latency", "evaluation"] satisfies TagSlug[],
  },
  {
    label: "System design",
    slug: "system-design",
    tags: ["system-design", "queues", "indexing", "network"] satisfies TagSlug[],
  },
  {
    label: "AI engineering practice",
    slug: "ai-engineering",
    tags: ["ai-engineering", "agents", "build-log"] satisfies TagSlug[],
  },
] as const;

export function getTagLabel(tag: string): string {
  return tagDefinitions[tag as TagSlug]?.label ?? tag;
}
