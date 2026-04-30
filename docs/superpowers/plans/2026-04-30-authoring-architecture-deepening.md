# Authoring Architecture Deepening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Jay Baek.dev easier for non-developers to edit UI text and Tags while deepening the shallow Modules found in the architecture review.

**Architecture:** First make validation executable, then move editable copy and taxonomy into data-first authoring surfaces. After those Interfaces are stable, deepen Deployment paths, Content Graph projections, Records discovery, Static Search, and Content Rendering/Mermaid behavior so callers stop depending on scattered implementation details.

**Tech Stack:** Astro 6, TypeScript, Vitest, npm, Pagefind, Mermaid, GitHub Pages.

---

## Scope And Dependencies

Implement in this order:

1. Validation Module executable safety net.
2. UI Text Authoring Surface.
3. Taxonomy Authoring Surface.
4. Deployment Module path helpers.
5. Content Graph Interface narrowing and content projections.
6. Records Discovery Module.
7. Static Search Module.
8. Content Rendering and Mermaid Renderer Modules.
9. Records listing orchestration.
10. Shallow re-export cleanup and docs alignment.

Each task should land in its own commit. Run `npm run validate` before each commit after Task 1 exists. Before Task 1 exists, run the commands listed inside Task 1.

## File Structure

- `package.json`: owns executable validation scripts.
- `.github/workflows/deploy.yml`: runs the same validation command CI should trust.
- `tsconfig.json`: enables JSON authoring imports for site copy and taxonomy data.
- `src/config/site-content.json`: non-developer authoring surface for UI text.
- `src/config/site-content.ts`: typed accessor and validation surface for UI text.
- `src/config/taxonomy.json`: non-developer authoring surface for Tag labels, roles, and focus groups.
- `src/config/tags.ts`: typed accessor and validation surface for taxonomy.
- `src/config/deployment.ts`: base-aware path and canonical helpers.
- `src/lib/content/graph.ts`: public Content Graph Interface for page-ready queries and projections.
- `src/lib/content/records-discovery.ts`: pure Records filtering and sorting behavior.
- `src/lib/search/static-search.ts`: pure Static Search behavior shared by the search route script.
- `src/lib/rendering/content-page.ts`: content detail metadata projection and Mermaid detection.
- `src/layouts/ContentLayout.astro`: shared reading layout and Mermaid runtime host.
- `src/components/RecordsView.astro`: reusable Records list frame.
- `docs/content-guide.md`, `docs/architecture.md`, `CONTEXT.md`, `docs/validation.md`: documentation that must match the new Interfaces.

---

### Task 1: Make Validation Module Executable

**Files:**

- Modify: `package.json`
- Modify: `.github/workflows/deploy.yml`
- Modify: `docs/validation.md`

- [x] **Step 1: Write the failing validation expectation**

Run:

```bash
npm run validate
```

Expected: FAIL with `Missing script: "validate"` because the Validation Module is still a prose checklist.

- [x] **Step 2: Add executable scripts to `package.json`**

Replace the `scripts` object with this exact object:

```json
{
  "dev": "astro dev",
  "start": "astro dev",
  "test": "vitest run --passWithNoTests",
  "test:watch": "vitest",
  "check": "astro check",
  "astro": "astro",
  "build": "astro build && if find dist -name '*.html' -type f | grep -q .; then pagefind --site dist; else echo 'No HTML files found; skipping Pagefind.'; fi",
  "preview": "astro preview",
  "format": "prettier --write \"src/**/*.{astro,css,ts,json}\" \"*.{js,json,mjs,ts}\" \".github/**/*.yml\" \"docs/**/*.md\" --ignore-unknown --no-error-on-unmatched-pattern",
  "format:check": "prettier --check \"src/**/*.{astro,css,ts,json}\" \"*.{js,json,mjs,ts}\" \".github/**/*.yml\" \"docs/**/*.md\" --ignore-unknown --no-error-on-unmatched-pattern",
  "lint": "npm run format:check",
  "validate": "npm run format:check && npm run test && npm run check && npm run build"
}
```

- [x] **Step 3: Make CI run the same validation Interface**

In `.github/workflows/deploy.yml`, replace:

```yaml
- name: Build
  run: npm run build
```

with:

```yaml
- name: Validate
  run: npm run validate
```

- [x] **Step 4: Update the Validation Module document**

In `docs/validation.md`, replace the Local Checks command list with:

```markdown
Before shipping, run:

`npm run validate`

`npm run validate` is the executable Validation Module Interface. It runs formatting checks, Vitest, Astro type checks, and the production build with Pagefind generation. CI must use the same command so local and deploy validation do not drift.
```

- [x] **Step 5: Verify**

Run:

```bash
npm run validate
```

Expected: PASS. If Prettier reports existing formatting drift caused by this task, run `npm run format`, then rerun `npm run validate`.

- [x] **Step 6: Commit**

```bash
git add package.json .github/workflows/deploy.yml docs/validation.md
git commit -m "chore: make validation executable"
```

---

### Task 2: Create UI Text Authoring Surface

**Files:**

- Create: `src/config/site-content.json`
- Create: `src/config/site-content.ts`
- Modify: `tsconfig.json`
- Modify: `src/config/site.ts`
- Modify: `src/config/site.test.ts`
- Modify: `src/config/home.ts`
- Modify: `src/config/home.test.ts`
- Modify: `src/pages/search.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/components/EmptyState.astro` only if prop names need clarification
- Modify: `docs/content-guide.md`

- [x] **Step 1: Enable typed JSON imports**

Modify `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "types": ["vitest/globals"],
    "resolveJsonModule": true
  }
}
```

- [x] **Step 2: Add the authoring data**

Create `src/config/site-content.json`:

