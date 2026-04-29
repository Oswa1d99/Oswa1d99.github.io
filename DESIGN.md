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

## Content Tone

- Prefer precise engineering language over self-promotional copy.
- Let evidence carry the claim. Do not directly say "Silicon Valley impact" as a slogan.
- It is acceptable to be early-career. The site should present learning velocity, disciplined synthesis, and focused execution as strengths.
- Company work must stay confidential-safe: themes, constraints, and general professional direction only.

## Motion

- **Approach:** Minimal-functional.
- **Duration:** micro 50-100ms, short 150-250ms, medium 250-400ms.
- **Easing:** ease-out for enter, ease-in for exit, ease-in-out for movement.
- Use motion only for hover, focus, disclosure, and search/filter feedback.
- No scroll choreography for v1.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-29 | Use `jaybaek.github.io` as the v1 deployment target | It avoids blocking launch on a custom domain purchase while preserving `jaybaek.dev` as the future preferred domain. |
| 2026-04-29 | Keep the visible site name as `Jay Baek.dev` | The brand should express the long-term identity even while the current address is GitHub Pages. |
| 2026-04-29 | Adopt Minimal Editorial Letter | The site needs calm credibility and evidence-based judgment, not a dense portfolio dashboard. |
| 2026-04-29 | Make Records the high-density surface | Home should remain calm; deep browsing belongs in the archive. |
| 2026-04-29 | Treat Current Focus groups as presentation over tags | Jay's learning areas will evolve, so the data model should stay tag-first. |
| 2026-04-29 | Use static `/search/` for v1 | Full-text discovery is useful, but a hosted backend is unnecessary for a static personal site. |
