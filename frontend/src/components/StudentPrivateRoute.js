import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const StudentPrivateRoute = () => {
  const studentAuth = localStorage.getItem('studentToken');
  return studentAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default StudentPrivateRoute;