```json
{
  "site": {
    "name": "Jay Baek.dev",
    "title": "Jay Baek.dev",
    "description": "A learning-forward engineering dossier for practical AI systems, study notes, engineering memos, and one focused build thread.",
    "author": "Jay Baek",
    "role": "AI Engineer"
  },
  "navigation": [
    { "label": "Records", "href": "/records/" },
    { "label": "Build", "href": "/build/" },
    { "label": "About", "href": "/about/" }
  ],
  "socialLinks": [{ "label": "GitHub", "href": "https://github.com/Oswa1d99" }],
  "homeHero": {
    "brand": "Jay Baek.dev",
    "editorialClaim": ["Practical AI systems,", "edited into evidence."],
    "promptThesis": "public technical record, kept honest by status."
  },
  "aboutPage": {
    "title": "About",
    "description": "Professional context, contact, and confidential-safe work themes.",
    "eyebrow": "professional context",
    "intro": [
      "Jay Baek is an AI Engineer building practical AI systems through disciplined study, technical writing, and focused public build work.",
      "This site is a public surface for evidence: records, build notes, and confidential-safe themes from real engineering practice."
    ],
    "context": {
      "heading": "Context",
      "rows": [
        { "label": "Role", "value": "AI Engineer" },
        {
          "label": "Public surface",
          "value": "Records, build notes, and technical memos"
        },
        {
          "label": "Private boundary",
          "value": "Company work stays theme-level only"
        }
      ]
    },
    "workThemes": {
      "heading": "Work themes",
      "intro": "Company work is described here only by theme. Internal project details stay private.",
      "items": [
        {
          "label": "AI systems",
          "description": "Applied systems, evaluation, reliability, and delivery."
        },
        {
          "label": "Product constraints",
          "description": "Latency, UX, operations, maintainability, and tradeoffs."
        },
        {
          "label": "Automation",
          "description": "Practical workflows that survive contact with real use."
        }
      ]
    },
    "contact": {
      "heading": "Contact",
      "intro": "The best public starting point is GitHub."
    }
  },
  "footer": {
    "summary": "Jay Baek.dev keeps a public record of study, engineering memos, and focused build work."
  },
  "emptyStates": {
    "homeNoProof": {
      "title": "Public proof is being organized",
      "message": "Read About for context or open GitHub for current public work.",
      "href": "/about/",
      "action": "Read About"
    },
    "recordsNoPublished": {
      "title": "Records are being organized",
      "message": "No published records are in this view yet. Browse About for context.",
      "href": "/about/",
      "action": "Read About"
    },
    "buildNoPublicThread": {
      "title": "No public build thread is ready yet",
      "message": "Start with Records or GitHub.",
      "href": "/records/",
      "action": "Browse Records"
    },
    "tagNoRecords": {
      "title": "No published records are in this view yet",
      "message": "Browse all records.",
      "href": "/records/",
      "action": "Browse Records"
    },
    "seriesNoRecords": {
      "title": "No published records are in this series yet",
      "message": "Browse all records.",
      "href": "/records/",
      "action": "Browse Records"
    },
    "recordFilterNoMatch": "No records matched these filters. Clear one filter or browse all records.",
    "searchNoMatch": "No records matched this search. Try a broader term.",
    "searchUnavailable": "Search is unavailable.",
    "pageNotFound": {
      "title": "Page not found",
      "description": "This page is not available.",
      "message": "This route does not have a published page. Browse Records or return Home."
    }
  },
  "searchPage": {
    "title": "Search",
    "description": "Search published Records and Build notes.",
    "eyebrow": "Search utility",
    "heading": "Search the public record",
    "intro": "Find records and build notes by title, tag, or excerpt. For browsing, start with the full archive.",
    "label": "Search term",
    "clear": "Clear",
    "suggestedPathLabel": "Suggested path",
    "browseRecords": "Browse all Records",
    "statusSearching": "Searching…",
    "fallbackAction": "Browse Records",
    "resultSingular": "result",
    "resultPlural": "results",
    "untitledResult": "Untitled record"
  }
}
```

- [x] **Step 3: Add typed accessors**

Create `src/config/site-content.ts`:

```ts
import content from "./site-content.json";

export type SiteContent = typeof content;
export type EmptyStateCopy = {
  title: string;
  message: string;
  href: string;
  action: string;
};

export const siteContent = content;
export const siteIdentity = content.site;
export const navigation = content.navigation;
export const socialLinks = content.socialLinks;
export const homeHero = content.homeHero;
export const aboutPage = content.aboutPage;
export const footerCopy = content.footer;
export const emptyStates = content.emptyStates;
export const searchPage = content.searchPage;
```

- [x] **Step 4: Update `src/config/site.ts` to consume the data**

Replace the existing contents with:

```ts
import { deployment } from "../../deployment.config.mjs";
import {
  aboutPage,
  footerCopy,
  homeHero,
  navigation,
  siteIdentity,
  socialLinks,
} from "./site-content";

export { aboutPage, footerCopy, homeHero, navigation, socialLinks };

export const site = {
  ...siteIdentity,
  url: deployment.site,
  links: socialLinks,
} as const;
```

- [x] **Step 5: Update tests for the authoring Interface**

In `src/config/site.test.ts`, add these assertions inside the existing `describe("site identity", ...)` block:

```ts
import { siteContent } from "./site-content";

it("keeps editable UI text in the site content authoring surface", () => {
  expect(siteContent.homeHero.promptThesis).toBe(
    "public technical record, kept honest by status.",
  );
  expect(siteContent.emptyStates.searchNoMatch).toBe(
    "No records matched this search. Try a broader term.",
  );
  expect(siteContent.searchPage.clear).toBe("Clear");
});
```

In `src/config/home.test.ts`, keep imports unchanged and expect the same `homeHero` object already asserted.

- [x] **Step 6: Use copy from the authoring surface**

In `src/pages/search.astro`, import:

```text
import { emptyStates, searchPage } from "../config/site-content";
```

Replace hard-coded visible search page strings with `searchPage` and `emptyStates.searchNoMatch`. The client script should receive static constants:

```text
<script define:vars={{ searchPage, emptyStates }}>
```

Inside the script, replace:

```ts
status.textContent =
  "No records or build notes matched this search. Try a broader term.";
```

