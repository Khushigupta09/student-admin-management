import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const adminAuth = localStorage.getItem('adminToken');
  return adminAuth ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
