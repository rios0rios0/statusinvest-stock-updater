# StatusInvest Stock Updater Repository

This repository contains a **Google Chrome extension** (Manifest V3) that enhances the [StatusInvest](https://statusinvest.com.br/) investment website by automatically adding stock rows to the "Patrimônio" table. Each new row displays a stock code and its current price fetched from the [Alpha Vantage API](https://www.alphavantage.co/).

**ALWAYS** reference these instructions first and fall back to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build the Repository

- Install required system dependencies: **Node.js 18+** and **Yarn 4+** (Berry). The `packageManager` field in `package.json` pins the exact version; enable [Corepack](https://nodejs.org/api/corepack.html) (`corepack enable`) to use it automatically.
- Install project dependencies:
  ```bash
  yarn install
  ```
  Takes < 5 seconds (only two `devDependencies`).
- Compile TypeScript source files to `dist/`:
  ```bash
  yarn build
  ```
  Runs `tsc` — takes < 5 seconds. Outputs `dist/background.js` and `dist/content.js`.
- There are **no automated tests** in this repository. Validation is manual (see [Development Workflow](#development-workflow)).

### Loading the Extension in Chrome (Manual Testing)

1. Open `chrome://extensions/` in Google Chrome.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the `dist/` directory.
4. Navigate to [statusinvest.com.br](https://statusinvest.com.br/) and verify that the "Patrimônio" table is updated with stock price rows.

## Repository Structure

```
statusinvest-stock-updater/
├── .github/
│   ├── copilot-instructions.md   # This file
│   └── workflows/
│       └── default.yaml          # CI/CD pipeline (delegates to rios0rios0/pipelines)
├── background.ts                 # Background service worker: fetches stock prices via Alpha Vantage
├── content.ts                    # Content script: detects the table and inserts rows
├── manifest.json                 # Chrome Extension Manifest V3 configuration
├── package.json                  # Project metadata and build script
├── tsconfig.json                 # TypeScript compiler options
├── yarn.lock                     # Locked dependency versions
├── LICENSE                       # MIT license
├── .gitignore                    # Ignores dist/, node_modules/, and Yarn Berry state files
├── CHANGELOG.md                  # Release history
├── CONTRIBUTING.md               # Contribution guidelines
└── README.md                     # Project overview and installation instructions
```

**Key source files:**

| File | Purpose |
|------|---------|
| `background.ts` | Service worker registered in `manifest.json`; exposes `getStockPrice` via `chrome.runtime.onMessage` |
| `content.ts` | Injected into `*://statusinvest.com.br/*`; queries `#patrimonio-table`, iterates `stockArray`, and calls the background worker |
| `manifest.json` | Declares permissions (`activeTab`, `scripting`), content script host matching, and service worker entry point |

## Technology Stack

- **Language**: TypeScript (compiled to ES6 / CommonJS via `tsc`)
- **Platform**: Chrome Extension — Manifest Version 3
- **External API**: [Alpha Vantage](https://www.alphavantage.co/) — `GLOBAL_QUOTE` endpoint (requires a free API key)
- **Package manager**: Yarn Berry 4.x (`packageManager` field in `package.json`; `yarn.lock` present; **always use `yarn`, never `npm`**)
- **Dev dependencies**: `typescript ^4.0.0`, `@types/chrome ^0.0.269`

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/default.yaml`) delegates to the shared reusable pipeline:

```yaml
uses: 'rios0rios0/pipelines/.github/workflows/yarn-library.yaml@main'
```

It triggers on:
- Pushes to `main`
- Tag pushes
- Pull requests targeting `main`
- Manual dispatch (`workflow_dispatch`)

No additional secrets or environment variables are required for CI.

## Development Workflow

1. Fork and clone the repository.
2. Create a feature branch: `git checkout -b feat/my-change`
3. Install dependencies: `yarn install`
4. Edit `background.ts` or `content.ts` as needed.
5. Build: `yarn build`
6. Load the unpacked extension from `dist/` in Chrome (see [Loading the Extension](#loading-the-extension-in-chrome-manual-testing)).
7. Test manually on [statusinvest.com.br](https://statusinvest.com.br/).
8. Commit following the [commit conventions](https://github.com/rios0rios0/guide/wiki/Life-Cycle/Git-Flow).
9. Open a pull request against `main`.

## Coding Conventions

- **TypeScript strict mode** is enabled (`"strict": true` in `tsconfig.json`); all code must compile without errors.
- **Target**: ES6; **module**: CommonJS.
- Output goes to `dist/` — this directory is gitignored and should never be committed.
- The `stockArray` in `content.ts` is the primary configuration point for which stocks are tracked.
- The API key in `background.ts` is a placeholder (`YOUR_ALPHA_VANTAGE_API_KEY`) and must be replaced by users; **never commit a real API key**.
- Use `async`/`await` for all API calls; the background script must `return true` from `onMessage` listeners to support async `sendResponse`.

## Common Tasks

### Adding a New Stock

Edit `content.ts` and append the stock code to `stockArray`:

```typescript
const stockArray: string[] = ["CGY", "NEW_STOCK_CODE"];
```

Then rebuild: `yarn build`.

### Replacing the Alpha Vantage API Key

Edit `background.ts` and replace the placeholder:

```typescript
const apiKey = 'YOUR_ACTUAL_KEY_HERE';
```

Then rebuild: `yarn build`.

### Updating TypeScript or Chrome Types

```bash
yarn add --dev typescript@<version>
yarn add --dev @types/chrome@<version>
```

Then verify the build still passes: `yarn build`.

## Security Considerations

- **Never commit a real Alpha Vantage API key** — the placeholder `YOUR_ALPHA_VANTAGE_API_KEY` must remain in source control.
- The extension requests only `activeTab` and `scripting` permissions (minimal surface).
- Content scripts run only on `*://statusinvest.com.br/*` (scoped host matching).
- The `dist/` directory is gitignored; never force-add compiled files to the repository.
