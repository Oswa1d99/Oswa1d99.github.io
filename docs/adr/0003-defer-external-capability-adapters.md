# Defer external capability adapters for v1

Search, comments, analytics, CMS, full multilingual routing, and hosted demos are excluded from v1 and should not get placeholder Adapter Interfaces. The project follows the rule that one adapter is a hypothetical seam and two adapters make a seam real, so these capabilities should become dedicated Modules only when an actual production adapter and local/test adapter are needed.
