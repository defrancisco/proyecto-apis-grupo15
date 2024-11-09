import React from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        this.navigate = null;
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidMount() {
        this.navigate = this.props.navigate; // Guarda la referencia a navigate
    }

    componentDidUpdate() {
        if (this.state.hasError && this.navigate) {
            setTimeout(() => {
                this.navigate('/prePagina'); // Redirige a prePagina después de 2 segundos
            }, 2000);
        }
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ textAlign: 'center', marginTop: '50px' }}> 
                    <h1>404 Not Found</h1> 
                    <img src="https://http.cat/404" alt="404 Not Found" style={{ width: '50%', height: 'auto' }} /> 
                </div>
            );
        }

        return this.props.children; 
    }
}

// HOC para inyectar el hook de navegación
const withNavigation = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
};

export default withNavigation(ErrorBoundary);
