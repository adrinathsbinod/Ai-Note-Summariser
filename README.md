# AI Note & PDF Summarizer

A modern React web application that uses Google Gemini AI to summarize text notes and PDF documents. Built with Vite, React, and TailwindCSS.

## Features

- **Text Note Summarization**: Paste or type notes and get AI-powered summaries
- **PDF Summarization**: Upload PDF files, extract text, and generate summaries
- **Clean UI**: Modern, minimalist interface with tab-based navigation
- **Client-Side Processing**: All operations run in the browser (no server required)
- **Error Handling**: Comprehensive error handling and loading states
- **Copy to Clipboard**: Easy copy functionality for summaries

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **pdfjs-dist** - PDF text extraction (client-side)
- **Google Gemini API** - AI summarization

## Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node -v` and `npm -v`

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Configuration

### Add Your Gemini API Key

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and add your API key:
   ```
   VITE_GEMINI_API_KEY=your-actual-api-key-here
   ```

**Note:** The `.env` file is already in `.gitignore` - your API key will never be committed to Git!

## Running the Application

### Development Mode
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
ai-note-summarizer/
├── src/
│   ├── components/
│   │   ├── TextSummarizer.jsx    # Text summarization component
│   │   └── PdfSummarizer.jsx     # PDF summarization component
│   ├── services/
│   │   └── gemini.js              # Gemini API integration
│   ├── utils/
│   │   └── pdfParser.js           # PDF text extraction utility
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Usage

### Text Summarization
1. Click on the "Text Summarizer" tab
2. Type or paste your notes in the text area
3. Click "Summarize" button
4. View the summary and use "Copy Summary" to copy it

### PDF Summarization
1. Click on the "PDF Summarizer" tab
2. Click "Choose PDF File" and select a PDF
3. Wait for text extraction (preview will show)
4. Click "Summarize PDF" button
5. View the summary and use "Copy Summary" to copy it

## Notes

- All processing happens client-side (no backend required)
- PDF extraction uses pdfjs-dist library (runs in browser)
- Make sure your Gemini API key has sufficient quota
- Large PDFs may take longer to process

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on:
- Pushing to GitHub securely
- Deploying to Vercel
- Setting up environment variables

## Troubleshooting

### API Key Error
- Ensure you've created a `.env` file with `VITE_GEMINI_API_KEY`
- Verify your API key is valid and has access to Gemini models
- Restart the dev server after creating/updating `.env`

### PDF Extraction Issues
- Ensure the PDF is not password-protected
- Some PDFs with images only may not extract text properly
- Try a different PDF file if extraction fails

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 16+ for Vite compatibility

## License

MIT


