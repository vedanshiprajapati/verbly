import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blog from './components/Blog'
import Home from './components/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
