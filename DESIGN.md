# Design System - Jay Baek.dev

## Product Context

- **What this is:** Jay Baek.dev is a learning-forward engineering site for Jay Baek, an AI Engineer building practical AI systems through disciplined study, technical writing, and one focused open-source build thread.
- **Who it's for:** Primary readers are Silicon Valley AI/product engineering hiring managers and senior engineers evaluating judgment, learning velocity, and practical systems thinking. Secondary readers are Korean AI/ML leads, technical peers, and open-source readers.
- **Space/industry:** Personal technical site, engineering dossier, technical writing archive, and lightweight portfolio.
- **Project type:** Static editorial site deployed first at `jaybaek.github.io`, with `jaybaek.dev` reserved as the preferred future custom domain.

## Aesthetic Direction

- **Direction:** Minimal Editorial Letter.
- **Decoration level:** Minimal and intentional.
- **Mood:** Calm, precise, and maintained. The site should feel like a serious engineer's public notebook, not a startup landing page, dashboard, or inflated project gallery.
- **Core impression:** A first-time technical visitor should infer that Jay can create impact in Silicon Valley through evidence: clear writing, honest scope, focused learning, and visible execution.
- **Reference stance:** Closer to restrained personal engineering sites and editorial technical archives than portfolio templates or content-heavy dashboards.

## Information Architecture

- **Home:** Low-density first impression. Show identity, current role, operating thesis, a small set of recent Records, and one active Build thread. Do not show full tag clouds, dense work history, or detailed note previews.
- **Records:** The only intentionally high-density surface. Records combine writing, study notes, engineering memos, project logs, and reflections. Filtering, sorting, and tags belong here.
- **Build:** A focused open-source build thread, not a gallery of inflated projects. Show what is being built, why it matters, current status, what works now, and related Records.
- **About:** Professional context, contact links, and confidential-safe work themes. Company work should be described by themes only, never internal project detail.
- **Search:** A dedicated `/search/` page reached from the persistent header search icon. Home should not contain a search input.

### Route Map

Public routes should use the public IA labels, even if internal content collections keep the `writing` and `projects` names:

```text
/                Home
/records/        Records archive
/records/[slug]/ Record detail
/build/          Build thread
/build/[slug]/   Build detail, only if multiple build entries require detail pages
/about/          About
/search/         Static Records search
/tags/[tag]/     Tag-filtered Records and related Build evidence
/series/[slug]/  Series-filtered Records
```

### Screen Hierarchy

```text
Persistent header
  Jay Baek.dev
  Records
  Build
  About
  Search icon

Home
  1. Identity: Jay Baek.dev, AI Engineer
  2. Thesis: practical AI systems through study, memos, and one build thread
  3. Proof: 3-4 recent Records, one current Build thread
  4. Depth paths: Records archive, Build thread, About

Records
  1. Page title and compact archive framing
  2. Filter controls: focus group, format, tag, sort
  3. Result count and active filter summary
  4. Record rows

Build
  1. What is being built
  2. Why it matters
  3. What works now and what is unfinished
  4. Related Records and public links

About
  1. Professional context
  2. Confidential-safe work themes
  3. Contact and external profiles

Search
  1. Search input
  2. Result count
  3. Results with title, tags, and matched snippet
```

## Navigation

- Header text navigation should stay short: `Records`, `Build`, `About`.
- `Jay Baek.dev` appears as the brand at left, but should not dominate the viewport.
- Search is a quiet icon button at the far right, not another text nav item.
- The search button should be 32-36px, have a visible focus state, use accessible label `Search records`, and use a subtle inset, underline, or raised treatment.

## Typography

- **Display/Hero:** Pretendard, 600-700 weight. Use the same family as body to keep the identity calm and not over-branded.
- **Body:** Pretendard. It handles Korean and English mixed writing cleanly and keeps long-form reading comfortable.
- **UI/Labels:** Pretendard, 500-600 weight, with compact sizes.
- **Data/Tables:** IBM Plex Mono or JetBrains Mono. Use only where tabular rhythm matters: dates, tags, status labels, code-like metadata.
- **Code:** IBM Plex Mono or JetBrains Mono.
- **Loading:** Prefer self-hosted fonts when implementation begins. Google Fonts or CDN loading is acceptable only if the static deployment path remains simple.
- **Scale:**
  - xs: 12px metadata and dense labels
  - sm: 14px secondary text and nav
  - base: 16px body
  - md: 18px lead text
  - lg: 22px section headings
  - xl: 30px page headings
  - 2xl: 40px home identity on desktop

