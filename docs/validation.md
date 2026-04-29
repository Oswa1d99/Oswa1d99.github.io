# Validation

This is the active validation checklist for Jay Baek.dev.

## Local Checks

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

## Content Graph Tests

Add Vitest tests for the public Content Graph Interface in `src/lib/content/graph.ts`. Tests should verify observable behavior through the public Interface, not internal helper functions.

Required coverage:

- Draft Writing is excluded from production-visible results.
- Featured Projects and Writing are ordered predictably.
- Projects and Writing sort by the intended date fields.
- Tag index output is stable and rejects or reports unknown Tags.
- Series pages receive entries in the intended order.
- Related Project/Writing composition works through Astro collection references.
- Empty collections return stable empty states instead of throwing.

## Rendering QA

Required browser QA:

- Include one explicit Mermaid sample or fixture page during implementation.
- Verify that the Mermaid diagram renders in a browser.
- Verify that the page remains readable if Mermaid JavaScript fails or is unavailable.
- Verify that Mermaid JavaScript is not loaded on pages without Mermaid diagrams.
- Verify that JS-enabled pages do not visibly flash raw Mermaid syntax before rendering.
- Verify that code blocks, images, and long mixed Korean/English text remain readable.

## Design QA

Use `DESIGN.md` as the source of truth for visual QA.

Required checks:

- Home keeps low information density and does not expose the full tag system.
- Records is the only intentionally dense browsing surface.
- Header search appears as a quiet icon button at the far right, not as a text nav item.
- Search results show title, tags, and a trimmed body snippet when a match exists.
- Empty search results use the exact copy from `DESIGN.md`.
- Company work appears only as confidential-safe themes, not detailed project claims.

## Route Smoke Checks

Verify these routes:

- `/`
- `/projects/`
- `/projects/[slug]/`
- `/writing/`
- `/writing/[slug]/`
- `/tags/[tag]/`
- `/series/[slug]/`

## Key Interactions

- Header navigation works from Home and nested detail routes.
- Related Project and Writing links resolve without 404s.
- Tag links from Writing/Project cards open the correct Tag route.
- Series links from Writing detail open the correct Series route.
- GitHub and external links open the intended external targets.

## Edge Cases

- Invalid Project Status fails schema validation.
- Broken Project/Writing/Series references fail schema validation.
- Draft Writing is excluded from public lists and related content.
- Empty Projects, Writing, Tags, and Series states render without throwing.
- Unknown or disallowed Tags are rejected or clearly reported.
- Mermaid JavaScript failure leaves readable source fallback.
- JS-enabled Mermaid rendering hides raw syntax before first paint and reserves diagram space.
- GitHub Pages `site` and `base` settings do not break CSS, images, canonical URLs, or nested links.

## Deployment Smoke Checks

Use `docs/deployment.md` as the source of truth for the active domain and base path. After deploy, run the deployed smoke checklist in that document.
