import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accountType: null, // 'client' o 'business'
  });

  const login = (accountType) => {
    setAuth({
      isAuthenticated: true,
      accountType,
    });
  };

  const logout = () => setAuth({ isAuthenticated: false, accountType: null });

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