with:

```ts
status.textContent = emptyStates.searchNoMatch;
```

In `src/pages/404.astro`, import `emptyStates` and use `emptyStates.pageNotFound`.

- [x] **Step 7: Document non-developer copy editing**

Add this section to `docs/content-guide.md` after the opening routine content section:

````markdown
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
````

````

- [x] **Step 8: Verify**

Run:

```bash
npm run validate
````

Expected: PASS.

- [x] **Step 9: Commit**

```bash
git add tsconfig.json src/config/site-content.json src/config/site-content.ts src/config/site.ts src/config/site.test.ts src/config/home.ts src/config/home.test.ts src/pages/search.astro src/pages/404.astro docs/content-guide.md
git commit -m "feat: add editable site copy surface"
```

---

### Task 3: Create Taxonomy Authoring Surface

**Files:**

- Create: `src/config/taxonomy.json`
- Modify: `src/config/tags.ts`
- Modify: `src/config/tags.test.ts`
- Modify: `src/content.config.ts`
- Modify: `CONTEXT.md`
- Modify: `docs/architecture.md`
- Modify: `docs/content-guide.md`

- [x] **Step 1: Add taxonomy data**

Create `src/config/taxonomy.json`:

```json
{
  "tags": [
    { "slug": "llm-serving", "label": "LLM serving", "role": "focus" },
    { "slug": "system-design", "label": "System design", "role": "focus" },
    { "slug": "cs-fundamentals", "label": "CS fundamentals", "role": "focus" },
    { "slug": "ai-engineering", "label": "AI engineering", "role": "focus" },
    { "slug": "latency", "label": "Latency", "role": "topic" },
    { "slug": "evaluation", "label": "Evaluation", "role": "topic" },
    { "slug": "queues", "label": "Queues", "role": "topic" },
    { "slug": "indexing", "label": "Indexing", "role": "topic" },
    { "slug": "network", "label": "Network", "role": "topic" },
    { "slug": "agents", "label": "Agents", "role": "topic" },
    { "slug": "study-note", "label": "Study note", "role": "format" },
    {
      "slug": "engineering-memo",
      "label": "Engineering memo",
      "role": "format"
    },
    { "slug": "diagram", "label": "Diagram", "role": "format" },
    { "slug": "reflection", "label": "Reflection", "role": "format" },
    { "slug": "build-log", "label": "Build log", "role": "format" }
  ],
  "focusGroups": [
    {
      "label": "LLM serving",
      "slug": "llm-serving",
      "tags": ["llm-serving", "latency", "evaluation"]
    },
    {
      "label": "System design",
      "slug": "system-design",
      "tags": ["system-design", "queues", "indexing", "network"]
    },
    {
      "label": "AI engineering practice",
      "slug": "ai-engineering",
      "tags": ["ai-engineering", "agents", "build-log"]
    }
  ]
}
```

- [x] **Step 2: Replace `src/config/tags.ts` with a typed taxonomy Interface**

Use this implementation:

```ts
import taxonomy from "./taxonomy.json";

export type TagRole = "focus" | "topic" | "format";
export type TagDefinition = {
  slug: string;
  label: string;
  role: TagRole;
};
export type TagOption = TagDefinition;
export type FocusGroup = {
  label: string;
  slug: string;
  tags: string[];
};

function assertTagRole(role: string): asserts role is TagRole {
  if (!["focus", "topic", "format"].includes(role)) {
    throw new Error(`Unknown Tag role: ${role}`);
  }
}

function buildTagDefinitions() {
  const definitions: Record<string, { label: string; role: TagRole }> = {};
  for (const tag of taxonomy.tags) {
    assertTagRole(tag.role);
    if (definitions[tag.slug]) {
      throw new Error(`Duplicate Tag slug: ${tag.slug}`);
    }
    definitions[tag.slug] = { label: tag.label, role: tag.role };
  }
  return definitions;
}

export const tagDefinitions = buildTagDefinitions();
export type TagSlug = keyof typeof tagDefinitions;

export const tagSlugs = Object.keys(tagDefinitions);

export function hasKnownTag(tag: string): tag is TagSlug {
  return tag in tagDefinitions;
}

export function getTagDefinition(tag: string) {
  return hasKnownTag(tag) ? tagDefinitions[tag] : undefined;
}

export function getTagLabel(tag: string): string {
  return getTagDefinition(tag)?.label ?? tag;
}

export function getTagsByRole(role: TagRole): TagOption[] {
  return tagSlugs
    .map((slug) => ({ slug, ...tagDefinitions[slug] }))
    .filter((tag) => tag.role === role);
}

export function getFocusGroups(): FocusGroup[] {
  return taxonomy.focusGroups.map((group) => ({
    label: group.label,
    slug: group.slug,
    tags: [...group.tags],
  }));
}

export function getPrimaryFormatTag(tags: readonly string[]) {
  return tags.find((tag): tag is TagSlug => {
    const definition = getTagDefinition(tag);
    return definition?.role === "format";
  });
}
```

- [x] **Step 3: Update `src/content.config.ts` for runtime slugs**

Replace:

```ts
const tagEnum = z.enum(tagSlugs as [string, ...string[]]);
```

with:

```ts
const tagEnum = z.enum(tagSlugs as [string, ...string[]]);
```

This line stays textually the same, but verify TypeScript accepts `tagSlugs` from the new JSON-backed implementation. If TypeScript cannot infer the tuple, change the export in `tags.ts` to:

```ts
export const tagSlugs = Object.keys(tagDefinitions) as [string, ...string[]];
```

and keep `content.config.ts` unchanged.

- [x] **Step 4: Expand taxonomy tests**

Add this test to `src/config/tags.test.ts`:

```ts
it("loads Tags from the editable taxonomy authoring surface", () => {
  expect(tagSlugs).toContain("llm-serving");
  expect(getTagLabel("llm-serving")).toBe("LLM serving");
  expect(getTagsByRole("focus").map((tag) => tag.slug)).toEqual([
    "llm-serving",
    "system-design",
    "cs-fundamentals",
    "ai-engineering",
  ]);
});
```

Ensure `tagSlugs` is imported by the test.

- [x] **Step 5: Fix ownership language**

In `CONTEXT.md`, change the Site Identity Module definition so it no longer owns Tag display names:

```markdown
**Site Identity Module**: The Module that owns site name, hero copy, profile copy, navigation labels, and social links.
```

Add:

```markdown
**Taxonomy Module**: The Module that owns Tag slugs, labels, roles, focus groups, display order, and known Tag validation.
```

In `docs/architecture.md`, update Site Identity files to exclude `src/config/tags.ts` and update Taxonomy files to include both `src/config/taxonomy.json` and `src/config/tags.ts`.

- [x] **Step 6: Document Tag editing**

Add this section to `docs/content-guide.md` near the existing Tags section:

````markdown
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
````

````

- [x] **Step 7: Verify**

Run:

```bash
npm run validate
````

