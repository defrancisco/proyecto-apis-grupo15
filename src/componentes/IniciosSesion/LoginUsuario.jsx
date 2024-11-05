import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../../styles/form.css';
import { formValidation } from './formValdiation';


// Compacto Recuperación de Contraseñas
import NuevaContraseña from './recuperoContraseña/NuevaContraseña';
import VerificacionIdentidad from './recuperoContraseña/VerificaciónID';
import RecuperarContraseña from './recuperoContraseña/RecuperarContraseña';


export const LoginUsuario = () => {
    /*EXPLICACIÓN
    Cuando uno se olvida la contraseña tiene que pasar por estos tres procesos : 
    1. el mail de la cuenta (opción de man dar msj devuelta) 
    2. ingresar nro (tiene que estar bien) 
    3. nueva contraseña y que te lleve al perfil luego.

    */
    const [step, setStep] = useState(1); // Estado para rastrear el paso actual 
    const [email, setEmail] = useState(''); 
    const [code, setCode] = useState(Array(6).fill("")); // Estado para los dígitos del código 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const navigate = useNavigate();

    // Ejecuta la validación del formulario al montar el componente
    useEffect(() => {
        formValidation();
    }, []); // Se ejecuta al montar el componente

    const handleEmailSubmit = (email) => { 
        alert(`Código enviado a ${email}`); 
        setEmail(email); setStep(2); 
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

    // -------------------------    ME FALTA BAJO VER COMO LO LINKEO
    return (
        <div>
            <Header />
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
            </main>
            <Footer />
        </div>
    );

}
export default LoginUsuario;



