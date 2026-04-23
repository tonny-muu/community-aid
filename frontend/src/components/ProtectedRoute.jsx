// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../utils/token";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getUserRole();

  // Not logged in or role not allowed → redirect
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;