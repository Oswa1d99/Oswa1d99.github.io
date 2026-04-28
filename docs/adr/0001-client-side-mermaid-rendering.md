# Client-side Mermaid rendering for v1

Jay Baek.dev will render inline Mermaid diagrams client-side in v1, but only on pages that contain Mermaid diagrams. We chose this over build-time rendering because it keeps GitHub Actions and local builds simpler while still allowing Markdown authors to write diagrams inline. The Mermaid Renderer Module owns detection, conditional loading, raw-syntax hiding before render, readable fallback, reserved layout, and future animation hooks so this choice can be revisited without editing pages.
