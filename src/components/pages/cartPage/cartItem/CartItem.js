import React from 'react'

function CartItem(props) {
    const {name, qty} = props.data
    return(
        <div className="cart-item">
            <p>{name} - qty: {qty}</p>
        </div>
    )
}

export default CartItem 