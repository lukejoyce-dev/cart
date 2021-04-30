import React, {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../../contexts/CartContext'
import NumberFormat from 'react-number-format';
import './Header.css'
function Header(){
    const {totalCartItems, totalPrice} = useContext(CartContext)
    const {toggleCart} = useContext(CartContext)
    return(
        <header>
            <nav>
                <div className="logo">
                    <span>My Store</span>
                    </div> 
                <div className="cart-total">
                    <span><NumberFormat value={totalPrice.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'}/></span>
                </div>
                <div className={totalCartItems > 0? "cart-ico active": "cart-ico"}>
                    <span>{totalCartItems}</span>
                    <FontAwesomeIcon icon={faShoppingCart} onClick={toggleCart}/>
                </div>
            </nav>
        </header>
    )
}
export default Header