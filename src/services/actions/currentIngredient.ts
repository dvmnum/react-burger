import {
    REMOVE_CURRENT_INGREDIENT,
    SET_CURRENT_INGREDIENT
} from "../constants"
import { TIngredient } from "../types/data";

export interface IRemoveCurrent {
    readonly type: typeof REMOVE_CURRENT_INGREDIENT;
}

export interface ISetCurrent {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly payload: TIngredient;
}

export type TCurrentIngredientActions = 
    | IRemoveCurrent
    | ISetCurrent