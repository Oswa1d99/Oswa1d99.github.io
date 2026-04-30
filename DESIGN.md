# Design System - Jay Baek.dev

## Product Context

- **What this is:** Jay Baek.dev is a personal technical site for an AI Engineer building practical AI systems through public records, technical writing, and one focused build thread.
- **Who it is for:** Senior engineers, AI/product engineering hiring managers, technical peers, and returning readers who want to inspect judgment through evidence.
- **Core impression:** Quiet authority first, visible proof second, honest work-in-progress third.
- **Design source of truth:** This file supersedes earlier Minimal Editorial Letter direction. Implement visual and UI decisions from this document.

## Aesthetic Direction

**Direction:** Prompted Editorial Ledger.

This direction combines:

- Editorial confidence: a restrained, paper-like first impression with a strong serif identity.
- Technical ledger structure: dates, status, rows, labels, and evidence ordering.
- Prompt signal: IBM Plex Mono and the `>` marker as a small active-state language.

The site must not become a terminal theme. The `>` marker is a signature signal, not decoration.

## Information Architecture

Public routes:

```text
/                Home
/records/        Records archive
/records/[slug]/ Record detail
/build/          Current Build thread
/build/[slug]/   Build detail, only if multiple build entries need detail pages
/about/          About
/search/         Static Records search
/tags/[tag]/     Tag-filtered Records and related Build evidence
/series/[slug]/  Series-filtered Records
```

### Header

```text
Left    Jay Baek.dev
Center  Records / Build / About
Right   Search icon
```

- Search is not part of the text navigation group.
- Search sits at the far right as an icon-only action with accessible label `Search records`.
- The active nav item may use the `>` marker.
- Header should remain calm and readable, not oversized.

### Home

Home uses **Cover + Visible Proof Shelf**.

```text
First viewport
  Jay Baek.dev

  Practical AI systems,
  edited into evidence.

  > public technical record, kept honest by status.

  Bottom of viewport
    Recent Records / Current Build headings begin to appear

Below first viewport
  Recent Records
    latest rows, compact, date-led

  Current Build
    one focused build thread, status-led
```

Rules:

- Do not use a full-height closed hero. The next proof section must be hinted within the first viewport.
- Do not show a tiny proof line such as `2 records / 1 build thread / updated ...`.
- Do not make Home a dashboard.
- Do not show full tag clouds, dense work history, or detailed note previews on Home.
- Recent Records and Current Build can appear below the hero, but not as hero content.
- The proof shelf is one column by default on all viewports: Recent Records first, Current Build second.

### Records

- Records is the intentionally dense archive surface.
- Show record rows with title, date, primary label, short description or snippet, and compact tags.
- Filtering, sorting, and tags belong here, not on Home.
- Records can use tighter row rhythm than Home.

### Build

- Build is one focused public thread, not a project gallery.
- Show status, problem, current state, what works now, unfinished work, public links, and related Records.
- The tone should be honest about work-in-progress.

### About

- About provides professional context, contact links, and confidential-safe work themes.
- Company work should be described by themes only, never internal project detail.

## Editable Home Copy Contract

Home hero copy must be editable without touching page layout files.

Recommended implementation:

```ts
// src/config/home.ts
export const homeHero = {
  brand: "Jay Baek.dev",
  editorialClaim: ["Practical AI systems,", "edited into evidence."],
  promptThesis: "public technical record, kept honest by status.",
} as const;
```

Rendering rules:

- `brand` renders as the primary Home identity.
- `editorialClaim` renders as the large editorial statement.
- `promptThesis` renders with a leading `>` marker.
- Page components render this data only. They should not own the copy.

## Typography

- **Display:** Newsreader, 650-750.
- **Body:** Source Sans 3, 400-600.
- **Mono/UI/Data:** IBM Plex Mono, 400-700.
- **Code:** IBM Plex Mono.

Scale:

- xs: 12px metadata and dense labels
- sm: 14px secondary text and nav
- base: 16px body
- md: 18px lead text
- lg: 22px section headings
- xl: 34px page headings
- 2xl: 56-72px Home editorial claim on desktop

Rules:

- Do not scale type with viewport width.
- Do not use negative letter spacing.
- Display type belongs to the Home claim and major page titles, not compact panels.
- Metadata and status use mono, but body reading remains Source Sans 3.

## Prompt Marker Treatment

Use `>` only for:

- Home prompt thesis.
- Active nav item.
- Current section marker when needed.

Do not use `>` for:

- Every record row.
- Latest record.
- Every heading.
- Decorative bullets.

Treatment:

