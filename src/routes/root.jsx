import React, { createContext, useContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import ErrorBoundary from './ErrorBoundary';
import '../styles/mensajeBienvenida.css';

// Crear contexto para el usuario
const UserContext = createContext();

// Hook personalizado para acceder al contexto del usuario
export const useUser = () => {
    return useContext(UserContext);
};

// Proveedor de contexto para gestionar el tipo de usuario
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    const loginUser = (type) => {
        setUserType(type);
        if (type === 'cliente') {
            navigate('/usuarioTab');
        } else if (type === 'empresa') {
            navigate('/businessTab');
        }
    };

    return (
        <UserContext.Provider value={{ userType, setUserType, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Función loader para simular la carga de datos
export const loader = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Cargado correctamente :)', firstLoad: true });
        }, 1000);
    });
};

// Componente Root principal que engloba toda la aplicación
export default function Root() {
    const [firstLoad, setFirstLoad] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Simular carga inicial
        const timer = setTimeout(() => {
            setFirstLoad(false);
            navigate('/prePagina'); // Redirige a /prePagina después de la carga inicial
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <UserProvider>
            <ErrorBoundary>
                <Header />
                {firstLoad ? (
                    <div className="mensaje-bienvenida">
                        <h1>Inicia la aventura en Nintendo</h1>
                        <p>¡Explora y descubre todo lo que tenemos para ofrecer!</p>
                    </div>
                ) : (
                    <Outlet />
                )}
                <Footer />
            </ErrorBoundary>
        </UserProvider>
    );
}
