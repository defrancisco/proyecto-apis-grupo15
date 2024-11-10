import React from 'react'
import '../../styles/Videojuego.css';

export default function Videojuego(props) {
  return (
    <div className="Videojuegos">
      <div className="Videojuego">
        <img src={props.image} alt={props.title} />
        <p>{props.title}</p>
        <p>${props.price}</p>
      </div>
    </div>
  )
}
