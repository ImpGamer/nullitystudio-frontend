# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vue 3 application built with Vite. Application code lives in `src/`:

- `src/pages/` contains route-level views, while `src/components/` contains reusable UI components.
- `src/layouts/` defines shared page layouts and `src/router/` defines navigation.
- `src/stores/` contains Pinia state, `src/api/` and `src/services/` handle remote data access, and `src/composables/` contains reusable composition logic.
- `src/config/`, `src/types/`, and `src/utils/` hold configuration, shared types, and helpers.
- `src/assets/` contains imported styles and assets; `public/` contains files served unchanged, including images, icons, video, and the favicon.

Use the configured aliases such as `@components`, `@pages`, `@stores`, and `@utils` instead of long relative imports.

## Build, Test, and Development Commands

Install dependencies with `pnpm install`, then use:

- `pnpm dev` starts the Vite development server with hot reload.
- `pnpm build` runs the production build.
- `pnpm preview` serves the built output locally for review.
- `pnpm lint` runs ESLint and applies available fixes.
- `pnpm format` formats files under `src/` with Prettier.
- `pnpm type-check` runs `vue-tsc` using the project TypeScript configuration.

The project currently has no automated test framework or test suite configured. When adding tests, place them near the relevant module or under a clearly named `__tests__/` directory and add a package script for the chosen runner.

## Coding Style & Naming Conventions

Follow the existing Prettier and ESLint configuration: two-space indentation, semicolon-free JavaScript/TypeScript, and single quotes. Use PascalCase for Vue components and page files, camelCase for variables, functions, composables, and stores, and descriptive kebab-case route paths. Keep Vue templates, script logic, and styles focused on one component or responsibility.

## Commit & Pull Request Guidelines

Recent commits are short, imperative descriptions such as `Start point` and `Almost local store front`. Keep commits concise and focused on one change. Pull requests should explain the user-visible behavior, identify relevant pages or data flows, mention validation commands run, and include screenshots or recordings for visual changes. Do not overwrite unrelated working-tree changes.

## Configuration & Data Access

Keep API and environment-specific values out of committed source. Review `src/api/`, `src/services/`, and the relevant stores together when changing remote data behavior, and verify loading and error states in the affected pages.
