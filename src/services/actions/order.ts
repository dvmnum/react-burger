import { AppThunk } from "../../utils/dispatch";
import { request } from "../../utils/request"
import {
    ORDER_POST_FAILED,
    ORDER_POST_REQUEST,
    ORDER_POST_SUCCESS,
    SET_INGREDIENTS,
    CLOSE_ORDER
} from "../constants";
import { TAnswer, TOrderState } from "../reducers/order";

export interface IOrderRequest {
    readonly type: typeof ORDER_POST_REQUEST
}

export interface IOrderRequestSuccess {
    readonly type: typeof ORDER_POST_SUCCESS
    readonly payload: TAnswer | object
}

export interface IOrderRequestFailed {
    readonly type: typeof ORDER_POST_FAILED
}

export interface ISetIngredients {
    readonly type: typeof SET_INGREDIENTS
    readonly payload: string[]
}

export interface IOrderClose {
    readonly type: typeof CLOSE_ORDER
}

export type TOrderActions = 
    | IOrderRequest
    | IOrderRequestSuccess
    | IOrderRequestFailed
    | ISetIngredients
    | IOrderClose

export const setValue = (data: string[]): ISetIngredients => {
    return { type: SET_INGREDIENTS, payload: data };
}

export const sendOrder = (): AppThunk => (dispatch, getState) => {
    dispatch({ type: ORDER_POST_REQUEST });
    request('orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(getState().orderReducer)
    }).then(res => {
        dispatch({
            type: ORDER_POST_SUCCESS,
            payload: res
        } as IOrderRequestSuccess);
    }).catch(err => {
        dispatch({
            type: ORDER_POST_FAILED,
        });
    })
}