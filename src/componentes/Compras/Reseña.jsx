import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/reseña.css';

function Reseña() {
    const { id } = useParams(); // Obtiene el id del juego desde la URL
    const [gameData, setGameData] = useState(null); // Estado para los datos del juego
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');

    useEffect(() => {
        // Obtener información del juego desde el backend
        const fetchGameData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/games/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setGameData(data); // Guardar los datos del juego
                } else {
                    throw new Error('Error al obtener los datos del juego');
                }
            } catch (error) {
                console.error(error);
                alert('Ocurrió un error al cargar la información del juego.');
            }
        };

        fetchGameData();
    }, [id]);

    const handleReviewSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/games/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ 
                    gameId: id,  
                    rating, 
                    content 
                }),
            });

            if (response.ok) {
                alert('Reseña enviada con éxito');
                window.history.back(); 
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al enviar la reseña');
            }
        } catch (error) {
            console.error(error);
            alert(error.message || 'Ocurrió un error al enviar la reseña.');
        }
    };

    return (
        <div>
            <div className="review-page">
                <div className="review-content">
                    <div className="game-info">
                        {gameData ? (
                            <>
                                <img src={`http://localhost:3000/api/games/${gameData.id}/image`} alt={gameData.name} />
                                <h5>{gameData.name}</h5>
                                <p>{gameData.description}</p>
                            </>
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <div className="review-box">
                        <h6>¿Qué te pareció el juego?</h6>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{ color: star <= rating ? 'gold' : 'gray', cursor: 'pointer' }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            className="review-textarea"
                            rows="5"
                            placeholder="Escribí tu reseña acá (opcional)"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button className="submit-button" onClick={handleReviewSubmit}>
                            Subir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reseña;
