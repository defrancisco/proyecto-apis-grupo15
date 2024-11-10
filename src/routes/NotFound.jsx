import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/prePagina'); // Redirige a prePagina después de 5 segundos
        }, 2000);

        return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}> 
            <h1>404 Not Found</h1> 
            <img src="https://http.cat/404" alt="404 Not Found" style={{ width: '50%', height: 'auto' }} /> 
        </div>
    );
};

export default NotFound;
