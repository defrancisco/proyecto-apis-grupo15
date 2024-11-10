import React, { useEffect, useState } from 'react';

function Endpoints() {
  const [endpoints, setEndpoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar el archivo JSON desde la carpeta public
    fetch('/endpoints.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
      })
      .then((data) => {
        setEndpoints(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Solo se ejecuta una vez al montar el componente

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>API Endpoints</h2>
      <pre>{JSON.stringify(endpoints, null, 2)}</pre>
    </div>
  );
}

export default Endpoints;
