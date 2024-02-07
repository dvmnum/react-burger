import { NORMA_API } from "../../utils/burger-api"

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetch(`${NORMA_API}/ingredients`)
        .then(checkReponse)
        .then(res => dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: GET_INGREDIENTS_FAILED }))
}