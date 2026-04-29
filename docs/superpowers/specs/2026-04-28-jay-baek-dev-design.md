# Jay Baek.dev Design

Date: 2026-04-28

## Active Source Of Truth

This document is planning history. Stable decisions have been promoted into active Module documents:

- `CONTEXT.md` owns domain vocabulary.
- `docs/architecture.md` owns Module map, seams, and folder ownership rules.
- `docs/content-guide.md` owns content authoring rules.
- `docs/deployment.md` owns domain, GitHub Pages, Astro `site`, Astro `base`, canonical URL, and asset path assumptions.
- `docs/validation.md` owns local checks, browser QA, route smoke checks, and deployment smoke checks.
- `DESIGN.md` will own the visual design system after `/design-consultation` completes.

If this document conflicts with an active Module document, use the active Module document and update or supersede the stale section here later.

## Summary

Jay Baek.dev is an Astro-based personal technical platform for a junior AI Engineer building toward Korean unicorn tech companies and Silicon Valley opportunities. The site should make a strong first impression as a practical AI Engineer while also serving as a public record of growth.

The v1 site is not a finished-product showcase. It is a structured portfolio and writing platform where projects, technical writing, project logs, and engineering decisions reinforce each other.

## Goals

- Present Jay Baek as a practical AI Engineer who can frame real problems and build AI systems.
- Keep growth visible through writing, build logs, technical notes, and project history.
- Treat Projects and Writing as equal first-class surfaces.
- Start Korean-first while making the most important hiring-facing surfaces readable in English.
- Make routine updates possible through content files, not page or layout edits.
- Keep the architecture easy for future coding agents to understand and extend.

## Non-Goals For v1

- Full multilingual routing such as `/ko` and `/en`.
- CMS integration.
- Search.
- Comments.
- Newsletter.
- Analytics dashboard.
- Complex animation.
- Hosted interactive project demos.

These features should remain easy to add later without spreading vendor-specific or feature-specific logic through pages and layouts.

## Audience

The site should serve three audiences:

- Korean unicorn or big-tech recruiters and AI/ML team leads.
- Silicon Valley engineering teams and recruiters.
- Open-source users and developer community members.

The first impression should prioritize hiring and portfolio evaluation, while deeper pages should reward technical readers who want to understand how Jay thinks, builds, and learns.

## Brand And Voice

The brand is `Jay Baek.dev`.

The visual tone should combine a modern AI product builder feel with a calm engineering notebook. The site should feel structured, technically credible, and maintained, without pretending that unfinished projects are polished products.

The home page should use Korean primary copy with English supporting copy. Hero copy is expected to evolve as the content library grows.

### Visual Direction

The visual system should be an editorial engineering workbench.

This means:

- typography and information hierarchy carry the design.
- surfaces feel precise, calm, and maintained.
- Projects and Writing look like evidence, not marketing claims.
- WIP work is framed through status, notes, and technical decisions.
- decorative elements are used sparingly and only when they improve hierarchy.

Avoid:

- purple, violet, indigo, or blue-to-purple AI gradients.
- generic SaaS card grids.
- icon-in-colored-circle feature sections.
- centered-everything hero layouts.
- decorative blobs, floating circles, or wavy dividers.
- bubbly high-radius UI everywhere.
- "Welcome to..." or "Unlock the power of..." style copy.
- cards inside cards.

Design tokens should be named before implementation:

```text
Token group     | Direction
----------------|--------------------------------------------------
Background      | warm white or very light neutral, not beige-heavy
Text            | near-black neutral with clear secondary text scale
Accent          | one restrained accent for links, focus, and status
Border          | quiet neutral lines for structure, not decoration
Status colors   | muted, semantic, readable on light backgrounds
Radius          | small, consistent radius, 8px max unless necessary
Spacing         | 4px base rhythm with generous reading whitespace
Typography      | one serious text face plus one technical/mono face
```

Typography should avoid default font stacks as the primary design choice. Pick real typefaces during implementation, with strong Korean and Latin rendering. Body text must be at least 16px with accessible contrast.

Cards are allowed for individual repeated items such as Project and Writing entries. Cards should not be used as section wrappers, hero containers, or decorative layout blocks.

### Minimum Design System

The implementation should define CSS variables before building page-specific UI.

Required token groups:

- `--color-bg`
- `--color-surface`
- `--color-text`
- `--color-text-muted`
- `--color-link`
- `--color-link-visited`
- `--color-border`
- `--color-focus`
- `--color-status-exploring`
- `--color-status-building`
- `--color-status-maintained`
- `--color-status-paused`
- `--space-*`
- `--radius-sm`
- `--font-body`
- `--font-display`
- `--font-mono`

Required UI rules:

- Links must be visually identifiable without hover.
- Visited links must have a distinct color.
- Focus states must be visible and use `--color-focus`.
- Buttons are only for commands. Navigation and content links should look like links.
- Status badges use muted semantic colors and text labels, never color alone.
- Project and Writing cards use small radius, quiet border, and no decorative icon circles.
- Reading layouts should use a constrained text width around 68-76 characters.
- Code blocks and Mermaid diagrams should be visually part of the article, not floating decorative panels.
- Section headings should sit closer to the content they introduce than to the previous section.
- Body copy should be 16px minimum, with line height comfortable for Korean and English mixed text.

Design system score target for v1: consistent and credible, not heavily branded. The site should feel intentionally designed even if the visual system remains restrained.

### Typography And Palette Direction

Final font and palette choices should be approved through `design-shotgun` once the design tool is configured. Until then, implementation should follow this provisional direction so v1 does not fall back to a generic default theme.

Provisional typography direction:

- Body: a Korean-first sans with excellent mixed Korean/English readability, such as Pretendard or an equivalent high-quality Korean UI/text face.
- Display: the same family with stronger weight, or a compatible editorial sans. Avoid decorative display faces.
- Mono: a serious technical mono face such as JetBrains Mono, IBM Plex Mono, or an equivalent, used only for code, metadata, and technical labels.
- Do not use `system-ui`, Inter, Roboto, Arial, or browser defaults as the primary design choice.
- Mixed Korean/English lines should be tested in hero copy, card summaries, metadata, and article body text.

Provisional palette direction:

```text
Role              | Direction
------------------|---------------------------------------------------------
Background        | off-white neutral, not yellow beige or cold gray
Surface           | nearly white with subtle border, not elevated shadow cards
Primary text      | near-black neutral
Muted text        | cool gray with WCAG AA contrast for body-size text
Link/accent       | restrained blue-green or ink-blue, not purple/indigo
Visited link      | visibly distinct but still restrained
Focus             | high-contrast outline color, visible on all surfaces
Exploring status  | muted slate or blue-gray
Building status   | muted blue-green
Maintained status | muted green
Paused status     | muted amber or gray
```

Design-shotgun should explore at least three distinct font/palette directions before final implementation:

1. Editorial engineering workbench: Korean-first sans, ink text, quiet blue-green accent.
2. Technical notebook: stronger mono presence, tighter metadata, high reading clarity.
3. Premium builder portfolio: slightly more polished contrast and spacing, still no generic SaaS gradients.

The approved direction should be recorded in the plan or `DESIGN.md` before implementation. If design-shotgun is unavailable, v1 may proceed with the provisional direction, but `/design-review` should run after implementation.

## Information Architecture

Top-level navigation:

- Home
- Projects
- Writing
- About

### Home

Home is the hiring-facing entry point. It should show:

- Korean primary hero copy.
- English supporting copy.
- Current role and focus areas.
- Featured Projects.
- Featured Writing.
- Links to GitHub, LinkedIn, email, and other relevant profiles.

Featured Projects and Featured Writing should have comparable visual weight.

Home should use a brand-led workbench hierarchy, not a generic hero plus card grid.

