import React, { useState } from 'react';
import '../../styles/verificacionID.css';

const VerificacionIdentidad = ({ code, setCode, onSubmit, onResend }) => {
    const [codeSent, setCodeSent] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                document.getElementById(`code-${index + 1}`).focus();
            }
        }
    };

    const handleConfirm = () => {
        const inputCode = code.join("");
        onSubmit(inputCode);
    };

    const handleResend = () => {
        onResend();
        setCode(Array(6).fill(""));
        setCodeSent(true);
    };

    return (
        <div className="form">
            <h1>Verificación de Identidad</h1>
            <p>Ingrese el código de 6 dígitos enviado a su email</p>
            <div className="code-input">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
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
