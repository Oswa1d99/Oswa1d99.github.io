# Use static search for Records discovery

Jay Baek.dev will provide search through a static search index in v1. The search icon appears in the persistent header and opens `/search/`. Search results show the matching Writing title, tags, and a trimmed body snippet around the matched term.

This does not introduce a hosted search Adapter. Pagefind or an equivalent build-time static search tool may index the generated site after Astro builds, producing static assets that work on GitHub Pages without backend infrastructure.

External search services such as Algolia, Meilisearch, or Typesense remain excluded from v1 under ADR 0003. If hosted search is introduced later, it should be recorded as a dedicated Module with a real production Adapter and local/test Adapter.

The empty search result message is authored in `src/config/site-content.json`
under `emptyStates.searchNoMatch`.
