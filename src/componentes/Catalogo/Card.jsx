import React from 'react'
import './Card.css';

export default function Card(props) {
  return (
    <div className="Card">
      <img src={props.image} alt={props.title} />
      <p>{props.title}</p>
      <p>{props.price}</p>
    </div>
  )
}
