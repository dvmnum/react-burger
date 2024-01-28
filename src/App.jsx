import React, { useState, useEffect } from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader.jsx';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor.jsx';

function App() {
  const [ state, setState ] = useState({
    isLoading: false,
    hasError: false,
    productData: []
  })

  const url = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    const getProductData = async () => {
      setState({
        ...state,
        hasError: false,
        isLoading: true
      })
      fetch(url)
        .then(res => res.json())
        .then(data => setState({ ...state, productData: data.data, isLoading: false }))
        .catch(e => {
          setState({ ...state, hasError: true, isLoading: false });
        });
    };

    getProductData();
  }, [])

  return (
      <>
        <AppHeader />
        <div className='container'>
          {state.isLoading && console.log('Загрузка...')}
          {state.hasError && console.log('Произошла ошибка')}
          {!state.hasError && !state.isLoading && state.productData.length &&
            <>
              <BurgerIngredients src={state.productData}/>
              <BurgerConstructor src={state.productData}/>
            </>
          }
        </div>
      </>
    
  );
}

export default App;
