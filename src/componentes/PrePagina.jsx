// src/components/PrePagina.js
import React from 'react';
import '../styles/headeryfooter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JS (sin jQuery)
import Header from './Header';
import Footer from './Footer';


const PrePagina = () => {
     // Guardamos las imágenes en un array para hacer más dinámico el carrusel
     const images = [
        { src: "./imagenes/animalcrossing.jpg", alt: "Imagen de Animal Crossing" },
        { src: "./imagenes/zelda.jpg", alt: "Imagen de Zelda" },
        { src: "./imagenes/mariokart.jpg", alt: "Imagen de Mario Kart" },
    ];

    return (
        <div>
            
            <Header /> 

            {/* CAROUSEL */}
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    {/* Iteramos sobre las imágenes para generar dinámicamente los indicadores */}
                    {images.map((_, index) => (
                        <li
                            key={index}
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                        ></li>
                    ))}
                </ol>

                <div className="carousel-inner">
                    {/* Iteramos sobre las imágenes para generar dinámicamente los items del carrusel */}
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img src={image.src} className="d-block w-100" alt={image.alt} />
                        </div>
                    ))}
                </div>

                {/* Controles del carrusel */}
                <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previo</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </a>
            </div>

            <Footer />
        </div>
    );
};

export default PrePagina;
