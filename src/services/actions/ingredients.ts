import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../constants";
import { TIngredient } from "../types/data";

export interface IIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
    readonly payload: Array<TIngredient>
}

export interface IIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsActions = 
    | IIngredientsRequest
    | IIngredientsSuccess
    | IIngredientsFailed