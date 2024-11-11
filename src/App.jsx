import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './routes/AuthContext';
import Root from "./routes/root";
import NotFound from "./routes/NotFound";
import CheckWrapper from "./routes/CheckWrapper.jsx";
import { loader as rootLoader } from "./routes/root"; // Asegúrate de importar el loader correctamente

// Componentes
import PrePagina from "./componentes/PrePagina.jsx";
import Login from "./componentes/Login.jsx";
import LoginCuenta from "./componentes/IniciosSesion/LoginCuenta.jsx";
import Catalogo from "./componentes/Compras/Catalogo.jsx";
import Carrito from "./componentes/Compras/Carrito.jsx";
import Checkout from "./componentes/Compras/Checkout.jsx";
import Juego from "./componentes/Compras/Juego.jsx";
import Reseña from "./componentes/Compras/Reseña.jsx";

// Header y Footer
import Ayuda from "./componentes/extras/Ayuda.jsx";
import QuienesSomos from "./componentes/extras/QuienesSomos.jsx";
import Consolas from "./componentes/extras/Consolas.jsx";
import ContactForm from "./componentes/extras/ContactForm.jsx";

// Usuario
import UserTab from "./componentes/Usuario/UserTab.jsx";
import { RegistroUsuario } from "./componentes/Usuario/RegistroUsuario";

// Empresa
import BusinessTab from "./componentes/Empresa/BusinessTab.jsx";
import ModificacionVideojuego from "./componentes/Empresa/ModificacionJuego.jsx";
import RegistroEmpresa from "./componentes/Empresa/RegistroEmpresa.jsx";
import CreacionVideojuego from "./componentes/Empresa/CreacionJuego.jsx";

// Nuevo componente Endpoints
import Endpoints from "./componentes/Endpoints.jsx"; // Asegúrate de tener esta ruta correcta


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <Root />
            </AuthProvider>
        ),
        loader: rootLoader, 
        errorElement: <NotFound />,
        children: [
            { path: "prePagina", element: <PrePagina /> },

            // Header y Footer ~ reutilizamos :)
            { path: "quienesSomos", element: <QuienesSomos /> },
            { path: "ayuda", element: <Ayuda /> },
            { path: "consolas", element: <Consolas /> },
            { path: "contacto", element: <ContactForm /> },
            { path: "catalogo", element: <Catalogo /> },
            { path: "juego/:id", element: <Juego />, },
            { path: "juego/:id/reseña", element: <Reseña /> },
            { path: "carrito", element: <Carrito /> },
            { path: "carrito/:checkout", element: <Checkout /> },

            // Iniciar Sesión
            { path: "iniciarSesion", element: <Login /> },

            // Opción 1: Ya tengo cuenta entonces inicio sesión
            { path: "iniciarSesion/:loginCuenta", element: <LoginCuenta />},

            // Opción 2: No tengo cuenta entonces creo una dependiendo de mi rol
            { path: "iniciarSesion/registroUsuario", element: <RegistroUsuario /> },
            { path: "iniciarSesion/registroEmpresa", element: <RegistroEmpresa /> },
            

            // Perfil de Usuario/Cliente
            { 
                path: "userTab", 
                element: (
                    <CheckWrapper allowedAccountType="individual">
                        <UserTab />
                    </CheckWrapper>
                ),
            },
            
            // Perfil de Empresa
            { 
                path: "businessTab", 
                element: (
                    <CheckWrapper allowedAccountType="business">
                        <BusinessTab />
                    </CheckWrapper>
                )
            },
            { path: "businessTab/creacionVideojuego", element: <CreacionVideojuego /> },
            { path: "businessTab/modificacionJuego/:id", element: <ModificacionVideojuego /> },
            
            // Nueva ruta para Endpoints
            { path: "endpoints", element: <Endpoints /> }
    
        
        ]
    },
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
    return (
        <RouterProvider router={router} />
    );
}
