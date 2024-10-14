import React from 'react'
import "./BarraBusqueda.css";

export default function BarraBusqueda() {
  return (
    <div className="search-bar">
        <input type="text" placeholder="Buscar" />
        <button>🔍</button>
    </div>
  )
}
