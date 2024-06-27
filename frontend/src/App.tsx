import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './components/Blog'
import Home from './components/Home'
import { ThemeProvider } from './components/context/ThemeProvider'
import Login from './components/Auth'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<NavBar/>}>
                <Route path="/blog/:id" element={<Blog />} />
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
              </Route>
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
