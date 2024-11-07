import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";


// Componentes
import PrePagina from "./componentes/PrePagina.jsx";
import Login from "./componentes/Login.jsx";
import LoginCuenta  from "./componentes/IniciosSesion/LoginCuenta.jsx";


import Catalogo from "./componentes/Compras/Catalogo.jsx";
import CarritoCompras from "./componentes/Compras/CarritoCompras.jsx";
import Reseña from "./componentes/Compras/Reseña.jsx";
import MetodoPago from "./componentes/Compras/MetodoPago.jsx";
import InformacionJuego from "./componentes/Compras/InformacionJuego.jsx";

// Header y Footer
import Ayuda from "./componentes/extras/Ayuda.jsx";
import QuienesSomos from "./componentes/extras/QuienesSomos.jsx";
import Consolas from "./componentes/extras/Consolas.jsx";
import ContactForm from "./componentes/extras/ContactForm.jsx";


import UserTab from "./componentes/Usuario/UserTab.jsx";
import RegistroUsuario from "./componentes/Usuario/RegistroUsuario.jsx";


import BusinessTab from "./componentes/Empresa/BusinessTab.jsx"; 
import ModificacionVideojuego from "./componentes/Empresa/ModificacionJuego.jsx";
import RegistroEmpresa from "./componentes/Empresa/RegistroEmpresa.jsx";
import CreacionVideojuego from "./componentes/Empresa/CreacionJuego.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
            { path: "prueba", element: <h1>Hola Mundo</h1> },
            { path: "prePagina", element: <PrePagina /> },

            // Páginas que aparecen tanto en Footer como en Header
            { path: "quienesSomos", element: <QuienesSomos /> },
            { path: "ayuda", element: <Ayuda /> },
            { path: "consolas", element: <Consolas /> },
            { path: "contacto", element: <ContactForm /> },
            
            // Catálogo 
            { path: "catalogo", element: <Catalogo />,
                children: [
                    { path: "catalogo/:videojuego", element: <InformacionJuego /> },
                    { path: "catalogo/:videojuego/:crearReseña", element: <Reseña />},
                ]
            },

            // Carrito de Compras
            { 
                path: "carritoCompras", 
                element: <CarritoCompras />,
                children: [
                    {path: "carritoCompras/:metodoPago", element: <MetodoPago /> },
                ]
            },

            // Sección de Inicio de Sesión
            { path: "iniciarSesion", element: <Login />,},
        
            // Si es que quiero crear una cuenta
            { path: "iniciarSesion/:registroUsuario", element: <RegistroUsuario /> },
            { path: "iniciarSesion/:registroEmpresa", element: <RegistroEmpresa />},
            { path: "iniciarSesion/:loginCuenta", element: <LoginCuenta />},          
                    
            // Usuario perfiles
            { path: "userTab", element: <UserTab /> },

            // Empresa perfiles
            { path: "businessTab", element: <BusinessTab />,
                children: [
                        { path: "businessTab/:creacionVideojuego", element: <CreacionVideojuego /> },
                        { path: "businessTab/:modificacionVideoJuego", element: <ModificacionVideojuego /> }
                        ]
                    },
                ]
            },
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
    return <RouterProvider router={router} />;
}