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
    }, []);

    const handleEmailSubmit = (email) => {
        alert(`Código enviado a ${email}`);
        setEmail(email);
        setStep(2);
    };

    const handleResendCode = () => {
        alert(`Código reenviado a ${email}`);
    };

    const handleCodeChange = (index, value) => {
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);
    };

    const handleCodeSubmit = () => {
        const inputCode = code.join(""); // Unir los valores del código ingresado
        const actualCode = "071726"; // Código de verificación fijo
        if (inputCode === actualCode) {
            alert("Código verificado con éxito!");
            setStep(3);
        } else {
            alert("Código incorrecto. Intenta nuevamente.");
        }
    };

    const handlePasswordSubmit = (newPassword, confirmPassword) => {
        if (newPassword === confirmPassword) {
            alert("Contraseña cambiada con éxito!");
            navigate('/perfil');
        } else {
            alert("Las contraseñas no coinciden. Intenta nuevamente.");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <RecuperarContraseña onSubmit={handleEmailSubmit} onResend={handleResendCode} />;
            case 2:
                return <VerificacionIdentidad code={code} onCodeChange={handleCodeChange} onSubmit={handleCodeSubmit} />;
            case 3:
                return <CambioContraseña onSubmit={handlePasswordSubmit} />;
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
