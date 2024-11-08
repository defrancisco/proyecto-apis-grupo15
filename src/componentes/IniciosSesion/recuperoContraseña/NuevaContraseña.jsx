import React from 'react';
import '../../../styles/form.css';

const CambioContraseña = ({ password, confirmPassword, setPassword, setConfirmPassword, onSubmit }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(password, confirmPassword);
    };

    return (
        <div className="form">
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="new-password">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirmar Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Cambiar Contraseña</button>
            </form>
        </div>
    );
};

export default CambioContraseña;
