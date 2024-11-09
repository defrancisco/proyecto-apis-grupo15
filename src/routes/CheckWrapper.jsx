import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CheckWrapper = ({ children, allowedAccountType }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/iniciarSesion/loginCuenta" replace />;
  }

  if (auth.userType !== allowedAccountType) {
    return <Navigate to="/prePagina" replace />;
  }

  return children;
};

export default CheckWrapper;

