import React from 'react'
import './App.css'
import Header from './components/global/header/Header'
import Results from './components/pages/listPage/results/Results'
import Cart from './components/pages/cartPage/cart/Cart'
import {CartContextProvider} from './contexts/CartContext'
import {BrowserRouter as Router} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
    <CartContextProvider>
    <Header/>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Results/>
          <Cart/>
        </Route>
      </Switch>     
    </Router>
    </CartContextProvider>
    </div>
  );
}

export default App;
