# AivioSell Chrome Extension

## Project Overview
AivioSell is a Chrome extension that provides AI-powered tools for Shopee sellers. The extension is written in TypeScript and offers several modules to help automate tasks and improve store performance.

## Modules
- **analytics** – analyze store metrics
- **bundleGenius** – generate product bundles
- **chatAI** – assist with customer communication
- **profitCalc** – estimate profit margins
- **storeBuilder** – create listings automatically
- **videoGen** – produce promotional videos

## Setup
1. Install Node.js (version 18 or later).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the TypeScript source:
   ```bash
   npm run build
   ```
   This compiles the extension into the `dist` folder.
4. Load the extension in Chrome:
   - Open `chrome://extensions/`.
   - Enable **Developer mode**.
   - Click **Load unpacked** and select the `dist` directory.

## Configuring the OpenAI API Key
Some modules call the OpenAI API. Set the `OPENAI_API_KEY` environment variable before running the build:

```bash
export OPENAI_API_KEY=YOUR_API_KEY
```

You can also place this value in a `.env` file if your build process supports it. Keep your key private and do not commit it to version control.