```text
marker:
  font: IBM Plex Mono
  color: rust accent
  weight: 500-600

marked text:
  font: IBM Plex Mono
  weight: 500-600
  color: ink or muted ink

alignment:
  `>` sits in a fixed marker column
  marked text starts on the same x-axis wherever this pattern appears
  line-height matches surrounding UI rhythm
  no layout shift on hover/current state
```

Avoid:

- 700 bold
- uppercase
- background pills
- extra borders
- terminal-style blocks

Example:

```text
Jay Baek.dev          > Records     Build     About             [search]

Practical AI systems,
edited into evidence.

> public technical record, kept honest by status.
```

## Color

Approach: warm editorial paper with precise technical accents.

Implementation tokens:

```text
--color-bg: #F3EFE5
--color-paper: #FFFDF7
--color-text: #15130F
--color-text-muted: #6A6257
--color-text-faint: #91877A
--color-border: #C9BFAD
--color-border-strong: #9D927F
--color-link: #123C69
--color-link-visited: #5B467C
--color-prompt: #9A3F24
--color-focus: #0B6BFA
--color-success: #2F6B4F
--color-warning: #8A5A12
--color-error: #9B2F2F
--font-display: Newsreader
--font-body: Source Sans 3
--font-mono: IBM Plex Mono
```

Rules:

- Links must look like links before hover.
- Visited links must have a distinct color.
- Prompt/rust accent is for marker-level emphasis, not broad fills.
- Avoid purple AI gradients, glowing grids, decorative blobs, bokeh, and one-hue palettes.

## Layout And Spacing

- **Base unit:** 4px.
- **Page width:** 960px max for most pages.
- **Reading width:** 680-760px for long-form content.
- **Records width:** up to 1040px when filtering and row density need room.
- **Home hero:** desktop target around `min(620px, 72vh)`, not `100vh`.
- **Proof shelf:** starts close enough below hero that section headings are visible in the first viewport. Keep it one column by default, even on desktop.
- **Radius:** 4px controls, 6px tags, 8px maximum for cards or panels.
- **Cards:** use only when the card is the repeated evidence item or functional panel. Do not wrap whole page sections in decorative cards.

Density:

- Home: low-density, editorial, 3 main signals before proof shelf.
- Records: high-density, scannable rows.
- Build: focused status and narrative, not a gallery.
- About: calm professional context.

## Interaction States

State copy should be short, concrete, and useful. Avoid apologies and avoid generic `No items found.` language.

| Feature | Loading | Empty | Error | Success | Partial |
|---------|---------|-------|-------|---------|---------|
| Home hero | Static render, no loader. | Show brand, claim, and prompt thesis. | Build should fail for invalid config. | Shows Cover + Visible Proof Shelf. | Not applicable. |
| Home proof shelf | Static render, no loader. | Do not show empty proof panels. Use stable paths such as About or GitHub if no proof exists. | Invalid content references fail build. | Show available Recent Records and Current Build. | Show only the available proof section. Do not fill the missing side with placeholders. |
| Records archive | Static render should show content immediately. Filter transitions may use subtle 150-250ms feedback. | `No records matched these filters. Clear one filter or browse all records.` | Invalid tags or content references fail validation. | Show result count, active filters, sort, and rows. | Small result counts are shown plainly. |
| Record detail | Static generated page renders directly. | Not applicable for generated records. | Missing content routes to a useful 404 with Records link. | Show metadata, tags, body, related Build links, and series links when present. | Missing optional related content is omitted without empty panels. |
| Build | Static render should show content immediately. | `No public build thread is ready yet. Start with Records or GitHub.` | Invalid status or related Records fail build/schema checks. | Show status, problem, current state, what works now, unfinished work, and public links. | Missing public links do not hide technical status or related Records. |
| Search | Search input loads immediately. | `No records matched this search. Try a broader term.` | `Search is unavailable. Browse Records instead.` Include a Records link. | Show title, tags, and matched snippet with `mark`. | If a match lacks body snippet, show description or first useful excerpt. |
| Tags and series | Static render should show content immediately. | `No published records are in this view yet. Browse all records.` | Unknown linked tags fail validation; direct unknown routes recover gracefully. | Show matching Records with compact filter context. | Draft-only groups render empty state, not draft metadata. |

## User Journey

Design for the first 5 seconds, first 30 seconds, 5-minute evaluation, and long-term return.

