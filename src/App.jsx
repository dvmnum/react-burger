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
  const isLoading = useSelector(store => store.ingredientsReducer.isLoading)
  const hasError = useSelector(store => store.ingredientsReducer.hasError)
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <div className='container'>
        {isLoading && console.log('Загрузка...')}
        {hasError && console.log('Произошла ошибка')}
        {!hasError && !isLoading && ingredients &&
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
