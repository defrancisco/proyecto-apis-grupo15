import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/form.css';
import { formValidation } from '../IniciosSesion/formValidation';

export const RegistroUsuario = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mail: '',
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        contrasena: '',
        confirmarContrasena: ''
    });

    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMismatch) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar campos requeridos
        if (!form.mail || !form.nombre || !form.apellido || !form.fechaNacimiento || !form.contrasena) {
            setError('Todos los campos son obligatorios');
            return;
        }
        
        try {
            const userData = {
                email: form.mail,
                name: form.nombre,
                surname: form.apellido,
                dateOfBirth: form.fechaNacimiento,
                password: form.contrasena,
                userType: 'individual'
            };

            console.log('Enviando datos:', userData);

            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (response.ok) {
                localStorage.setItem('userType', 'individual');
                alert('Usuario registrado exitosamente');
                navigate('/iniciarSesion/loginCuenta');
            } else {
                throw new Error(data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error completo:', error);
            setError(error.message || 'Error de conexión con el servidor');
        }
    };
    
    return (
        <>
            <main>
                <div className="form">
                    <h2>Registro de Usuario</h2>
                    {error && <div className="error-message">{error}</div>}
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
                        </div>
                        <div className="form-group">
                            <button className="submit-btn" type="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default RegistroUsuario;
