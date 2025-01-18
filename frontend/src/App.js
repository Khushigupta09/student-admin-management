import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/footer";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route element={<Nav />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route element={<StudentPrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>
        </Route>
        
        <Route element={<AdminPrivateRoute />}>
        <Route element={<Nav/>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