Do not scale type with viewport width. Use responsive layout changes instead.

## Color

- **Approach:** Restrained warm-neutral base with one precise blue accent.
- **Primary accent:** `#1F4F7A` for links, active filters, and high-signal emphasis.
- **Visited link:** `#5B467C`.
- **Focus:** `#0B6BFA`, used for visible keyboard focus rings.
- **Neutrals:**
  - Page background: `#FFFDF8`
  - Surface: `#FFFFFF`
  - Soft surface: `#F7F3EA`
  - Text: `#1A1714`
  - Muted text: `#716A61`
  - Faint text: `#9A9187`
  - Border: `#E3DED3`
  - Strong border: `#B9B0A3`
- **Semantic:**
  - Success: `#2F6B4F`
  - Warning: `#8A5A12`
  - Error: `#9B2F2F`
  - Info: `#1F4F7A`
- **Dark mode:** Defer for v1 unless implemented completely. If added, redesign surfaces rather than simply inverting colors, and reduce saturation by 10-20%.

Avoid AI-purple gradients, glowing grids, decorative blobs, bokeh, heavy beige, and one-hue palettes.

## Anti-Template Rules

Jay Baek.dev is an editorial technical site, not a SaaS landing page and not an app dashboard. Apply landing-page discipline to the first viewport only in the sense that the brand and thesis must be immediately clear; do not use conversion-page patterns.

Hard rejection patterns:

- Generic three-column feature grids.
- Icon-in-colored-circle sections.
- Centered-everything hero layouts.
- Decorative blobs, floating shapes, glowing grids, or wavy dividers.
- Purple/violet/indigo gradients or blue-to-purple schemes.
- Hero cards, split marketing cards, or dashboard previews as the first impression.
- Inflated copy that claims impact instead of showing evidence.
- Repeated section rhythm where every section has the same card/list/card structure.

Litmus checks:

- Brand and role are unmistakable in the first viewport.
- The first screen has one job: orient the reader and point to proof.
- Records is the only dense surface.
- Build reads as one focused thread, not a portfolio gallery.
- Links are visibly links before hover.
- The page would still feel credible if all shadows and decorative effects were removed.

## Spacing

- **Base unit:** 4px.
- **Density:** Comfortable on Home and About; denser only on Records.
- **Scale:** 2xs 2px, xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px, 3xl 64px.
- Home sections should breathe. Records can use tighter rows, compact metadata, and denser filter controls.

## Layout

- **Approach:** Single-column editorial with disciplined metadata, not a dashboard grid.
- **Max page width:** 900px for page frames.
- **Reading width:** 680-760px for long-form body text.
- **Records width:** Up to 960px when filters and result metadata need more room.
- **Grid:** Mostly one column. Use two columns only when one side is clearly supporting metadata or filters.
- **Border radius:** 4px for small controls, 6px for tags, 8px maximum for cards and panels.
- **Cards:** Use only for repeated evidence items or functional panels. Do not put UI cards inside other cards. Do not wrap whole page sections in decorative cards.
- **Links:** Links must look like links. Buttons are only for commands.

## Implementation Tokens

Implementation should define shared CSS variables before page-specific styling:

```text
--color-bg: #FFFDF8
--color-surface: #FFFFFF
--color-surface-soft: #F7F3EA
--color-text: #1A1714
--color-text-muted: #716A61
--color-text-faint: #9A9187
--color-border: #E3DED3
--color-border-strong: #B9B0A3
--color-link: #1F4F7A
--color-link-visited: #5B467C
--color-focus: #0B6BFA
--color-success: #2F6B4F
--color-warning: #8A5A12
--color-error: #9B2F2F
--font-body: Pretendard
--font-display: Pretendard
--font-mono: IBM Plex Mono or JetBrains Mono
--space-2xs: 2px
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
--radius-control: 4px
--radius-tag: 6px
--radius-card: 8px
```

