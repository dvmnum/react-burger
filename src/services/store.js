import { createStore, applyMiddleware, combineReducers } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from "./reducers/ingredients";
import { constructorReducer } from "./reducers/constructor";
import { currentIngredientReducer } from "./reducers/currentIngredient";
import { orderReducer } from "./reducers/order";
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    currentIngredientReducer,
    orderReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));