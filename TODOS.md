# TODOs

## Diagram Asset Automation

**What:** Add command/check based automation for source-controlled Mermaid diagram assets.

**Why:** High-value diagrams may use `.mmd` sources plus generated `.svg` assets. Once those diagrams become common, the repo needs a reliable way to prevent source/generated drift.

**Context:** v1 defaults to client-side Mermaid rendering. Source-controlled `.mmd` plus `.svg` is allowed as an escape hatch for important diagrams. Do not add a time-based watcher. Prefer explicit commands such as `npm run diagrams` to regenerate SVG assets and `npm run diagrams:check` to fail CI when generated SVG files are stale.

**Depends on / blocked by:** Wait until the site has enough source-controlled diagrams that manual regeneration becomes error-prone.
