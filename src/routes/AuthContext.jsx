import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Recuperar estado de autenticación del localStorage al iniciar
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {
            isAuthenticated: false,
            userType: null,
        };
    });
    
    const navigate = useNavigate();

    // Guardar estado de autenticación en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    const login = (userType) => {
        setAuth({
            isAuthenticated: true,
            userType
        });
        
        // Redirigir según el tipo de usuario
        if (userType === 'business') {
            navigate('/businessTab');
        } else if (userType === 'individual') {
            navigate('/userTab');
        }
    };

    const logout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        setAuth({
            isAuthenticated: false,
            userType: null
        });
        navigate('/prePagina');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
