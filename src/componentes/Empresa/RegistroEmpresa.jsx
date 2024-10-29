import React, { useState, useEffect } from "react";
import Header from '../Header'; // No esta resgitrado = no esta logeado
import Footer from '../Footer'; 
import '../../styles/form.css';

import { formValidation } from "../formValdiation";



const RegistroEmpresa = () => {
  const [formData, setFormData] = useState({
    mail: '',         // Estado para el campo de correo electrónico
    nombre: '',       // Estado para el campo de nombre de usuario
    contrasena: ''    // Estado para el campo de contraseña
  });

  // useEffect para ejecutar la validación cuando el componente se monta
  useEffect(() => {
    formValidation(); // Ejecutamos la validación del formulario cuando la página se carga
  }, []);

  // Función que maneja el cambio de valores en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Extraemos el nombre y el valor del input modificado
    setFormData({
      ...formData,  // Mantenemos el estado actual
      [name]: value // Actualizamos solo el campo que cambió
    });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos que la página se recargue
    console.log("Datos del formulario:", formData); // Mostramos los datos en la consola
    // Aquí podrías agregar lógica para enviar los datos a un servidor
  };
  
  return (
    <div>
      <Header />
      <main>
        <div className="registration-form">
          <h2>Registro de Usuario</h2>
          {/* Formulario de registro con los campos de correo, nombre y contraseña */}
          <form onSubmit={handleSubmit}>
            {/* Campo de correo electrónico */}
            <div className="form-group">
              <label htmlFor="mail">Mail Empresarial</label>
              <input 
                type="email" 
                id="mail" 
                name="mail" 
                value={formData.mail} // Valor actual del campo mail
                onChange={handleChange} // Maneja el cambio de valor
                required // Campo requerido
              />
            </div>
            {/* Campo de nombre de usuario */}
            <div className="form-group">
              <label htmlFor="nombre">Nombre de Usuario</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre} // Valor actual del campo nombre
                onChange={handleChange} // Maneja el cambio de valor
                required // Campo requerido
              />
            </div>
            {/* Campo de contraseña */}
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input 
                type="password" 
                id="contrasena" 
                name="contrasena"
                value={formData.contrasena} // Valor actual del campo contrasena
                onChange={handleChange} // Maneja el cambio de valor
                required // Campo requerido
              />
            </div>
            {/* Botón de envío */}
            <button type="submit" className="submit-btn">Registrarse</button>
          </form>
        </div>
      </main>

   
      <Footer />
    </div>
  );
};

export default RegistroEmpresa;