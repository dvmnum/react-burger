import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'react-thunk';
import { ingredientsReducer } from "./reducers/ingredients";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(ingredientsReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;