Expected: PASS.

- [x] **Step 8: Commit**

```bash
git add src/config/taxonomy.json src/config/tags.ts src/config/tags.test.ts src/content.config.ts CONTEXT.md docs/architecture.md docs/content-guide.md
git commit -m "feat: add editable taxonomy surface"
```

---

### Task 4: Deepen Deployment Module Path Ownership

**Files:**

- Create: `src/config/deployment.ts`
- Create: `src/config/deployment.test.ts`
- Modify: `src/config/site.ts`
- Modify: `src/components/Header.astro`
- Modify: `src/components/TagList.astro`
- Modify: `src/components/RecordList.astro`
- Modify: `src/components/BuildSummary.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/pages/search.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `docs/deployment.md`

- [x] **Step 1: Write tests for base-aware paths**

Create `src/config/deployment.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  getCanonicalUrl,
  getInternalPath,
  getPagefindAssetPath,
} from "./deployment";

describe("deployment paths", () => {
  it("keeps root-relative paths unchanged for the user-site deployment", () => {
    expect(getInternalPath("/records/")).toBe("/records/");
    expect(getPagefindAssetPath()).toBe("/pagefind/pagefind.js");
    expect(getCanonicalUrl("/records/published-new/")).toBe(
      "https://oswa1d99.github.io/records/published-new/",
    );
  });

  it("can prefix paths for project-page deployment", () => {
    const projectBase = "/portfolio";
    expect(getInternalPath("/records/", projectBase)).toBe(
      "/portfolio/records/",
    );
    expect(getPagefindAssetPath(projectBase)).toBe(
      "/portfolio/pagefind/pagefind.js",
    );
    expect(
      getCanonicalUrl("/records/published-new/", {
        site: "https://oswa1d99.github.io",
        base: projectBase,
      }),
    ).toBe("https://oswa1d99.github.io/portfolio/records/published-new/");
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test -- src/config/deployment.test.ts
```

Expected: FAIL because `src/config/deployment.ts` does not exist.

- [x] **Step 3: Implement path helpers**

Create `src/config/deployment.ts`:

```ts
import { deployment } from "../../deployment.config.mjs";

type CanonicalInput = {
  site: string;
  base?: string;
};

function normalizeBase(base = deployment.base) {
  if (!base || base === "/") return "";
  return base.startsWith("/") ? base.replace(/\/$/, "") : `/${base}`;
}

export function getInternalPath(path: string, base = deployment.base) {
  const normalizedBase = normalizeBase(base);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!normalizedBase) return normalizedPath;
  if (normalizedPath === "/") return `${normalizedBase}/`;
  return `${normalizedBase}${normalizedPath}`;
}

export function getPagefindAssetPath(base = deployment.base) {
  return getInternalPath("/pagefind/pagefind.js", base);
}

export function getCanonicalUrl(
  pathname: string,
  input: CanonicalInput = deployment,
) {
  return new URL(getInternalPath(pathname, input.base), input.site).toString();
}
```

- [x] **Step 4: Replace scattered path literals**

Use `getInternalPath` in:

```text
<a class="site-brand" href={getInternalPath("/")}>{site.name}</a>
<a class="search-link" href={getInternalPath("/search/")} aria-label="Search records">
```

Use `getInternalPath` for record, build, tag, About, Records, Home links in components and pages touched by this task.

In `src/pages/search.astro`, pass the Pagefind path into the client script:

```text
---
import { getInternalPath, getPagefindAssetPath } from "../config/deployment";
const pagefindAssetPath = getPagefindAssetPath();
---
<script define:vars={{ searchPage, emptyStates, pagefindAssetPath }}>
```

Then replace:

```ts
const pagefindPath = "/pagefind/pagefind.js";
```

with:

```ts
const pagefindPath = pagefindAssetPath;
```

In `src/layouts/BaseLayout.astro`, replace:

```text
<link rel="canonical" href={new URL(Astro.url.pathname, site.url)} />
```

with:

```text
---
import { getCanonicalUrl } from "../config/deployment";
---
<link rel="canonical" href={getCanonicalUrl(Astro.url.pathname)} />
```

- [x] **Step 5: Document the deeper Interface**

In `docs/deployment.md`, add:

```markdown
Runtime code should call `getInternalPath`, `getPagefindAssetPath`, and `getCanonicalUrl` from `src/config/deployment.ts` instead of manually concatenating `base`, `site`, or root-relative paths.
```

- [x] **Step 6: Verify**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 7: Commit**

```bash
git add src/config/deployment.ts src/config/deployment.test.ts src/config/site.ts src/components/Header.astro src/components/TagList.astro src/components/RecordList.astro src/components/BuildSummary.astro src/pages/404.astro src/pages/search.astro src/layouts/BaseLayout.astro docs/deployment.md
git commit -m "feat: centralize deployment paths"
```

---

### Task 5: Narrow Content Graph Interface And Add Projections

**Files:**

- Modify: `src/lib/content/graph.ts`
- Modify: `src/lib/content/graph.test.ts`
- Modify: `src/components/RecordList.astro`
- Modify: `src/components/BuildSummary.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/records/index.astro`
- Modify: `src/pages/build/index.astro`
- Modify: `src/pages/tags/[tag].astro`
- Modify: `src/pages/series/[slug].astro`
- Modify: `docs/architecture.md`

- [x] **Step 1: Add tests for page-ready projections**

In `src/lib/content/graph.test.ts`, add:

```ts
it("projects Records into page-ready list items", () => {
  const items = getRecordListItems(writing);

  expect(items[0]).toEqual({
    id: "published-new",
    href: "/records/published-new/",
    title: "Published New",
    description: "New public record",
    publishedAt: new Date("2026-04-29"),
    primaryLabel: "LLM serving",
    tags: ["llm-serving", "latency", "study-note"],
    formatTag: "study-note",
  });
});

it("projects Build entries into page-ready summary items", () => {
  const items = getBuildSummaryItems({ writing, projects });

  expect(items[0].build.href).toBe("/build/project-one/");
  expect(items[0].relatedRecords).toEqual([
    { href: "/records/published-new/", title: "Published New" },
  ]);
});
```

Add imports:

```ts
getBuildSummaryItems,
getRecordListItems,
```

- [x] **Step 2: Run tests to verify failure**

Run:

```bash
npm run test -- src/lib/content/graph.test.ts
```

Expected: FAIL because `getRecordListItems` and `getBuildSummaryItems` do not exist.

- [x] **Step 3: Implement page-ready projections**

In `src/lib/content/graph.ts`, add these exported types and functions:

```ts
import { getPrimaryFormatTag } from "../../config/tags";

export type RecordListItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  publishedAt: Date;
  primaryLabel?: string;
  tags: string[];
  formatTag?: string;
};

export type RelatedRecordLink = {
  href: string;
  title: string;
};

export type BuildSummaryItem = {
  build: {
    id: string;
    href: string;
    title: string;
    description: string;
    status: ProjectEntryLike["data"]["status"];
    updatedAt: Date;
    tags: string[];
    githubUrl?: string;
    demoUrl?: string;
  };
  relatedRecords: RelatedRecordLink[];
};

export function toRecordListItem(entry: WritingEntryLike): RecordListItem {
  return {
    id: entry.id,
    href: getRecordHref(entry),
    title: entry.data.title,
    description: entry.data.description,
    publishedAt: entry.data.publishedAt,
    primaryLabel: entry.data.primaryLabel,
    tags: entry.data.tags,
    formatTag: getPrimaryFormatTag(entry.data.tags),
  };
}

export function getRecordListItems(entries: WritingEntryLike[]) {
  return prepareWritingEntries(entries).map(toRecordListItem);
}

export function toBuildSummaryItem(
  build: ProjectEntryLike,
  relatedRecords: WritingEntryLike[],
): BuildSummaryItem {
  return {
    build: {
      id: build.id,
      href: getBuildHref(build),
      title: build.data.title,
      description: build.data.description,
      status: build.data.status,
      updatedAt: build.data.updatedAt,
      tags: build.data.tags,
      githubUrl: build.data.githubUrl,
      demoUrl: build.data.demoUrl,
    },
    relatedRecords: relatedRecords.map((record) => ({
      href: getRecordHref(record),
      title: record.data.title,
    })),
  };
}

export function getBuildSummaryItems(input: {
  writing: WritingEntryLike[];
  projects: ProjectEntryLike[];
}) {
  return getProjectsForBuild(input.projects).map((build) =>
    toBuildSummaryItem(build, getRelatedRecordsForBuild(input.writing, build)),
  );
}
```

- [x] **Step 4: Move consumers to projections**

Change `RecordList.astro` props from:

```ts
import type { WritingEntryLike } from "../lib/content/graph";
records: WritingEntryLike[];
```

to:

```ts
import type { RecordListItem } from "../lib/content/graph";
records: RecordListItem[];
```

Use `record.href`, `record.title`, `record.description`, `record.publishedAt`, `record.primaryLabel`, `record.tags`, and `record.formatTag`.

Change `BuildSummary.astro` props from raw entries to:

```ts
import type { BuildSummaryItem } from "../lib/content/graph";

interface Props {
  item: BuildSummaryItem;
}

const { item } = Astro.props;
const { build, relatedRecords } = item;
```

Use `build.href` and `record.href` rather than constructing hrefs in the component.

Update page calls so pages pass `RecordListItem[]` and `BuildSummaryItem`.

- [x] **Step 5: Update architecture language**

In `docs/architecture.md`, add:

```markdown
The public Content Graph Interface should prefer page-ready projections over raw collection entries. Raw helpers may remain exported only when a route needs Astro-specific behavior such as `getStaticPaths`.
```

- [x] **Step 6: Verify**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 7: Commit**

```bash
git add src/lib/content/graph.ts src/lib/content/graph.test.ts src/components/RecordList.astro src/components/BuildSummary.astro src/pages/index.astro src/pages/records/index.astro src/pages/build/index.astro src/pages/tags/[tag].astro src/pages/series/[slug].astro docs/architecture.md
git commit -m "feat: add page-ready content projections"
```

---

### Task 6: Deepen Records Discovery Module

**Files:**

- Create: `src/lib/content/records-discovery.ts`
- Create: `src/lib/content/records-discovery.test.ts`
- Modify: `src/components/RecordFilters.astro`
- Modify: `src/components/RecordList.astro`
- Modify: `src/pages/records/index.astro`
- Modify: `docs/architecture.md`

- [x] **Step 1: Write pure discovery tests**

Create `src/lib/content/records-discovery.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { RecordListItem } from "./graph";
import { filterRecordItems, sortRecordItems } from "./records-discovery";

const records: RecordListItem[] = [
  {
    id: "new",
    href: "/records/new/",
    title: "New",
    description: "New",
    publishedAt: new Date("2026-04-29"),
    tags: ["llm-serving", "latency", "study-note"],
    formatTag: "study-note",
  },
  {
    id: "old",
    href: "/records/old/",
    title: "Old",
    description: "Old",
    publishedAt: new Date("2026-04-27"),
    tags: ["system-design", "queues", "engineering-memo"],
    formatTag: "engineering-memo",
  },
];

describe("records discovery", () => {
  it("filters by focus, format, and tag", () => {
    expect(
      filterRecordItems(records, {
        focus: ["llm-serving", "evaluation"],
        format: "study-note",
        tag: "latency",
      }).map((record) => record.id),
    ).toEqual(["new"]);
  });

  it("sorts records by published date", () => {
    expect(
      sortRecordItems(records, "oldest").map((record) => record.id),
    ).toEqual(["old", "new"]);
    expect(
      sortRecordItems(records, "newest").map((record) => record.id),
    ).toEqual(["new", "old"]);
  });
});
```

- [x] **Step 2: Run tests to verify failure**

Run:

```bash
npm run test -- src/lib/content/records-discovery.test.ts
```

Expected: FAIL because `records-discovery.ts` does not exist.

- [x] **Step 3: Implement discovery behavior**

Create `src/lib/content/records-discovery.ts`:

```ts
import type { RecordListItem } from "./graph";

export type RecordSort = "newest" | "oldest";
export type RecordFilterState = {
  focus?: string[];
  format?: string;
  tag?: string;
};

export function filterRecordItems(
  records: RecordListItem[],
  filters: RecordFilterState,
) {
  const focus = filters.focus ?? [];
  const format = filters.format ?? "";
  const tag = filters.tag ?? "";

  return records.filter((record) => {
    const matchesFocus =
      focus.length === 0 || focus.some((item) => record.tags.includes(item));
    const matchesFormat = !format || record.tags.includes(format);
    const matchesTag = !tag || record.tags.includes(tag);
    return matchesFocus && matchesFormat && matchesTag;
  });
}

export function sortRecordItems(records: RecordListItem[], sort: RecordSort) {
  return [...records].sort((a, b) => {
    const aTime = a.publishedAt.getTime();
    const bTime = b.publishedAt.getTime();
    return sort === "oldest" ? aTime - bTime : bTime - aTime;
  });
}
```

- [x] **Step 4: Localize browser filtering data**

In `RecordList.astro`, emit one JSON script next to the list:

```text
<script
  type="application/json"
  data-record-discovery
  set:html={JSON.stringify(
    records.map((record) => ({
      id: record.id,
      tags: record.tags,
      formatTag: record.formatTag ?? "",
      publishedAt: record.publishedAt.toISOString(),
    })),
  )}
/>
```

Keep `data-record-card={record.id}` on each card so the browser script maps behavior by id instead of parsing visible DOM.

In `RecordFilters.astro`, replace `<time>` parsing and `data-tags` parsing with the JSON payload:

```ts
const discoveryPayload = document.querySelector("[data-record-discovery]");
const records = discoveryPayload?.textContent
  ? JSON.parse(discoveryPayload.textContent)
  : [];
const cardsById = new Map(
  [...document.querySelectorAll("[data-record-card]")].map((card) => [
    card.getAttribute("data-record-card"),
    card,
  ]),
);
```

Use `records` for filtering and sorting, then append `cardsById.get(record.id)` in sorted order.

- [x] **Step 5: Pass copy from site content**

In `RecordFilters.astro`, import `emptyStates` and render:

```text
{emptyStates.recordFilterNoMatch}
```

instead of the hard-coded filter empty message.

- [x] **Step 6: Verify**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 7: Commit**

```bash
git add src/lib/content/records-discovery.ts src/lib/content/records-discovery.test.ts src/components/RecordFilters.astro src/components/RecordList.astro src/pages/records/index.astro docs/architecture.md
git commit -m "feat: deepen records discovery"
```

---

### Task 7: Deepen Static Search Module

**Files:**

- Create: `src/lib/search/static-search.ts`
- Create: `src/lib/search/static-search.test.ts`
- Modify: `src/pages/search.astro`
- Modify: `src/layouts/ContentLayout.astro`
- Modify: `docs/architecture.md`
- Modify: `docs/content-guide.md`

- [x] **Step 1: Write Static Search tests**

Create `src/lib/search/static-search.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  getResultDescription,
  getResultTags,
  getSearchableContentUrl,
} from "./static-search";

describe("static search", () => {
  it("accepts Record and Build detail URLs from the current origin", () => {
    expect(
      getSearchableContentUrl(
        "https://oswa1d99.github.io/records/published-new/",
        "https://oswa1d99.github.io",
      ),
    ).toBe("/records/published-new/");
    expect(
      getSearchableContentUrl(
        "https://oswa1d99.github.io/build/project-one/",
        "https://oswa1d99.github.io",
      ),
    ).toBe("/build/project-one/");
  });

  it("rejects indexes, external URLs, and malformed URLs", () => {
    expect(
      getSearchableContentUrl(
        "https://oswa1d99.github.io/records/",
        "https://oswa1d99.github.io",
      ),
    ).toBeNull();
    expect(
      getSearchableContentUrl(
        "https://example.com/records/a/",
        "https://oswa1d99.github.io",
      ),
    ).toBeNull();
    expect(
      getSearchableContentUrl(":", "https://oswa1d99.github.io"),
    ).toBeNull();
  });

  it("normalizes result metadata", () => {
    expect(getResultTags({ tags: "LLM serving, Latency" })).toEqual([
      "LLM serving",
      "Latency",
    ]);
    expect(getResultTags({ tags: ["Build log", "Agents"] })).toEqual([
      "Build log",
      "Agents",
    ]);
    expect(getResultDescription({ description: "  Useful  " })).toBe("Useful");
  });
});
```

- [x] **Step 2: Run tests to verify failure**

Run:

```bash
npm run test -- src/lib/search/static-search.test.ts
```

Expected: FAIL because `static-search.ts` does not exist.

- [x] **Step 3: Implement pure search helpers**

Create `src/lib/search/static-search.ts`:

```ts
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
```

- [x] **Step 4: Move route script to use helpers where Astro allows it**

Because the search client script runs in the browser, duplicate-free sharing requires an external browser module. Create a browser-safe script file only if Astro cannot bundle imports inside the inline script. Preferred implementation:

```text
<script>
  import {
    getResultDescription,
    getResultTags,
    getSearchableContentUrl,
  } from "../lib/search/static-search";
</script>
```

If Astro rejects the import path inside the page script, move the whole search client script into `src/lib/search/static-search-client.ts` and import it from `search.astro` with:

```text
<script>
  import "../lib/search/static-search-client";
</script>
```

The client behavior must still use `emptyStates.searchNoMatch`, `searchPage.statusSearching`, and `pagefindAssetPath` from Task 2 and Task 4.

- [x] **Step 5: Keep Pagefind metadata in one rendering contract**

In `ContentLayout.astro`, keep:

```text
<span class="visually-hidden" data-pagefind-meta="description">
  {description}
</span>
<span class="visually-hidden" data-pagefind-meta="tags">
  {tagLabels}
</span>
```

Add a code comment immediately above the metadata block:

```text
<!-- Static Search reads these Pagefind metadata fields. Keep names in sync with src/lib/search/static-search.ts. -->
```

- [x] **Step 6: Update docs**

In `docs/architecture.md`, change the External Capability Modules static search paragraph to:

```markdown
Static Search is a local Records discovery Module, not a hosted Adapter seam. It owns Pagefind result normalization, searchable route eligibility, safe excerpt rendering, and search copy. Pagefind remains a build-time implementation detail under ADR 0005.
```

- [x] **Step 7: Verify**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 8: Commit**

```bash
git add src/lib/search/static-search.ts src/lib/search/static-search.test.ts src/pages/search.astro src/layouts/ContentLayout.astro docs/architecture.md docs/content-guide.md
git commit -m "feat: deepen static search"
```

---

### Task 8: Deepen Content Rendering And Mermaid Renderer Modules

**Files:**

- Create: `src/lib/rendering/content-page.ts`
- Create: `src/lib/rendering/content-page.test.ts`
- Modify: `src/pages/records/[...slug].astro`
- Modify: `src/pages/build/[...slug].astro`
- Modify: `src/layouts/ContentLayout.astro`
- Modify: `docs/architecture.md`

- [x] **Step 1: Write rendering projection tests**

Create `src/lib/rendering/content-page.test.ts`:

````ts
import { describe, expect, it } from "vitest";
import { getContentPageMeta, hasMermaidBlock } from "./content-page";

describe("content page rendering", () => {
  it("detects Mermaid blocks without route-level string checks", () => {
    expect(hasMermaidBlock("```mermaid\ngraph TD\nA-->B\n```")).toBe(true);
    expect(hasMermaidBlock("```ts\nconsole.log('x')\n```")).toBe(false);
  });

  it("projects Writing and Build metadata for ContentLayout", () => {
    expect(
      getContentPageMeta({
        title: "Record",
        description: "Record description",
        date: new Date("2026-04-29"),
        tags: ["study-note"],
        body: "Body",
      }),
    ).toEqual({
      title: "Record",
      description: "Record description",
      date: new Date("2026-04-29"),
      tags: ["study-note"],
      hasMermaid: false,
    });
  });
});
````

- [x] **Step 2: Run tests to verify failure**

Run:

```bash
npm run test -- src/lib/rendering/content-page.test.ts
```

Expected: FAIL because `content-page.ts` does not exist.

- [x] **Step 3: Implement rendering projection**

Create `src/lib/rendering/content-page.ts`:

````ts
export type ContentPageInput = {
  title: string;
  description: string;
  date?: Date;
  tags?: string[];
  body?: string;
};

export function hasMermaidBlock(body = "") {
  return /```mermaid(\s|\n)/.test(body);
}

