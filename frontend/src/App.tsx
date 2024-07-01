import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./components/pages/Blog";
import Home from "./components/pages/Home";
import { ThemeProvider } from "./components/context/ThemeProvider";
import Login from "./components/pages/Auth";
import NavBar from "./components/pages/NavBar";
import BlogEdit from "./components/pages/BlogEdit";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/pages/ProtectedRoute";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
