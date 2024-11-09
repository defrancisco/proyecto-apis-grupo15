import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
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

export default ErrorBoundary;