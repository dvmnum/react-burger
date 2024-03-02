import AppHeader from '../AppHeader/AppHeader.jsx';

import styles from './App.module.css'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientDetailPage, NotFoundPage } from '../../pages';
import Modal from '../Modal/Modal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients.js';
import { REMOVE_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient.js';
import { IngredientDetails } from '../Modal/IngredientDetails.jsx';
import { checkUserAuth } from '../../services/actions/checkAuth.js';
import { OnlyAuth, OnlyUnAuth } from '../protectedRoute.jsx';
import { User } from '../../pages/profile/profile-user.jsx';
import { Orders } from '../../pages/profile/profile-orders.jsx';

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoading = useSelector(store => store.ingredientsReducer.isLoading)
  const hasError = useSelector(store => store.ingredientsReducer.hasError)
  const ingredients = useSelector(store => store.ingredientsReducer.ingredients)

  const ingedientDetails = useSelector(state => state.currentIngredientReducer.addedIngredient)

  useEffect(() => {
      dispatch(checkUserAuth())
      dispatch(getIngredients())
  }, [dispatch])

  let state = location.state

  const closeModal = () => {
    dispatch({ type: REMOVE_CURRENT_INGREDIENT })
    navigate(-1)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={styles.container}>
        {isLoading && console.log('Загрузка...')}
        {hasError && console.log('Произошла ошибка')}
        {!hasError && !isLoading && ingredients &&
          <>
            <Routes location={state?.backgroundLocation || location}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
              <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />}/>} />
              <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />}>
                <Route index element={<User />}/>
                <Route path='orders' element={<Orders/>}/>
              </Route>
              <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />}/>} />
              <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />}/>} />
              <Route path='/ingredients/:id' element={<IngredientDetailPage />} />
              <Route path='*' element={<NotFoundPage />} />
              
            </Routes>

            {state?.backgroundLocation && ingedientDetails && (
              <Routes>
                <Route path='/ingredients/:id' element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails data={ingedientDetails} />
                  </Modal>
                } />
              </Routes>
            )}
          </>
        }
      </main>

    </DndProvider>
  );
}

export default App;