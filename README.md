# AivioSell Chrome Extension

AI-powered tools for Shopee sellers.

## API Key Setup

This extension expects your OpenAI API key to be stored in Chrome's local
storage. You can do this from the extension options or the console:

```javascript
chrome.storage.local.set({ apiKey: 'sk-...' });
```

The key will be retrieved at runtime via `chrome.storage.local.get('apiKey')`
and used for API requests. Keep your key private and avoid committing it to
source control.
