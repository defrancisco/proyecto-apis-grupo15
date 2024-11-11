import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/headeryfooter.css'; 
import logo from './imagenes/logo.png';
import shoppingcart from './imagenes/shoppingcart.jpg';
import profile from './imagenes/profile.png';
import { useAuth } from '../routes/AuthContext';

function Header() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/iniciarSesion/loginCuenta');
        // Forzar recarga del componente
        window.location.reload();
    };

    const renderNavLinks = () => {
        // Enlaces básicos que siempre se muestran
        const basicLinks = [
            { to: "/prePagina", text: "Inicio" },
            { to: "/catalogo", text: "Catálogo" },
            { to: "/quienesSomos", text: "Quienes somos" }
        ];

        // Enlaces adicionales para usuarios individuales
        const individualLinks = [
            { to: auth.isAuthenticated ? "/userTab#wishlist" : "/iniciarSesion/loginCuenta", text: "Wishlist" },
            { to: "/consolas", text: "Consolas" },
            { to: "/ayuda", text: "Ayuda" }
        ];

        // Determinar qué enlaces mostrar
        const linksToShow = auth.userType === 'business' ? basicLinks : [...basicLinks, ...individualLinks];

        return (
            <ul>
                {linksToShow.map((link, index) => (
                    <li key={index}><Link to={link.to}>{link.text}</Link></li>
                ))}
            </ul>
        );
    };

    return (
        <header>
            <div className="header-container">
                <div className="container-left">
                    <Link to="/prePagina" className="logo">
                        <img src={logo} alt="Nintendo Logo" />
                    </Link>

                    <nav>
                        {renderNavLinks()}
                    </nav>
                </div>

                <div className="auth-buttons">
                    {auth.isAuthenticated ? (
                        <>
                            <Link to={auth.userType === 'business' ? '/businessTab' : '/userTab'}>
                                <div className="profile-container">
                                    <img src={profile} alt="Perfil" className="profile-icon" />
                                    <span className="user-name">
                                        {console.log('auth:', auth)}
                                        {auth.userType === 'business' 
                                            ? (auth.businessName || 'Empresa') 
                                            : (auth.name || 'Usuario')}
                                    </span>
                                </div>
                            </Link>
                            <button onClick={logout} className="logout-btn">
                                Cerrar sesión
                            </button>
                            {auth.userType !== 'business' && (
                                <Link to="/carrito" className="logo">
                                    <img src={shoppingcart} alt="Cart Logo" />
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/iniciarSesion/loginCuenta">
                                <button id="login-btn">Iniciar sesión</button>
                            </Link>
                            <Link to="/iniciarSesion">
                                <button id="register-btn">Registrarse</button>
                            </Link>
                            <Link to="/carrito" className="logo">
                                <img src={shoppingcart} alt="Cart Logo" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
