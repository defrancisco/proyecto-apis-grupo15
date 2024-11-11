import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../routes/AuthContext';
import '../../../styles/usuario/verificacionID.css';

const VerificacionIdentidad = ({ code, onCodeChange, onSubmit, onResend, onBack }) => {
    const handleInputChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            onCodeChange(index, value);

            // Mover al siguiente input
            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className="form">
            <button className="back-btn" onClick={onBack}>
                ← Volver
            </button>
            <h1>Verificación de Identidad</h1>
            <p>Ingrese el código de 6 dígitos enviado a su email</p>
            <div className="code-input">
                {Array.from({ length: 6 }).map((_, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={code[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                ))}
            </div>
            <div className="buttons">
                <button className="confirm" onClick={onSubmit}>
                    Confirmar
                </button>
                <button className="resend" onClick={onResend}>
                    Reenviar Código
                </button>
            </div>
        </div>
    );
};

export default VerificacionIdentidad;
