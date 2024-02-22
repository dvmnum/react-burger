import { request } from "../../utils/request"
import { setAuthChecked, setUser } from "./checkAuth"

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE'
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS'
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED'

export const setLoginValue = (field, value) => ({
    type: LOGIN_FORM_SET_VALUE, field, value
})

export const login = () => (dispatch, getState) => {
    dispatch({ type: LOGIN_FORM_SUBMIT });
    request('auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            // "Authorization": localStorage.getItem('accessToken'),
        }, 
        body: JSON.stringify(getState().loginReducer.form)
    }).then((res) => {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        dispatch(setUser(res.user))
        dispatch(setAuthChecked(true))
        dispatch({
            type: LOGIN_FORM_SUBMIT_SUCCESS,
            payload: res
        });
    }).catch(err => {
        dispatch({
            type: LOGIN_FORM_SUBMIT_FAILED,
        });
    })
}