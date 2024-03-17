import { request } from "../../utils/request"
import { setAuthChecked, setUser } from "./checkAuth"

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE'
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS'
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED'

export const setLoginValue = (field: string, value: string) => ({
    type: LOGIN_FORM_SET_VALUE, field, value
})

type answer = {
    user: {
        email: string,
        name: string,
        password?: string
    },
    accessToken: string,
    refreshToken: string
}

//@ts-ignore
export const login = () => (dispatch, getState) => {
    dispatch({ type: LOGIN_FORM_SUBMIT });
    request('auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }, 
        body: JSON.stringify(getState().loginReducer.form)
    }).then((res) => {
        localStorage.setItem('accessToken', (res as answer).accessToken)
        localStorage.setItem('refreshToken', (res as answer).refreshToken)
        dispatch(setUser((res as answer).user))
        dispatch(setAuthChecked(true))
        dispatch({
            type: LOGIN_FORM_SUBMIT_SUCCESS,
            payload: (res as answer).user
        });
    }).catch(err => {
        dispatch({
            type: LOGIN_FORM_SUBMIT_FAILED,
        });
    })
}