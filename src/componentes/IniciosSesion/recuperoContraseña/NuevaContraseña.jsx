import React, { useState } from 'react';
import '../../../styles/form.css';

const CambioContraseña = ({ onSubmit }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        onSubmit(password, confirmPassword);
    };

    return (
        <div className="form">
            <h1>Cambiar Contraseña</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="new-password">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Cambiar Contraseña
                </button>
            </form>
        </div>
    );
};

export default CambioContraseña;
