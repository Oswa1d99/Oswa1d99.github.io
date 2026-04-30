# Content Guide

This is the active authoring Interface for humans and coding agents adding content to Jay Baek.dev.

Routine content updates should usually touch only:

- `src/content/writing/**`
- `src/content/projects/**`
- `src/content/series/**`
- `docs/content-templates/**` as copyable starting points, not published content.

Occasional tag updates should touch:

- `src/config/taxonomy.json`

## Editing UI Text

Editable site copy lives in `src/config/site-content.json`.

Use this file for:

- Home hero copy.
- Header navigation labels.
- About page copy.
- Footer copy.
- Empty state copy.
- Search page labels and messages.

Do not edit route, layout, or component files just to change words on the page. Those files should render the authoring data.

After editing `src/config/site-content.json`, run:

```bash
npm run validate
```

UI, routing, and content graph logic should change rarely during content work.

Public IA follows `DESIGN.md`: Records is the public archive surface for Writing,
and Build is the public open-source build-thread surface for Projects. Keep the
internal collection names `writing` and `projects` unless the architecture changes.

## Projects

Projects list open-source and work-in-progress engineering efforts. A Project does not need to be finished, but it must clearly show its problem, status, technical direction, and related Writing.

Start from `docs/content-templates/project.md` when creating a Project entry.

Each Project should include:

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

`relatedWriting` should use Astro collection references where possible so broken references fail during schema validation.

Project detail pages should follow this default shape:

- Problem
- Approach
- Current Status
- Technical Notes
- Related Writing
- Links

Work-in-progress Projects should be framed as build logs or technical investigations, not finished products.

## Project Status

Allowed Project Status values:

- `Exploring`: the problem, constraints, or technical direction are still being investigated.
- `Building`: the Project has an active implementation path. Some pieces may work, but the page must clearly state what works now and what is unfinished.
- `Maintained`: the Project has a usable public artifact or stable output and receives ongoing fixes or updates.
- `Paused`: work is intentionally stopped. The page should explain the current stopping point and why the Project is not active.

Status badges must not imply production readiness unless the Project body supports that claim.

## Writing

Writing is a single feed. v1 should not split Writing into rigid categories. Discovery happens through Tags, Series, related Projects, and featured status.

Start from `docs/content-templates/writing.md` when creating a Writing entry. Keep new Writing as `draft: true` until the content is ready to appear in public lists.

Writing can include:

- AI notes.
- CS notes.
- Engineering essays.
- Project logs.
- Career reflections.

Each Writing entry should include:

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

`series` and `relatedProjects` should use Astro collection references where possible.

Draft Writing must be excluded from public lists and related content.

## Series

Each Series should include:

- `title`
- `description`
- `status`
- `featured`

Writing entries reference a Series by slug. Series page ordering is derived from Writing metadata.

Start from `docs/content-templates/series.md` when creating a Series entry.

## Tags

Tags start as a config file, not a collection. This keeps v1 authoring simple while preventing spelling drift.

Tags connect Writing and Projects by topic. Unknown or disallowed Tags should be rejected or clearly reported by schema/build checks.

Tags should be controlled but allowed to grow as the Writing archive grows. Avoid treating early topic labels as permanent categories.

Use three conceptual tag roles:

- Focus tags: broad current areas such as `llm-serving`, `system-design`, or `cs-fundamentals`.
- Topic tags: concrete subjects such as `latency`, `evaluation`, `queues`, `indexing`, `network`, or `agents`.
- Format tags: content shapes such as `study-note`, `engineering-memo`, `diagram`, `reflection`, or `build-log`.

The UI should not display every tag everywhere. Home should show at most one primary tag or focus label per Writing entry. Records pages may show denser tag metadata because Records are the intended high-information surface.

Current Focus groups are a presentation layer over tags. They can group several tags into a small number of prominent filters without changing the underlying Writing entries.

### Editing Tags

Editable Tag data lives in `src/config/taxonomy.json`.

Use this file to change:

- Tag labels.
- Tag roles.
- Focus group labels.
- Which Tags appear in each focus group.

Use stable lowercase slugs because content frontmatter references them. If a slug changes, update every Writing and Project entry that uses it.

After editing `src/config/taxonomy.json`, run:

```bash
npm run validate
```

Example:

```ts
const recordGroups = [
  {
    label: "LLM serving",
    tags: ["llm", "serving", "inference", "latency", "evaluation"],
  },
  {
    label: "System design",
    tags: ["system-design", "queues", "workers", "scaling"],
  },
];
```

If a Current Focus group changes, old Writing entries should remain discoverable through their individual tags.

## Search

Search is a site-level reader aid for finding Records by title, tags, description, and body text.

v1 should use static search, not a hosted search backend. The preferred implementation is Pagefind or an equivalent static search index generated after the Astro build.

Search UI rules:

- Home should not show a search input.
- The persistent header should show a search icon button at the far right.
- The search icon should navigate to `/search/` in v1.
- A future overlay may progressively enhance the icon, but `/search/` must remain the stable fallback.
- The search page should show result title, tags, and a trimmed body snippet around the matched term.
- Highlight the matched term in snippets with `mark`.
- If a title or tag matches but no body snippet exists, show the Writing description.
- If no description exists, show the first useful body excerpt.
- Use this empty state exactly: `No records matched this search. Try a broader term.`

Search indexing rules:

- Include published Record title, description, body, tags, Series label, and related Build/Project names when public.
- Exclude draft Writing.
- Exclude repeated navigation and footer text.
- Exclude confidential company details. Those should not exist in authored content.

Records filtering and site search are different features. Records filters help readers browse by tag, focus group, format, and date. Search helps readers find text matches across the archive.

## Featured Content

Featured Content is a curated Project or Writing entry selected for high-visibility surfaces such as Home.

Home should show a small set of recent Records and one focused Build thread, following `DESIGN.md`. Missing featured content should not break Home; show the available evidence without filling the page with placeholders.

## Mermaid Diagrams

Inline Mermaid diagrams are the default v1 path.

Use source-controlled `.mmd` plus generated `.svg` assets only for high-value diagrams where manual inspection or static rendering matters. When those assets become common enough that manual regeneration is error-prone, add the Diagram Asset Automation task from `TODOS.md`.

Do not add a time-based watcher. Prefer explicit commands such as `npm run diagrams` and `npm run diagrams:check`.

## Empty States

Empty state copy should:

- Stay under two short sentences.
- Avoid apologies.
- Avoid "No items found."
- Include one useful next action.
- Name the current state plainly.

## Validation

When content behavior changes, update or add tests for observable behavior. See `docs/validation.md`.

Rules that can be encoded in Astro schema should be encoded there instead of living only as prose. Rules that cannot be encoded in schema should be documented here and covered through Content Graph tests where possible.
