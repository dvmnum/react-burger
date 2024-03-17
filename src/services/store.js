import { createStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { currentIngredientReducer } from "./reducers/currentIngredient";
import { orderReducer } from "./reducers/order";
import { authReducer } from './reducers/checkAuth'
import { loginReducer } from './reducers/login'
import { profileChangeReducer } from './reducers/profile'
import { registrationReducer } from "./reducers/registration"
import { forgotPasswordReducer } from "./reducers/forgot-password"
import { resetPasswordReducer } from "./reducers/reset-password"
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    currentIngredientReducer,
    orderReducer,
    registrationReducer,
    authReducer,
    loginReducer,
    profileChangeReducer,
    forgotPasswordReducer,
    resetPasswordReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));