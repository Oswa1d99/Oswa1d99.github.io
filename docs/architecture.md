# Architecture

This is the active architecture source of truth for Jay Baek.dev.

## Domain

Jay Baek.dev is a personal technical platform. It is both a portfolio and a public record of growth as an AI Engineer.

## Module Map

### Content Graph Module

Files:

- `src/lib/content/graph.ts`
- `src/lib/content/projects.ts`
- `src/lib/content/writing.ts`
- `src/lib/content/series.ts`
- `src/lib/content/related.ts`
- `src/lib/content/tags.ts`
- `src/content.config.ts`

The Content Graph Module owns content retrieval, sorting, filtering, tag indexes, series ordering, and derived relationships.

`src/lib/content/graph.ts` is the public Interface for pages. Page files should import content queries from `graph.ts`, not from internal Implementation files.

The public Content Graph Interface should prefer page-ready projections over raw collection entries. Raw helpers may remain exported only when a route needs Astro-specific behavior such as `getStaticPaths`.

Testing should exercise observable behavior through the public Interface with Content Fixtures.

### Records Discovery Module

Files:

- `src/lib/content/records-discovery.ts`
- `src/components/RecordFilters.astro`
- `src/components/RecordList.astro`
- `src/pages/records/index.astro`

The Records Discovery Module owns page-local Records filtering and sorting. The pure content functions in `records-discovery.ts` define the filter and sort behavior, while `RecordList.astro` emits a localized JSON payload for browser behavior.

Client-side filtering must consume that JSON payload and stable `data-record-card` ids. It should not infer behavior from visible `<time>` text, rendered tags, or card presentation attributes.

### Content Rendering Module

Files:

- `src/lib/rendering/content-page.ts`
- `src/layouts/ContentLayout.astro`
- `src/components/content/**`
- `src/pages/records/[...slug].astro`
- `src/pages/build/[...slug].astro`
- `astro.config.mjs`

The Content Rendering Module owns how Markdown and optional MDX appear across Writing and Project detail pages.

Writing detail and Project detail should use the same rendering rules.

Route pages should pass content entries through `getContentPageMeta` instead of detecting Mermaid blocks or projecting layout metadata inline.

### Mermaid Renderer Module

The Mermaid Renderer Module lives inside the Content Rendering Module.

It owns:

- Mermaid diagram detection.
- Conditional loading.
- Source hiding before render.
- Readable fallback.
- Layout reservation.
- Render lifecycle state.
- Future animation hooks.

The default v1 path is client-side Mermaid rendering for Markdown code blocks. Mermaid JavaScript must load only on pages that contain Mermaid diagrams. If rendering fails or JavaScript is unavailable, the original source must remain readable.

High-value diagrams may use source-controlled `.mmd` plus generated `.svg` assets. Diagram automation, when added, must be command/check based. Build commands must not silently modify checked-in SVG assets.

### Site Identity Module

Files:

- `src/config/site.ts`
- `src/config/navigation.ts`

The Site Identity Module owns site name, hero copy, profile copy, navigation labels, social links, and hiring-facing Korean/English copy. `src/config/site.ts` is the authoring surface for site/profile/navigation copy. Tag display names live in the Taxonomy Module.

### Taxonomy Module

Files:

- `src/config/taxonomy.json`
- `src/config/tags.ts`
- `src/config/tags.test.ts`

The Taxonomy Module owns Tag labels, roles, focus groups, format detection, display order, and known Tag validation. Pages and UI modules should ask this Module for Tag facts instead of inferring behavior from raw slug strings.

### Design System Module

Files:

- `DESIGN.md`
- Future shared style tokens or theme files.

The Design System Module owns visual direction, typography, color, spacing, layout, motion, and UI rules.

`DESIGN.md` is the source of truth for visual and UI decisions. Product and content docs can explain why the site exists, but implementation should use `DESIGN.md` for how the interface should look and feel.

### Content Operations Module

Files:

- `docs/content-guide.md`
- `docs/content-templates/**`
- `src/content.config.ts`
- Future `scripts/validate-content.*` if schema checks stop covering common mistakes.

The Content Operations Module is the operating manual and validation surface for content work. See `docs/content-guide.md`.

### Deployment Module

Files:

- `docs/deployment.md`
- `astro.config.mjs`
- `.github/workflows/deploy.yml`
- `src/config/site.ts`

The Deployment Module owns domain choice, GitHub Pages assumptions, Astro `site`, Astro `base`, canonical URLs, asset paths, and deploy workflow checks. See `docs/deployment.md`.

### External Capability Modules

Hosted search adapters, comments, analytics, CMS, full multilingual routing, and hosted demos are excluded from v1.

Static Search is a local Records discovery Module, not a hosted Adapter seam. It owns Pagefind result normalization, searchable route eligibility, safe excerpt rendering, and search copy. Pagefind remains a build-time implementation detail under ADR 0005.

Do not introduce Adapter Interfaces for these capabilities until there are at least two real adapters, usually production and local/test. One adapter is a hypothetical seam. Two adapters make a seam real.

## Folder Ownership Rules

- `src/pages/**` owns routing, static paths, and page assembly. Pages may call the public Content Graph Interface and compose layouts, but must not duplicate content filtering, sorting, tag indexing, or related-content logic.
- `src/components/**` owns presentational UI. Components receive already-prepared props and should not query Astro content collections directly.
- `src/layouts/**` owns shared document frames, metadata placement, and reading layouts. Layouts should not decide which content appears on a page.
- `src/lib/content/**` owns content retrieval and derived relationships. Only `graph.ts` is public to pages.
- `src/config/**` owns site identity, navigation, social links, tag display names, and other low-change configuration.
- `src/content/**` owns authored content only. It contains Markdown, MDX, and collection entries, not rendering logic.
- `docs/**` owns human and agent operating guidance. It should explain how to add and maintain content, not duplicate runtime logic.

If a future change needs to violate one of these rules, update this document or add an ADR before implementation.

## Implementation Order

1. Foundation: create Astro, TypeScript, Site Identity, GitHub Pages config, Content Collections, Content Graph Interface, and Content Operations guide/fixtures.
2. Graph verification: add Vitest coverage for Content Graph behavior before wiring every route.
3. Rendering: add ContentLayout, Markdown typography, and the Mermaid Renderer Module.
4. Routes and UI: assemble Home, Records, Build, Search, Tags, Series, and About using existing Modules.
5. Verification: run the checks in `docs/validation.md`.
