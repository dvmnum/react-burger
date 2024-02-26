import { request } from "../../utils/request"

export const SET_INGREDIENTS = 'ORDER_POST'; 
export const CLOSE_ORDER = 'CLOSE_ORDER'; 
export const ORDER_POST_REQUEST = 'ORDER_POST_REQUEST'; 
export const ORDER_POST_SUCCESS = 'ORDER_POST_SUCCESS'; 
export const ORDER_POST_FAILED = 'ORDER_POST_FAILED'; 

export const setValue = (data) => {
    return { type: SET_INGREDIENTS, payload: data };
}

export const sendOrder = (data) => (dispatch, getState) => {
    dispatch({ type: ORDER_POST_REQUEST });
    request('orders', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data)
    }).then(data => {
        dispatch({
            type: ORDER_POST_SUCCESS,
            payload: data
        });
    }).catch(err => {
        dispatch({
            type: ORDER_POST_FAILED,
        });
    })
}