import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';
import './ResultsItem.css'

function ResultItem(props){
    const {name, id, image, price, qty } = props.data     
    const [localQty, setLocalQty] = useState(qty)

    const increment = () => {
        setLocalQty((prevQty) => prevQty + 1)
    } 
    const decrement = () => {
        if(localQty > 0) {
            setLocalQty((prevQty) => prevQty - 1) 
        }
    }
    const handleQtyInput = (e) => {
        const {value} = e.target
        setLocalQty(value)
    } 

    return(
        <div className="results-item" id={id}>
            <div className="result-item-img">
                <img src={image} alt={name}/>
            </div>
            <div className="result-item-content">
                <h5>{name}</h5>
                <p className="result-item-price"><NumberFormat value={price.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'£'}/></p>
                <div className="add-remove">
                    <input value={localQty} name="qty" type="text" pattern="[0-9]*" onChange={handleQtyInput}/>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={increment}/>
                    <FontAwesomeIcon icon={faMinusCircle} onClick={decrement}/>
                </div>
                <button onClick={() => props.updateCart(id, localQty)}>{qty > 0 ? "Update cart": "Add to cart"}</button>
            </div>
        </div>
    )
}

export default ResultItem