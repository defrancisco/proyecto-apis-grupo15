import React, { useState } from 'react';
import '../styles/carousel';
import Header from './Header';
import Footer from './Footer';

const images = [
    { src: './imagenes/animalcrossing.jpg', alt: 'Imagen de Animal Crossing' },
    { src: './imagenes/zelda.jpg', alt: 'Imagen de Zelda' },
    { src: './imagenes/mariokart.jpg', alt: 'Imagen de Mario Kart' }
];

const PrePagina = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((current + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((current - 1 + images.length) % images.length);
    };

    return (
        <div>
            <Header />

            <div className="carousel">
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === current ? 'active' : ''}`}
                        >
                            <img src={image.src} alt={image.alt} className="carousel-image" />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="carousel-control-next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default PrePagina;
