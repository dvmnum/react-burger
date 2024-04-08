import { TOrderActions } from "../actions/order"
import {
    SET_INGREDIENTS,
    ORDER_POST_REQUEST,
    ORDER_POST_SUCCESS,
    ORDER_POST_FAILED,
    CLOSE_ORDER
} from "../constants"
import { TIngredient } from "../types/data"

export type TAnswer = {
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
}

export type TOrderState = {
    ingredients: string[],
    orderRequest: boolean,
    orderFailed: boolean,
    answer: TAnswer | object
}

const initialState: TOrderState = {
    ingredients: [],
    orderRequest: false,
    orderFailed: false,
    answer: {}
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
                ingredients: [],
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