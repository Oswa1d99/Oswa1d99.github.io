# GitHub Pages base path is an explicit deployment decision

Jay Baek.dev will deploy to GitHub Pages without a custom domain in v1. The Deployment Module must set Astro `site` and `base` according to the final repository name: no `base` for `<username>.github.io`, and `/<repo-name>` for a project page. This is recorded because local builds can pass while deployed navigation, assets, and canonical URLs fail from an incorrect base path.
