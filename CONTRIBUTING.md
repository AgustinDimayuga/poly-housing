# Contributing

Thanks for helping build Poly Housing. This doc covers the tooling we use
and the conventions to follow so the codebase stays consistent as more
people join.

## Prerequisites

- Node.js (see `package.json` for the React/Next versions we target)
- [pnpm](https://pnpm.io/) — this repo uses pnpm workspaces
  (`pnpm-workspace.yaml`) and commits a `pnpm-lock.yaml`. Please don't use
  npm or yarn to install dependencies, since that will generate a
  conflicting lockfile.

## Getting set up

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

This is a [Next.js](https://nextjs.org) app using the App Router. Routes,
layouts, and pages live under [app/](app/). Static assets live under
[public/](public/).

> **Note:** This project pins a newer major version of Next.js than what
> most tutorials and AI assistants were trained on. Some APIs and
> conventions have changed. Check the docs in
> `node_modules/next/dist/docs/` before assuming an older Next.js pattern
> still applies.

## Code style

We use [Prettier](https://prettier.io) and [ESLint](https://eslint.org)
to keep formatting and code quality consistent. Please run both before
opening a PR.

```bash
pnpm format   # formats *.js,jsx,ts,tsx,css,md,json with Prettier
pnpm lint     # runs ESLint (eslint-config-next: core-web-vitals + typescript)
```

Notes on our Prettier config (`.prettierrc`):

- Double quotes, semicolons, no trailing commas
- 64-character print width, with prose (Markdown) wrapped at that width too
- Multi-line JSX tags keep their closing bracket on the same line as the
  last attribute (`bracketSameLine`)

ESLint config lives in `eslint.config.mjs` and extends
`eslint-config-next`'s `core-web-vitals` and `typescript` rule sets. Please
don't add a second `eslint.config.js`/`.cjs` alongside it — ESLint's flat
config only loads one config file, and an extra one will silently shadow
`eslint.config.mjs` (and break `pnpm lint` if it references packages that
aren't installed here).

TypeScript runs in `strict` mode (`tsconfig.json`). Use the `@/*` path
alias for imports from the repo root instead of relative `../../` chains.

## Before opening a PR

1. `pnpm format`
2. `pnpm lint`
3. `pnpm build` — make sure the production build succeeds
4. Manually verify the change in the browser at
   [http://localhost:3000](http://localhost:3000)

## Commit and PR conventions

- Keep commits focused; avoid bundling unrelated changes.
- Write commit messages and PR descriptions that explain *why*, not just
  *what* changed.
- Open a PR against `main` and request a review before merging.

## Questions

If something in this doc is unclear or out of date, open a PR to fix it —
this file should evolve with the project.
