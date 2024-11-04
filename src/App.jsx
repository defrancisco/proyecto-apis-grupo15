import CreacionVideojuego from "./componentes/Empresa/CreacionJuego";
import ModificacionVideojuego from "./componentes/Empresa/ModificacionJuego";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
            { path: "prueba", element: <h1>Hola Mundo</h1> },
            { path: "prePagina", element: <PrePagina /> },
            { path: "quienesSomos", element: <QuienesSomos /> },
            { path: "ayuda", element: <Ayuda /> },
            { path: "consolas", element: <Consolas /> },
            { path: "contacto", element: <ContactForm /> },
            { 
                path: "catalogo", 
                element: <Catalogo />,
                children: [
                    { path: "videojuego", element: <Videojuego /> }
                ]
            },
            { 
                path: "carritoCompras", 
                element: <CarritoCompras />,
                children: [
                    { path: "producto", element: <Producto /> },
                    { path: "resumenCompra", element: <ResumenCompra /> }
                ]
            },
            // Sección de Inicio de Sesión
            { 
                path: "iniciarSesion", 
                element: <Login />,
                children: [
                    // Subrutas para LoginUsuario y LoginEmpresa
                    { 
                        path: "loginUsuario", 
                        element: <LoginUsuario />,
                        children: [
                            { path: "registroUsuario", element: <RegistroUsuario /> },
                            { path: "recuperarContraseña", element: <VerificacionID />,
                                children: [
                                    { path: "nuevaContraseña", element: <NuevaContraseña /> },
                                    { path: "finalizarRecuperacion", element: <RecuperarContraseña /> }
                                ]
                            }
                        ]
                    },
                    // emprea
                    { 
                        path: "loginEmpresa", 
                        element: <LoginEmpresa />,
                        children: [
                            { path: "registroEmpresa", element: <RegistroEmpresa /> },
                            { path: "businessTab", element: <BusinessTab />,
                                children: [
                                    { path: "creacionJuego", element: <CreacionVideojuego /> },
                                    { path: "modificacionJuego", element: <ModificacionVideojuego /> }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
    return <RouterProvider router={router} />;
}
