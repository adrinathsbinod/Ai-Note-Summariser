// Import pdfjs-dist for PDF parsing
import * as pdfjsLibRaw from 'pdfjs-dist'
// Import JSZip for PPTX parsing
import JSZip from 'jszip'

// Get the actual pdfjs library instance
let pdfjsLib = null
const getPdfjs = () => {
  if (pdfjsLib) return pdfjsLib
  if (pdfjsLibRaw && typeof pdfjsLibRaw.getDocument === 'function') {
    pdfjsLib = pdfjsLibRaw
    return pdfjsLib
  }
  if (pdfjsLibRaw.default && typeof pdfjsLibRaw.default.getDocument === 'function') {
    pdfjsLib = pdfjsLibRaw.default
    return pdfjsLib
  }
  pdfjsLib = pdfjsLibRaw
  return pdfjsLib
}

// Worker URL
const workerUrl = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
let workerConfigured = false
const configureWorker = () => {
  if (workerConfigured) return
  try {
    const pdfjs = getPdfjs()
    if (pdfjs && pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl
      workerConfigured = true
    }
  } catch (error) {
    console.warn('Could not configure PDF.js worker:', error.message)
  }
  workerConfigured = true
}

// Extract text from PDF
async function extractTextFromPdf(file) {
  const pdfjs = getPdfjs()
  if (!pdfjs || typeof pdfjs.getDocument !== 'function') {
    throw new Error('PDF.js getDocument function not found')
  }
  configureWorker()
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
    let fullText = ''
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += pageText + '\n\n'
    }
    return fullText.trim()
  } catch (error) {
    throw new Error(`Failed to extract PDF text: ${error.message}`)
  }
}

/**
 * Extracts text from a text file
 * @param {File} file - The text file
 * @returns {Promise<string>} - The file content as text
 */
export async function extractTextFromTxt(file) {
  try {
    const text = await file.text()
    return text.trim()
  } catch (error) {
    throw new Error(`Failed to read text file: ${error.message}`)
  }
}

/**
 * Extracts text from a PowerPoint file (PPT/PPTX)
 * Note: Full PPT parsing requires server-side processing, 
 * but we can extract basic text from PPTX (which is a ZIP archive)
 * @param {File} file - The PowerPoint file
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromPpt(file) {
  try {
    // PPTX files are ZIP archives containing XML
    // For client-side, we'll use a simplified approach
    if (file.name.endsWith('.pptx')) {
      // Try to extract text from PPTX using JSZip
      const arrayBuffer = await file.arrayBuffer()
      const zip = await JSZip.loadAsync(arrayBuffer)
      
      let fullText = ''
      
      // Extract text from slide XML files
      const slideFiles = Object.keys(zip.files).filter(name => 
        name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
      )
      
      for (const fileName of slideFiles) {
        const slideContent = await zip.files[fileName].async('string')
        // Simple regex to extract text from XML (basic approach)
        const textMatches = slideContent.match(/<a:t[^>]*>([^<]*)<\/a:t>/g)
        if (textMatches) {
          textMatches.forEach(match => {
            const text = match.replace(/<[^>]*>/g, '')
            if (text.trim()) {
              fullText += text.trim() + '\n'
            }
          })
        }
      }
      
      return fullText.trim() || 'No text content found in the PowerPoint file.'
    } else {
      // For .ppt files (binary format), client-side parsing is very difficult
      throw new Error('PPT files (not PPTX) are not supported. Please convert to PPTX or PDF format.')
    }
  } catch (error) {
    if (error.message.includes('not supported')) {
      throw error
    }
    // Fallback: try to read as text (won't work for binary PPT)
    try {
      const text = await file.text()
      // If we get readable text, return it
      if (text.length > 100 && !text.includes('PK')) {
        return text
      }
    } catch {}
    
    throw new Error(`Failed to extract text from PowerPoint file: ${error.message}. Please try converting to PDF or TXT format.`)
  }
}

/**
 * Main function to extract text from any supported file type
 * @param {File} file - The file to extract text from
 * @returns {Promise<string>} - The extracted text
 */
export async function extractTextFromFile(file) {
  const fileName = file.name.toLowerCase()
  const fileType = file.type

  // PDF files
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    return await extractTextFromPdf(file)
  }

  // Text files
  if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return await extractTextFromTxt(file)
  }

  // PowerPoint files
  if (
    fileType === 'application/vnd.ms-powerpoint' ||
    fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    fileName.endsWith('.ppt') ||
    fileName.endsWith('.pptx')
  ) {
    return await extractTextFromPpt(file)
  }

  throw new Error(`Unsupported file type: ${fileType || 'unknown'}. Supported formats: PDF, TXT, PPT, PPTX`)
}

