import React, { useEffect, useState } from 'react'
import '../../styles/infojuegos.css';
import { useParams, useNavigate } from 'react-router-dom';

function Juego() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserType(decodedToken.userType);
        }

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

        fetch(`http://localhost:3000/api/games/${id}/reviews`)
            .then((response) => response.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error('Error fetching reviews:', error));
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

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debes iniciar sesión para agregar juegos al carrito');
                return;
            }

            const response = await fetch('http://localhost:3000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    gameId: game.id,
                    quantity: 1
                })
            });

            if (response.ok) {
                alert('Juego agregado al carrito exitosamente');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Error al agregar al carrito');
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
                <button 
                    onClick={() => navigate(-1)} 
                    className="back-button"
                >
                    ← Volver
                </button>
                
                <div className="infojuego-content">
                    <div className="infojuego-image-section">
                    <img src={`http://localhost:3000/api/games/${game.id}/image`} alt={game.name} />
                    </div>
                    <div className="infojuego-details-section">
                        <h2 className="game-title">{game.name}</h2>
                        <span className="category-label">{game.categories}</span>
                        <h3 className="price">${game.price}</h3>


                        <div className="button-group">
                            {userType === 'individual' ? (
                                <>
                                    <button 
                                        type="button" 
                                        className="btn primary-btn"
                                        onClick={handleAddToCart}
                                    >
                                        Agregar al carrito
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn secondary-btn"
                                        onClick={handleAddToWishlist}
                                    >
                                        Agregar a la lista de deseos
                                    </button>
                                </>
                            ) : (
                                <p className="text-warning">
                                    Solo usuarios individuales pueden agregar juegos al carrito o a la lista de deseos
                                </p>
                            )}
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

                {reviews.length > 0 && (
                    <div className="reviews-section">
                        <h4>Últimas reseñas</h4>
                        {reviews.map(review => (
                            <div key={review.id} className="review-entry">
                                <div className="rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                                </div>
                                <p>{review.User?.name || review.User?.businessName}</p>
                                <p>{review.content}</p>
                                <p className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <button type="button" className="btn create-review-btn"
                onClick={() => navigate(`/juego/${game.id}/reseña`)}>Crear Reseña</button>
            </div>
        </div>
    )
}

export default Juego;