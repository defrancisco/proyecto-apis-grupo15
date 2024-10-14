import React from 'react';
import '../../styles/headeryfooter';
import { formValidation } from '../formValdiation';
import Header from '../Header';

export const RegistroUsuario = () => {
    useEffect(() => {
        formValidation();
    }, []);
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
                            <input type="password" className="form-control" id="confirmar-contrasena" name="confirmarContrasena" value={form.confirmarContrasena} onChange={handleChange} required />
                            <div className="invalid-tooltip">
                                Las contraseñas no coinciden.
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
