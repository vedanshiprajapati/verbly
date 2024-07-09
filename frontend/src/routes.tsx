import { Route, Routes } from "react-router-dom";
import Blog from "./components/pages/Blog";
import Home from "./components/pages/Home";
import Login from "./components/pages/Signin";
import NavBar from "./components/Reusables/NavBar";
import ProtectedRoute from "./components/Reusables/ProtectedRoute";
import BlogEdit from "./components/pages/BlogEdit";
import Signup from "./components/pages/Signup";
import BlogUpdate from "./components/pages/BlogUpdate";
import NotFound from "./components/pages/NotFound";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<NavBar />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/" element={<NavBar />}>
        <Route path="/blog/edit" element={<BlogEdit />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/:id/edit" element={<BlogUpdate />} />
      </Route>
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
