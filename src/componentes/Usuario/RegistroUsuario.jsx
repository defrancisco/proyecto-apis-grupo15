import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/form.css';

export const RegistroUsuario = () => {
    const [form, setForm] = useState({
        mail: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        contrasena: '',
        confirmarContrasena: ''
    });

    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));

        if (name === 'contrasena' || name === 'confirmarContrasena') {
            setPasswordMismatch(
                name === 'confirmarContrasena'
                    ? form.contrasena !== value
                    : value !== form.confirmarContrasena
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordMismatch) return; // No envía el formulario si hay error de contraseña
        console.log('Formulario enviado:', form);
    };

    return (
        <>
            <Header />
            <main>
                <div className="form">
                    <h2>Registro de Usuario</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="mail" className="form-label">Mail</label>
                            <input type="email" className="form-control" id="mail" name="mail" value={form.mail} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre" className="form-label">Nombre de Usuario</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha-nacimiento" className="form-label">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="fecha-nacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="contrasena" name="contrasena" value={form.contrasena} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmar-contrasena" className="form-label">Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                className={`form-control ${passwordMismatch ? 'is-invalid' : ''}`} 
                                id="confirmar-contrasena" 
                                name="confirmarContrasena" 
                                value={form.confirmarContrasena} 
                                onChange={handleChange} 
                                required 
                            />
                            <div className="invalid-tooltip">
                                {passwordMismatch ? 'Las contraseñas no coinciden.' : 'Por favor, confirma tu contraseña.'}
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="submit-btn" type="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default RegistroUsuario;
