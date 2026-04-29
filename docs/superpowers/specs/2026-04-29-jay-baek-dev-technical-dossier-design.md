# Jay Baek.dev Technical Dossier Direction

Date: 2026-04-29

## Purpose

Jay Baek.dev should make a technical visitor conclude within 30 seconds:

> This engineer can create impact in Silicon Valley.

The site should not say that directly as a slogan. It should make the visitor reach that conclusion through evidence: clear problem framing, visible execution, technical writing, and honest project history.

## Target

Primary target: Silicon Valley AI/product engineering hiring managers who need to know whether Jay can reason through ambiguous systems work.

Secondary target: Korean unicorn and big-tech AI/ML leads who need to see practical engineering judgment, communication skill, and growth speed.

Tertiary target: technical peers and open-source readers who might return for useful notes, project logs, or implementation details.

Design priority follows the primary target. If the site is credible to an engineering leader, it will also be readable to recruiters. The reverse is not true.

## Positioning

Jay Baek.dev is not a portfolio gallery and not a generic blog. It is a Learning-forward Engineering Dossier:

- Current Focus groups show what Jay is deliberately building competence in right now.
- Writing shows how Jay thinks.
- One active open-source Build Thread shows applied execution.
- Work Themes show professional direction without exposing confidential company details.
- Status labels keep unfinished work honest.

This means the site should look like a maintained technical dossier: selected evidence, strong editorial hierarchy, precise metadata, and readable long-form pages. It should not pretend that Jay has a large portfolio of shipped side projects. At this career stage, the stronger signal is learning velocity, careful synthesis, and one focused build thread.

Current Focus groups are not permanent categories. They are a presentation layer over controlled tags. Writing entries keep specific tags such as `llm`, `serving`, `latency`, `database`, `network`, or `evaluation`; Home and Records can group those tags into a small set of current focus areas such as `LLM serving`, `System design`, or `CS fundamentals`. These groups can change as Jay's writing changes.

## First-Viewport Contract

The first viewport must answer:

1. Who is this? Jay Baek, AI Engineer.
2. What is his operating thesis? He is building toward practical AI systems through disciplined study, writing, and focused open-source work.
3. What proves it? Recent Records, current focus areas, and one current Build Thread.
4. How do I go deeper? Clear navigation to Projects, Writing, and About.

The H1 should be the brand name, `Jay Baek.dev`. The supporting copy should carry the claim.

Recommended thesis copy:

```text
실전 문제를 AI 시스템으로 바꾸고, 그 과정을 기록으로 증명합니다.

Building toward practical AI systems through study notes, engineering memos, and one focused open-source build thread.
```

## Information Architecture

Top-level navigation:

- Home
- Notes
- Open Source
- About

Header should include a persistent search icon at the far right. Do not add `Search` as another text navigation item next to About. The icon should be visually quiet but clearly clickable: a 32-36px icon button with a subtle inset or raised treatment, visible focus state, and accessible label such as `Search records`.

Home should not be a generic hero plus card grid. It should be a calm learning dossier index:

- Identity and current role.
- Operating thesis.
- Current Proof: latest Records, current focus areas, current Build Thread.
- Focus areas.
- Links to GitHub, LinkedIn, email.
- A short pointer to About for confidential-safe Work Themes.

Home should not include a full Work Themes section or a full note detail preview. Those belong on About and detail pages. Home should feel calm, not like every proof surface is competing for the first visit.

Notes should read like engineering memos:

- Track.
- Question.
- Current understanding.
- References.
- Related notes.
- Next learning step.

Current Focus groups should make the growth path visible without hard-coding permanent categories:

- LLM serving and architecture.
- Computer science fundamentals.
- System design.
- AI engineering practice.

Records should remain tag-first. Focus groups are shortcuts and editorial cues, not the data model. If a focus group changes, Records must still be discoverable through their individual tags.

Search should be available from the persistent header icon. v1 should use a dedicated `/search/` page rather than an overlay. The search page should support full-text search across Writing titles, tags, descriptions, and body content. Home should not include a search input.

Open Source should read like a build thread:

- What is being built.
- Why it matters.
- What currently works.
- What is being learned.
- Public links.

## UX Requirements

- A 10-second visitor should see identity, role, thesis, and current proof without scrolling.
- A 2-minute visitor should be able to open one recent Record and one current focus filter from Home.
- A 10-minute visitor should be able to follow a trail from a focus group to a Record to the open-source Build Thread.
- Mobile order should be identity, latest Records, current focus, Build Thread, then About link.
- Empty states should preserve trust by naming the state plainly and pointing to one useful next action.
- Links must look like links. Buttons are only for commands.
- Cards are only for repeated evidence items, not section wrappers.
- Company work should be described only as confidential-safe Work Themes, never as detailed internal projects.
- Work Themes should live on About, not Home.
- Note detail design should be validated separately from Home.
- Header search should be accessible from every page through the search icon.
- Search results should show title, tags, and a trimmed body snippet around the matched term.
- Empty search results should use: `No records matched this search. Try a broader term.`

## Visual Direction

Name: Technical Dossier.

The visual system should feel quiet, exact, and maintained. Personality comes from editing, not decoration.

Use:

- Strong typography and information hierarchy.
- Thin rules, metadata rails, and compact status labels.
- A restrained neutral palette.
- One precise accent for links and focus.
- Small radius, 8px maximum.
- Monospace only for metadata, code, and technical labels.
- Tag-first Records navigation, with a small number of curated focus filters.
- A restrained brand scale. `Jay Baek.dev` should be recognizable but not dominate the entire viewport.
- A quiet search icon button in the header, with subtle inset or raised treatment rather than another text nav item.

Avoid:

- AI-purple gradients.
- Glowing grids.
- Generic dashboard mockups.
- Decorative blobs or abstract tech art.
- Centered everything.
- Three-column feature marketing sections.
- Copy that claims impact instead of proving it.
- Inflated project claims that make early-career work look overpackaged.

## Design Tokens Direction

Typography:

- Body: Pretendard or SUIT for Korean/English mixed readability.
- Display: same family, stronger weight. Do not use decorative display type.
- Mono: JetBrains Mono or IBM Plex Mono for metadata and code.

Color:

- Background: near-white neutral, not beige-heavy.
- Text: near-black.
- Muted text: accessible gray.
- Accent: precise cobalt, ink-blue, or blue-green. No purple.
- Borders: quiet neutral.
- Status colors: muted semantic colors with text labels.

Motion:

- Minimal-functional only.
- Hover and focus transitions should aid comprehension.
- No scroll choreography for v1.

## Success Criteria

- The site feels engineered, not generated.
- Records and Writing appear as proof, not filler.
- Focus groups can evolve without breaking tag-based navigation.
- The open-source Build Thread feels focused without pretending to be a large portfolio.
- Work Themes communicate professional direction without leaking company detail.
- A technical hiring manager can identify Jay's judgment, execution, and learning speed from the first two pages they open.
- Routine updates remain content-file driven.
- Home feels calm enough to read slowly, not like a dashboard of every possible proof point.
- Search helps readers find Records by title, body text, and tags without turning Home into a search page.
