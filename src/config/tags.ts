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

function assertTagRole(role: string): asserts role is TagRole {
  if (!["focus", "topic", "format"].includes(role)) {
    throw new Error(`Unknown Tag role: ${role}`);
  }
}

function buildTagDefinitions() {
  const definitions: Record<string, { label: string; role: TagRole }> = {};
  for (const tag of taxonomy.tags) {
    assertTagRole(tag.role);
    if (definitions[tag.slug]) {
      throw new Error(`Duplicate Tag slug: ${tag.slug}`);
    }
    definitions[tag.slug] = { label: tag.label, role: tag.role };
  }
  return definitions;
}

export const tagDefinitions = buildTagDefinitions();
export type TagSlug = keyof typeof tagDefinitions;

export const tagSlugs = Object.keys(tagDefinitions);

export function hasKnownTag(tag: string): tag is TagSlug {
  return tag in tagDefinitions;
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
  return taxonomy.focusGroups.map((group) => ({
    label: group.label,
    slug: group.slug,
    tags: [...group.tags],
  }));
}

export function getPrimaryFormatTag(tags: readonly string[]) {
  return tags.find((tag): tag is TagSlug => {
    const definition = getTagDefinition(tag);
    return definition?.role === "format";
  });
}
