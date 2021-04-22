import React from 'react';
import Card from './Card';

export default function Cart(props) {

  const renderCartItems = () => {
    return props.cart.map(item => {
      return <Card
        item={item}
        key={item.name}
        clickAction={props.clickAction}
        inCart={props.inCart}
      />
    })
  }
  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {renderCartItems()}
      <span className="button">Continue to Checkout</span>
    </div>
  )
}
