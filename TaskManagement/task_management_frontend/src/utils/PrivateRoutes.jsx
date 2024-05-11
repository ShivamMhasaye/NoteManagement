import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const auth = localStorage.getItem("JWTToken");
  const username = localStorage.getItem("username");
  return auth && username ? <Outlet /> : <Navigate to="/" />;
}
