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
                <div>
                    <h1>404 Not Found</h1>
                    <p>💿 Hi 👋</p>
                    <p>Disculpen pero soy yo tratando de hacer mi parte.</p>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;