export function getContentPageMeta(input: ContentPageInput) {
  return {
    title: input.title,
    description: input.description,
    date: input.date,
    tags: input.tags ?? [],
    hasMermaid: hasMermaidBlock(input.body),
  };
}
````

- [x] **Step 4: Remove Mermaid detection from route pages**

In `src/pages/records/[...slug].astro`, replace:

````text
const hasMermaid = record.body?.includes("```mermaid") ?? false;
````

with:

```text
import { getContentPageMeta } from "../../lib/rendering/content-page";

const contentMeta = getContentPageMeta({
  title: record.data.title,
  description: record.data.description,
  date: record.data.publishedAt,
  tags: record.data.tags,
  body: record.body,
});
```

Pass `contentMeta` fields to `ContentLayout`.

Apply the same pattern in `src/pages/build/[...slug].astro`, using `build.data.updatedAt`.

- [x] **Step 5: Keep Mermaid runtime private to ContentLayout**

In `ContentLayout.astro`, do not expose any Mermaid-specific prop other than `hasMermaid`. Keep runtime scripts inside the layout. Add this comment above the prop declaration:

```text
// The Content Rendering Module decides whether the Mermaid Renderer Module runs.
```

- [x] **Step 6: Update architecture docs**

In `docs/architecture.md`, add `src/lib/rendering/content-page.ts` to the Content Rendering Module file list and state:

