import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Always apply dark mode
    const root = document.documentElement
    root.classList.add('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

