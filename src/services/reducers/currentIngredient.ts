import { TIngredient } from "../../components/BurgerConstructor/BurgerConstructor"
import { REMOVE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../actions/currentIngredient"

type TCurrentIngredient = {
    addedIngredient: TIngredient | null
}

const initialState: TCurrentIngredient = {
    addedIngredient: null
}

export const currentIngredientReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (SET_CURRENT_INGREDIENT): {
            return { addedIngredient: action.payload }
        }
        case (REMOVE_CURRENT_INGREDIENT): {
            return { addedIngredient: null }
        }
        default: {
            return state;
        }
    }
}