import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/form.css';
import { formValidation } from './formValidation';
import CambioContraseña from './recuperoContraseña/NuevaContraseña';
import VerificacionIdentidad from './recuperoContraseña/VerificaciónID';
import RecuperarContraseña from './recuperoContraseña/RecuperarContraseña';
import { useAuth } from '../../routes/AuthContext';

export const LoginCuenta = () => {
    const [isRecoveringPassword, setIsRecoveringPassword] = useState(false); // Modo de recuperación de contraseña
    const [step, setStep] = useState(1); // Estado para rastrear el paso actual en recuperación
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(Array(6).fill("")); // Estado para los dígitos del código
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    // Ejecuta la validación del formulario al montar el componente
    useEffect(() => {
        formValidation();
    }, []); // Solo se ejecuta al montar el componente

    const handleEmailSubmit = async (email) => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Código enviado al correo electrónico');
                setEmail(email);
                setStep(2);
                return Promise.resolve();
            } else {
                alert(data.message || 'Error al enviar el código');
                return Promise.reject(data.message);
            }
        } catch (error) {
            alert('Error de conexión');
            console.error(error);
            return Promise.reject(error);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.status === 429) {
                alert('Por favor espere un minuto antes de solicitar un nuevo código');
            } else if (response.ok) {
                alert('Código reenviado exitosamente');
                setCode(Array(6).fill("")); 
            } else {
                alert(data.message || 'Error al reenviar el código');
            }
        } catch (error) {
            alert('Error de conexión');
            console.error(error);
        }
    };

    const handleCodeChange = (index, value) => {
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);
    };

    const handleCodeSubmit = async () => {
        try {
            const inputCode = code.join("");
            const response = await fetch('http://localhost:3000/api/auth/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email,
                    code: inputCode 
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Código verificado correctamente');
                setStep(3);
            } else {
                alert(data.message || 'Código incorrecto');
            }
        } catch (error) {
            alert('Error de conexión');
            console.error(error);
        }
    };

    const handlePasswordSubmit = async (newPassword, confirmPassword) => {
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    newPassword,
                    code: code.join("")
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Contraseña actualizada exitosamente');
                // Limpiar todos los estados
                setEmail('');
                setPassword('');
                setCode(Array(6).fill(""));
                setStep(1);
                setIsRecoveringPassword(false);
                // Redirigir al login
                navigate('/iniciarSesion/loginCuenta');
            } else {
                alert(data.message || 'Error al cambiar la contraseña');
            }
        } catch (error) {
            alert('Error de conexión');
            console.error(error);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            setIsRecoveringPassword(false);
            setStep(1);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <RecuperarContraseña 
                    onSubmit={handleEmailSubmit} 
                    onResend={handleResendCode}
                    onBack={() => setIsRecoveringPassword(false)}
                />;
            case 2:
                return <VerificacionIdentidad 
                    code={code} 
                    onCodeChange={handleCodeChange} 
                    onSubmit={handleCodeSubmit}
                    onResend={handleResendCode}
                    onBack={() => setStep(1)}
                />;
            case 3:
                return <CambioContraseña 
                    onSubmit={handlePasswordSubmit}
                    onBack={() => setStep(2)}
                />;
            default:
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token y tipo de usuario
                localStorage.setItem('token', data.token);
                
                // Usar la función login del contexto con el tipo de usuario correcto
                login(data.userType);
                
                // La redirección se maneja automáticamente en el AuthContext
            } else {
                alert('Credenciales inválidas');
            }
        } catch (error) {
            alert('Error al iniciar sesión');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <main>
                {!isRecoveringPassword ? (
                    // Formulario de inicio de sesión
                    <div className="form">
                        <h1>Inicia Sesión</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contrasena">Contraseña</label>
                                <input 
                                    type="password" 
                                    id="contrasena" 
                                    name="contrasena" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="submit-btn">Iniciar Sesión</button>
                        </form>
                        <button 
                            className="forgot-password" 
                            onClick={() => setIsRecoveringPassword(true)}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                ) : (
                    // Pasos de recuperación de contraseña
                    <div className="recovery-steps">
                        {renderStep()}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LoginCuenta;
