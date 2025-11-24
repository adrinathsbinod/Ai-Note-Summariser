# Troubleshooting Guide

## If Nothing is Visible (Blank Page)

### Step 1: Start the Development Server

Open a terminal in the project directory and run:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Open the URL shown (usually http://localhost:5173) in your browser.**

### Step 2: Check Browser Console

1. Open your browser (Chrome, Firefox, Edge)
2. Press `F12` or `Ctrl+Shift+I` to open Developer Tools
3. Go to the **Console** tab
4. Look for any red error messages

### Step 3: Common Issues

#### Issue: "Cannot find module" or import errors
**Solution:** Reinstall dependencies
```bash
npm install
```

#### Issue: "Port already in use"
**Solution:** Kill the process using the port or use a different port
```bash
npm run dev -- --port 3000
```

#### Issue: Blank white page with no errors
**Solution:** Check if TailwindCSS is working. Try:
1. Check the browser console for CSS errors
2. Verify `node_modules` folder exists
3. Try: `npm install` again

#### Issue: "Failed to load resource" errors
**Solution:** Make sure you're accessing the correct URL from the dev server output

### Step 4: Verify Installation

Run these commands to verify everything is installed:

```bash
node -v    # Should show Node.js version
npm -v     # Should show npm version
npm list   # Should show installed packages
```

### Step 5: Test with Minimal App

If nothing works, we can test with a minimal React app. Let me know and I'll create a test version.

## Quick Test

1. **Start server:** `npm run dev`
2. **Open browser:** Go to the URL shown (usually http://localhost:5173)
3. **Check console:** Press F12, look at Console tab
4. **Report back:** What do you see? Any errors?

