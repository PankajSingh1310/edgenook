import { ThemeProvider } from "@/components/ui/theme-provider";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/Course";
import SingleCourse from "./pages/SingleCourse";
import Enroll from "./pages/Enroll";
import AdminHome from "./pages/Admin/AdminHome";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<SingleCourse />} />
          <Route path="enroll/:id" element={<Enroll />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute>
            <AdminHome />
          </ProtectedAdminRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized/>} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