Component vocabulary:

- **Header:** brand link, text nav, search icon button.
- **Record row/card:** title link, date, primary label, description/snippet, compact tags.
- **Build summary:** status label, problem, current state, what works now, related Records.
- **Tag/filter control:** link or segmented control depending on whether it navigates or changes the current view.
- **Content layout:** metadata header, constrained article body, related content footer.
- **Empty state:** short state name, one useful next action, no apology.

Do not introduce decorative component types that are not in this vocabulary unless `DESIGN.md` is updated first.

## Home Rules

- First viewport should answer: who Jay is, what he is building toward, and where the proof begins.
- Use restrained brand scale. `Jay Baek.dev` should be visible and memorable, not oversized.
- Show only a few recent Records. Each Home record should show at most one primary label or focus label.
- Do not show every tag on Home.
- Do not show a full Work Themes section on Home.
- Do not show detailed note teaching content on Home.
- The strongest Home signal is calm editorial judgment, not volume of information.

## Records Rules

- Records are the main archive for writing and learning history.
- Records should support tag filtering, focus group filtering, format filtering, and sorting.
- Sorting should at least support newest-first and oldest-first. Future sort options should be added only when they clearly help browsing.
- Record rows/cards should show title, date, primary label, short description or snippet, and tags.
- Tags are controlled but allowed to grow with the archive.
- Current Focus groups are a presentation layer over tags, not permanent categories. Changing a focus group must not make old Records undiscoverable.

## Search Rules

- v1 search should be static search, preferably Pagefind or an equivalent build-time static index.
- No hosted search backend is needed for v1.
- The header search icon navigates to `/search/`.
- A future overlay can enhance the icon, but `/search/` must remain the stable fallback.
- Search should match published Records by title, tags, description, and body text.
- Search must exclude drafts and repeated navigation/footer text.
- Results should show title, tags, and a trimmed body snippet around the matched term.
- Highlight matched terms in snippets with `mark`.
- If there is no body snippet, fall back to the Record description.
- Empty state copy must be exactly: `No records matched this search. Try a broader term.`

## Interaction States

State copy should be short, concrete, and useful. Avoid apologies and avoid generic `No items found.` language.

| Feature | Loading | Empty | Error | Success | Partial |
|---------|---------|-------|-------|---------|---------|
| Home proof areas | Use stable reserved space only if content is resolved client-side. Prefer static content with no visible loader. | Show identity and thesis, then link to Records or About. Do not create filler cards. | Build should fail for invalid content. Runtime Home should not show broken proof modules. | Show 3-4 recent Records and one Build thread. | If either Records or Build is missing, show the available side without visual imbalance or apology. |
| Records archive | Static render should show content immediately. Filter transitions may use a subtle 150-250ms feedback state. | `No records matched these filters. Clear one filter or browse all records.` | Invalid tags or content references should fail build/schema checks. | Show result count, active filters, sort, and Record rows. | If a focus group has few entries, keep the filter visible and show the small result count plainly. |
| Record detail | Static generated page should render directly. | Not applicable for generated records. | Missing content should route to a useful 404 with a link back to Records. Mermaid render failure leaves readable source. | Show metadata, tags, body content, related Build/Project links, and series links when present. | Missing optional related content is omitted without empty panels. |
| Build | Static render should show content immediately. | `No public build thread is ready yet. Start with Records or GitHub.` | Invalid status or broken related Records should fail build/schema checks. | Show what is being built, why it matters, what works now, what is unfinished, and public links. | If public links are missing, keep the technical status and related Records visible. |
| Search | Search input loads immediately. If Pagefind initializes client-side, reserve result space and keep the input usable. | `No records matched this search. Try a broader term.` | `Search is unavailable. Browse Records instead.` Include a Records link. | Show title, tags, and matched snippet with `mark`. | If a match lacks a body snippet, show the Record description or first useful excerpt. |
| Tags and series | Static render should show content immediately. | `No published records are in this view yet. Browse all records.` | Unknown tags should resolve to a useful empty/404 state or fail validation if linked from content. | Show matching Records with a compact explanation of the filter. | Draft-only groups render the empty state, not leaked draft metadata. |

