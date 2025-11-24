# Deployment Guide

This guide will help you deploy the AI Note & PDF Summarizer to GitHub and Vercel while keeping your API key secure.

## 🔐 Security First: Environment Variables

**IMPORTANT:** Never commit your API key to GitHub! We use environment variables to keep it secure.

## 📦 Step 1: Push to GitHub

### 1.1 Initialize Git Repository (if not already done)

```bash
cd D:\Project\first
git init
```

### 1.2 Add All Files (except .env which is ignored)

```bash
git add .
```

### 1.3 Create Initial Commit

```bash
git commit -m "Initial commit: AI Note & PDF Summarizer"
```

### 1.4 Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it: `ai-note-summarizer` (or any name you prefer)
4. **DO NOT** check "Initialize with README" (we already have files)
5. Click **Create repository**

### 1.5 Connect and Push

GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-note-summarizer.git
git branch -M main
git push -u origin main
```

**Note:** `.env` file is automatically ignored by `.gitignore`, so your API key won't be pushed!

## 🚀 Step 2: Deploy to Vercel

### 2.1 Create Vercel Account

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login (you can use your GitHub account)

### 2.2 Import Your GitHub Repository

1. Click **Add New...** → **Project**
2. Import your `ai-note-summarizer` repository
3. Click **Import**

### 2.3 Configure Environment Variables

**This is the crucial step to keep your API key secure!**

1. In the **Configure Project** page, scroll down to **Environment Variables**
2. Click **Add** and enter:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your actual Gemini API key (the one from your `.env` file)
   - **Environment:** Select all (Production, Preview, Development)
3. Click **Add**
4. Click **Deploy**

### 2.4 Wait for Deployment

Vercel will:
- Install dependencies
- Build your app
- Deploy it

You'll get a URL like: `https://ai-note-summarizer.vercel.app`

### 2.5 Verify Deployment

1. Visit your deployed URL
2. Test the app - it should work with the API key you set in Vercel!

## 🔄 Updating Your Deployment

Whenever you push changes to GitHub:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically detect the changes and redeploy!

## 🛠️ Local Development Setup

### For New Developers (or when cloning the repo):

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-note-summarizer.git
   cd ai-note-summarizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

5. Run the app:
   ```bash
   npm run dev
   ```

## ✅ Checklist

Before pushing to GitHub, make sure:
- [ ] `.env` is in `.gitignore` (it is!)
- [ ] `.env.example` exists with placeholder
- [ ] No API keys are hardcoded in source files
- [ ] All code uses `import.meta.env.VITE_GEMINI_API_KEY`

## 🔍 Verify Your API Key is Secure

After pushing to GitHub:
1. Go to your repository on GitHub
2. Check the files - you should **NOT** see `.env` file
3. Check `src/services/gemini.js` - it should use `import.meta.env.VITE_GEMINI_API_KEY`, not a hardcoded key

## 🆘 Troubleshooting

### "API key not found" error on Vercel
- Make sure you added `VITE_GEMINI_API_KEY` in Vercel's Environment Variables
- Make sure it's set for all environments (Production, Preview, Development)
- Redeploy after adding the variable

### Build fails on Vercel
- Check Vercel build logs for errors
- Make sure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API key works locally but not on Vercel
- Double-check the environment variable name matches exactly: `VITE_GEMINI_API_KEY`
- Make sure there are no extra spaces in the Vercel environment variable value
- Redeploy after making changes

## 📝 Notes

- **Never** share your `.env` file
- **Never** commit API keys to Git
- The `.env.example` file is safe to commit (it has a placeholder)
- Vercel environment variables are encrypted and secure

