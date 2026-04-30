export function getSearchableContentUrl(url: string, origin: string) {
  try {
    const parsed = new URL(url, origin);
    const isRecordDetail =
      parsed.pathname.startsWith("/records/") &&
      parsed.pathname !== "/records/";
    const isBuildDetail =
      parsed.pathname.startsWith("/build/") && parsed.pathname !== "/build/";
    if (parsed.origin === origin && (isRecordDetail || isBuildDetail)) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function getResultTags(meta: Record<string, unknown>) {
  const tags = meta.tags;
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

export function getResultDescription(meta: Record<string, unknown>) {
  return typeof meta.description === "string" ? meta.description.trim() : "";
}
