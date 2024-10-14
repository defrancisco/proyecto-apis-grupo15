import React from 'react'
import "./"

export default function BarraFiltros() {
    return (
        <div className="filter-bar">
            <button className="filter-btn">Eliminar Filtros</button>
            <div className="filters">
                <div className="filter-item">Categoría</div>
                <div className="filter-item">Precio</div>
                <div className="filter-item">Sistema Operativo</div>
                <div className="filter-item">Idioma</div>
                <div className="filter-item">Cantidad de jugadores</div>
                <div className="filter-item">Calificación</div>
            </div>
        </div>
    )
}
