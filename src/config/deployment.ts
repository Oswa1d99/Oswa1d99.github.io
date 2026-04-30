import { deployment } from "../../deployment.config.mjs";

type CanonicalInput = {
  site: string;
  base?: string;
};

function normalizeBase(base: string | undefined = deployment.base) {
  if (!base || base === "/") return "";
  return base.startsWith("/") ? base.replace(/\/$/, "") : `/${base}`;
}

export function getInternalPath(
  path: string,
  base: string | undefined = deployment.base,
) {
  const normalizedBase = normalizeBase(base);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!normalizedBase) return normalizedPath;
  if (normalizedPath === "/") return `${normalizedBase}/`;
  return `${normalizedBase}${normalizedPath}`;
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
