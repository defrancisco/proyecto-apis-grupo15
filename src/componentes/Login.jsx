import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../routes/root';

import '../styles/iniciosesion.css';

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUser(); // Obtiene la función de login del contexto

  const handleLogin = (type) => {
    loginUser(type); // Llama a la función de login con el tipo de usuario
    navigate(type === 'individual' ? '/userTab' : '/businessTab');
  };

  return (
    <div className="login-page">
      <div className="content-wrap">
        <div className="account-type-selection">
          <h2>¿Qué tipo de cuenta desea registrar?</h2>
          <div className="button-group">
            <button type="button" className="personal-account">
              <Link to="registroUsuario">
                ⭐ Cuenta Personal
              </Link>  
            </button>
            <button type="button" className="business-account">
              <Link to="registroEmpresa">⭐ Cuenta Empresarial</Link> 
            </button>
          </div>
          <h2>O si ya tiene cuenta</h2>
          <div className="login">
            <button type="button" className="login-button" onClick={handleLogin}>
              <Link to="/iniciarSesion/loginCuenta">Iniciar Sesión</Link>  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
