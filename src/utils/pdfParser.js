// Import pdfjs-dist
// Try standard import first, fallback to build path if needed
import * as pdfjsLibRaw from 'pdfjs-dist'

// Worker URL
const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

// Get the actual pdfjs library instance
// Handle different module export structures
let pdfjsLib = null

const getPdfjs = () => {
  if (pdfjsLib) return pdfjsLib
  
  // Try different access patterns
  if (pdfjsLibRaw && typeof pdfjsLibRaw.getDocument === 'function') {
    pdfjsLib = pdfjsLibRaw
    return pdfjsLib
  }
  
  if (pdfjsLibRaw.default && typeof pdfjsLibRaw.default.getDocument === 'function') {
    pdfjsLib = pdfjsLibRaw.default
    return pdfjsLib
  }
  
  // Try accessing via common export patterns
  const possiblePaths = [
    pdfjsLibRaw,
    pdfjsLibRaw.default,
    pdfjsLibRaw.pdfjsLib,
    pdfjsLibRaw.pdfjs
  ]
  
  for (const path of possiblePaths) {
    if (path && typeof path.getDocument === 'function') {
      pdfjsLib = path
      return pdfjsLib
    }
  }
  
  // If nothing works, return the raw import
  pdfjsLib = pdfjsLibRaw
  return pdfjsLib
}

// Configure worker
let workerConfigured = false
const configureWorker = () => {
  if (workerConfigured) return
  
  try {
    const pdfjs = getPdfjs()
    if (pdfjs && pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
      workerConfigured = true
    } else {
      console.warn('PDF.js GlobalWorkerOptions not available')
    }
  } catch (error) {
    console.warn('Could not configure PDF.js worker:', error.message)
  }
  workerConfigured = true
}

/**
 * Extracts text content from a PDF file
 * @param {File} file - The PDF file to extract text from
 * @returns {Promise<string>} - The extracted text content
 */
export async function extractTextFromPdf(file) {
  // Get pdfjs library instance
  const pdfjs = getPdfjs()
  
  // Check if getDocument is available
  if (!pdfjs || typeof pdfjs.getDocument !== 'function') {
    console.error('PDF.js import issue. Available exports:', Object.keys(pdfjsLibRaw))
    console.error('PDF.js structure:', pdfjsLibRaw)
    throw new Error('PDF.js getDocument function not found. The pdfjs-dist library may not be installed correctly. Try: npm install pdfjs-dist@latest')
  }
  
  // Configure worker before use
  configureWorker()
  
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    
    let fullText = ''
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
      fullText += pageText + '\n\n'
    }
    
    return fullText.trim()
  } catch (error) {
    throw new Error(`Failed to extract PDF text: ${error.message}`)
  }
}


