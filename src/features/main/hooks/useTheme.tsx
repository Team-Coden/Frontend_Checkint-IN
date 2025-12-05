import { useState } from "react"

export function useTheme() {
  const [theme, setThemeState] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  )

  const setTheme = (mode: "light" | "dark" | "system") => {
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", prefersDark)
      setThemeState(prefersDark ? "dark" : "light")
      return
    }

    document.documentElement.classList.toggle("dark", mode === "dark")
    setThemeState(mode)
  }

  return { theme, setTheme }
}
