import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import { wsReducer } from "./reducers/wsFeed"
import { getOrderReducer } from "./reducers/getOrder"

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
    resetPasswordReducer,
    wsReducer,
    getOrderReducer
})

export const store = configureStore({
    reducer: rootReducer,
});