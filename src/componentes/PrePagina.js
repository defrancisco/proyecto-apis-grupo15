// src/components/PrePagina.js
import React from 'react';
import '../styles/headeryfooter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JS (sin jQuery)
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';

const PrePagina = () => {
    return (
        <div>
            <Header />

            {/* CAROUSEL */}
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/imagenes/animalcrossing.jpg" className="d-block w-100" alt="Imagen de Animal Crossing" />
                    </div>
                    <div className="carousel-item">
                        <img src="/imagenes/zelda.jpg" className="d-block w-100" alt="Imagen de Zelda" />
                    </div>
                    <div className="carousel-item">
                        <img src="/imagenes/mariokart.jpg" className="d-block w-100" alt="Imagen de Mario Kart" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previo</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </a>
            </div>

            <Footer />
        </div>
    );
};

export default PrePagina;
