import { TIngredient } from "../../components/BurgerConstructor/BurgerConstructor"
import { ADD_BUN, ADD_INGREDIENT, DELETE_INGREDIENT, CONSTRUCTOR_REORDER, CLEAR_INGREDIENTS } from "../actions/constructor"

type TConstructor = {
    bun: TIngredient | null,
    ingredients: TIngredient[]
}

const initialState: TConstructor = {
    bun: null,
    ingredients: [],
}

export const constructorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case (ADD_INGREDIENT): {
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload ]
            }
        }
        case (DELETE_INGREDIENT): {
            return {
                ...state,
                ingredients: state.ingredients.filter((ingredient) =>
                    ingredient.id !== action.payload
                )
            }
        }
        case (CLEAR_INGREDIENTS): {
            return {
                bun: null,
                ingredients: []
            }
        }
        case (ADD_BUN): {
            return {
                ...state,
                bun: action.payload
            }
        }
        case (CONSTRUCTOR_REORDER): {
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.hoverIndex,
                0,
                ingredients.splice(action.dragIndex, 1)[0]
            );
            return {
                ...state,
                ingredients,
            };
        }
        default: {
            return state;
        }
    }
}