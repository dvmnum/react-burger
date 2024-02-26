import { REMOVE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../actions/currentIngredient"

const initialState = {
    addedIngredient: null
}

export const currentIngredientReducer = (state = initialState, action) => {
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