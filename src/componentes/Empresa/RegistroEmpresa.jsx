import React, { useState } from "react";
import Header from '../Header'; // Importa tu componente de Header
import Footer from '../Footer'; // Importa tu componente de Footer
import '../../styles/form.css';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    mail: '',
    nombre: '',
    contrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };
  return (
    <div>
      {/* Usamos los componentes ya existentes */}
      <Header />
      
      <main>
        <div className="registration-form">
          <h2>Registro de Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mail">Mail Empresarial</label>
              <input 
                type="email" 
                id="mail" 
                name="mail" 
                value={formData.mail}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre de Usuario</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input 
                type="password" 
                id="contrasena" 
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required 
              />
            </div>
            <button type="submit" className="submit-btn">Registrarse</button>
          </form>
        </div>
      </main>

      {/* Footer reutilizado */}
      <Footer />
    </div>
  );
};

export default RegistroUsuario;