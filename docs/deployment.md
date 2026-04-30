# Deployment

This is the active Deployment Module Interface for Jay Baek.dev.

## Domain Decision

Active v1 target: `oswa1d99.github.io`.

Future preference: `jaybaek.dev`.

The site name remains `Jay Baek.dev` even while the deployed URL is `https://oswa1d99.github.io`.

`jaybaek.dev` requires owning the domain and configuring DNS for GitHub Pages. The project will start on `https://oswa1d99.github.io` and may move to `https://jaybaek.dev` later.

This supersedes the earlier v1 assumption in ADR 0002 that no custom domain would be used.

## GitHub Pages Modes

### Custom Domain

Use this when `jaybaek.dev` is owned and DNS is configured.

- Astro `site`: `https://jaybaek.dev`
- Astro `base`: unset or `/`
- Canonical URLs: `https://jaybaek.dev/...`
- GitHub Pages custom domain: `jaybaek.dev`

### User Site Fallback

Use this for v1.

- Astro `site`: `https://oswa1d99.github.io`
- Astro `base`: unset or `/`
- Canonical URLs: `https://oswa1d99.github.io/...`
- Repository name: `oswa1d99.github.io`

### Project Page Fallback

Use this only if the repository is not `oswa1d99.github.io`.

- Astro `site`: `https://oswa1d99.github.io`
- Astro `base`: `/<repo-name>`
- Canonical URLs: `https://oswa1d99.github.io/<repo-name>/...`

## Owned Files

- `astro.config.mjs`
- `.github/workflows/deploy.yml`
- `src/config/site.ts`
- `deployment.config.mjs`

## Rules

- `deployment.config.mjs` is the single source for active `site`, `base`, repository name, and future custom-domain target.
- `astro.config.mjs` and `src/config/site.ts` must consume deployment settings instead of duplicating URL strings.
- The GitHub Actions workflow should build the site through the same scripts used locally.
- Internal links and asset paths must work with the chosen `base`.
- Custom domain changes must update this document, `astro.config.mjs`, `src/config/site.ts`, GitHub Pages settings, and the deployed smoke checklist together.

## Deployed Smoke Checklist

After deployment, verify:

- Home route loads at the expected URL.
- Build route loads without a 404.
- Records route loads without a 404.
- Search route loads without a 404.
- At least one Build detail route loads without a 404 if detail routes exist.
- At least one Record detail route loads without a 404.
- Header navigation works from Home and from a nested detail route.
- CSS and font assets load from the correct base path.
- Images load from the correct base path.
- Canonical URLs use the deployed origin and path.
- Browser console has no asset 404s caused by incorrect `site` or `base`.
