import { TGetOrderActions } from "../actions/getOrder";
import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS
} from "../constants";

type TGetOrder = {
    order: any,
    isLoading: boolean,
    hasError: boolean,
}

const initialState: TGetOrder = {
    order: null,
    isLoading: false,
    hasError: false
}

export const getOrderReducer = (state = initialState, action: TGetOrderActions): TGetOrder => {
    switch (action.type) {
        case (GET_ORDER_REQUEST): {
            return {
                ...state,
                isLoading: true
            }
        }
        case (GET_ORDER_SUCCESS): {
            return {
                ...state,
                order: action.payload,
                isLoading: false
            }
        }
        case (GET_ORDER_FAILED): {
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