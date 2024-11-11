import React, { useState } from 'react';
import '../../../styles/usuario/recuperarcontraseña.css';

const RecuperarContraseña = ({ onSubmit, onResend }) => {
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(email);
            setCodeSent(true); // Solo se establece en true si la petición es exitosa
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleResend = () => {
        onResend(email);
    };

    return (
        <div>
            <main>
                <div className="form">
                    <h1>Recuperar contraseña</h1>
                    <p>Enviar código de acceso por e-mail</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">
                            Enviar
                        </button>
                    </form>
                    {codeSent && (
                        <button onClick={handleResend} className="resend-btn">
                            Reenviar Código
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default RecuperarContraseña;

