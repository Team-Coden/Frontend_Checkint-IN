import RoutersProtected from "./App/router/routers"
import { ThemeProvider } from "next-themes"
export default function App({ children }: { children?: React.ReactNode }) {
  return (
    <>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
      <RoutersProtected/>
      
    </>
  )
}
