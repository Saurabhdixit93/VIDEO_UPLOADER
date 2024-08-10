import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PublicRoute = ({ element, restricted }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated && restricted ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
