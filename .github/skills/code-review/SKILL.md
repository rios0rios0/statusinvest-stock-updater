---
name: code-review
description: "Review pull requests and diffs in statusinvest-stock-updater — the Manifest V3 Chrome extension that adds stock prices to StatusInvest — against the rios0rios0/guide standards, with extra weight on extension permissions, API-key handling, DOM injection safety, and manifest/package version sync. Use when reviewing a PR, a branch, or staged changes here."
---

# Code review — `statusinvest-stock-updater`

This Chrome Manifest V3 extension injects stock rows into StatusInvest's "Patrimônio" table, with a background service worker fetching current prices from the Alpha Vantage API. It runs inside a third-party page with a real API key, so permissions and injection are the review's focus.

## When to use this skill

Use it whenever you are asked to review a pull request, a diff, a branch, or staged changes
in this repository — and before opening a pull request of your own, as a self-check. It is a
**review** skill: it produces findings, not commits.

## Source of truth

The canonical engineering standards live in the
**[rios0rios0/guide wiki](https://github.com/rios0rios0/guide/wiki)**. This file is a
repo-tailored index into that guide plus the rules that only apply here. Precedence, highest
first:

1. This repository's `.github/copilot-instructions.md`, `CLAUDE.md`, and `CONTRIBUTING.md` —
   they describe *this* codebase and its load-bearing invariants.
2. The **rios0rios0/guide** wiki — the shared standard.
3. General language idiom.

When the guide and a general convention disagree, the guide wins. When this file and the
guide disagree, the guide wins and this file should be corrected in the same pull request.

### Guide pages that apply here

| Topic | Page |
|-------|------|
| JavaScript & TypeScript Conventions — file names, no `any`, immutability | [JavaScript](https://github.com/rios0rios0/guide/wiki/JavaScript) |
| JavaScript & TypeScript Testing — Jest and BDD blocks | [JavaScript-Testing](https://github.com/rios0rios0/guide/wiki/JavaScript-Testing) |
| YAML Conventions — `.yaml`, single quotes, unquoted scalars | [YAML](https://github.com/rios0rios0/guide/wiki/YAML) |
| Tests — BDD structure, description patterns, test doubles | [Tests](https://github.com/rios0rios0/guide/wiki/Tests) |
| Mapper Design Pattern — replacing `switch`/`case` | [Mapper-Design-Pattern](https://github.com/rios0rios0/guide/wiki/Mapper-Design-Pattern) |
| Git Flow — branches, commits, SemVer, breaking changes | [Git-Flow](https://github.com/rios0rios0/guide/wiki/Git-Flow) |
| Documentation & Change Control — changelog and docs discipline | [Documentation-&-Change-Control](https://github.com/rios0rios0/guide/wiki/Documentation-&-Change-Control) |
| CHANGELOG Formatting — capitalisation and backticks | [CHANGELOG-Formatting](https://github.com/rios0rios0/guide/wiki/CHANGELOG-Formatting) |
| Security — OWASP checklist, secret hygiene, SAST | [Security](https://github.com/rios0rios0/guide/wiki/Security) |
| CI & CD — pipeline stages and the local quality gates | [CI-&-CD](https://github.com/rios0rios0/guide/wiki/CI-&-CD) |
| Code Style — baseline naming and the operations vocabulary | [Code-Style](https://github.com/rios0rios0/guide/wiki/Code-Style) |

## How to run the review

1. **Establish the range.** Resolve the default branch with
   `git symbolic-ref refs/remotes/origin/HEAD` (strip `refs/remotes/origin/`; fall back to `main`),
   then read the diff with `git diff <default>...HEAD` and the file list with
   `git diff <default>...HEAD --name-only`.
2. **Read whole files, not just hunks.** A hunk cannot show a layering violation, a missing
   test, or a duplicated helper. Open every changed file in full, plus the files it imports
   from the layer below.
3. **Check the change set as a unit** — not only the code. A change that alters behaviour,
   configuration, or architecture is incomplete without its changelog entry and its
   documentation update, and that omission is a finding in its own right.
4. **Map every finding to a rule.** Each finding must name the rule it breaks and link the
   guide page (or the repository file) that states it. A comment that cannot be traced to a
   rule is a suggestion, not a defect — label it as such.
5. **Report, do not rewrite.** Produce the review in the output format below. Only edit files
   when the request explicitly asks for fixes.

## What matters most in `statusinvest-stock-updater`

These are the checks that catch real defects in this repository. Work through
them before the generic ones.

- **Permissions stay minimal.** `manifest.json` declares `activeTab` and `scripting`, and the content script matches `*://statusinvest.com.br/*`. Widening the host match or adding a permission is a **Critical** finding unless the pull request justifies it — a broader match means the extension reads pages it has no business reading.
- **The Alpha Vantage key must not be committed.** A key hard-coded in `background.ts` ships to every user; it belongs in extension storage or a build-time variable, and it must never be logged or exposed to the page context.
- **Only the background worker talks to the network.** The content script asks via `chrome.runtime.onMessage`; a `fetch` added to `content.ts` runs in the page's origin and leaks the key to the site.
- **Injected DOM is built safely.** Values reaching `#patrimonio-table` must go through `textContent` or explicit node creation — an `innerHTML` assignment built from a fetched string is an XSS vector inside a financial site.
- **The page structure is not ours.** `#patrimonio-table` and the row shape belong to StatusInvest and change without notice. New selectors need a guard so a missing element degrades quietly instead of throwing on every page load.
- **API responses are rate-limited and can be error objects.** Alpha Vantage returns a `Note` or an `Error Message` instead of data when throttled — code that assumes the happy shape renders `undefined` into the table.
- **`.autobump.yaml` keeps `package.json` and `manifest.json` versions in sync.** A commit that bumps one by hand desynchronises the release.
- `knip.json` guards entry points and unused dependencies; a new ignore entry needs a reason.

### Commands a reviewer should be able to quote

```bash
yarn install
yarn build             # output loaded unpacked from dist/
```

## JavaScript / TypeScript conventions

See [JavaScript & TypeScript Conventions](https://github.com/rios0rios0/guide/wiki/JavaScript) and
[Testing](https://github.com/rios0rios0/guide/wiki/JavaScript-Testing).

- File names are `snake_case`; `id` and `data-test-subj` attribute values are `camelCase`.
- **Never `any`** — use `unknown` and narrow. An `any` added to silence the compiler is a
  finding, and so is a blanket `@ts-ignore` without a justification comment.
- Favour immutability (`const`, spread, `map`/`filter`/`reduce`) over in-place mutation, and
  use object and array destructuring rather than repeated member access.
- Prefer modern syntax: arrow functions, template strings, optional chaining, nullish
  coalescing.
- Tests are BDD-structured with `// given` / `// when` / `// then`, and they exercise
  business rules and user flows rather than framework internals.

### Dispatch tables over `switch`

See [Mapper Design Pattern](https://github.com/rios0rios0/guide/wiki/Mapper-Design-Pattern). Two or three stable cases may stay a
`switch`. Four or more, or a set that grows with features, becomes a map from key to handler
so that adding a case is a new entry rather than an edit to the dispatcher. Flag new
`switch`/`if-else` chains that dispatch on a string or enum key.

### YAML

See [YAML Conventions](https://github.com/rios0rios0/guide/wiki/YAML). The extension is `.yaml`, never `.yml`. String values are
single-quoted; double quotes appear only where interpolation or an escape needs them;
booleans and numbers are never quoted. This applies to workflows, compose files, manifests,
and YAML blocks inside Markdown.

## Tests

There is no automated test suite; verification is manual — load the unpacked extension from `dist/` and check the table on a real StatusInvest page. A pull request that changes parsing or price formatting should extract that logic into a pure function and test it, following [JavaScript & TypeScript Testing](https://github.com/rios0rios0/guide/wiki/JavaScript-Testing).

## Documentation and change control

See [Documentation & Change Control](https://github.com/rios0rios0/guide/wiki/Documentation-&-Change-Control) and
[CHANGELOG Formatting](https://github.com/rios0rios0/guide/wiki/CHANGELOG-Formatting).

This repository uses **chlog fragments**. `CHANGELOG.md` is generated and is never edited by
hand.

- Every change ships a fragment created with `chlog new --kind <Kind> --body "…"`, staged in
  the **same commit** as the code. Kinds: `Added`, `Changed`, `Deprecated`, `Removed`,
  `Fixed`, `Security`.
- A backward-incompatible change to the public interface additionally carries `--breaking`.
  The kind alone never triggers a major bump.
- A hand-edited `CHANGELOG.md`, or a code change with no fragment under
  `.changes/unreleased/`, is a **Critical** finding — `chlog check` fails the build for it.
- Fragment bodies start with a lowercase verb in simple past tense, capitalise proper nouns
  (GitHub, Go, Docker), and wrap code identifiers and versions in backticks.
- `README.md` is updated whenever usage, setup, configuration, or architecture changes;
  `.github/copilot-instructions.md` and `CLAUDE.md` whenever the workflow, commands, or
  structure changes. Documentation and code ship in one commit.

## Git Flow and pull-request hygiene

See [Git Flow](https://github.com/rios0rios0/guide/wiki/Git-Flow) and [Merge Guide](https://github.com/rios0rios0/guide/wiki/Merge-Guide).

- Branch names are `feat/`, `fix/`, `refactor/`, `chore/`, `test/`, or `docs/` followed by a
  ticket ID or a short slug — `feat/TICKET-000`, `fix/input-mask`.
- Commit subjects are `type(SCOPE): message`: simple past tense (`added`, `fixed`, `changed`,
  `removed`), lowercase first word, no trailing period, code identifiers in backticks.
- Branches are synchronised with `git rebase`, never `git merge`. A merge commit from the
  default branch inside a feature branch is a finding.
- Breaking changes are flagged in **three** places: the commit footer
  (`**BREAKING CHANGE:** …`), the changelog, and the pull-request description. One or two of
  the three is not enough.
- Versions follow [SemVer](https://semver.org/): MAJOR for incompatible changes, MINOR for
  features, PATCH for fixes.

## Security

See [Security](https://github.com/rios0rios0/guide/wiki/Security).

- **No hard-coded secrets.** API keys, tokens, passwords, and private keys belong in
  environment variables or a secret manager — never in source, tests, fixtures, or the
  changelog. A secret that reaches a commit must be rotated, not merely deleted.
- **Never write a PEM header sentinel or a realistic key shape into a fixture**
  (`ghp_…`, `sk-…`, `AKIA…`, `xoxb-…`, JWT-shaped strings, or the dashed `BEGIN …` banners).
  Gitleaks matches the shape, not the value, so a placeholder that merely *looks* like a
  credential fails the pipeline. Use inert placeholders such as `fixture-token-placeholder`.
- **Suppressions must be justified.** Entries in `.gitleaksignore`, `.trivyignore`,
  `.semgrepignore`, or `.codeql-false-positives` need a fingerprint, a dated comment, and a
  reason. A suppression added to silence a real finding is a Critical.
- Validate and sanitise every external input; use parameterised queries; apply least
  privilege; keep secrets out of logs.
- Dependency manifest changes are reviewed for new transitive vulnerabilities. When a fix
  exists, bump the version rather than suppressing the finding.

## What not to flag

A review that raises noise gets ignored. Do not report these:

- The two-file layout — the extension is deliberately small.
- Yarn Berry state files (`.pnp.cjs`, `.yarn/`) in the tree.
- Anything the guide does not require and this file does not list, unless it is a genuine correctness or security defect — say so plainly and label it a Suggestion.

## Review output format

```
## Code review: <branch or PR>

### Critical (must fix before merge)
- `path/to/file.ext:LINE` — <what is wrong> — violates <rule> (<guide page or repo file>)

### Warning (should fix)
- `path/to/file.ext:LINE` — <what is wrong> — violates <rule>

### Suggestion (optional)
- `path/to/file.ext:LINE` — <improvement>

### Change-control checklist
- [ ] Changelog entry present for every behavioural change
- [ ] `README.md` updated if usage, setup, or architecture changed
- [ ] `.github/copilot-instructions.md` and `CLAUDE.md` updated if the workflow, commands, or structure changed
- [ ] Commit messages follow `type(SCOPE): message` in simple past tense
- [ ] Breaking changes flagged in the commit footer, the changelog, and the PR description

### Verdict: APPROVE / REQUEST CHANGES
<one paragraph: the blocking findings, or why the change is ready>
```

## Severity

| Severity       | Use for                                                                                                                            |
|----------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Critical**   | Broken dependency direction, a leaked secret, an injection or authentication flaw, a missing changelog entry, a banned mock library, a load-bearing invariant broken, a test deleted rather than fixed. |
| **Warning**    | Naming that departs from the guide, a missing test for a new branch of logic, an unexplained magic value, a stale README or instructions file, a `switch` that should be a map. |
| **Suggestion** | Readability, consistency with neighbouring modules, and performance ideas that no rule mandates.                                     |

Rank findings most severe first, and state plainly when nothing blocks the merge — an empty
Critical section is a valid, useful review.
