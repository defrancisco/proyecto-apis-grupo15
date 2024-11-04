import React, { createContext, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Crear contexto para el usuario
const UserContext = createContext();

// Hook personalizado para acceder al contexto del usuario
export const useUser = () => {
    return useContext(UserContext);
};

// Proveedor de contexto para gestionar el tipo de usuario
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null); // null, 'cliente', o 'empresa'
    const navigate = useNavigate();

    // Función para iniciar sesión que asigna el tipo de usuario
    const loginUser = (type) => {
        setUserType(type);
        // Redirigir según el tipo de usuario
        if (type === 'cliente') {
            navigate('/usuarioTab'); // Ruta para el cliente
        } else if (type === 'empresa') {
            navigate('/businessTab'); // Ruta para la empresa
        }
    };

    return (
        <UserContext.Provider value={{ userType, setUserType, loginUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Componente Root principal que engloba toda la aplicación
export default function Root() {
    return (
        <UserProvider> 
            <Outlet />  {/* Punto de inserción para el contenido de las rutas hijas */}
        </UserProvider>
    );
}
