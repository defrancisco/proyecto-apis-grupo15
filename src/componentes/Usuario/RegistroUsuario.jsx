import React, {useState, useEffect} from 'react';
import '../../styles/headeryfooter';
import { formValidation } from '../formValdiation';
import Header from '../Header';
import Footer from '../Footer';

export const RegistroUsuario = () => {
    // Estado para el formulario de registro de usuario
    const [{form, setForm}] = useState({
        mail: '', // Campo para el correo electrónico.
        nombre: '', // Campo para el nombre del usuario.
        apellido: '', // Campo para el apellido del usuario.
        fechaNacimiento: '', // Campo para la fecha de nacimiento.
        contrasena: '', // Campo para la contraseña.
        confirmarContrasena: '' // Campo para confirmar la contraseña.
    });
    
    // Estado para manejar errores en las contraseñas no coincidentes
    const[passwordMismatch, setPasswordMismatch] = useState(false);

    // Ejecuta la validación del formulario al montar el componente
    useEffect(() => {
        formValidation();
    }, []);

    // Maneja el cambio en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...setForm,
            [name]: value,
        });

        // Verificar si las contraseñas coinciden cuando se cambia el valor
        if (name === 'confirmarContrasena' || name === 'contrasena') {
            setPasswordMismatch(form.contrasena !== form.confirmarContrasena);
        }
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de contraseñas coincidentes
        if (form.contrasena !== form.confirmarContrasena) {
            setPasswordMismatch(true);
            return;
        }

        // Realizar acciones con los datos del formulario
        console.log('Formulario enviado:', form);
    };




  return (
    <>
    <Header />
    <main>
                <div className="form">
                    <h2>Registro de Usuario</h2>
                    <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                        <div className="col-md-6 position-relative">
                            <label htmlFor="mail" className="form-label">Mail</label>
                            <input type="email" className="form-control" id="mail" name="mail" value={form.mail} onChange={handleChange} required />
                            <div className="invalid-tooltip">
                                Por favor, proporciona un correo electrónico válido.
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <label htmlFor="nombre" className="form-label">Nombre de Usuario</label>
                            <input type="text" className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
                            <div className="invalid-tooltip">
                                Por favor, proporciona un nombre de usuario válido.
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="apellido" name="apellido" value={form.apellido} onChange={handleChange} required />
                            <div className="invalid-tooltip">
                                Por favor, proporciona un apellido válido.
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <label htmlFor="fecha-nacimiento" className="form-label">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="fecha-nacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} required />
                            <div className="invalid-tooltip">
                                Por favor, selecciona una fecha de nacimiento válida.
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
                            <label htmlFor="contrasena" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="contrasena" name="contrasena" value={form.contrasena} onChange={handleChange} required />
                            <div className="invalid-tooltip">
                                Por favor, proporciona una contraseña.
                            </div>
                        </div>
                        <div className="col-md-6 position-relative">
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
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit">Registrarse</button>
                        </div>
                    </form>
                </div>
            </main>

    <Footer />
    </>
  )

}
