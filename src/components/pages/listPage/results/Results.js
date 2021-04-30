import React, {useContext} from 'react'
import ResultsItem from '../resultsItem/ResultsItem'
import {CartContext} from '../../../../contexts/CartContext'
import './Results.css'

function Results(props) {
const {stockList, updateCart} = useContext(CartContext)
return (
        <>
        <div className="results">
        {
            stockList.map((item, index) => {
                return <ResultsItem key={item.id} data={item} updateCart={updateCart}/>     
            })
        }
        </div>
        </>
    )
}
export default Results 