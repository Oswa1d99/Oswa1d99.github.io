# TODOs

## Diagram Asset Automation

**Priority:** P2 deferred architecture opportunity.

**Owner Module:** Mermaid Renderer Module, with Content Operations Module support for commands and checks.

**Effort:** human ~0.5 day / CC ~15-25 min once enough source-controlled diagrams exist.

**Recommended order:** Do after v1 launch and only after source-controlled `.mmd` plus `.svg` diagrams become common enough that manual regeneration is error-prone.

**What:** Add command/check based automation for source-controlled Mermaid diagram assets.

**Why:** High-value diagrams may use `.mmd` sources plus generated `.svg` assets. Once those diagrams become common, the repo needs a reliable way to prevent source/generated drift.

**Context:** v1 defaults to client-side Mermaid rendering. Source-controlled `.mmd` plus `.svg` is allowed as an escape hatch for important diagrams. Do not add a time-based watcher. Prefer explicit commands such as `npm run diagrams` to regenerate SVG assets and `npm run diagrams:check` to fail CI when generated SVG files are stale.

**Depends on / blocked by:** Wait until the site has enough source-controlled diagrams that manual regeneration becomes error-prone.

## Resolved: Font And Palette Approval

**Status:** Resolved by `DESIGN.md` on 2026-04-29. This is no longer an implementation blocker.

**Owner Module:** Site Identity Module and Content Rendering Module.

**Effort:** done.

**Recommended order:** Use `DESIGN.md` as the source of truth before making visual or UI decisions.

**What:** `DESIGN.md` now defines the active typography, palette, spacing, layout, navigation, and search rules.

**Why:** Implementation needs one stable design source of truth. Requiring another palette approval pass would conflict with the current project instruction to treat `DESIGN.md` as final for v1.

**Context:** Earlier planning docs treated font and palette as provisional. That assumption is superseded. The active direction is Minimal Editorial Letter with Pretendard, IBM Plex Mono or JetBrains Mono, warm-neutral surfaces, and `#1F4F7A` as the primary accent.

**Depends on / blocked by:** none.
