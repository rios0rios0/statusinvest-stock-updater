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

<!-- chlog:start -->
## Changelog (chlog) — MANDATORY

If the repository you are working in uses chlog (a `.chlog.yaml` or `.chlog.yml`
config file, or a `.changes/` directory, exists at the project root), the
following is binding and ALWAYS applies: whenever you make ANY change, you MUST
create a changelog fragment as part of the same change — automatically, without
being asked, before committing.

- Do NOT edit CHANGELOG.md directly; it is generated from fragments.
- Create the fragment with:
  `chlog new --kind <Kind> --body "<imperative description>"`
- Valid kinds: Added, Changed, Deprecated, Removed, Fixed, Security
- Choose the kind that best matches the change (e.g., new feature → Added,
  bug fix → Fixed, behavior change → Changed, removal → Removed, security fix → Security).
- If the change is backward-INCOMPATIBLE with the public API (a breaking
  change), you MUST add the `--breaking` flag:
  `chlog new --kind <Kind> --breaking --body "<description>"`.
  This is the ONLY thing that triggers a major version bump — the kind alone
  never does (per SemVer, major = incompatible change). When unsure whether a
  change breaks compatibility, ask the user instead of guessing.
- Fragments are YAML files in `.changes/unreleased/`; stage them with your commit.
- `chlog check` fails the build when a fragment is missing — never skip it.
<!-- chlog:end -->
