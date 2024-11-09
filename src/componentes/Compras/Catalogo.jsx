import React, { useState, useEffect } from 'react';
import '../../styles/catalogo.css';
import Videojuego from './Videojuego';

const Catalogo = () => {
  const [games, setGames] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    minPrice: null,
    maxPrice: null,
    operatingSystem: [],
    languages: [],
    players: [],
    rating: null,
    search: ''
  });

  useEffect(() => {
    fetchGames();
  }, [filters]);

  const fetchGames = async () => {
    try {
      let queryParams = new URLSearchParams();
      
      // Agregar filtros a los parámetros de consulta
      if (filters.category.length) queryParams.append('category', filters.category.join(','));
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.search) queryParams.append('search', filters.search);

      const response = await fetch(`http://localhost:3000/api/games?${queryParams}`);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleSearch = (e) => {
    setFilters(prev => ({...prev, search: e.target.value}));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value) 
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div>
      <div className="main-content">
        <div className="filter-bar">
          <button className="filter-btn" onClick={() => setFilters({
            category: [],
            minPrice: null,
            maxPrice: null,
            operatingSystem: [],
            languages: [],
            players: [],
            rating: null,
            search: ''
          })}>
            Eliminar Filtros
          </button>
          <div className="filters">
            <details className="filter-item">
              <summary>Categoría</summary>
              <div>
                {['Accion', 'Aventura', 'RPG', 'Estrategia', 'Deporte', 'Simulacion', 'Acertijos'].map(cat => (
                  <label key={cat}>
                    <input 
                      type="checkbox"
                      checked={filters.category.includes(cat)}
                      onChange={() => handleCheckboxChange('category', cat)}
                    /> {cat}
                  </label>
                ))}
              </div>
            </details>

            <details className="filter-item">
              <summary>Precio</summary>
              <div>
                {[
                  { label: '1-20', min: 1, max: 20 },
                  { label: '20-30', min: 20, max: 30 },
                  { label: '30-40', min: 30, max: 40 },
                  { label: '50-60', min: 50, max: 60 },
                  { label: '+60', min: 60, max: null }
                ].map(range => (
                  <label key={range.label}>
                    <input 
                      type="checkbox"
                      checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                      onChange={() => setFilters(prev => ({
                        ...prev,
                        minPrice: range.min,
                        maxPrice: range.max
                      }))}
                    /> {range.label}
                  </label>
                ))}
              </div>
            </details>

            <details className="filter-item">
              <summary>Sistema Operativo</summary>
              <div>
                {['Nintendo', 'Windows', 'MacOS', 'Linux', 'Android', 'iOS'].map(os => (
                  <label key={os}>
                    <input 
                      type="checkbox"
                      checked={filters.operatingSystem.includes(os)}
                      onChange={() => handleCheckboxChange('operatingSystem', os)}
                    /> {os}
                  </label>
                ))}
              </div>
            </details>

            <details className="filter-item">
              <summary>Idioma</summary>
              <div>
                {['Español', 'Inglés', 'Japonés'].map(lang => (
                  <label key={lang}>
                    <input 
                      type="checkbox"
                      checked={filters.languages.includes(lang)}
                      onChange={() => handleCheckboxChange('languages', lang)}
                    /> {lang}
                  </label>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="catalog-content">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Buscar" 
              value={filters.search}
              onChange={handleSearch}
            />
            <button>🔍</button>
          </div>
          <div className="videogames">
            {games && games.map(game => (
              <Videojuego 
                key={game.id}
                id={game.id}
                image={`http://localhost:3000/api/games/${game.id}/image`}
                title={game.name}
                price={game.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
