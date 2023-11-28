// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
  const isAuthenticated = true

  return isAuthenticated ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
