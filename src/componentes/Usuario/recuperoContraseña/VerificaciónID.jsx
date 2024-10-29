import React, {useState} from 'react';
import '../../../styles/VerificaciónID';
import '../../../styles/form.css';
import Header from '../../Header';
import Footer from '../../Footer';

const VerificacionIdentidad = () => {
    const [code, setCode] = useState(Array(6).fill("")); // Inicializa el estado para 6 dígitos
    const [isCodeValid, setIsCodeValid] = useState(false); // Para verificar si el código es válido

    // Función para manejar el cambio en los campos de entrada
    const handleChange = (e, index) => {
        const value = e.target.value;

        // Solo acepto números del 0 al 9 (básico como para probar)
        if (/^[0-9]$/.test(value) || value === "") {  
            const newCode = [...code]; // Hacemos una copia del código actual
            newCode[index] = value; // Actualizamos el dígito en el índice correspondiente
            setCode(newCode); // Actualizamos el estado del código

            // Mover el foco al siguiente campo automáticamente
            if (value && index < 5) {
                // Focalizamos el siguiente input
                document.getElementById(`code-${index + 1}`).focus();
            }
        }
    };

    // Función para manejar la verificación del código ingresado
    const handleConfirm = () => {
        const inputCode = code.join(""); // Unimos los dígitos del código en un solo string
        const actualCode = "123456"; // No se de donde sacaría este codigo, es decir el que envie por mail

        // Verificamos si el código ingresado es igual al código real
        if (inputCode === actualCode) {
        setIsCodeValid(true); // Si el código es correcto, actualizamos el estado de validación
        alert("Código verificado con éxito!"); 
        } else {
        alert("Código incorrecto. Intenta nuevamente."); 
        }
    };
   
    const handleResend = () =>{
        alert("Código de verificación se ha enviado nuevamente.");
        setCode(Array(6).fill("")); // Reiniciar el código que se ingreso
        document.getElementById("code-0").focus(); // Focalizamos el primer campo de entrada
    }

    return (
        <main>
            <h1>Verifique su Identidad</h1>
            <p style={{ textAlign: 'center' }}>Ingrese el código de 6 dígitos</p>
            <div className="code-input">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`} // Esto me asegura que el ID sea único
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
        </main>
    );
};

export default VerificacionIdentidad; 