```markdown
Route pages should pass content entries through `getContentPageMeta` instead of detecting Mermaid blocks or projecting layout metadata inline.
```

- [x] **Step 7: Verify**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 8: Commit**

```bash
git add src/lib/rendering/content-page.ts src/lib/rendering/content-page.test.ts src/pages/records/[...slug].astro src/pages/build/[...slug].astro src/layouts/ContentLayout.astro docs/architecture.md
git commit -m "feat: deepen content rendering"
```

---

### Task 9: Consolidate Records Listing Orchestration

**Files:**

- Create: `src/components/RecordsView.astro`
- Modify: `src/pages/records/index.astro`
- Modify: `src/pages/tags/[tag].astro`
- Modify: `src/pages/series/[slug].astro`
- Modify: `docs/architecture.md`

- [x] **Step 1: Create reusable Records view**

Create `src/components/RecordsView.astro`:

```text
---
import EmptyState from "./EmptyState.astro";
import RecordFilters from "./RecordFilters.astro";
import RecordList from "./RecordList.astro";
import type { EmptyStateCopy } from "../config/site-content";
import type { RecordListItem } from "../lib/content/graph";

interface Props {
  title: string;
  description?: string;
  records: RecordListItem[];
  emptyState: EmptyStateCopy;
  filters?: boolean;
}

const { title, description, records, emptyState, filters = false } = Astro.props;
---

<section class="records-frame">
  <h1>{title}</h1>
  {description ? <p>{description}</p> : null}
  {filters ? <RecordFilters /> : null}
  {
    records.length > 0 ? (
      <RecordList records={records} />
    ) : (
      <EmptyState
        title={emptyState.title}
        message={emptyState.message}
        href={emptyState.href}
        action={emptyState.action}
      />
    )
  }
</section>
```

