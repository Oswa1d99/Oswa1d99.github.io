# Architecture

This is the active architecture source of truth for Jay Baek.dev. The original design spec in `docs/superpowers/specs/2026-04-28-jay-baek-dev-design.md` remains planning history.

## Domain

Jay Baek.dev is a personal technical platform. It is both a portfolio and a public record of growth as an AI Engineer.

The core content model is:

- Projects: public or work-in-progress engineering efforts.
- Writing: technical notes, essays, project logs, study notes, and reflections.
- Series: named sequences of Writing entries.
- Tags: controlled labels that connect Writing and Projects.
- Featured Content: curated Projects or Writing entries for high-visibility surfaces.

Use `CONTEXT.md` for canonical domain terms.

Public IA uses the labels from `DESIGN.md`: Records, Build, About, and Search.
`Writing` and `Projects` remain internal content model names unless `DESIGN.md`
explicitly changes the public labels again.

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

The Interface should answer page-level questions:

- What content appears on Home?
- What Projects are visible?
- What Writing entries are visible?
- Which Writing entries belong to a Tag?
- Which Writing entries belong to a Current Focus group?
- Which Writing entries belong to a Series?
- Which Writing entries are related to a Project?
- Which Projects are related to a Writing entry?

The Implementation should hide:

- Draft filtering.
- Date sorting.
- Featured ordering.
- Tag index creation.
- Current Focus group composition from controlled tags.
- Series ordering.
- Related content composition.
- Project Status normalization.

Testing should exercise observable behavior through the public Interface with Content Fixtures.

### Content Rendering Module

Files:

- `src/layouts/ContentLayout.astro`
- `src/components/content/**`
- `src/pages/records/[...slug].astro`
- `src/pages/build/[...slug].astro`
- `astro.config.mjs`

The Content Rendering Module owns how Markdown and optional MDX appear across Writing and Project detail pages.

Its Interface should stay small: detail pages provide content metadata and rendered content; the Module handles reading layout and rich-content affordances.

The Implementation should hide:

- Mermaid rendering.
- Code block styling.
- Image and caption styling.
- External link styling.
- Callouts.
- Future research cards, experiment cards, or demo embeds.

Writing detail and Project detail should use the same rendering rules.

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
- `src/config/tags.ts`

The Site Identity Module owns site name, hero copy, profile copy, navigation labels, social links, tag display names, and hiring-facing Korean/English copy.

v1 should not implement full multilingual routing. Korean primary copy and English supporting copy should live in this Module so future locale-aware routing does not require searching through page files.

### Design System Module

Files:

- `DESIGN.md`
- Future shared style tokens or theme files.

The Design System Module owns visual direction, typography, color, spacing, layout, motion, and UI rules.

`DESIGN.md` is the source of truth for visual and UI decisions. Product and content docs can explain why the site exists, but implementation should use `DESIGN.md` for how the interface should look and feel.

### Content Operations Module

Files:

- `docs/content-guide.md`
- `src/content.config.ts`
- `src/config/tags.ts`
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

Static search for local Records discovery is allowed in v1. It should be treated as part of the Content Operations and Content Graph surface, not as an external search Adapter. Pagefind or an equivalent build-time static index may be used without adding a hosted search seam.

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
