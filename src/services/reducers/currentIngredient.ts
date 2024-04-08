import { TCurrentIngredientActions } from "../actions/currentIngredient"
import {
    REMOVE_CURRENT_INGREDIENT,
    SET_CURRENT_INGREDIENT
} from "../constants"
import { TIngredient } from "../types/data"

type TCurrentIngredientState = {
    addedIngredient: TIngredient | null
}

const initialState: TCurrentIngredientState = {
    addedIngredient: null
}

export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
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