import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

export const LoginUsuario = () => {
  return (
    <div>
        <Header />
        <main>
            <div className="form">
                    <h1>Inicia Sesión</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" id="contrasena" name="contrasena" required />
                        </div>
                        <button type="submit" className="submit-btn">Iniciar Sesión</button>
                    </form>
                    <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
        </main>
        <Footer />
    </div>
  );
};

export default LoginUsuario;



