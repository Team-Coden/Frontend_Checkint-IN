import RoutersProtected from "./App/router/routers"
import { ThemeProvider } from "./features/main/components/theme-provider"

export default function App({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
        <RoutersProtected />
      </ThemeProvider>
    </>
  )
}
