import { Route, Routes } from "react-router-dom";
import Blog from "./components/pages/Blog";
import Home from "./components/pages/Home";
import Login from "./components/pages/Signin";
import NavBar from "./components/Reusables/NavBar";
import ProtectedRoute from "./components/Reusables/ProtectedRoute";
import BlogEdit from "./components/pages/BlogEdit";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<NavBar />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/" element={<NavBar />}>
        <Route path="/blog/edit" element={<BlogEdit />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Route>
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;
