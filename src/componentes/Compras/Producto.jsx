import React from 'react'

export default function Producto(props) {
  return (
    <div className="product">
        <img src={props.image} alt={props.title} />
        <div className="product-info">
            <h5>{props.title}</h5>
        </div>
        <div className="product-price">
            <span className="price">{props.price}</span>
        </div>
    </div>
  )
}
