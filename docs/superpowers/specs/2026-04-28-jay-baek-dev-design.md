# Jay Baek.dev Design

Date: 2026-04-28

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
