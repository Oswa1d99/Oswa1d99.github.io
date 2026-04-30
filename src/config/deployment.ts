import { deployment } from "../../deployment.config.mjs";

type CanonicalInput = {
  site: string;
  base?: string;
};

type SearchableContentInput = {
  base?: string;
  origin: string;
};

function normalizeBase(base: string | undefined = deployment.base) {
  if (!base || base === "/") return "";
  return base.startsWith("/") ? base.replace(/\/$/, "") : `/${base}`;
}

function removeBase(
  pathname: string,
  base: string | undefined = deployment.base,
) {
  const normalizedBase = normalizeBase(base);
  if (!normalizedBase) return pathname;
  if (pathname === normalizedBase) return "/";
  if (pathname.startsWith(`${normalizedBase}/`)) {
    return pathname.slice(normalizedBase.length);
  }
  return pathname;
}

export function getInternalPath(
  path: string,
  base: string | undefined = deployment.base,
) {
  const normalizedBase = normalizeBase(base);
  const inputPath = path.startsWith("/") ? path : `/${path}`;
  const normalizedPath = removeBase(inputPath, normalizedBase);
  if (!normalizedBase) return normalizedPath;
  if (normalizedPath === "/") return `${normalizedBase}/`;
  return `${normalizedBase}${normalizedPath}`;
}

export function getDeployableHref(
  href: string,
  base: string | undefined = deployment.base,
) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  return getInternalPath(href, base);
}

export function getPagefindAssetPath(
  base: string | undefined = deployment.base,
) {
  return getInternalPath("/pagefind/pagefind.js", base);
}

export function getCanonicalUrl(
  pathname: string,
  input: CanonicalInput = deployment,
) {
  return new URL(getInternalPath(pathname, input.base), input.site).toString();
}

export function getSearchableContentPath(
  url: string,
  input: SearchableContentInput,
) {
  try {
    const origin = new URL(input.origin).origin;
    const parsed = new URL(url, origin);
    if (parsed.origin !== origin) return null;

    const sourcePath = removeBase(parsed.pathname, input.base);
    const isRecordDetail =
      sourcePath.startsWith("/records/") && sourcePath !== "/records/";
    const isBuildDetail =
      sourcePath.startsWith("/build/") && sourcePath !== "/build/";
    if (!isRecordDetail && !isBuildDetail) return null;

    return `${getInternalPath(sourcePath, input.base)}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}
