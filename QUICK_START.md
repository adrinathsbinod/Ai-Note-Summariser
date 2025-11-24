# Quick Start: GitHub + Vercel Deployment

## 🚀 Quick Steps

### 1. Create .env file (if not exists)
Your `.env` file should already exist with your API key. If not:
```bash
# Copy the example
cp .env.example .env

# Edit .env and add your API key
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files (except .env - it's in .gitignore)
git add .

# Commit
git commit -m "Initial commit: AI Note & PDF Summarizer"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-note-summarizer.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. **IMPORTANT:** Add Environment Variable:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your API key (same as in .env)
   - Select: Production, Preview, Development
5. Click **Deploy**

Done! Your app will be live at `https://your-app.vercel.app`

## ✅ Verify Security

After pushing, check GitHub:
- ✅ `.env` file should NOT be visible
- ✅ `src/services/gemini.js` uses `import.meta.env.VITE_GEMINI_API_KEY`
- ✅ No hardcoded API keys in code

## 📝 For Detailed Instructions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

