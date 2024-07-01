import { ThemeProvider } from "./components/context/ThemeProvider"
import AppRoutes from "./routes"
import { AuthProvider } from "./components/context/AuthContext"
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}
export default App
