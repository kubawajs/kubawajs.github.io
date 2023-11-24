# Astro Website

![Deployment workflow](https://github.com/kubawajs/kubawajs.github.io/actions/workflows/deploy.yml/badge.svg)

This is my personal website built with Astro framework.

## Blog

Blog posts were migrated from my previous blog hosted on [wordpress.com](https://wordpress.com).
Exported files in the XML format were then converted into markdown using [wordpress-export-to-markdown tool](https://github.com/lonekorean/wordpress-export-to-markdown)

## Features

- [x] Custom styling
- [x] Blog
- [x] Github Actions - [Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [x] Image optimization
- [x] Static files compression [astro-compress](https://github.com/astro-community/astro-compress#readme)
- [x] Partytown integration - [@astrojs/partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)
- [x] Google Analytics 4
- [x] Google AdSense - temporary disabled
- [x] Sitemap - [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [x] Robots.txt - [alextim/astro-lib](https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme)
- [x] Cookie banner - [Cookie Script](https://cookie-script.com/)
- [x] View Transitions - [View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [x] Prefetch - [Prefetch](https://docs.astro.build/en/guides/prefetch/)
- [ ] TODO: Social share

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## References

### Astro Starter Kit: Portfolio

```
npm create astro@latest -- --template portfolio
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/portfolio)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/portfolio)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/portfolio/devcontainer.json)

### Want to learn more?

Feel free to check [astro documentation](https://docs.astro.build) or jump into [Discord server](https://astro.build/chat).
