import { useState } from 'react'
import TextSummarizer from './components/TextSummarizer'
import FileSummarizer from './components/FileSummarizer'

function App() {
  const [activeTab, setActiveTab] = useState('text')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-6xl relative z-10">
        <header className="text-center mb-6 sm:mb-8 lg:mb-12 animate-fade-in">
          <div className="inline-block mb-4 animate-bounce">
            <span className="text-4xl sm:text-5xl lg:text-6xl">🤖</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-3">
            AI Note & Document Summarizer
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Summarize your notes, PDFs, PowerPoints, and text files using Google Gemini AI
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-4 sm:mb-6 animate-slide-down">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-1.5 sm:p-2 inline-flex gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                activeTab === 'text'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>📝</span>
                <span className="hidden sm:inline">Text</span>
                <span className="sm:hidden">Text</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                activeTab === 'file'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>📄</span>
                <span className="hidden sm:inline">Files</span>
                <span className="sm:hidden">Files</span>
              </span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 animate-scale-in border border-white/20 dark:border-gray-700/50">
          {activeTab === 'text' ? <TextSummarizer /> : <FileSummarizer />}
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
          <p>Made by Adri • Powered by Google Gemini AI • Built with React & Vite</p>
        </footer>
      </div>
    </div>
  )
}

export default App


