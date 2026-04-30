# Validation

This is the active validation checklist for Jay Baek.dev.

## Local Checks

Before shipping, run:

`npm run validate`

`npm run validate` is the executable Validation Module Interface. It runs formatting checks, Vitest, Astro type checks, and the production build with Pagefind generation. CI must use the same command so local and deploy validation do not drift.

## Known Audit Caveat

`npm audit --omit=dev --audit-level=moderate` is expected to fail while `mermaid@11.14.0` has no non-forcing fix for its transitive UUID advisory:

```text
mermaid > uuid
```

The Mermaid runtime is loaded only on content pages that contain a Mermaid block, initializes Mermaid with `securityLevel: "strict"`, and preserves the raw source fallback if rendering fails. Accept this temporarily for v1 rather than running `npm audit fix --force`, because the force path is outside the current Astro/Mermaid compatibility plan and would risk unrelated dependency churn. Revisit when Mermaid publishes a compatible patched dependency path.

## Content Graph Tests

Add Vitest tests for the public Content Graph Interface in `src/lib/content/graph.ts`. Tests should verify observable behavior through the public Interface, not internal helper functions.

Required coverage:

- Draft Writing is excluded from production-visible results.
- Featured Records and Build entries are ordered predictably.
- Projects and Writing collections sort by the intended date fields before presentation as Build and Records.
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
- Public navigation uses `Records`, `Build`, and `About`, plus the search icon.
- Home shows 3-4 recent Records and one Build thread, not a portfolio gallery.
- Unknown linked tags fail validation; unknown direct tag URLs recover with a useful 404.
- Mobile order follows identity, latest Records, current focus, Build, then About/contact.
- Keyboard focus, active nav state, touch target size, and visited link color follow `DESIGN.md`.

## Route Smoke Checks

Verify these routes:

- `/`
- `/build/`
- `/build/[slug]/` if Build detail routes exist
- `/records/`
- `/records/[slug]/`
- `/search/`
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
