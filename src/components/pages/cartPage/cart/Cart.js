import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from './../../../../contexts/CartContext'
import CartItem from './../cartItem/CartItem'
import NumberFormat from 'react-number-format'; 
import './Cart.css'
import {Link} from 'react-router-dom'
function Cart(){
    const {
        cart, 
        displayCart, 
        toggleCart, 
        calcSubTotal, 
        subTotal, 
        calcDiscount, 
        calcTotalPrice, 
        discounts,
        setDiscounts, 
        totalPrice,
        promoCodes,
        setPromoCodes
    } = useContext(CartContext)

    useEffect(() => {
        calcSubTotal()
        calcDiscount()
    },[cart, subTotal, totalPrice])
    
    useEffect(() => {
        calcTotalPrice()
    },[discounts])    

    const [promoValue, setPromoValue] = useState("")
    const [promoActive, setPromoActive] = useState(false)
    const handlePromoCode = (e) => {
        const {value} = e.target
        setPromoValue(value)
    }
    const applyPromoCode = () => {
        const isPromoCode = promoCodes.some(code => code === promoValue)
        if(isPromoCode){ 
            setDiscounts((prevDiscounts) => {
                const updatedDiscounts = prevDiscounts.map((item)=>{
                    if(item.name === "Token"){
                        item.discount = 0.5
                        return item
                    }
                    return item
                })
                return updatedDiscounts
            })
            setPromoCodes((prevCodes) => {
                const updatedCodes = prevCodes.filter(code => code !== promoValue)
                return updatedCodes
            })
            setPromoActive(true)
        }
    } 
    return(
        <div className={displayCart? "cart-overlay active": "cart-overlay"}>
            <div className="cart-wrapper">
                <div className="close-icon">
                    <FontAwesomeIcon icon={faTimes} onClick={toggleCart}/>
                </div>
                <div className="cart">
                    <div className="promo-banner">
                        <h2>My Cart</h2>
                    </div>
                    <div className="cart-items">
                    {
                    cart.map(function(item, index) {
                        return (
                            <CartItem data={item} key={item.id}/>
                        )
                    })
                    }
                    </div>
                    <div className="totals-wrap">
                        <div className="subtotal">
                            <p>Subtotal: <NumberFormat value={subTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'}/></p> 
                        </div>
                        <div className="discount">
                            <p>Discounts:</p> 
                            {                             
                                discounts.map((item, index) => {
                                    if(item.discount > 0) {
                                        return <p key={index}>{item.description}: <NumberFormat value={item.discount.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'}/></p> 
                                    }
                                })                                 
                            }
                        </div>
                        <div className="total-price">
                            <p>Total Price: <NumberFormat value={totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'} fixedDecimalScale={true} /></p>
                        </div>
                        <h4>50p off promo code <b>XDETSD</b></h4>
                        <div className={promoActive?"promo-code active":"promo-code"}>
                            <input value={promoValue} name="promo-code" onChange={handlePromoCode}/>
                            <button onClick={applyPromoCode}>Apply</button>
                        </div>
                        <div className="cart-buttons">
                            <Link to={"./checkout/?id=213123"}>
                                <button>Checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart