import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/headeryfooter.css'; 
import logo from './imagenes/logo.png';
import shoppingcart from './imagenes/shoppingcart.jpg';
import profile from './imagenes/profile.png';
import { useAuth } from '../routes/AuthContext';

function Header() {
    const { auth, logout } = useAuth();

    return (
        <header>
            <div className="header-container">
                <div className="container-left">
                    <Link to="/prePagina" className="logo">
                        <img src={logo} alt="Nintendo Logo" />
                    </Link>

                    <nav>
                        <ul>
                            <li><Link to="/prePagina">Inicio</Link></li>
                            <li><Link to="/catalogo">Catálogo</Link></li>
                            <li><Link to={auth.isAuthenticated ? "/wishlist" : "/iniciarSesion/loginCuenta"}>Wishlist</Link></li>
                            <li><Link to="/consolas">Consolas</Link></li>
                            <li><Link to="/quienesSomos">Quienes somos</Link></li>
                            <li><Link to="/ayuda">Ayuda</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="auth-buttons">
                    {auth.isAuthenticated ? (
                        <>
                            <Link to={auth.userType === 'business' ? '/businessTab' : '/userTab'}>
                                <img src={profile} alt="Perfil" className="profile-icon" /> 
                            </Link>
                            <button onClick={logout} className="logout-btn">
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/iniciarSesion/loginCuenta">
                                <button id="login-btn">Iniciar sesión</button>
                            </Link>
                            <Link to="/iniciarSesion">
                                <button id="register-btn">Registrarse</button>
                            </Link>
                        </>
                    )}
                    <Link to="/carrito" className="logo">
                        <img src={shoppingcart} alt="Cart Logo" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
