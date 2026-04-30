function normalizeBase(base: string | undefined) {
  if (!base || base === "/") return "";
  return base.startsWith("/") ? base.replace(/\/$/, "") : `/${base}`;
}

function removeBase(pathname: string, base: string | undefined) {
  const normalizedBase = normalizeBase(base);
  if (!normalizedBase) return pathname;
  if (pathname === normalizedBase) return "/";
  if (pathname.startsWith(`${normalizedBase}/`)) {
    return pathname.slice(normalizedBase.length);
  }
  return pathname;
}

function applyBase(pathname: string, base: string | undefined) {
  const normalizedBase = normalizeBase(base);
  if (!normalizedBase) return pathname;
  if (pathname === "/") return `${normalizedBase}/`;
  if (pathname.startsWith(`${normalizedBase}/`)) return pathname;
  return `${normalizedBase}${pathname}`;
}

export function getSearchableContentUrl(
  url: string,
  origin: string,
  base?: string,
) {
  try {
    const normalizedOrigin = new URL(origin).origin;
    const parsed = new URL(url, normalizedOrigin);
    if (parsed.origin !== normalizedOrigin) return null;

    const sourcePath = removeBase(parsed.pathname, base);
    const isRecordDetail =
      sourcePath.startsWith("/records/") && sourcePath !== "/records/";
    const isBuildDetail =
      sourcePath.startsWith("/build/") && sourcePath !== "/build/";
    if (isRecordDetail || isBuildDetail) {
      return `${applyBase(sourcePath, base)}${parsed.search}${parsed.hash}`;
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
