import React, { useState, useEffect } from "react";
import '../../styles/form.css';
import { formValidation } from "../IniciosSesion/formValidation";
import { useNavigate } from 'react-router-dom';

const RegistroEmpresa = () => {
  const [formData, setFormData] = useState({
    mail: '',
    nombre: '',
    contrasena: ''
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = {
        email: formData.mail,
        password: formData.contrasena,
        userType: 'business',
        businessName: formData.nombre
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
        localStorage.setItem('userType', 'business');
        alert('Empresa registrada exitosamente');
        navigate('/iniciarSesion/loginCuenta');
      } else {
        throw new Error(data.message || 'Error al registrar empresa');
      }
    } catch (error) {
      console.error('Error completo:', error);
      alert(error.message || 'Error de conexión con el servidor');
    }
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