import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../Header';
import Footer from '../../Footer';


const CambioContraseña = () => {
  return (
    <>
      <Header />
      <main>
        <div className="form">
          <h1>Cambio de contraseña</h1>
          <form>
            <div className="form-group">
              <label htmlFor="old-pass">Contraseña actual</label>
              <input type="password" id="oldPass" name="old-pass" required />
            </div>
            <div className="form-group">
              <label htmlFor="new-pass">Nueva contraseña</label>
              <input type="password" id="new-pass" name="new-pass" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-new-pass">Confirmar nueva contraseña</label>
              <input type="password" id="confirm-new-pass" name="confirm-new-pass" required />
            </div>
            <button type="submit" className="submit-btn">Confirmar contraseña</button>
          </form>
          <Link to="/recuperar-contraseña" className="forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CambioContraseña;
