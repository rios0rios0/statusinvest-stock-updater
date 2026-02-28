# Contributing

Contributions are welcome. By participating, you agree to maintain a respectful and constructive environment.

For coding standards, testing patterns, architecture guidelines, commit conventions, and all
development practices, refer to the **[Development Guide](https://github.com/rios0rios0/guide/wiki)**.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Yarn](https://yarnpkg.com/) 1.22+ (used as package manager; `yarn.lock` is present)
- [Google Chrome](https://www.google.com/chrome/) (for loading and testing the extension)

## Development Workflow

1. Fork and clone the repository
2. Create a branch: `git checkout -b feat/my-change`
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Build the TypeScript source files (compiles `background.ts` and `content.ts` to `dist/`):
   ```bash
   yarn build
   ```
5. Load the extension in Chrome for testing:
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the `dist` directory
6. Test the extension by navigating to [statusinvest.com.br](https://statusinvest.com.br/) and verifying
   the "Patrimonio" table updates with stock price data
7. Commit following the [commit conventions](https://github.com/rios0rios0/guide/wiki/Life-Cycle/Git-Flow)
8. Open a pull request against `main`
