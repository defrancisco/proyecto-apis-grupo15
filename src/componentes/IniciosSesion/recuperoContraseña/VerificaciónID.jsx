import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../routes/AuthContext';
import '../../../styles/usuario/verificacionID.css';

const VerificacionIdentidad = ({ code, setCode, onSubmit, onResend }) => {
    const [inputCode, setInputCode] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();

    const handleConfirm = () => {
        if (inputCode === '071726') {
            if (auth.accountType === 'client') {
                navigate('/profile/client');
            } else if (auth.accountType === 'business') {
                navigate('/profile/business');
            }
        } else {
            alert('Código incorrecto');
        }
        onSubmit(inputCode);
    };

    const handleResend = () => {
        onResend();
        setCode(Array(6).fill("")); // Limpiar el código enviado
    };

    return (
        <div className="form">
            <h1>Verificación de Identidad</h1>
            <p>Ingrese el código de 6 dígitos enviado a su email</p>
            <div className="code-input">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={inputCode[index] || ''}
                        onChange={(e) => setInputCode((prev) => prev.slice(0, index) + e.target.value + prev.slice(index + 1))}
                    />
                ))}
            </div>
            <div className="buttons">
                <button className="confirm" onClick={handleConfirm}>Confirmar</button>
                <button className="resend" onClick={handleResend}>Reenviar Código</button>
            </div>
        </div>
    );
};

export default VerificacionIdentidad;