## Content Tone

- Prefer precise engineering language over self-promotional copy.
- Let evidence carry the claim. Do not directly say "Silicon Valley impact" as a slogan.
- It is acceptable to be early-career. The site should present learning velocity, disciplined synthesis, and focused execution as strengths.
- Company work must stay confidential-safe: themes, constraints, and general professional direction only.

## User Journey

Design for three time horizons: the 5-second scan, the 5-minute evaluation, and the long-term return visit.

| Step | User does | User should feel | Plan specifies |
|------|-----------|------------------|----------------|
| 1 | Lands on Home | `This is maintained and serious.` | Restrained brand scale, calm thesis, no inflated project claims. |
| 2 | Scans first viewport | `I know who this is and what proof starts here.` | Identity, AI Engineer role, recent Records, one Build thread. |
| 3 | Opens Records | `There is a real learning trail, not filler.` | Dense archive only on Records, controlled tags, focus filters, sorting. |
| 4 | Opens a Record | `He can explain technical thinking clearly.` | Reading width, metadata discipline, related Build/Project links, code and Mermaid support. |
| 5 | Opens Build | `He is applying the learning to one concrete public thread.` | Problem, why it matters, current status, what works now, unfinished work. |
| 6 | Opens About | `The professional context is credible and confidential-safe.` | Work themes only, contact links, no internal project detail. |
| 7 | Returns later | `The archive is worth revisiting.` | New Records surface by date and tags; Build stays honest about status. |

Mobile emotional order: identity first, latest Records second, current focus third, Build fourth, About/contact last. A mobile visitor should never need to pass through dense filters before seeing proof.

## Motion

- **Approach:** Minimal-functional.
- **Duration:** micro 50-100ms, short 150-250ms, medium 250-400ms.
- **Easing:** ease-out for enter, ease-in for exit, ease-in-out for movement.
- Use motion only for hover, focus, disclosure, and search/filter feedback.
- No scroll choreography for v1.

## Responsive And Accessibility

Responsive behavior:

| Viewport | Layout |
|----------|--------|
| 320-479px | Single column. Header may wrap to two lines, but brand, nav, and search must remain visible. Home order: identity, recent Records, focus, Build, About/contact. |
| 480-767px | Single column with slightly looser spacing. Records filters can wrap into multiple rows. |
| 768-1023px | Single column page frame with optional supporting metadata rail only when it does not crowd the reading column. |
| 1024px+ | Max page width 900px; Records may expand up to 960px for filter/result density. Use two columns only for supporting metadata or filters. |

Accessibility rules:

- Use semantic landmarks: `header`, `nav`, `main`, `footer`.
- The active nav item must be visible without relying on color alone.
- Header search must be a real link or button with accessible label `Search records`.
- Interactive targets should be at least 44px tall on touch viewports unless the target is an inline text link.
- Keyboard focus must use `#0B6BFA` and be visible on all surfaces.
- Body text must remain at least 16px with WCAG AA contrast against its background.
- Do not use placeholder text as the only visible label for search inputs.
- Respect `prefers-reduced-motion`; disable non-essential transitions when requested.
- Mermaid fallback source must remain readable when JavaScript is unavailable or rendering fails.
- Visited links must use `#5B467C` so returning readers can see what they already opened.

## Resolved V1 Design Decisions

