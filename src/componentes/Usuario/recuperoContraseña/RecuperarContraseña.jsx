import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; 
import '../../../styles/form.css';
import Header from '../../Header';
import Footer from '../../Footer';


const RecuperarContraseña = () => {
     {/* ESTO ES MI INTENTO DE ROUTEO*/}
     const [email, setEmail] = useState('');
     const navigate = useNavigate(); 
     // Hook para navegar a otras páginas
     
     const handleSubmit = (e) => {
        e.preventDefault();
        navigate('VerificaciónID.jsx');
  };

  return (
    <>
        <Header />

      <main>
        <div className="form">
          <h1>Recuperar contraseña</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required 
              
              onChange={(e) => setEmail(e.target.value)} 
              // Actualiza el estado si es que cambia
              />
            </div>
            <button type="submit" className="submit-btn">Enviar</button>
          </form>
        </div>
      </main>
        
        <Footer />
    </>
  );
};

export default RecuperarContraseña;
