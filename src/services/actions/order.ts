import { TIngredient } from "../../components/BurgerConstructor/BurgerConstructor";
import { request } from "../../utils/request"
import { TOrder } from "../reducers/order";

export const SET_INGREDIENTS = 'ORDER_POST'; 
export const CLOSE_ORDER = 'CLOSE_ORDER'; 
export const ORDER_POST_REQUEST = 'ORDER_POST_REQUEST'; 
export const ORDER_POST_SUCCESS = 'ORDER_POST_SUCCESS'; 
export const ORDER_POST_FAILED = 'ORDER_POST_FAILED'; 

export const setValue = (data: TIngredient[]) => {
    return { type: SET_INGREDIENTS, payload: data };
}

// @ts-ignore
export const sendOrder = (data: TOrder) => (dispatch) => {
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