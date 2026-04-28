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

## Font And Palette Approval

**Priority:** P1 design decision before visual implementation.

**Owner Module:** Site Identity Module and Content Rendering Module.

**Effort:** human ~0.5 day / CC ~20-30 min after gstack designer setup.

**Recommended order:** Run before implementing final CSS tokens and typography.

**What:** Use `design-shotgun` to compare at least three font and palette directions for Jay Baek.dev.

**Why:** The plan currently has a provisional typography and palette direction, but final visual approval needs mockups. Without this, the site may ship with a generic or untested visual system.

**Context:** Explore Editorial engineering workbench, Technical notebook, and Premium builder portfolio directions. The approved direction should be recorded in the plan or `DESIGN.md`.

**Depends on / blocked by:** gstack designer setup, currently blocked by missing OpenAI API key for `/Users/jaybaek/gstack/design/dist/design`.
