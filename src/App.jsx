import './App.css';
import AppHeader from './components/AppHeader/AppHeader.jsx';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor.jsx';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from './services/actions/ingredients';

function App() {
  const state = useSelector(state => state)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <div className='container'>
        {state.isLoading && console.log('Загрузка...')}
        {state.hasError && console.log('Произошла ошибка')}
        {!state.hasError && !state.isLoading && state.ingredients.length &&
        <>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </>
        }
      </div>
    </DndProvider>    
  );
}

export default App;