- [x] **Step 2: Replace duplicated route list frames**

In `src/pages/records/index.astro`, render:

```text
<RecordsView
  title="Records"
  description="Writing, study notes, engineering memos, project logs, and reflections."
  records={records}
  emptyState={emptyStates.recordsNoPublished}
  filters
/>
```

In `src/pages/tags/[tag].astro`, render:

```text
<RecordsView
  title={tagView.label}
  records={tagView.records}
  emptyState={emptyStates.tagNoRecords}
/>
```

In `src/pages/series/[slug].astro`, render:

```text
<RecordsView
  title={series.data.title}
  description={series.data.description}
  records={seriesView.records}
  emptyState={emptyStates.seriesNoRecords}
/>
```

- [x] **Step 3: Update imports**

Remove `RecordList` and `EmptyState` imports from those route pages. Add:

```text
import RecordsView from "../../components/RecordsView.astro";
import { emptyStates } from "../../config/site-content";
```

Use `../config/site-content` only for routes at `src/pages/search.astro` and `src/pages/404.astro`; nested route pages need `../../config/site-content`.

- [x] **Step 4: Verify**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add src/components/RecordsView.astro src/pages/records/index.astro src/pages/tags/[tag].astro src/pages/series/[slug].astro docs/architecture.md
git commit -m "refactor: consolidate records views"
```

---

### Task 10: Clean Up Shallow Re-Exports And Final Documentation

**Files:**

- Modify or delete: `src/config/home.ts`
- Modify or delete: `src/config/navigation.ts`
- Modify: `src/config/home.test.ts`
- Modify: `src/components/Header.astro`
- Modify: `src/pages/index.astro`
- Modify: `docs/architecture.md`
- Modify: `docs/content-guide.md`
- Modify: `CONTEXT.md`

- [x] **Step 1: Decide whether re-exports still earn their keep**

Run:

```bash
rg -n "from \"../config/home\"|from \"../../config/home\"|from \"../config/navigation\"|from \"../../config/navigation\"|from \"./home\"|from \"./navigation\"" src
```

Expected: show current import sites. If only tests use `home.ts` or only `Header.astro` uses `navigation.ts`, delete the re-export files and import from `site-content.ts` or `site.ts` directly.

- [x] **Step 2: Remove shallow re-export files if they are pass-through**

If `src/config/home.ts` still contains only:

```ts
export { homeHero } from "./site";
```

delete it and update `src/config/home.test.ts` to import:

```ts
import { homeHero } from "./site-content";
```

If `src/config/navigation.ts` still contains only:

```ts
export { navigation } from "./site";
```

delete it and update `Header.astro` to import:

```text
import { navigation } from "../config/site-content";
```

- [x] **Step 3: Align docs with final Module ownership**

In `docs/architecture.md`, ensure these ownership statements are present:

```markdown
The Site Identity Module owns editable UI text through `src/config/site-content.json` and typed accessors through `src/config/site-content.ts`.

