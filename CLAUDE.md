# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Chrome Extension (Manifest V3) that adds stock price rows to the "Patrimonio" table on statusinvest.com.br, fetching prices from the Alpha Vantage API.

## Build Commands

```bash
yarn install    # Install dependencies (uses Yarn Berry 4.x via packageManager field; enable corepack)
yarn build      # Compile TypeScript to dist/ via tsc
```

No automated tests exist. Validation is manual: load `dist/` as an unpacked extension in Chrome.

## Conventions

- Always use `yarn`, never `npm`. The `packageManager` field in `package.json` pins Yarn Berry 4.x.
- TypeScript strict mode is enabled; all code must compile without errors.
- Never commit a real Alpha Vantage API key — the placeholder `YOUR_ALPHA_VANTAGE_API_KEY` must remain.
- `dist/` is gitignored; never commit compiled output.
- Commit conventions follow the [Development Guide](https://github.com/rios0rios0/guide/wiki/Life-Cycle/Git-Flow).

## CI/CD

The workflow (`.github/workflows/default.yaml`) delegates to `rios0rios0/pipelines/.github/workflows/yarn-library.yaml@main`. No secrets or environment variables needed.
