import { Route, Routes } from "react-router-dom"
import Blog from "./components/pages/Blog"
import Home from "./components/pages/Home"
import Login from "./components/pages/Auth"
import NavBar from "./components/pages/NavBar"
import BlogEdit from "./components/pages/BlogEdit"
import ProtectedRoute from "./components/pages/ProtectedRoute"
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/" element={<NavBar />}>
        <Route path="/blog/edit" element={<BlogEdit />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
)

export default AppRoutes
