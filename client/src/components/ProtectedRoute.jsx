import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 If no token or no user → go to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 If role doesn’t match → go to login
  if (allowedRole && user.role.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Otherwise allow access
  return children;
};

export default ProtectedRoute;
