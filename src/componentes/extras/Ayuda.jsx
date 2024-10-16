import React from 'react';
import '../../styles/ayuda.css';

const Ayuda = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-4">¿Necesitas Ayuda?</h1>
      <div className="row justify-content-center">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card border-danger">
            <div className="card-body">
              <h5 className="card-title">Ayuda por Servicio al Cliente</h5>
              <p className="card-text">
                Nuestro equipo de servicio al cliente está disponible para ayudarte con cualquier consulta o problema que puedas tener. Nos aseguramos de brindarte una atención personalizada y efectiva para resolver tus inquietudes rápidamente.
              </p>
              <a href="#" className="btn btn-danger">Servicio al Cliente</a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card border-danger">
            <div className="card-body">
              <h5 className="card-title">Ayuda por Soporte Técnico</h5>
              <p className="card-text">
                Si experimentas problemas técnicos o necesitas asistencia con nuestros productos, nuestro equipo de soporte técnico está aquí para ayudarte. Contáctanos y resolveremos cualquier inconveniente que enfrentes.
              </p>
              <a href="#" className="btn btn-danger">Soporte Técnico</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
