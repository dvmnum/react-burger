import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../actions/ingredients";


const initialState = {
    ingredients: [],
    isLoading: false,
    isFailed: false
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case (GET_INGREDIENTS_REQUEST): {
            return { ...state, isLoading: true }
        }
        case (GET_INGREDIENTS_SUCCESS): {
            return { ...state, ingredients: action.payload, isLoading: false }
        }
        case (GET_INGREDIENTS_FAILED): {
            return { ...state, isLoading: false, isFailed: true }
        }
        default: {
            return state;
        }
    }
}