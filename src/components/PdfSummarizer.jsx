import { useState } from 'react'
import { extractTextFromPdf } from '../utils/pdfParser'
import { summarizeText } from '../services/gemini'

function PdfSummarizer() {
  const [pdfFile, setPdfFile] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    setPdfFile(file)
    setExtractedText('')
    setSummary('')
    setError('')

    // Extract text from PDF
    setExtracting(true)
    try {
      const text = await extractTextFromPdf(file)
      setExtractedText(text)
    } catch (err) {
      setError(err.message || 'Failed to extract text from PDF')
      setPdfFile(null)
    } finally {
      setExtracting(false)
    }
  }

  const handleSummarize = async () => {
    if (!extractedText.trim()) {
      setError('No text extracted from PDF. Please upload a valid PDF file.')
      return
    }

    setLoading(true)
    setError('')
    setSummary('')

    try {
      const result = await summarizeText(extractedText)
      setSummary(result)
    } catch (err) {
      setError(err.message || 'An error occurred while summarizing')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
      alert('Summary copied to clipboard!')
    }
  }

  const handleClear = () => {
    setPdfFile(null)
    setExtractedText('')
    setSummary('')
    setError('')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        PDF Summarization
      </h2>

      {/* File Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload PDF File:
        </label>
        <div className="flex items-center gap-4">
          <label className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer inline-block">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={extracting}
            />
            {extracting ? 'Extracting...' : 'Choose PDF File'}
          </label>
          {pdfFile && (
            <span className="text-sm text-gray-600">
              {pdfFile.name}
            </span>
          )}
        </div>
      </div>

      {/* Extracted Text Preview */}
      {extractedText && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extracted Text Preview:
          </label>
          <div className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto text-sm text-gray-700">
            {extractedText.length > 0 ? (
              <div className="whitespace-pre-wrap">{extractedText.substring(0, 1000)}{extractedText.length > 1000 ? '...' : ''}</div>
            ) : (
              <div className="text-gray-400">No text extracted</div>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Total characters extracted: {extractedText.length}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSummarize}
          disabled={loading || !extractedText.trim()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Summarizing...
            </>
          ) : (
            'Summarize PDF'
          )}
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Summary Result */}
      {summary && (
        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Summary
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto text-gray-700 whitespace-pre-wrap">
            {summary}
          </div>
        </div>
      )}
    </div>
  )
}

export default PdfSummarizer