| Moment | User sees | User should feel |
|--------|-----------|------------------|
| 5-second scan | Brand, editorial claim, prompt thesis. | Quiet authority. This is maintained, not inflated. |
| 30-second scan | Recent Records / Current Build beginning below the hero. | There is proof, but not a dashboard. |
| 5-minute evaluation | Records for depth, Build for applied work, About for context. | The site is honest about learning, progress, and unfinished work. |
| Long-term return | Records as archive, Build as current thread. | The site is worth revisiting when new evidence appears. |

## Motion

- **Approach:** Minimal-functional.
- **Duration:** micro 50-100ms, short 150-250ms, medium 250-400ms.
- **Easing:** ease-out for enter, ease-in for exit, ease-in-out for movement.
- Use motion only for hover, focus, disclosure, and search/filter feedback.
- No scroll choreography for v1.
- Respect `prefers-reduced-motion`.

## Responsive And Accessibility

Responsive behavior:

| Viewport | Layout |
|----------|--------|
| 320-479px | Single column. Header uses two rows: first row brand + search icon, second row Records / Build / About. Home order: brand, claim, prompt thesis, proof shelf. |
| 480-767px | Single column with slightly looser spacing. Header may keep the same two-row pattern if one row feels crowded. Proof shelf becomes one column. |
| 768-1023px | Single column page frame. Records filters can wrap into multiple rows. |
| 1024px+ | Header uses left/center/right structure. Home proof shelf remains one column by default: Recent Records first, Current Build second. |

Accessibility rules:

- Use semantic landmarks: `header`, `nav`, `main`, `footer`.
- Active nav state must be visible without relying on color alone.
- Header search must be a real link or button with accessible label `Search records`.
- Touch targets should be at least 44px tall on touch viewports unless they are inline text links.
- Keyboard focus must use `#0B6BFA` and be visible on all surfaces.
- Body text must remain at least 16px with WCAG AA contrast.
- Do not use placeholder text as the only visible label.
- Mermaid fallback source must remain readable when JavaScript is unavailable or rendering fails.
- Prompt marker alignment must not create confusing reading order for screen readers.

## Anti-Template Rules

Hard rejection patterns:

- Generic three-column feature grids.
- Icon-in-colored-circle sections.
- Centered-everything hero layouts.
- Decorative blobs, floating shapes, glowing grids, or wavy dividers.
- Purple/violet/indigo gradients or blue-to-purple schemes.
- Hero cards, split marketing cards, or dashboard previews as the first impression.
- Terminal-themed full-page styling.
- Inflated copy that claims impact instead of showing evidence.
- Repeated card/list/card section rhythm.

Litmus checks:

- Brand and direction are unmistakable in the first viewport.
- The first screen has one job: orient the reader and hint at proof.
- Records is the only dense browsing surface.
- Build reads as one focused thread, not a portfolio gallery.
- Links are visibly links before hover.
- The page would still feel credible if all shadows and decorative effects were removed.

## Implementation Notes

- Add a dedicated editable Home copy config, preferably `src/config/home.ts`.
- Keep public navigation labels in `src/config/navigation.ts`.
- Search should remain an icon action at the far right of the header.
- Pages should consume prepared content from the Content Graph Module.
- Do not duplicate filtering, sorting, tag indexing, or related-content logic in components.
- Use shared CSS variables for all tokens above before page-specific styling.

## Not In Scope

- Dark mode, unless implemented completely with redesigned surfaces.
- Full multilingual routing.
- Search overlay as the primary search experience.
- Multi-project portfolio gallery.
- Decorative animation or scroll choreography.
- A terminal-themed redesign.
- Showing content volume as a Home hero metric.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-30 | Adopt Prompted Editorial Ledger | Combines editorial authority, evidence rows, and a restrained prompt signal. |
| 2026-04-30 | Use Cover + Visible Proof Shelf on Home | Lowers first-screen fatigue while still revealing that latest Records and Current Build exist. |
| 2026-04-30 | Remove Home tiny proof line | Record counts and updated dates can make the site look small or stale when writing is not daily. |
| 2026-04-30 | Keep Search as a far-right icon action | Search is a utility action, not a peer of Records/Build/About. |
| 2026-04-30 | Make Home claim and prompt thesis editable config | Copy should change without layout edits. |
| 2026-04-30 | Use `>` only for active signal | The marker should be memorable without turning the site into a terminal. |
| 2026-04-30 | Do not mark latest record with `>` | Latest content should be clear by placement and date, not extra prompt decoration. |
| 2026-04-30 | Use a two-row mobile header | Brand and Search stay available without hiding Records/Build/About behind a menu. |
| 2026-04-30 | Keep Home proof shelf one column on desktop | Sequential evidence feels editorial; side-by-side panels risk dashboard density. |
