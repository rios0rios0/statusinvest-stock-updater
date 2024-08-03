# StatusInvest Stock Updater

StatusInvest Stock Updater is a Google Chrome extension that adds a new row for each stock in the "Patrimônio" table on the StatusInvest website. The extension fetches the current stock price using a public API and updates the table accordingly.

## Features

- Automatically detects the "Patrimônio" table on the StatusInvest website.
- Adds a new row for each stock specified in the code.
- Fetches the current stock price using the Alpha Vantage API.

## Installation

1. Clone the repository or download the source code.

```sh
git clone https://github.com/yourusername/statusinvest-stock-updater.git
cd statusinvest-stock-updater
```

2. Install the necessary dependencies.

```sh
npm install
```

3. Compile the TypeScript files.

```sh
npm run build
```

4. Open Chrome and go to `chrome://extensions/`.

5. Enable "Developer mode" in the top right corner.

6. Click "Load unpacked" and select the `dist` directory from your project.

## Usage

1. Navigate to the StatusInvest website and log in.
2. The extension will automatically add a new row to the "Patrimônio" table with the stock price for "CGY".

## Files

- `manifest.json`: Configuration file for the Chrome extension.
- `background.ts`: Background script that fetches stock prices using the Alpha Vantage API.
- `content.ts`: Content script that detects the "Patrimônio" table and adds new rows.
- `package.json`: Project configuration and dependencies.
- `tsconfig.json`: TypeScript compiler configuration.

## Development

### Prerequisites

- Node.js
- npm

### Setup

1. Install Node.js and npm if you haven't already.
2. Clone the repository and navigate to the project directory.
3. Install the dependencies and compile the TypeScript files.

### Compiling TypeScript

To compile the TypeScript files, run:

```sh
npm run build
```

### Adding More Stocks

To add more stocks, update the `stockArray` in `content.ts` with the desired stock codes.

```typescript
const stockArray: string[] = ["CGY", "ANOTHER_STOCK_CODE"];
```

### API Key

Replace `YOUR_ALPHA_VANTAGE_API_KEY` in `background.ts` with your actual Alpha Vantage API key.

```typescript
const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## Acknowledgements

- [Alpha Vantage](https://www.alphavantage.co/) for providing the stock price API.
- [StatusInvest](https://statusinvest.com.br/) for the financial data platform.