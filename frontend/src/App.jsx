import { Route, Routes } from "react-router-dom";
import AllBlogs from "./pages/AllBlogs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import SingleBlog from "./pages/SingleBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import PleaseLogin from "./pages/PleaseLogin";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
      </div>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/please-Login" element={<PleaseLogin />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />

          {/* Protected Routes */}

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AllBlogs />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/" element={<AllBlogs />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
