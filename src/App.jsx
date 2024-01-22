import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader.jsx';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor.jsx';
import productData from './utils/data'

function App() {
  return (
    <>
      <AppHeader />
      <div className='container'>
        <BurgerIngredients src={productData}/>
        <BurgerConstructor src={productData}/>
      </div>
    </>
  );
}

export default App;
