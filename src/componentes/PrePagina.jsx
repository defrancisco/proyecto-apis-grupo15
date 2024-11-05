import React, { useState } from 'react';
import '../styles/carrousel.css';

import animalcrossing from './imagenes/animalcrossing.jpg';
import mariokart from './imagenes/mariokart.jpg';
import zelda from './imagenes/zelda.jpg';
import zeldaEoW from './imagenes/zeldaEoW.png';
import baldursGate from './imagenes/baldursGate.jpg';
import pokemonScarlet from './imagenes/pokemonScarlet.png';
import pokemonViolet from './imagenes/pokemonViolet.png';
import rainbowSixSiege from './imagenes/rainbowSixSiege.jpg';
import redDeadRedemption2 from './imagenes/redDeadRedemption2.jpg';

const images = [
    animalcrossing,
    mariokart,
    zelda,
    zeldaEoW,
    baldursGate,
    pokemonScarlet,
    pokemonViolet,
    rainbowSixSiege,
    redDeadRedemption2,
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

            <div className="carousel">
                <div className="carousel-inner" style={{ transform: `translateX(-${current * 100}vw)` }}>
                    {images.map((image, index) => (
                        <div key={index} className="carousel-item">
                            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
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

        </div>
    );
};

export default PrePagina;