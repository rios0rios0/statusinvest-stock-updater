<h1 align="center">StatusInvest Stock Updater</h1>
<p align="center">
    <a href="https://github.com/rios0rios0/statusinvest-stock-updater/releases/latest">
        <img src="https://img.shields.io/github/release/rios0rios0/statusinvest-stock-updater.svg?style=for-the-badge&logo=github" alt="Latest Release"/></a>
    <a href="https://github.com/rios0rios0/statusinvest-stock-updater/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/rios0rios0/statusinvest-stock-updater.svg?style=for-the-badge&logo=github" alt="License"/></a>
    <a href="https://github.com/rios0rios0/statusinvest-stock-updater/actions/workflows/default.yaml">
        <img src="https://img.shields.io/github/actions/workflow/status/rios0rios0/statusinvest-stock-updater/default.yaml?branch=main&style=for-the-badge&logo=github" alt="Build Status"/></a>
</p>

A Google Chrome extension that adds a new row for each stock in the "Patrimonio" table on the StatusInvest website. The extension fetches the current stock price using the Alpha Vantage API and updates the table accordingly.

## Features

- Automatically detects the "Patrimonio" table on the StatusInvest website
- Adds a new row for each stock specified in the code
- Fetches the current stock price using the Alpha Vantage API
- Built with TypeScript for type-safe Chrome extension development

## Files

- `manifest.json` - Configuration file for the Chrome extension
- `background.ts` - Background script that fetches stock prices using the Alpha Vantage API
- `content.ts` - Content script that detects the "Patrimonio" table and adds new rows
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript compiler configuration

## Installation

1. Clone the repository and install dependencies:

    ```bash
    git clone https://github.com/rios0rios0/statusinvest-stock-updater.git
    cd statusinvest-stock-updater
    npm install
    ```

2. Compile the TypeScript files:

    ```bash
    npm run build
    ```

3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** in the top right corner.
5. Click **Load unpacked** and select the `dist` directory from your project.

## Usage

1. Navigate to the StatusInvest website and log in.
2. The extension will automatically add a new row to the "Patrimonio" table with the stock price for "CGY".

### Adding More Stocks

To add more stocks, update the `stockArray` in `content.ts` with the desired stock codes:

```typescript
const stockArray: string[] = ["CGY", "ANOTHER_STOCK_CODE"];
```

### API Key

Replace `YOUR_ALPHA_VANTAGE_API_KEY` in `background.ts` with your actual Alpha Vantage API key:

```typescript
const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
