// Get API key from environment variables (Vite uses import.meta.env)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""
// Using gemini-1.5-flash as it's more reliable and faster
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent"

/**
 * Summarizes text using Google Gemini API
 * @param {string} content - The text content to summarize
 * @returns {Promise<string>} - The summarized text
 */
export async function summarizeText(content) {
  if (!content || content.trim().length === 0) {
    throw new Error('Content cannot be empty')
  }

  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === "") {
    throw new Error('Please set your Gemini API key in the VITE_GEMINI_API_KEY environment variable. See .env.example for details.')
  }

  const prompt = `Summarize the following content clearly and concisely:\n\n${content}`

  console.log('Making API request to:', GEMINI_API_URL)
  console.log('Content length:', content.length)

  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    }
    
    console.log('Request body prepared, sending request...')
    
    const response = await fetch(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    )
    
    console.log('Response status:', response.status, response.statusText)

    const responseText = await response.text()
    let data
    
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse response:', responseText)
      throw new Error(`Invalid JSON response from API: ${responseText.substring(0, 200)}`)
    }

    if (!response.ok) {
      const errorMessage = data.error?.message || data.error || `API request failed with status ${response.status}`
      console.error('API Error:', errorMessage)
      throw new Error(errorMessage)
    }
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure:', data)
      throw new Error('Invalid response format from Gemini API. Response: ' + JSON.stringify(data).substring(0, 200))
    }

    const summary = data.candidates[0].content.parts[0].text
    if (!summary) {
      throw new Error('Empty summary received from API')
    }
    
    return summary
  } catch (error) {
    console.error('Summarization error:', error)
    if (error.message.includes('API key') || error.message.includes('Please set')) {
      throw error
    }
    throw new Error(`Failed to summarize: ${error.message}`)
  }
}