The Taxonomy Module owns editable Tag data through `src/config/taxonomy.json` and typed accessors through `src/config/tags.ts`.

The Deployment Module owns base-aware paths through `src/config/deployment.ts`.
```

In `CONTEXT.md`, ensure the Domain Glossary includes `Taxonomy Module` and does not assign Tag display names to Site Identity.

- [x] **Step 4: Verify no hard-coded reviewed copy remains**

Run:

```bash
rg -n "No records matched|Search is unavailable|Public proof is being organized|Records are being organized|No public build thread|Browse all Records|Search the public record" src
```

Expected: matching copy should appear only in `src/config/site-content.json` or generated string usage that references `siteContent`, `emptyStates`, or `searchPage`.

- [x] **Step 5: Final validation**

Run:

```bash
npm run validate
```

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add src docs CONTEXT.md
git add -u src/config/home.ts src/config/navigation.ts
git commit -m "chore: align authoring module docs"
```

---

## Self-Review

Spec coverage:

- Validation Module executable safety net: Task 1.
- Non-developer UI text editing: Task 2.
- Non-developer Tag editing: Task 3.
- Deployment path Locality: Task 4.
- Content Graph Interface narrowing: Task 5.
- Records Discovery Module: Task 6.
- Static Search Module and ADR 0005 empty copy: Task 7.
- Content Rendering and Mermaid Renderer Module: Task 8.
- Records listing orchestration: Task 9.
- Shallow re-export cleanup and docs alignment: Task 10.

Placeholder scan:

- The plan contains no implementation placeholders. The only branch is Task 10's deletion decision, which is intentionally based on the actual import graph after earlier tasks.

Type consistency:

- `RecordListItem`, `BuildSummaryItem`, `EmptyStateCopy`, `RecordFilterState`, `RecordSort`, `getInternalPath`, `getPagefindAssetPath`, `getCanonicalUrl`, `getSearchableContentUrl`, `getResultTags`, `getResultDescription`, `getContentPageMeta`, and `hasMermaidBlock` are defined before use in later tasks.
