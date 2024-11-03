import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Componentes
import Root, { loader as rootLoader } from "./routes/root";
import Catalogo from "./componentes/Compras/Catalogo/Catalogo.jsx";
import Videojuego from "./componentes/Compras/Catalogo/Videojuego.jsx";
import CarritoCompras from "./componentes/Compras/CarritoCompras/CarritoCompras.jsx";
import ResumenCompra from "./componentes/Compras/CarritoCompras/ResumenCompra.jsx";
import Producto from "./componentes/Compras/CarritoCompras/Producto.jsx";
import PrePagina from "./componentes/PrePagina.jsx";
import Ayuda from "./componentes/extras/Ayuda.jsx";
import QuienesSomos from "./componentes/extras/QuienesSomos.jsx";
import Consolas from "./componentes/extras/Consolas.jsx";
import ContactForm from "./componentes/extras/ContactForm.jsx";
import LoginEmpresa from "./componentes/Empresa/LoginEmpresa.jsx";
import Login from "./componentes/Login.jsx";
import LoginUsuario from "./componentes/Usuario/LoginUsuario";
import UserTab from "./componentes/Usuario/UserTab.jsx";
import RegistroUsuario from "./componentes/Usuario/RegistroUsuario.jsx";
import VerificacionID from "./componentes/Usuario/recuperoContraseña/VerificaciónID.jsx";
import NuevaContraseña from "./componentes/Usuario/recuperoContraseña/NuevaContraseña.jsx";
import RecuperarContraseña from "./componentes/Usuario/recuperoContraseña/RecuperarContraseña.jsx";
import BusinessTab from "./componentes/Empresa/BusinessTab.jsx"; 
import ModificacionVideojuego from "./componentes/Empresa/ModificacionJuego.jsx";
import RegistroEmpresa from "./componentes/Empresa/RegistroEmpresa.jsx";
import CreacionVideojuego from "./componentes/Empresa/CreacionJuego.jsx";






// Crear rutas
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
            {path: "prueba",element: <h1>Hola Mundo</h1> },
            { path: "prePagina", element: <PrePagina /> },
            { path: "quienesSomos", element: <QuienesSomos /> },
            { path: "ayuda", element: <Ayuda /> },
            { path: "consolas", element: <Consolas /> },
            { path: "contacto", element: <ContactForm /> },
            { 
                path: "catalogo", 
                element: <Catalogo />,
                children: [{ path: "videojuego", element: <Videojuego /> }]
            },
            { 
                path: "carritoCompras", 
                element: <CarritoCompras />,
                children: [
                    { path: "producto", element: <Producto /> },
                    { path: "resumenCompra", element: <ResumenCompra /> }
                ]
            },
            { 
                path: "iniciarSesion", 
                element: <Login />,
                children: [
                    { path: "loginUsuario", element: <LoginUsuario />,
                        children: [
                            { path: "userTab", element: <UserTab />,
                                children: [
                                    { path: "registroUsuario", element: <RegistroUsuario /> },
                                    { path: "recuperarContraseña", element: <VerificacionID /> },
                                ]
                            },
                            { path: "recuperarContraseña", element: <VerificacionID />,
                                children: [
                                    { path: "nuevaContraseña", element: <NuevaContraseña /> },
                                    { path: "recuperarContraseña", element: <RecuperarContraseña /> },
                                ]
                            },
                        ]
                    },
                    { path: "loginEmpresa", element: <LoginEmpresa />,
                        children: [
                            { path: "registroEmpresa", element: <RegistroEmpresa /> },
                            { path: "bussinessTab", element: <BusinessTab />,
                                children: [
                                    { path: "creacionJuego", element: <CreacionVideojuego /> },
                                    { path: "modificacionJuego", element: <ModificacionVideojuego /> },
                                ]
                            },
                        ]
                    },
                ]
            },
        ],
    },
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
    return <RouterProvider router={router} />
}
