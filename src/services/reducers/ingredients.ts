import { TIngredient } from "../../components/BurgerConstructor/BurgerConstructor";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions/ingredients";

type TIngredients = {
    ingredients: TIngredient[],
    isLoading: boolean,
    hasError: boolean
}

type TIngredientsReducer = (
    state: TIngredients,
    action: any
) => TIngredients


const initialState = {
    ingredients: [],
    isLoading: false,
    hasError: false
}

export const ingredientsReducer: TIngredientsReducer = (state = initialState, action: any) => {
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