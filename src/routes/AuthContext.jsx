import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accountType: null, // 'cliente' o 'empresa'
  });
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (accountType) => {
    setAuth({
      isAuthenticated: true,
      accountType,
    });
    // Redirigir dependiendo del tipo de cuenta
    if (accountType === 'cliente') {
      navigate('/userTab');
    } else if (accountType === 'empresa') {
      navigate('/businessTab');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuth({ isAuthenticated: false, accountType: null });
    navigate('/'); // Redirigir a la página principal o login
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
