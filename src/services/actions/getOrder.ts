import { AppThunk } from "../../utils/dispatch";
import { fetchWithRefresh, request } from "../../utils/request";
import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS
} from "../constants";

export interface IGetOrderRequest {
    readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS
    readonly payload: any
}

export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED
}

export type TGetOrderActions = 
    | IGetOrderRequest
    | IGetOrderSuccess
    | IGetOrderFailed


export const getOrder = (id: string | undefined): AppThunk => (dispatch, getState) => {
    dispatch({ type: GET_ORDER_REQUEST });
    fetchWithRefresh(`orders/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
    }).then(res => {
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res
        } as IGetOrderSuccess);
    }).catch(err => {
        dispatch({
            type: GET_ORDER_FAILED,
        });
    })
}