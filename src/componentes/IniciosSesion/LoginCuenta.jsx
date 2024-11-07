import React, { useEffect, useState } from 'react'; // Asegúrate de importar useState
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../../styles/form.css';
import { formValidation } from './formValidation';

// Componentes de recuperación de contraseña
import NuevaContraseña from './recuperoContraseña/NuevaContraseña';
import VerificacionIdentidad from './recuperoContraseña/VerificaciónID';
import RecuperarContraseña from './recuperoContraseña/RecuperarContraseña';

export const LoginCuenta = () => {
    const [step, setStep] = useState(1); // Estado para rastrear el paso actual
    const [email, setEmail] = useState(''); 
    const [code, setCode] = useState(Array(6).fill("")); // Estado para los dígitos del código
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
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
    
    const handleCodeSubmit = (inputCode) => {
        const actualCode = "123456"; 
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
                return <VerificacionIdentidad code={code} onSubmit={handleCodeSubmit} />;
            case 3:
                return <NuevaContraseña onSubmit={handlePasswordSubmit} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <main>
                <div className="form">
                    <h1>Inicia Sesión</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña</label>
                            <input type="password" id="contrasena" name="contrasena" required />
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
