import { TIngredientsActions } from "../actions/ingredients";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../constants";
import { TIngredient } from "../types/data";

type TIngredients = {
    ingredients: TIngredient[],
    isLoading: boolean,
    hasError: boolean
}

export const initialState: TIngredients = {
    ingredients: [],
    isLoading: false,
    hasError: false
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredients => {
    switch (action.type) {
        case (GET_INGREDIENTS_REQUEST): {
            return {
                ...state,
                isLoading: true
            }
        }
        case (GET_INGREDIENTS_SUCCESS): {
            return {
                ...state,
                ingredients: action.payload,
                isLoading: false
            }
        }
        case (GET_INGREDIENTS_FAILED): {
            return {
                ...state,
                isLoading: false,
                hasError: true
            }
        }
        default: {
            return state;
        }
    }
}