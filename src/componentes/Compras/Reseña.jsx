import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/reseña.css';


function Reseña() {
    return (
        <div>
            <Header />
            <div className="review-page">
                <div className="review-content">
                    <div className="game-info">
                        <h5>Nombre del Juego</h5>
                        <p>Descripción</p>
                    </div>
                    <div className="review-box">
                        <h6>¿Qué te pareció el juego?</h6>
                        <div className="rating">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                        </div>
                        <textarea className="review-textarea" rows="5" placeholder="Escribí tu reseña acá (opcional)"></textarea>
                        <button className="submit-button">Subir</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reseña
