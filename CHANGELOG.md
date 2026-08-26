# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This file is not edited by hand. Every change writes its own fragment under
`.changes/unreleased/` with [chlog](https://github.com/luizjhonata/chlog), and a release compiles
the pending fragments into a version section here — so two branches each adding an entry no
longer touch the same lines, and a rebase that used to conflict on this file now conflicts on
nothing.

When a new release is proposed:

1. Create a new branch `bump/x.x.x` (this isn't a long-lived branch!!!);
2. The fragments pending under `.changes/unreleased/` are compiled into a version section by `chlog batch auto && chlog merge` (AutoBump does this for you — it reads the fragments directly);
3. Open a Pull Request with the bump version changes targeting the `main` branch;
4. When the Pull Request is merged, a new Git tag must be created using [GitHub environment](https://github.com/rios0rios0/statusinvest-stock-updater/tags).

Releases to productive environments should run from a tagged version.
Exceptions are acceptable depending on the circumstances (critical bug fixes that can be cherry-picked, etc.).

## [Unreleased]

## [0.3.0] - 2026-08-26

### Added

- added a tailored `code-review` skill under `.github/skills/` so GitHub Copilot reviews changes against the [rios0rios0/guide](https://github.com/rios0rios0/guide/wiki) standards and this repository's own load-bearing invariants

### Changed

- changed the changelog to [chlog](https://github.com/luizjhonata/chlog) fragments: a change now writes its own YAML file under `.changes/unreleased/` through `chlog new --kind <Kind> --body "..."`, and `CHANGELOG.md` is GENERATED from them at release time by `chlog batch auto && chlog merge`. That is the one thing a single shared file cannot do — two branches each adding an entry no longer touch the same lines, so a rebase that used to conflict on `CHANGELOG.md` now conflicts on nothing. The `[Unreleased]` section was empty, so nothing had to be carried across. AutoBump already reads the fragments directly, so the release flow is unchanged.

### Fixed

- fixed the `main` pipeline, which every repository's `sast:gitleaks` job had been failing since the code-review skill landed: the skill's own security bullet listed credential prefixes verbatim to warn against writing them, and the scanner's second pass matches those prefixes on their own, so the warning tripped the rule it was describing. The bullet now names the vendors instead, and the commit that carried the original wording is allowlisted by fingerprint in `.gitleaksignore`, because the scan walks the whole history reachable from `HEAD` and no edit at the tip can clear a past commit. No credential was ever committed.

## [0.2.2] - 2026-05-19

### Changed

- refreshed `.github/copilot-instructions.md` to add `.autobump.yaml`, `knip.json`, and `CLAUDE.md` to the repository structure tree

## [0.2.1] - 2026-05-08

### Changed

- added `.autobump.yaml` so future bumps update both `package.json` and `manifest.json` in lockstep
- added `knip.json` declaring `background.ts` and `content.ts` as Chrome extension entry points and ignoring `@types/chrome`/`tsc` (loaded via `manifest.json` and ambient TypeScript globals, not via imports)
- refreshed `CLAUDE.md` and `.github/copilot-instructions.md` to reference the `yarn-library.yaml` reusable workflow (was `javascript.yaml`)
- synced `manifest.json` version with `package.json` so the Chrome extension reports the same release version users install

## [0.2.0] - 2026-04-28

### Added

- added `CLAUDE.md` with build commands, conventions, and CI guidance for Claude Code sessions

### Changed

- refreshed `.github/copilot-instructions.md` to reflect Yarn Berry 4.x (was documented as Yarn 1.22+)

## [0.1.0] - 2026-03-12

### Added

- added GitHub Actions workflow for CI/CD pipeline

### Fixed

- fixed CI workflow to use the Yarn-based reusable workflow instead of the npm one

