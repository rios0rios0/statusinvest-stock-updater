# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, Cursor, GitHub Copilot) when working with code in this repository.

## Project

Chrome Extension (Manifest V3) that adds stock price rows to the "Patrimonio" table on statusinvest.com.br, fetching prices from the Alpha Vantage API.

## Build Commands

```bash
yarn install    # Install dependencies (uses Yarn Berry 4.x via packageManager field; enable corepack)
yarn build      # Compile TypeScript to dist/ via tsc
```

No automated tests exist; a clean `yarn build` is the baseline check. `yarn build` emits only `dist/background.js` and `dist/content.js` — `manifest.json` stays at the root, and the `popup.html` and `images/icon*.png` it references are not in the repository — so `dist/` cannot be loaded unpacked in Chrome as-is.

## Conventions

- Always use `yarn`, never `npm`. The `packageManager` field in `package.json` pins Yarn Berry 4.x.
- TypeScript strict mode is enabled; all code must compile without errors.
- Never commit a real Alpha Vantage API key — the placeholder `YOUR_ALPHA_VANTAGE_API_KEY` must remain.
- `dist/` is gitignored; never commit compiled output.
- `.autobump.yaml` keeps the `manifest.json` version in sync with `package.json`; never bump either by hand.
- Commit conventions follow the [Development Guide](https://github.com/rios0rios0/guide/wiki/Git-Flow).

<!-- chlog:start -->
## Changelog (chlog) — MANDATORY

If the repository you are working in uses chlog (a `.chlog.yaml` or `.chlog.yml`
config file, or a `.changes/` directory, exists at the project root), the
following is binding and ALWAYS applies: whenever you make ANY change, you MUST
create a changelog fragment as part of the same change — automatically, without
being asked, before committing.

- Do NOT edit CHANGELOG.md directly; it is generated from fragments.
- Create the fragment with:
  `chlog new --kind <Kind> --body '<past-tense description>'`
- Write an apostrophe inside the single-quoted body as `'\''`.
- Valid kinds: Added, Changed, Deprecated, Removed, Fixed, Security
- Choose the kind that best matches the change (e.g., new feature → Added,
  bug fix → Fixed, behavior change → Changed, removal → Removed, security fix → Security).
- If the change is backward-INCOMPATIBLE with the public API (a breaking
  change), you MUST add the `--breaking` flag:
  `chlog new --kind <Kind> --breaking --body '<past-tense description>'`.
  This is the ONLY thing that triggers a major version bump — the kind alone
  never does (per SemVer, major = incompatible change). When unsure whether a
  change breaks compatibility, ask the user instead of guessing.
- Fragments are YAML files in `.changes/unreleased/`; stage them with your commit.
- `chlog check` fails the build when a fragment is missing — never skip it.
<!-- chlog:end -->
