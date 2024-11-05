import React, { useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';

const RecuperarContraseña = ({ onSubmit, onResend }) => {
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCodeSent(true);
        onSubmit(email);
    };

    const handleResend = () => {
        onResend(email);
    };

    return (
        <div>
            <Header />
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
            <Footer />
        </div>
    );
};

export default RecuperarContraseña;
