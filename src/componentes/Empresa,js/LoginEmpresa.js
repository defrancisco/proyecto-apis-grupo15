import React from 'react';
import Header from '../Header';
import Footer from '../Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/headeryfooter.css';
import '../../styles/inicioSesion';


const LoginEmpresa = () => {
    return (
        <>
            <Header />
            <main>
                <div className="registration-form">
                    <h2>Registro de Usuario</h2>
                    <form className="needs-validation" novalidate>
                        <div className="form-group">
                            <label htmlFor="mail">Mail Empresarial</label>
                            <input
                                type="email"
                                id="mail"
                                name="mail"
                                required
                                className="form-control"
                            />
                            <div className="invalid-feedback">
                                Por favor, ingresa un correo válido.
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                className="form-control"
                            />
                            <div className="invalid-feedback">
                                Por favor, ingresa un nombre de usuario.
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña</label>
                            <input
                                type="password"
                                id="contrasena"
                                name="contrasena"
                                required
                                className="form-control"
                            />
                            <div className="invalid-feedback">
                                Por favor, ingresa una contraseña.
                            </div>
                        </div>
                        <button type="submit" className="submit-btn">
                            Registrarse
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LoginEmpresa;
