import React, {useState, useEffect} from 'react'

const Context = React.createContext()

function CartContextProvider(props) {
const stockData = [
    {"id": 1, "name": "Apples", "price":1.00, "qty": 0, "image": "https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png?w=641&ssl=1"}, 
    {"id": 2, "name": "Bread", "price": 0.80, "qty": 0, "image": "https://www.thespruceeats.com/thmb/e-0bRf8RWzJzvm3K3S3HgU80vpA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg"}, 
    {"id": 3, "name": "Milk 500ml", "price": 1.30, "qty": 0, "image":"https://assets.sainsburys-groceries.co.uk/gol/1137637/1/300x300.jpg"},
    {"id": 4, "name": "Soup", "price": 0.65, "qty": 0, "image":"https://img.tesco.com/Groceries/pi/673/5000157062673/IDShot_540x540.jpg?h=540&"}
]
const [discounts, setDiscounts] = useState([
    {"name" : "Apples", "description": "Apples 10% off", "discount": 0 },
    {"name" : "Bread", "description": "50% of bread with evey 2 tins of soup", "discount": 0},
    {"name" : "Token", "description": "50p off token", "discount": 0 }
])
const [promoCodes, setPromoCodes] = useState(["XDETSD","DJAJPSJ","WPSJWI","SJOPJOP","SWJWOWW"])
const [stockList, setStockList] = useState(stockData)
const [cart, setCart] = useState([])
const [displayCart, setDisplayCart] = useState(false)
const [subTotal, setSubTotal] = useState(0)
const [totalPrice, setTotalPrice] = useState(0)
const [totalCartItems, setTotalCartItems] = useState(0)

const updateCart = (id, qty) => {
    const updatedStockList = stockList.map((item,index) => {
        if(item.id === id) {
            return {...item,
                "qty": qty
            }
        }
        return item
    })
    setStockList(updatedStockList)
}

const calcSubTotal = () => {
    let total = 0
    if(cart.length > 0) {             
    cart.map(function(item,index){
        let price = item.price
        let qty = item.qty
        total = total + (price * qty)
        return item
    })
    setSubTotal(total)  
    } else if (cart.length === 0) {
        setSubTotal(0)
    }   
}

const calcTotalPrice = () => {
    const totalDiscount = discounts.reduce((a,v) => a = a + v.discount, 0)
    setTotalPrice(subTotal - totalDiscount)
}

const calcDiscount = () => {
    // Reset discounts
    const resetDiscounts = discounts.map(function(item, index){
            return {...item, discount: 0}
        }
    )
    setDiscounts(resetDiscounts)
    
    let updatedDiscount = discounts
    let appleDiscount = 0
    let breadDiscount = 0

    cart.map(function(item, index){
        let price = item.price
        let qty = item.qty
        // Apple discount
        if(item.id === 1) {
            appleDiscount = (price / 100 * 10) * qty      
        }
        // Bread discount 
        if(item.id === 2) {
            const soup = cart.filter(item => item.id === 4)          
            if (soup.length > 0) {
                let soupQty = soup[0].qty
                let soupDiscountTokens = 0
                if (soupQty % 2 !== 0) {
                    soupQty = soupQty - 1
                }
                soupDiscountTokens = soupQty / 2
                for(let i = 0; i < qty; i++){
                    if(i < soupDiscountTokens) {
                    breadDiscount = breadDiscount + (price / 2) 
                    }
                }
            }           
        }
        updatedDiscount = updatedDiscount.map((item, index) =>{
            if(item.name === "Bread"){ 
                return {...item, discount: breadDiscount}
            }
            if(item.name === "Apples"){ 
                return {...item, discount: appleDiscount}
            }
            return item 
        })
        setDiscounts(updatedDiscount) 
        return item 
    })                              
}

const calcTotalCartItems = () => {
    let totalItems = 0
    cart.forEach((item) => {
        totalItems = totalItems + item.qty
    })
    setTotalCartItems(totalItems)
} 

const toggleCart = () => {
    setDisplayCart((prevState) => {
        return !prevState
    })
}

useEffect(() => {
    const updatedCart = stockList.filter(item => item.qty > 0)
    setCart(updatedCart)
},[stockList])

useEffect(() => {
    calcTotalCartItems()
},[cart])

return(
    <Context.Provider value={{
        stockList, 
        cart, 
        updateCart, 
        displayCart, 
        toggleCart, 
        calcSubTotal, 
        subTotal,
        calcDiscount,
        calcTotalPrice,
        totalPrice,
        setTotalPrice,
        discounts,
        setDiscounts,
        totalCartItems,
        promoCodes,
        setPromoCodes
        }}>
        {props.children}
    </Context.Provider>
    )
}

export {CartContextProvider, Context as CartContext}