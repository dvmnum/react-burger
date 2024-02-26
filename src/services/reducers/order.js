import { SET_INGREDIENTS, ORDER_POST_REQUEST, ORDER_POST_SUCCESS, ORDER_POST_FAILED, CLOSE_ORDER } from "../actions/order"

const inititalState = {
    ingredients: [],
    orderRequest: false,
    orderFailed: false,
    answer: {}
}

export const orderReducer = (state = inititalState, action) => {
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