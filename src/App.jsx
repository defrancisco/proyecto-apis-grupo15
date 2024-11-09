import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import NotFound from "./routes/NotFound";
import CheckWrapper from "./routes/CheckWrapper.jsx";

// Componentes
import PrePagina from "./componentes/PrePagina.jsx";
import Login from "./componentes/Login.jsx";
import LoginCuenta  from "./componentes/IniciosSesion/LoginCuenta.jsx";
import Catalogo from "./componentes/Compras/Catalogo.jsx";
import Carrito from "./componentes/Compras/Carrito.jsx";
import Reseña from "./componentes/Compras/Reseña.jsx";
import Checkout from "./componentes/Compras/Checkout.jsx";
import Juego from "./componentes/Compras/Juego.jsx";

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

// Contexto de Autenticación

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        errorElement: <NotFound />,
        children: [
            { path: "prePagina", element: <PrePagina /> },
            { path: "quienesSomos", element: <QuienesSomos /> },
            { path: "ayuda", element: <Ayuda /> },
            { path: "consolas", element: <Consolas /> },
            { path: "contacto", element: <ContactForm /> },
            { path: "catalogo", element: <Catalogo /> },
            { path: "juego/:id", element: <Juego /> },
            { path: "carrito", element: <Carrito />,
                children: [
                    { path: "carrito/:checkout", element: <Checkout /> },
                ]
            },
            { path: "iniciarSesion", element: <Login /> },
            { path: "iniciarSesion/:loginCuenta", element: <LoginCuenta />},
            { path: "iniciarSesion/registroUsuario", element: <RegistroUsuario /> },
            { path: "iniciarSesion/registroEmpresa", element: <RegistroEmpresa /> },
            { 
                path: "userTab", 
                element: (
                    <CheckWrapper allowedAccountType="user">
                        <UserTab />
                    </CheckWrapper>
                ),
            },
            { 
                path: "businessTab", 
                element: (
                    <CheckWrapper allowedAccountType="business">
                        <BusinessTab />
                    </CheckWrapper>
                ),
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
    return (
        <RouterProvider router={router} />
    );
}
