import { NORMA_API } from "../../utils/burger-api"
import { SET_INGREDIENTS, ORDER_POST_REQUEST, ORDER_POST_SUCCESS, ORDER_POST_FAILED, CLEAR_INGREDIENTS } from "../actions/order"

const inititalState = {
    ingredients: [],
    orderRequest: false,
    orderFailed: false,
    answer: {}
}

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const orderReducer = (state = inititalState, action) => {
    switch(action.type) {
        case SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.payload
            }
        }
        case CLEAR_INGREDIENTS: {
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

export const setValue = (data) => {
    return { type: SET_INGREDIENTS, payload: data };
}

export const getNumber = (data) => (dispatch, getState) => {
    dispatch({
        type: ORDER_POST_REQUEST
    });
    fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then(res=>{
        return res.json();
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