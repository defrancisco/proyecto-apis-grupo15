import React, { useEffect, useState } from 'react'
import '../../styles/infojuegos.css';
import { useParams } from 'react-router-dom';

function Juego() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api/games/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Game not found');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setGame(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setGame(null);
                setLoading(false);
            });
    }, [id]);

    const handleAddToWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debes iniciar sesión para agregar juegos a tu lista de deseos');
                return;
            }

            const response = await fetch(`http://localhost:3000/api/users/wishlist/${game.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Juego agregado a la lista de deseos exitosamente');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Error al agregar a la lista de deseos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!game) {
        return <p>Juego no encontrado</p>;
    }


    return (
        <div>
            <div className="infojuego-container">
                <div className="infojuego-content">
                    <div className="infojuego-image-section">
                    <img src={`http://localhost:3000/api/games/${game.id}/image`} alt={game.name} />
                    </div>
                    <div className="infojuego-details-section">
                        <h2 className="game-title">{game.name}</h2>
                        <span className="category-label">{game.categories}</span>
                        <h3 className="price">${game.price}</h3>


                        <div className="button-group">
                            <button type="button" className="btn primary-btn">Agregar al carrito</button>
                            <button 
                                type="button" 
                                className="btn secondary-btn"
                                onClick={handleAddToWishlist}
                            >
                                Agregar a la lista de deseos
                            </button>
                        </div>

                        <div className="description-section">
                            <h4>Descripción</h4>
                            <p>{game.description}</p>
                            <h5>Requisitos mínimos del sistema</h5>
                            <p>{game.minRequirements}</p>
                            <h5>Requisitos recomendados del sistema</h5>
                            <p>{game.recommendedRequirements}</p>
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
        </div>
    )
}

export default Juego;