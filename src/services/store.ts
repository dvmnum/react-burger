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
import { getOrderReducer } from "./reducers/getOrder"
import { wsFeedReducer } from './reducers/wsReducer'
import { wsFeedUserReducer } from './reducers/wsUserReducer'
import { socketMiddleware } from "../utils/socketMiddleware";
import { socketUserMiddleware } from "../utils/socketUserMiddleware";

import {
    connect as FeedConnect,
    disconnect as FeedDisconnect,
    wsConnecting as FeedConnecting,
    wsOpen as FeedOpen,
    wsClose as FeedClose,
    wsMessage as FeedMessage,
    wsError as FeedError,
} from './actions/wsActions'

import {
    userConnect as FeedUserConnect,
    userDisconnect as FeedUserDisconnect,
    wsUserConnecting as FeedUserConnecting,
    wsUserOpen as FeedUserOpen,
    wsUserClose as FeedUserClose,
    wsUserMessage as FeedUserMessage,
    wsUserError as FeedUserError,
} from './actions/wsUserActions'

const wsActions = {
    wsConnect: FeedConnect,
    wsDisconnect: FeedDisconnect,
    wsConnecting: FeedConnecting,
    onOpen: FeedOpen,
    onClose: FeedClose,
    onError: FeedError,
    onMessage: FeedMessage
}

const wsUserActions = {
    wsConnect: FeedUserConnect,
    wsDisconnect: FeedUserDisconnect,
    wsConnecting: FeedUserConnecting,
    onOpen: FeedUserOpen,
    onClose: FeedUserClose,
    onError: FeedUserError,
    onMessage: FeedUserMessage
}

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
    getOrderReducer,
    wsFeedReducer,
    wsFeedUserReducer
})

const mainFeed = socketMiddleware(wsActions, true)
const userFeed = socketUserMiddleware(wsUserActions, true)

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainFeed, userFeed)
});