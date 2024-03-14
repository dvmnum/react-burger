import { TIngredient } from "../../components/BurgerConstructor/BurgerConstructor"
import { SET_INGREDIENTS, ORDER_POST_REQUEST, ORDER_POST_SUCCESS, ORDER_POST_FAILED, CLOSE_ORDER } from "../actions/order"

type TOrder = {
    ingredients: TIngredient[],
    orderRequest: boolean,
    orderFailed: boolean,
    answer: {
        success: boolean,
        name: string,
        order: {
            ingredients: TIngredient,
            _id: string,
            owner: object,
            name: string,
            createdAt: object,
            updatedAt: object,
            number: number,
            price: number
        }
    } | object
}

const initialState: TOrder = {
    ingredients: [],
    orderRequest: false,
    orderFailed: false,
    answer: {}
}

export const orderReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.payload
            }
        }
        case CLOSE_ORDER: {
            return {
                ...state,
                answer: {}
            }
        }
        case ORDER_POST_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            }
        }
        case ORDER_POST_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                answer: action.payload
            }
        }
        case ORDER_POST_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        default: {
            return state
        }
    }
}