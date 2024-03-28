import { useDispatch, useSelector } from "react-redux";
import { rootReducer, store } from "../services/store";
import type { ThunkAction } from "redux-thunk";

import { TCheckAuthActions } from "../services/actions/checkAuth";
import { TConstructorActions } from "../services/actions/constructor";
import { TCurrentIngredientActions } from "../services/actions/currentIngredient";
import { TForgorPasswordActions } from "../services/actions/forgot-password";
import { TLoginActions } from "../services/actions/login";
import { TOrderActions } from "../services/actions/order";
import { TProfileActions } from "../services/actions/profile";
import { TRegistrationActions } from "../services/actions/registration";
import { TResetPasswordActions } from "../services/actions/reset-password";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TFeedActions } from "../services/actions/wsFeed";
import { TGetOrderActions } from "../services/actions/getOrder";

export type AppActions = 
    | TCheckAuthActions
    | TConstructorActions
    | TCurrentIngredientActions
    | TForgorPasswordActions
    | TLoginActions
    | TOrderActions
    | TProfileActions
    | TRegistrationActions
    | TResetPasswordActions
    | TIngredientsActions
    | TFeedActions
    | TGetOrderActions

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()