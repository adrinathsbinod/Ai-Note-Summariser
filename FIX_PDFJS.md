# Fix PDF.js Import Issue

If you're getting `pdfjsLib.getDocument is not a function`, try these steps:

## Step 1: Reinstall pdfjs-dist

```bash
npm uninstall pdfjs-dist
npm install pdfjs-dist@latest
```

## Step 2: Clear Vite Cache

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Or just clear Vite cache
rm -rf node_modules/.vite
```

## Step 3: Restart Dev Server

```bash
npm run dev
```

## Step 4: Check Browser Console

If it still doesn't work, check the browser console for the error message. The code now logs what exports are available from pdfjs-dist, which will help diagnose the issue.

## Alternative: Use CDN Version

If the npm package continues to have issues, we can switch to using PDF.js from a CDN instead. Let me know if you need that option.

