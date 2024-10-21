import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = () => {
  const token = Cookies.get('session');

  if (!token) {
    // No token found, redirect to /auth
    return <Navigate to="/auth" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken?.role !== 'admin') {
      // No admin role, redirect to /auth
      return <Navigate to="/auth" />;
    }
  } catch (error) {
    // Invalid token, redirect to /auth
    return <Navigate to="/auth" />;
  }

  // If the user is authenticated and has the admin role, allow access
  return <Outlet />;
};

export default ProtectedRoute;
