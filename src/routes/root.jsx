import React, { createContext, useContext, useState } from 'react'; // Importa las funciones necesarias
import { Outlet } from 'react-router-dom';

export function loader() {
  // Aquí podrías cargar datos iniciales para la aplicación si es necesario
  return {};
}

//--------------------------------------------------
// Crear un contexto para el usuario
const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null); // null, 'personal', o 'business'

    return (
        <UserContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserContext.Provider>
    );
};
//--------------------------------------------------

// Código Principal 
export default function Root() {
  return (
    <UserProvider> {/* Asegúrate de envolver Outlet con el UserProvider */}
      <Outlet />
    </UserProvider>
  );
}
