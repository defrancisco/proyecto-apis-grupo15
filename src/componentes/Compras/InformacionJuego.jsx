import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import '../../styles/infojuegos.css';

function InformacionJuego() {
    return (
        <div>
            <Header />
            <div className="infojuego-container">
                <div className="infojuego-content">
                    <div className="infojuego-image-section">
                        <div className="image-placeholder"></div>
                    </div>
                    <div className="infojuego-details-section">
                        <h2 className="game-title">NOMBRE DEL JUEGO</h2>
                        <span className="category-label">Categoría</span>
                        <h3 className="price">$PRECIO</h3>

                        <div className="company-logo-placeholder"></div>

                        <label htmlFor="quantity" className="quantity-label">Cantidad</label>
                        <input type="number" min="1" defaultValue="1" className="quantity-input" id="quantity" />

                        <div className="button-group">
                            <button type="button" className="btn primary-btn">Agregar al carrito</button>
                            <button type="button" className="btn secondary-btn">Agregar a la lista de deseos</button>
                        </div>

                        <div className="description-section">
                            <h4>Descripción</h4>
                            <p>Descripción del videojuego text</p>
                            <h5>Requisitos mínimos del sistema</h5>
                            <p>Text</p>
                            <h5>Requisitos recomendados del sistema</h5>
                            <p>Text</p>
                        </div>
                    </div>
                </div>

                <div className="reviews-section">
                    <h4>Últimas reseñas</h4>
                    <div className="review-entry">
                        <h5>Review title</h5>
                        <p>Reviewer name - Date</p>
                        <p>Review body</p>
                    </div>
                    <div className="review-entry">
                        <h5>Review title</h5>
                        <p>Reviewer name - Date</p>
                        <p>Review body</p>
                    </div>
                    <div className="review-entry">
                        <h5>Review title</h5>
                        <p>Reviewer name - Date</p>
                        <p>Review body</p>
                    </div>
                </div>

                <button type="button" className="btn create-review-btn">Crear Reseña</button>
            </div>
            <Footer />
        </div>
    )
}

export default InformacionJuego