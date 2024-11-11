import React from 'react'

const Producto = ({ image, title, price, quantity, subtotal, onRemove }) => {
  return (
    <div className="cart-item">
      <button className="remove-button" onClick={onRemove}>×</button>
      <img src={image} alt={title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>Precio unitario: ${price}</p>
        <p>Cantidad: {quantity}</p>
        <p>Subtotal: ${subtotal}</p>
      </div>
    </div>
  );
};

export default Producto;
