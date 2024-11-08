import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CheckWrapper = ({ children, allowedAccountType }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth.accountType !== allowedAccountType) {
    return <Navigate to="/" replace />; // Redirigir si el tipo de cuenta no coincide
  }

  return children;
};

export default CheckWrapper;