```text
FIRST VIEWPORT
┌─────────────────────────────────────────────────────────────┐
│ Jay Baek.dev                           Home Projects Writing About
│                                                             │
│ 실전 문제를 AI 시스템으로 풀어내는 엔지니어                 │
│ Building practical AI systems and documenting the engineering behind them.
│                                                             │
│ Junior AI Engineer @ Hyundai Capital                        │
│ Focus: AI systems · engineering notes · public build logs    │
│                                                             │
│ [GitHub] [LinkedIn] [Email]                                  │
│                                                             │
│ Featured Projects                 Featured Writing           │
│ ┌───────────────────────────┐     ┌────────────────────────┐ │
│ │ status · problem · stack  │     │ title · tag · summary  │ │
│ └───────────────────────────┘     └────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

The first five seconds should answer:

1. Who is this? Jay Baek, AI Engineer.
2. What does he do? Builds practical AI systems.
3. What proves it? Projects and Writing, shown with equal weight.

Home should avoid:

- decorative hero cards.
- centered-everything portfolio templates.
- generic "welcome" copy.
- three-column feature grids.
- project cards that imply WIP work is production-ready.

### Projects

Projects lists open-source and work-in-progress efforts. Projects must be honest about status. A project can be valuable even when unfinished if the problem framing, experiments, build logs, and technical decisions are visible.

Project statuses:

- `Exploring`
- `Building`
- `Maintained`
- `Paused`

Status semantics:

- `Exploring`: The problem, constraints, or technical direction are still being investigated. The project should emphasize questions, experiments, and early notes, not usability claims.
- `Building`: The project has an active implementation path. Some pieces may work, but the page must clearly state what works now and what is still unfinished.
- `Maintained`: The project has a usable public artifact or stable output and receives ongoing fixes or updates.
- `Paused`: Work is intentionally stopped. The page should explain the current stopping point and why the project is not active.

Status badges must not imply production readiness unless the project body supports that claim.

Project detail pages should follow this default shape:

- Problem
- Approach
- Current Status
- Technical Notes
- Related Writing
- Links

### Writing

Writing is a single feed. The site should not split writing into rigid categories at v1. Discovery should happen through tags, series, related projects, and featured status.

Writing can include:

- AI notes.
- CS notes.
- Engineering essays.
- Project logs.
- Career reflections.

### About

About should explain Jay's current position and direction, not duplicate a resume. It should cover:

- Current role as a junior AI Engineer at Hyundai Capital.
- Direction toward practical AI systems.
- Technical interests.
- Core stack and working style.
- Contact links.

## Content Authoring

The default authoring format is Markdown. MDX should be allowed only when a specific piece needs richer embedded UI.

The common case should support:

- Markdown prose.
- Code blocks.
- Images.
- Mermaid diagrams.
- Frontmatter-driven metadata.

Routine updates should usually touch only:

- `src/content/writing/**`
- `src/content/projects/**`
- `src/content/series/**`

Occasional copy, navigation, tag, or profile updates should touch:

- `src/config/site.ts`
- `src/config/navigation.ts`
- `src/config/tags.ts`

UI, routing, and content graph logic should change rarely.

## Content Collections

Astro Content Collections should define the content model.

### Projects Collection

Each project should include:

- `title`
- `description`
- `status`
- `featured`
- `stack`
- `githubUrl`
- `demoUrl`
- `startedAt`
- `updatedAt`
- `tags`
- `relatedWriting`

`relatedWriting` should use Astro collection references where possible, so broken references fail during schema validation instead of becoming silent missing links.

The project body should explain the project using the default detail-page shape. WIP projects should be explicitly framed as build logs or technical investigations, not finished products.

### Writing Collection

Each writing entry should include:

- `title`
- `description`
- `publishedAt`
- `updatedAt`
- `draft`
- `tags`
- `series`
- `relatedProjects`
- `language`
- `featured`

`series` and `relatedProjects` should use Astro collection references where possible, so the Content Graph Module can compose relationships instead of hand-validating typo-prone slugs.

Writing should be sorted and filtered through the Content Graph Module, not directly in page files.

### Series Collection

Each series should include:

- `title`
- `description`
- `status`
- `featured`

Writing entries should reference a series by slug. Series page ordering should be derived from writing metadata.

### Tags

Tags should start as a config file, not as a collection. This keeps v1 authoring simple while still preventing tag spelling drift.

## Proposed Directory Structure

```text
src/
  content.config.ts
  content/
    projects/
    writing/
    series/
  config/
    site.ts
    navigation.ts
    tags.ts
  pages/
    index.astro
    about.astro
    projects/
      index.astro
      [...slug].astro
    writing/
      index.astro
      [...slug].astro
    tags/
      [tag].astro
    series/
      [slug].astro
  layouts/
    BaseLayout.astro
    ContentLayout.astro
  components/
    global/
    home/
    projects/
    writing/
    content/
  lib/
    content/
      graph.ts
      projects.ts
      writing.ts
      series.ts
      related.ts
      tags.ts
    format.ts
docs/
  content-guide.md
```

## Folder Ownership Rules

Each folder should have a clear job. These rules are part of the architecture, not style preferences.

- `src/pages/**` owns routing, static paths, and page assembly. Pages may call the public Content Graph Interface and compose layouts, but must not duplicate content filtering, sorting, tag indexing, or related-content logic.
- `src/components/**` owns presentational UI. Components should receive already-prepared props and should not query Astro content collections directly.
- `src/layouts/**` owns shared document frames, metadata placement, and reading layouts. Layouts should not decide which content appears on a page.
- `src/lib/content/**` owns content retrieval and derived relationships. Only `graph.ts` is public to pages; other files are internal Implementation.
- `src/config/**` owns site identity, navigation, social links, tag display names, and other low-change configuration. It should not import pages, layouts, or components.
- `src/content/**` owns authored content only. It should contain Markdown, MDX, and collection entries, not rendering logic.
- `docs/**` owns human and agent operating guidance. It should explain how to add and maintain content, not duplicate runtime logic.

If a future change needs to violate one of these rules, update this design or add an ADR before implementation.

## Architecture Principles

The architecture should prefer deep Modules over many shallow helpers. A Module is deep when a small Interface provides high leverage and keeps implementation knowledge local.

Pages should assemble data and UI. They should not own content rules.

Future features should not be pre-abstracted before they exist. One adapter is a hypothetical seam. Two adapters make a seam real.

## Deepening Plan

The v1 implementation should resolve the main architecture risks in priority order. These are implementation-order constraints, not optional polish.

| Priority | Module | Effort | Depends On | Reason |
| --- | --- | --- | --- | --- |
| P0 | Content Graph Module | human ~1 day / CC ~30-45 min | none | This is the central content seam for Home, Projects, Writing, Tags, and Series. If it is shallow, every page will learn content rules. |
| P1 | Content Operations Module | human ~0.5 day / CC ~20-30 min | Content Graph Module | Schema, fixtures, tests, and authoring guidance must match the Content Graph Interface. |
| P1 | Deployment Module | human ~0.5 day / CC ~15-25 min | Site Identity Module | GitHub Pages `site`, `base`, canonical URLs, assets, and workflow checks must agree. |
| P1 | Content Rendering Module | human ~0.5 day / CC ~20-30 min | Content detail route scaffold | Writing and Project detail pages need one reading layout and rich-content seam. |
| P1 | Mermaid Renderer Module | human ~1 day / CC ~30-45 min | Content detail route scaffold | Mermaid detection, hiding, fallback, reserved layout, and animation hooks must not leak into pages. |
| P2 | Site Identity Module | human ~0.5 day / CC ~15-20 min | none | Copy, profile data, social links, and future language policy should stay local, but this is less likely to break all routes. |

Dependency shape:

```text
Content Operations
  └── supports schema, fixtures, and tests for
      Content Graph Module
          └── feeds
              Home / Projects / Writing / Tags / Series

Site Identity Module
  ├── feeds Home / About / SEO
  └── feeds Deployment Module

Content Rendering Module
  └── contains Mermaid Renderer Module
      └── used by Project Detail and Writing Detail
```

Recommended implementation milestones:

1. Foundation: create Astro, TypeScript, Site Identity, GitHub Pages config, Content Collections, Content Graph Interface, and Content Operations guide/fixtures.
2. Graph verification: add Vitest coverage for Content Graph behavior before wiring every route.
3. Rendering: add ContentLayout, Markdown typography, and the Mermaid Renderer Module.
4. Routes and UI: assemble Home, Projects, Writing, Tags, Series, and About using existing Modules.
5. Verification: run `npm run test`, `npm run astro check`, `npm run build`, and deployed GitHub Pages smoke checks.

Deepening opportunity records:

1. Content Graph Module
   - Problem: content filtering, sorting, tag indexing, series indexing, and related-content composition can spread across route files.
   - Solution: expose one page-facing Interface from `src/lib/content/graph.ts` and keep collection loading plus derived indexes inside the Implementation.
   - Leverage: Home, Projects, Writing, Tags, Series, tests, and future search/CMS work all use the same content rules.
   - Locality: bugs in draft filtering, ordering, or relationship composition are fixed in one Module.
   - Tests: Vitest should exercise the public graph Interface with isolated Content Fixtures.

2. Content Operations Module
   - Problem: authoring rules can drift between prose docs, schema validation, fixtures, and tests.
   - Solution: keep `docs/content-guide.md`, `src/content.config.ts`, tag config, and fixtures aligned as one operating surface.
   - Leverage: humans and coding agents can add Projects, Writing, Series, Tags, and Featured Content without learning route internals.
   - Locality: content mistakes are corrected in schema, guide, or fixture rules instead of scattered page fixes.
   - Tests: schema checks and Content Graph tests should cover rules that can be made executable.

3. Deployment Module
   - Problem: GitHub Pages `site`, `base`, canonical URLs, asset paths, and workflow assumptions can diverge across config and CI.
   - Solution: centralize deployment assumptions in `astro.config.mjs`, `src/config/site.ts`, and `.github/workflows/deploy.yml`.
   - Leverage: local build, GitHub Actions, canonical metadata, links, CSS, and image paths share one deployment model.
   - Locality: repository rename or future custom domain changes are handled in one Module and one smoke checklist.
   - Tests: local build plus deployed GitHub Pages smoke checks verify navigation, assets, canonical URLs, and console 404s.

4. Content Rendering Module
   - Problem: Markdown/MDX typography, code, images, links, callouts, and detail-page metadata can diverge between Writing and Project pages.
   - Solution: use one Content Rendering Module for Project Detail and Writing Detail, with Mermaid rendering delegated to an internal Module.
   - Leverage: every long-form content page gets the same reading behavior and rich-content affordances.
   - Locality: rendering changes are made in `ContentLayout.astro` and `src/components/content/**`, not in every route.
   - Tests: rendering QA should verify Markdown, code, images, Mermaid presence, Mermaid absence, and fallback states.

5. Mermaid Renderer Module
   - Problem: diagram detection, conditional loading, raw-syntax hiding, fallback, reserved layout, and animation can leak into layouts or pages.
   - Solution: keep Mermaid lifecycle behavior inside a dedicated Module within the Content Rendering Module.
   - Leverage: every diagram page gets consistent behavior, and future motion decisions reuse the same render lifecycle hook.
   - Locality: Mermaid failures, no-JS fallback, and animation changes stay in one Implementation.
   - Tests: browser QA should cover diagram render, no raw syntax flash, no-JS/failure fallback, and no Mermaid runtime on pages without diagrams.

6. Site Identity Module
   - Problem: Korean primary copy, English supporting copy, navigation, profile data, social links, and SEO metadata can become inline strings across pages.
   - Solution: keep identity and hiring-facing copy in one Module without introducing a full i18n Adapter in v1.
   - Leverage: Home, About, navigation, SEO, and future locale-aware routing share one source of truth.
   - Locality: copy or profile changes happen in `src/config/**`, not across route and layout files.
   - Tests: build checks should verify required identity fields exist; visual/browser QA should verify Home/About consume them.

### Content Graph Module

Files:

- `src/lib/content/graph.ts`
- `src/lib/content/projects.ts`
- `src/lib/content/writing.ts`
- `src/lib/content/series.ts`
- `src/lib/content/related.ts`
- `src/lib/content/tags.ts`
- `src/content.config.ts`

The Content Graph Module is a v1 core Module. It owns content retrieval and derived relationships.

Astro collection schemas should use `reference()` for relationships between Writing, Projects, and Series whenever the relationship points at another content entry. The Content Graph Module may still validate higher-level invariants, but entry existence should be checked by the schema layer.

`src/lib/content/graph.ts` is the public Interface for pages. Page files should import content queries from `graph.ts`, not directly from internal files such as `writing.ts`, `projects.ts`, `related.ts`, `series.ts`, or `tags.ts`. Those internal files can exist to keep the Implementation readable, but route files should have one stable content seam.

The Content Graph should be built once per static build and reused by page-level queries. It should centralize collection reads, filtering, sorting, tag indexes, series indexes, and related-content lookup instead of recomputing those structures in every route.

Testing must avoid shared graph state leaking between test cases. The implementation should provide a testable graph construction path, such as a pure graph factory that accepts fixture entries or an explicit reset hook used only by tests. Tests should assert behavior through the public graph Interface while controlling fixture input.

Implementation depth rules:

- Prefer one public `graph.ts` Interface over many page-facing helper exports.
- Keep collection loading, normalization, indexing, and relationship composition inside the Implementation.
- Expose stable page-level query results, not raw Astro collection entries when a page needs derived fields.
- Do not add search, CMS, or i18n adapters in v1. Add those only when a real second adapter exists.
- If graph state is memoized for a static build, tests must be able to construct isolated graph instances from fixtures.

Its Interface should answer page-level questions:

- What content appears on Home?
- What projects are visible?
- What writing entries are visible?
- Which writing entries belong to a tag?
- Which writing entries belong to a series?
- Which writing entries are related to a project?
- Which projects are related to a writing entry?

Its Implementation should hide:

- Draft filtering.
- Date sorting.
- Featured ordering.
- Tag index creation.
- Series ordering.
- Related content composition.
- Status normalization.

This keeps future search, CMS, and multilingual support from leaking into every page.

### Content Rendering Module

Files:

- `src/layouts/ContentLayout.astro`
- `src/components/content/**`
- `src/pages/writing/[...slug].astro`
- `src/pages/projects/[...slug].astro`
- `astro.config.mjs`

The Content Rendering Module owns how Markdown and optional MDX appear.

Its Interface should stay small: detail pages provide content metadata and rendered content; the module handles the reading layout and rich content affordances.

Its Implementation should hide:

- Mermaid rendering.
- Code block styling.
- Image and caption styling.
- External link styling.
- Callouts.
- Future research cards, experiment cards, or demo embeds.

Writing detail and Project detail should use the same rendering rules.

The Mermaid Renderer Module lives inside the Content Rendering Module. It is deep enough to own diagram detection, conditional loading, source hiding, fallback, layout reservation, render lifecycle state, and future animation hooks.

Mermaid strategy for v1:

- The default Mermaid path is client-side rendering for Markdown code blocks, owned by the Content Rendering Module.
- Mermaid JavaScript should load only on pages that contain Mermaid diagrams.
- JS-enabled browsers should not show raw Mermaid syntax before the diagram renders. The page should include a small pre-paint bootstrap that marks JavaScript as available, hides Mermaid source blocks, reserves diagram space, and then renders diagrams into dedicated output containers.
- If Mermaid rendering fails or JavaScript is unavailable, the original code block should remain readable.
- Mermaid loading should be pay-as-used. Plain Writing and Project pages must not load the Mermaid runtime or diagram-specific JavaScript.
- Any diagram render animation must stay inside the Content Rendering Module. Pages and Markdown/MDX content should not define custom animation logic. The design review may choose the motion style later, but the engineering seam should be a small render lifecycle hook or CSS class toggle owned by the Mermaid renderer.
- High-value diagrams may use source-controlled `.mmd` plus generated `.svg` assets instead of client-side rendering.
- Diagram automation, when added, must be command/check based, not time-based. Prefer `npm run diagrams` to regenerate SVG assets and `npm run diagrams:check` to fail CI when generated SVG files drift from `.mmd` sources.
- Build commands should not silently modify checked-in SVG assets.

### Site Identity Module

Files:

- `src/config/site.ts`
- `src/config/navigation.ts`
- `src/config/tags.ts`

The Site Identity Module owns the site's name, copy, navigation, profile links, social links, and tag display names.

v1 should not implement full multilingual routing, but Korean and English hiring-facing copy should live in this Module instead of being scattered through pages.

Implementation depth rules:

- Home, About, SEO metadata, and navigation should read identity/copy data from this Module instead of defining strings inline.
- Do not introduce a full i18n Adapter in v1.
- Store Korean primary copy and English supporting copy in a structure that can later be migrated to locale-aware routing without searching through page files.

### Content Operations Module

Files:

- `docs/content-guide.md`
- `src/content.config.ts`
- `src/config/tags.ts`
- Future `scripts/validate-content.*` if needed.

The Content Operations Module is the operating manual and validation surface for content work.

It should explain:

- How to add a writing entry.
- How to add a project.
- How to add a series.
- How to use tags.
- How to mark content as featured.
- How to connect projects and writing.
- How to keep WIP projects honest.
- How to choose between inline Mermaid and source-controlled diagram assets.

At v1, Astro content schemas and build checks are enough. A validation script should only be added when schema checks no longer cover common mistakes.

Implementation depth rules:

- The content guide must describe the same required fields and status semantics enforced by `src/content.config.ts`.
- Test fixtures should exercise the same authoring rules documented in the guide.
- If a rule can be encoded in Astro schema, encode it there instead of leaving it as prose only.
- If a rule cannot be encoded in schema, document it clearly and cover it through Content Graph tests where possible.

### Deployment Module

Files:

- `astro.config.mjs`
- `.github/workflows/deploy.yml`
- `src/config/site.ts`

The Deployment Module owns GitHub Pages deployment assumptions: final repository name, `site`, `base`, canonical URL behavior, asset path behavior, and the deploy workflow.

Implementation depth rules:

- `astro.config.mjs` should derive or centralize `site` and `base` decisions instead of duplicating URL strings across files.
- The GitHub Actions workflow should build the site through the same scripts used locally.
- The deployed smoke checklist is part of the Module's verification surface.
- Custom domains remain out of scope for v1. If a custom domain is added later, update this Module and the smoke checklist together.

### External Capability Modules

Search, comments, analytics, CMS, and demos are excluded from v1. When introduced later, each should be added as a dedicated Module rather than embedded directly into pages or layouts.

Examples:

- `src/lib/search/**`
- `src/lib/comments/**`
- `src/lib/analytics/**`
- `src/lib/cms/**`

Vendor-specific code must stay inside these Modules. Pages should only consume stable content or rendering results.

Do not introduce adapter Interfaces for these capabilities until there are at least two real adapters, usually production and local/test.

## UI And UX Requirements

### Responsive And Accessibility Requirements

Responsive behavior should be intentional, not just stacked desktop content.

```text
VIEWPORT        | LAYOUT PRIORITY
----------------|---------------------------------------------------------------
Mobile 320-767  | identity, primary nav, one featured item per section, readable prose
Tablet 768-1023 | two-column featured areas only when space supports comfortable text
Desktop 1024+   | brand-led first viewport with Projects and Writing in balanced columns
Wide 1440+      | constrain content width; do not stretch reading lines or cards endlessly
```

Mobile requirements:

- Header must remain simple: brand visible, navigation reachable, no hidden critical links.
- Touch targets must be at least 44px in height or width.
- Home should show identity first, then one Featured Project and one Featured Writing before deeper lists.
- Project and Writing cards should avoid cramped metadata rows; wrap metadata onto separate lines when needed.
- Reading pages should keep text width comfortable and avoid horizontal scrolling except inside code blocks.
- Code blocks should support horizontal scrolling without breaking page layout.
- Mermaid diagrams should fit the viewport or provide safe overflow behavior.

Accessibility requirements:

- Use semantic landmarks: header, nav, main, footer.
- Each page must have one clear `h1`.
- Heading order must not skip levels for visual styling.
- Links must be recognizable without color alone where possible.
- Visited links must look different from unvisited links.
- Body text contrast must be at least WCAG AA, 4.5:1.
- Focus states must be visible for all interactive elements.
- Status badges must include text labels, not color alone.
- Images need meaningful alt text or empty alt text when decorative.
- Mermaid diagrams need nearby text context or accessible labels.
- Keyboard users must be able to reach navigation, content links, and external profile links.
- No hover-only disclosure for important content.

Accessibility should be validated with browser QA after implementation, including keyboard-only navigation through Home, Projects, Writing, and one detail page.

### User Journey And Emotional Arc

The site should move visitors through a Trust → Proof → Depth → Return arc.

```text
STEP | USER DOES                 | USER SHOULD FEEL              | DESIGN SUPPORT
-----|---------------------------|-------------------------------|--------------------------------------------
1    | Lands on Home             | "I know who this is."         | Jay Baek.dev, role, focus, clear navigation
2    | Scans first viewport      | "This feels credible."        | restrained tone, no hype, Projects/Writing proof
3    | Opens a Project           | "He can frame real problems." | Problem, Approach, Current Status, Technical Notes
4    | Opens related Writing     | "He explains his thinking."   | readable article layout, tags, related Projects
5    | Reads About               | "I understand his direction." | current role, goals, stack, contact links
6    | Returns later             | "There is a trail to follow." | latest Writing, build logs, series, updated dates
```

Time-horizon goals:

- First 5 seconds: clear identity and credible positioning.
- First 5 minutes: enough Project and Writing evidence to judge technical taste.
- Long-term: a maintained public record of learning, building, and technical judgment.

Each major page should support one stage of this arc:

- Home builds Trust.
- Projects provide Proof.
- Writing provides Depth.
- About explains Direction.
- Tags and Series support Return.

### Interaction States

Every user-facing content surface should define what the visitor sees when content is loading, empty, unavailable, successful, or partial. Empty states should feel like a warm public workbench, not a broken database query.

```text
FEATURE              | LOADING                  | EMPTY                                      | ERROR                         | SUCCESS                         | PARTIAL
---------------------|--------------------------|--------------------------------------------|-------------------------------|----------------------------------|-------------------------------
Home featured areas  | Stable skeleton blocks   | "정리 중인 작업이 곧 추가됩니다" + links   | Hide broken item, keep page   | Featured Projects/Writing shown | Show whichever side has content
Projects list        | Static build placeholder | Current build focus + GitHub/About links   | Build should fail on bad data | Project cards with status       | WIP projects show honest status
Writing list         | Static build placeholder | Writing queue note + About/GitHub links    | Build should fail on bad data | Featured + latest writing       | Drafts hidden, published shown
Project detail       | Static generated page    | Not applicable for generated routes        | 404 with route back to list   | Problem/Approach/Status/Notes   | Missing links omitted cleanly
Writing detail       | Static generated page    | Not applicable for generated routes        | 404 with route back to list   | Metadata + readable article     | Missing related items omitted
Mermaid diagram      | Reserved diagram space   | Source code fallback if JS unavailable     | Readable source + short note  | Rendered diagram                | Diagram loads after text safely
Tag/Series pages     | Static build placeholder | Short note + link back to Writing          | 404 or build validation error | Matching entries listed         | Draft-only groups show empty state
```

Empty state copy rules:

- keep it under two short sentences.
- do not apologize.
- do not say "No items found."
- include one useful next action.
- preserve trust by naming the current state plainly.

### Home

Home should be concise and scannable:

- Hero identity.
- Current role and focus.
- Featured Projects.
- Featured Writing.
- Clear profile links.

### Projects List

Project cards should show:

- Status.
- One-line problem statement.
- Stack.
- Related writing count.
- GitHub or external links where available.

### Project Detail

Project detail should make incomplete work credible by showing the quality of thinking:

- Why the project exists.
- What has been tried.
- What currently works.
- What is still uncertain.
- What technical decisions have been made.
- Which writing entries explain the work.

### Writing List

Writing should provide:

- Featured entries.
- Latest entries.
- Tag links.
- Series links where relevant.

Search is excluded from v1.

### Writing Detail

Writing detail should prioritize reading:

- Stable text width.
- Clear metadata.
- Tags and series.
- Related projects.
- Code blocks.
- Mermaid diagrams.
- Images with captions.

### About

About should show:

- Current role.
- Direction.
- Technical interests.
- Working style.
- Contact links.

## Build And Deployment

The site should be a static Astro site deployed to GitHub Pages.

Expected stack:

- Astro.
- TypeScript.
- Astro Content Collections.
- Markdown.
- Optional MDX.
- Mermaid support.
- CSS variables and Astro-scoped styles.
- GitHub Actions deployment.

Tailwind CSS is not required for v1. The site can use CSS variables and scoped styles to keep dependencies low and improve long-term maintainability.

No custom domain is planned for v1.

The GitHub Pages repository and base URL must be verified in the first implementation milestone:

- If the final repository is named `<username>.github.io`, set Astro `site` to `https://<username>.github.io` and do not set `base`.
- If the final repository is not named `<username>.github.io`, set Astro `site` to `https://<username>.github.io` and set `base` to `/<repo-name>`.

Internal links and asset paths must work with the chosen `base` configuration. The implementation plan should include a local build check and a deployed-site smoke check for navigation, CSS, images, and canonical URLs.

Deployed GitHub Pages smoke checklist:

- Home route loads at the expected GitHub Pages URL.
- Projects list route loads without a 404.
- Writing list route loads without a 404.
- At least one Project detail route loads without a 404.
- At least one Writing detail route loads without a 404.
- Header navigation works from Home and from a nested detail route.
- CSS and font assets load from the correct base path.
- Images load from the correct base path.
- Canonical URLs use the deployed GitHub Pages origin and path.
- Browser console has no asset 404s caused by incorrect `site` or `base`.

## Validation

Before shipping v1, run:

```bash
npm run test
npm run astro check
npm run build
```

If linting and formatting scripts are added, also run:

```bash
npm run format
npm run lint
```

The most important validation is that content schema and build checks catch broken frontmatter, invalid content references, and rendering failures.

The implementation should add Vitest tests for the public Content Graph Interface in `src/lib/content/graph.ts`. These tests should verify observable behavior through the public Interface, not internal helper functions.

Required Content Graph test coverage:

- draft writing is excluded from production-visible results.
- featured Projects and Writing are ordered predictably.
- Projects and Writing sort by the intended date fields.
- tag index output is stable and rejects or reports unknown tags.
- series pages receive entries in the intended order.
- related Project/Writing composition works through Astro collection references.
- empty collections return stable empty states instead of throwing.

Required rendering QA:

- Include one explicit Mermaid sample or fixture page during implementation.
- Verify that the Mermaid diagram renders in a browser.
- Verify that the page remains readable if Mermaid JavaScript fails or is unavailable.
- Verify that Mermaid JavaScript is not loaded on pages without Mermaid diagrams.
- Verify that JS-enabled pages do not visibly flash raw Mermaid syntax before rendering.

## Success Criteria

- A visitor can understand within 30 seconds that Jay Baek is a practical AI Engineer building a public record of projects and writing.
- Projects and Writing have comparable first-class presence.
- A new writing Markdown file automatically appears in lists, detail routes, tag pages, series pages, and related content where configured.
- A new project Markdown file automatically appears in project lists and detail routes.
- Projects and writing can reference each other through frontmatter.
- WIP projects are presented honestly through status, notes, and related writing.
- Routine content updates are limited to `src/content/**`.
- Configuration updates are localized to `src/config/**`.
- Page files do not duplicate content filtering, sorting, or relationship logic.
- The architecture leaves room for search, comments, CMS, analytics, demos, and full multilingual routing without adding shallow pass-through Modules in v1.

## Design Review Report

`/plan-design-review` ran on 2026-04-28.

Initial design completeness: 4/10.
Final design completeness after plan updates: 8/10.

Design decisions added:

- Home uses a brand-led workbench hierarchy.
- Empty states use warm public-workbench language with useful next actions.
- The user journey follows Trust → Proof → Depth → Return.
- Visual direction is editorial engineering workbench.
- Minimum design system tokens and UI rules are required before page-specific UI.
- Responsive and accessibility requirements are explicit.
- Final font and palette approval should happen through `design-shotgun` after designer setup.

Design artifacts:

- No approved mockups were generated because the gstack designer is missing an OpenAI API key.
- Designer command that needs setup: `/Users/jaybaek/gstack/design/dist/design setup`.

NOT in scope for this review:

- Final font and palette approval. Deferred to `design-shotgun`.
- Final motion style for Mermaid diagrams. Deferred to visual design exploration and implementation review.
- Live visual QA. Deferred to `/design-review` after implementation.

What already exists:

- No `DESIGN.md` exists yet.
- No existing UI components or page patterns exist because the repo is still pre-implementation.
- The design plan now acts as the temporary design source of truth until a `DESIGN.md` or approved mockup exists.
