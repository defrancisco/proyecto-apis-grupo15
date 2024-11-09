import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userType: null, // 'individual' o 'business'
  });
  const [recoveryCode, setRecoveryCode] = useState(null); // Código de recuperación generado
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = (accountType) => {
    setAuth({
      isAuthenticated: true,
      userType: accountType,
    });
    // Redirigir dependiendo del tipo de cuenta
    if (accountType === 'individual') {
      navigate('/userTab');
    } else if (accountType === 'business') {
      navigate('/businessTab');
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuth({ isAuthenticated: false, userType: null });
    navigate('/'); // Redirigir a la página principal o login
  };

  // Función para enviar el código de recuperación
  const sendRecoveryCode = (email) => {
    // Aquí puedes agregar lógica para enviar el código al email del usuario
    const generatedCode = '071726'; // Generamos un código estático o aleatorio para la prueba
    setRecoveryCode(generatedCode);
    console.log(`Código de recuperación enviado a ${email}: ${generatedCode}`);
  };

  // Función para verificar el código de recuperación
  const verifyRecoveryCode = (inputCode) => {
    if (inputCode === recoveryCode) {
      console.log("Código verificado correctamente.");
      navigate('/userTab'); // Redirigir al perfil después de la verificación
      return true;
    } else {
      console.log("Código incorrecto.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, sendRecoveryCode, verifyRecoveryCode }}>
      {children}
    </AuthContext.Provider>
  );
};
