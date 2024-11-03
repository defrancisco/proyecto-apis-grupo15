import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const UserContext = createContext();

// Crear un proveedor para el contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para el usuario

    const login = (userData) => {
        setUser(userData); // Método para iniciar sesión
    };

    const logout = () => {
        setUser(null); // Método para cerrar sesión
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook para usar el contexto
export const useUserContext = () => {
    return useContext(UserContext);
};
