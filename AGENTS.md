## Project Context

A TypeScript project using Vue. Contains 61 files across 18 directories. Uses monorepo, feature-based architecture.

## Stack

**Languages:**
- TypeScript (49%)
- Vue (29%)
- JavaScript (14%)
- YAML (4%)
- HTML (2%)

**Frameworks & Tools:**
- Vite (build)
- Vue (web)

## Commands

```bash
pnpm dev  # dev
pnpm build  # build
pnpm preview  # preview
pnpm lint  # lint
pnpm format  # format
```

## Conventions

- **Naming**: PascalCase
- **File organization**: feature-based
- **Monorepo**: Yes
- **Config files**: tsconfig.json, jsconfig.json, eslint.config.js, .prettierrc.json

## Architecture

**Entry points:** src/main.js, index.html

**Key directories:**
- `public/` - Static public assets
- `src/` - Source code

## Boundaries

**Always:**
- Run existing tests before committing changes
- Run `pnpm lint` before committing
- Follow PascalCase naming convention
- Follow feature-based file organization

**Ask first:**
- Adding new dependencies
- Changing project configuration files
- Adding new packages/workspaces

**Never:**
- Commit secrets, API keys, or .env files
- Delete or overwrite test files without understanding them
- Force push to main/master branch
- Make cross-package changes without checking downstream effects

<!-- agentseed:meta {"sha":"1a6d4600bf48c8da6e9d2383a5627c71097c5ba6","timestamp":"2026-11-02T03:45:27.414Z","format":"agentseed-v1"} -->