| Decision | V1 choice | If deferred |
|----------|-----------|-------------|
| Public archive label | Use `Records`, not `Writing` or `Notes`. | Navigation and page copy drift across documents and implementation. |
| Public build label | Use `Build`, not `Projects` or `Open Source`. | The site starts to look like a portfolio gallery instead of one focused build thread. |
| Build detail routes | Do not require Build detail routes for v1 unless the content model has multiple build entries that need separate pages. | Engineers may build route surface area before there is content to justify it. |
| Unknown tag URLs | Generate pages for known tags. Unknown direct tag URLs should show a useful 404 with a link back to Records. Linked unknown tags should fail validation. | Readers may land on confusing empty pages and authors may miss tag typos. |
| Search fallback | `/search/` is the stable fallback. A future overlay may enhance it, but never replace the route. | Header search becomes fragile if JavaScript or an overlay fails. |
| Home density | Show only 3-4 recent Records and one Build thread. | Home becomes a dashboard and weakens the first impression. |
| Company work | About may describe work themes only. | The site risks exposing confidential or over-specific work claims. |

## Not In Scope For V1 Design

- Dark mode, unless implemented completely with redesigned surfaces.
- Full multilingual routing.
- Search overlay as the primary search experience.
- Multi-project portfolio gallery.
- Decorative animation or scroll choreography.
- Final visual mockups from gstack designer, because the designer is not available in this environment.

## What Already Exists

- `DESIGN.md` is the active visual and UI source of truth.
- `docs/architecture.md` owns internal module boundaries and keeps `Writing` and `Projects` as content model names.
- `docs/content-guide.md` owns authoring rules for `src/content/writing/**`, `src/content/projects/**`, and `src/content/series/**`.
- `docs/validation.md` owns the implementation checks and visual QA checklist.
- No live UI components exist yet, so implementation should create the first components directly from this document rather than copying stale page patterns.

## Design Review Report

`/plan-design-review` ran on 2026-04-29 after aligning other docs to `DESIGN.md`.

```text
+====================================================================+
|         DESIGN PLAN REVIEW - COMPLETION SUMMARY                    |
+====================================================================+
| System Audit         | DESIGN.md exists, UI scope confirmed        |
| Step 0               | initial rating 7/10, full 7-pass review     |
| Pass 1  (Info Arch)  | 7/10 -> 9/10 after route/hierarchy fixes    |
| Pass 2  (States)     | 5/10 -> 9/10 after state table              |
| Pass 3  (Journey)    | 6/10 -> 9/10 after user journey storyboard  |
| Pass 4  (AI Slop)    | 8/10 -> 10/10 after hard rejection rules    |
| Pass 5  (Design Sys) | 8/10 -> 10/10 after tokens/components       |
| Pass 6  (A11y/Resp.) | 5/10 -> 9/10 after viewport/a11y rules      |
| Pass 7  (Decisions)  | 7 resolved, 0 deferred                     |
+--------------------------------------------------------------------+
| NOT in scope         | written                                    |
| What already exists  | written                                    |
| TODOS.md updates     | none needed                                |
| Approved Mockups     | none, designer unavailable                 |
| Decisions made       | 7 added to plan                            |
| Decisions deferred   | 0                                          |
| Overall design score | 7/10 -> 10/10                              |
+====================================================================+
```

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-29 | Use `jaybaek.github.io` as the v1 deployment target | It avoids blocking launch on a custom domain purchase while preserving `jaybaek.dev` as the future preferred domain. |
| 2026-04-29 | Keep the visible site name as `Jay Baek.dev` | The brand should express the long-term identity even while the current address is GitHub Pages. |
| 2026-04-29 | Adopt Minimal Editorial Letter | The site needs calm credibility and evidence-based judgment, not a dense portfolio dashboard. |
| 2026-04-29 | Make Records the high-density surface | Home should remain calm; deep browsing belongs in the archive. |
| 2026-04-29 | Treat Current Focus groups as presentation over tags | Jay's learning areas will evolve, so the data model should stay tag-first. |
| 2026-04-29 | Use static `/search/` for v1 | Full-text discovery is useful, but a hosted backend is unnecessary for a static personal site. |
| 2026-04-29 | Use `/records/` and `/build/` as public route labels | These labels match the v1 information architecture in this design system. |
| 2026-04-29 | Keep Build detail routes optional for v1 | One focused Build thread should not force unused route surface area. |
| 2026-04-29 | Unknown tag URLs use a useful 404 while linked unknown tags fail validation | Direct navigation should recover gracefully; authored content should catch typos early. |
