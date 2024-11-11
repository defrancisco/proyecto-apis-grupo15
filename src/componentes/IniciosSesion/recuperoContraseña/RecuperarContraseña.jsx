import React, { useState } from 'react';
import '../../../styles/usuario/recuperarcontraseña.css';

const RecuperarContraseña = ({ onSubmit, onResend, onBack }) => {
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(email);
            setCodeSent(true);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            await onResend(email);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <main>
                <div className="form">
                    <button className="back-btn" onClick={onBack}>
                        ← Volver
                    </button>
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
                                disabled={isLoading}
                            />
                        </div>
                        <button 
                            type="submit" 
                            className={`submit-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>
                    {codeSent && (
                        <button 
                            onClick={handleResend} 
                            className={`resend-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Reenviando...' : 'Reenviar Código'}
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default RecuperarContraseña;

