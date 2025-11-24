import { useState } from 'react'
import { summarizeText } from '../services/gemini'

function TextSummarizer() {
  const [noteText, setNoteText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    console.log('Summarize button clicked')
    if (!noteText.trim()) {
      setError('Please enter some text to summarize')
      return
    }

    console.log('Starting summarization...')
    setLoading(true)
    setError('')
    setSummary('')

    try {
      console.log('Calling summarizeText API...')
      const result = await summarizeText(noteText)
      console.log('Summary received:', result)
      setSummary(result)
    } catch (err) {
      console.error('Summarization error:', err)
      setError(err.message || 'An error occurred while summarizing')
    } finally {
      setLoading(false)
      console.log('Summarization complete')
    }
  }


  const handleClear = () => {
    setNoteText('')
    setSummary('')
    setError('')
  }

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
      // Show toast notification
      const toast = document.createElement('div')
      toast.className = 'fixed top-4 right-4 bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in'
      toast.textContent = 'Summary copied to clipboard!'
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.classList.add('animate-fade-out')
        setTimeout(() => document.body.removeChild(toast), 300)
      }, 2000)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Text Note Summarization
        </h2>
        <span className="text-2xl animate-bounce">✨</span>
      </div>

      {/* Input Section */}
      <div className="animate-slide-up">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Enter or paste your notes:
        </label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Type or paste your notes here..."
          className="w-full h-48 sm:h-64 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-all duration-300 shadow-inner bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <div className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {noteText.length.toLocaleString()} characters
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 animate-slide-up">
        <button
          onClick={handleSummarize}
          disabled={loading || !noteText.trim()}
          className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:transform-none"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="hidden sm:inline">Summarizing...</span>
              <span className="sm:hidden">Processing...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Summarize</span>
            </>
          )}
        </button>
        <button
          onClick={handleClear}
          className="px-4 sm:px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
        >
          Clear
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-lg text-red-700 dark:text-red-300 animate-shake">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong className="font-semibold">Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {/* Summary Result */}
      {summary && (
        <div className="border-2 border-indigo-200 dark:border-indigo-700 rounded-xl p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 shadow-xl animate-scale-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <span className="text-2xl">📋</span>
              Summary
            </h3>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Summary
            </button>
          </div>
          <div className="max-h-64 sm:max-h-96 overflow-y-auto text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            {summary}
          </div>
        </div>
      )}
    </div>
  )
}

export default TextSummarizer


