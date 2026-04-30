import taxonomy from "./taxonomy.json";

export type TagRole = "focus" | "topic" | "format";
export type TagDefinition = {
  slug: string;
  label: string;
  role: TagRole;
};
export type TagOption = TagDefinition;
export type FocusGroup = {
  label: string;
  slug: string;
  tags: string[];
};

const TAXONOMY_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertTagRole(role: string): asserts role is TagRole {
  if (!["focus", "topic", "format"].includes(role)) {
    throw new Error(`Unknown Tag role: ${role}`);
  }
}

function assertTaxonomySlug(slug: string, context: string) {
  if (!TAXONOMY_SLUG_PATTERN.test(slug)) {
    throw new Error(`${context} must use a stable lowercase slug: ${slug}`);
  }
}

function assertTaxonomyLabel(label: string, context: string) {
  if (label.trim() === "") {
    throw new Error(`${context} label must not be empty`);
  }
}

function buildTagDefinitions() {
  const definitions: Record<string, { label: string; role: TagRole }> = {};
  for (const tag of taxonomy.tags) {
    assertTaxonomySlug(tag.slug, "Tag");
    assertTaxonomyLabel(tag.label, `Tag ${tag.slug}`);
    assertTagRole(tag.role);
    if (Object.hasOwn(definitions, tag.slug)) {
      throw new Error(`Duplicate Tag slug: ${tag.slug}`);
    }
    definitions[tag.slug] = { label: tag.label, role: tag.role };
  }
  return definitions;
}

function buildFocusGroups(
  definitions: Record<string, { label: string; role: TagRole }>,
) {
  return taxonomy.focusGroups.map((group) => {
    assertTaxonomySlug(group.slug, "Focus group");
    assertTaxonomyLabel(group.label, `Focus group ${group.slug}`);

    if (group.tags.length === 0) {
      throw new Error(`Focus group has no Tags: ${group.slug}`);
    }

    for (const tag of group.tags) {
      if (!Object.hasOwn(definitions, tag)) {
        throw new Error(`Unknown Focus group Tag: ${group.slug} -> ${tag}`);
      }
    }

    return {
      label: group.label,
      slug: group.slug,
      tags: [...group.tags],
    };
  });
}

export const tagDefinitions = buildTagDefinitions();
export type TagSlug = keyof typeof tagDefinitions;

export const tagSlugs = Object.keys(tagDefinitions);
if (tagSlugs.length === 0) {
  throw new Error("Taxonomy must define at least one Tag");
}

const focusGroups = buildFocusGroups(tagDefinitions);

export function hasKnownTag(tag: string): tag is TagSlug {
  return Object.hasOwn(tagDefinitions, tag);
}

export function getTagDefinition(tag: string) {
  return hasKnownTag(tag) ? tagDefinitions[tag] : undefined;
}

export function getTagLabel(tag: string): string {
  return getTagDefinition(tag)?.label ?? tag;
}

export function getTagsByRole(role: TagRole): TagOption[] {
  return tagSlugs
    .map((slug) => ({ slug, ...tagDefinitions[slug] }))
    .filter((tag) => tag.role === role);
}

export function getFocusGroups(): FocusGroup[] {
  return focusGroups.map((group) => ({ ...group, tags: [...group.tags] }));
}

export function getPrimaryFormatTag(tags: readonly string[]) {
  return tags.find((tag): tag is TagSlug => {
    const definition = getTagDefinition(tag);
    return definition?.role === "format";
  });
}
