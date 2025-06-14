# AivioSell Chrome Extension

AI-powered tools for Shopee sellers.

Before running any of the scripts below, install dependencies with:

```bash
npm install
```

## Development Scripts

- `npm run lint` - Run ESLint on all TypeScript and JavaScript files.
- `npm test` - Execute Jest tests.

## Building

Run `npx tsc` to compile the TypeScript sources. The compiled JavaScript files, including `popup/App.js`, will be linked from `src/popup/index.html`.
