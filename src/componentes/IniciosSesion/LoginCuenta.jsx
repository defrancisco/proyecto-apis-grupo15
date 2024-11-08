import React, { useEffect, useState } from 'react'; // Asegúrate de importar useState
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../../styles/form.css';
import { formValidation } from './formValidation';

// Componentes de recuperación de contraseñaimport CambioCo from './recuperoContraseña/NuevaContraseña';
import VerificacionIdentidad from './recuperoContraseña/VerificaciónID';
import RecuperarContraseña from './recuperoContraseña/RecuperarContraseña';
import CambioContraseña from './recuperoContraseña/NuevaContraseña';


export const LoginCuenta = () => {
    const [step, setStep] = useState(1); // Estado para rastrear el paso actual
    const [email, setEmail] = useState(''); 
    const [code, setCode] = useState(Array(6).fill("")); // Estado para los dígitos del código
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();

    // Ejecuta la validación del formulario al montar el componente
    useEffect(() => {
        formValidation();
    }, []);

    const handleEmailSubmit = (email) => { 
        alert(`Código enviado a ${email}`); 
        setEmail(email);
        setStep(2); 
    }; 

    const handleResendCode = (email) => { 
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

    // Renderizar los pasos de recuperación de contraseña
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
    document.addEventListener('DOMContentLoaded', () => {
        formValidation(); // Invoca la función
    });

    return (
        <div>
            <main>
                <div className="form">
                    <h1>Inicia Sesión</h1>
                    <form>
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
                    <Link to="/recuperar-contraseña" className="forgot-password">¿Olvidaste tu contraseña?</Link>
                </div>
                {/* Renderiza la recuperación de contraseña si el paso es mayor que 1 */}
                {step > 1 && (
                    <div className="recovery-steps">
                        {renderStep()}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LoginCuenta;
