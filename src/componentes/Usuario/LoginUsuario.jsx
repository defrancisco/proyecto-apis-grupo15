import React, {useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import '../../styles/usuario/login.css';
import { formValidation } from '../formValdiation';


export const LoginUsuario = () => {
    // Ejecuta la validación del formulario al montar el componente
    useEffect(() => {
        formValidation();
    }, []); // Se ejecuta al montar el componente
    
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
                    <a href="/recuperar-contraseña" className="forgot-password">¿Olvidaste tu contraseña?</a>
                </div>
        </main>
        <Footer />
    </div>
  );
};

export default LoginUsuario;



