import React, { useState, useEffect } from "react";
import '../../styles/form.css';
import { formValidation } from "../IniciosSesion/formValidation";

const RegistroEmpresa = () => {
  const [formData, setFormData] = useState({
    mail: '',
    nombre: '',
    contrasena: ''
  });

  useEffect(() => {
    formValidation();
  }, []);

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
  );
};

export default RegistroEmpresa;