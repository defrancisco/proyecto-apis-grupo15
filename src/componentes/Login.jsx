import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; 

import '../styles/iniciosesion.css';
import '../styles/headeryfooter.css';
import Header from './Header';
import Footer from './Footer';

function Login() {
  const navigate = useNavigate();
  const { login } = useUserContext(); // Obtiene la función de login del contexto
  const [accountType, setAccountType] = useState(null); // Estado para tipo de cuenta

  const handleAccountSelection = (type) => {
    setAccountType(type);
  };

  const handleLogin = () => {
    // Simula la información del usuario (esto debería ser reemplazado con datos reales)
    const userData = { name: accountType === 'personal' ? 'Usuario Personal' : 'Usuario Empresarial' };

    if (accountType === 'personal') {
      login(userData); // Llama a la función de login con la información del usuario
      navigate('/iniciarSesion/loginUsuario'); // Redirige a LoginUsuario
    } else if (accountType === 'business') {
      login(userData); // Llama a la función de login con la información del usuario
      navigate('/iniciarSesion/loginEmpresa'); // Redirige a LoginEmpresa
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="content-wrap">
        <div className="account-type-selection">
          <h2>¿Qué tipo de cuenta desea registrar?</h2>
          <div className="button-group">
            <button type="button" className="personal-account" onClick={() => handleAccountSelection('personal')}>
              ⭐ Cuenta Personal
            </button>
            <button type="button" className="business-account" onClick={() => handleAccountSelection('business')}>
              ⭐ Cuenta Empresarial
            </button>
          </div>
          <h2>O si ya tiene cuenta</h2>
          <div className="login">
            <button type="button" className="login-button" onClick={handleLogin}>
              ⭐ Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
