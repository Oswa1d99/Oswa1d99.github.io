# Context

## Domain Glossary

**Jay Baek.dev**: The personal technical platform for Jay Baek. It is both a portfolio and a public record of growth as an AI Engineer.

**Project**: A public or work-in-progress engineering effort. A Project does not need to be a finished product; it should clearly show its problem, status, technical direction, and related writing.

**Project Status**: A controlled lifecycle label for a Project, such as Exploring, Building, Maintained, or Paused.

**Writing**: A technical note, essay, project log, AI/CS study note, engineering reflection, or career reflection. Writing is kept in one feed and organized through tags, series, featured status, and related projects.

**Series**: A named sequence of Writing entries around one sustained topic.

**Tag**: A controlled label used to connect Writing and Projects by topic.

**Featured Content**: A curated Project or Writing entry selected for high-visibility surfaces such as Home.

**Content Graph**: The derived set of relationships among Projects, Writing, Series, Tags, and Featured Content.

**Content Collection**: An Astro-managed set of authored entries, such as Projects, Writing, or Series.

**Content Guide**: The human and coding-agent guide that explains how to add and maintain content safely.

**Content Graph Module**: The Module that owns content retrieval, sorting, filtering, and derived relationships for the site.

**Content Rendering Module**: The Module that owns how Markdown and optional MDX content appear across Writing and Project detail pages.

**Mermaid Renderer Module**: The Module inside the Content Rendering Module that owns Mermaid diagram detection, conditional loading, source hiding, fallback, layout reservation, render lifecycle state, and future animation hooks.

**Site Identity Module**: The Module that owns site name, hero copy, profile copy, navigation labels, social links, and tag display names.

**Content Operations Module**: The Module made of documentation, schema, and future validation scripts that explains and checks how content is added and maintained.

**Deployment Module**: The Module that owns GitHub Pages deployment assumptions, including repository name, Astro `site`, Astro `base`, canonical URLs, asset paths, and deploy workflow checks.

**Validation Module**: The Module that owns local checks, browser QA, route smoke checks, deployment smoke checks, and the mapping between expected behavior and verification commands.

**Design System Module**: The Module that owns visual direction, typography, color, spacing, layout, motion, and UI rules for implementation and QA.

**Content Fixture**: Test or sample content used to verify schema, Content Graph behavior, rendering behavior, and authoring rules without depending on real portfolio content.

**Diagram Asset Automation**: Deferred command/check based automation for regenerating source-controlled diagram assets and detecting drift between `.mmd` sources and generated `.svg` files.
