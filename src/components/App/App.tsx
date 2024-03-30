import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';
import {
  HomePage,
  FeedPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  IngredientDetailPage,
  NotFoundPage,
  FeedOrderPage
} from '../../pages/index';
import Modal from '../Modal/Modal';
import { IngredientDetails } from '../Modal/IngredientDetails';
import { checkUserAuth } from '../../services/actions/checkAuth';
import { OnlyAuth, OnlyUnAuth } from '../protectedRoute';
import { User } from '../../pages/profile/profile-user';
import { Orders } from '../../pages/profile/profile-orders';
import { getIngredients } from '../../utils/request';
import { useAppDispatch, useAppSelector } from "../../utils/dispatch";
import { FeedOrderDetails } from "../Modal/FeedOrderDetails";
import { FeedOrderUserDetails } from "../Modal/FeedOrderUserDetails";

const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(store => store.ingredientsReducer.isLoading)
  const hasError = useAppSelector(store => store.ingredientsReducer.hasError)
  const ingredients = useAppSelector(store => store.ingredientsReducer.ingredients)

  useEffect(() => {
    dispatch(checkUserAuth())
    dispatch(getIngredients())
  }, [dispatch])

  let state = location.state

  const closeModal = () => {
    navigate(-1)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={styles.container}>
        {!hasError && !isLoading && ingredients &&
          <>
            <Routes location={state?.backgroundLocation || location}>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
              <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />}/>} />
              <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />}>
                <Route index element={<User />}/>
                <Route path='orders' element={<Orders/>}/>
                <Route path='orders/:number' element={<FeedOrderPage />} />
              </Route>
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/feed/:number" element={<FeedOrderPage />} />
              <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />}/>} />
              <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />}/>} />
              <Route path='/ingredients/:id' element={<IngredientDetailPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            
            {state?.backgroundLocation && (
              <Routes>
                <Route path='/ingredients/:id' element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                } />
                <Route path='/feed/:number' element={
                  <Modal onClose={closeModal}>
                    <FeedOrderDetails />
                  </Modal>
                } />
                <Route path='/profile/orders/:number' element={
                  <Modal onClose={closeModal}>
                    <FeedOrderUserDetails />
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