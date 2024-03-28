import {
    ADD_BUN,
    ADD_INGREDIENT,
    CLEAR_INGREDIENTS,
    CONSTRUCTOR_REORDER,
    DELETE_INGREDIENT
} from "../constants";
import { TIngredient } from "../types/data";

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly payload: TIngredient;
}

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TIngredient;
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: string;
}

export interface IConstructorReorder {
    readonly type: typeof CONSTRUCTOR_REORDER;
    readonly hoverIndex: number;
    readonly dragIndex: number;
}

export interface IClearIngredients {
    readonly type: typeof CLEAR_INGREDIENTS;
}

export type TConstructorActions = 
    | IAddBun
    | IAddIngredient
    | IDeleteIngredient
    | IConstructorReorder
    | IClearIngredients