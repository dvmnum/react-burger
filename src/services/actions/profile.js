import { fetchWithRefresh } from "../../utils/request"
import { setUser } from "./checkAuth"

export const PROFILE_FORM_SET_VALUE = 'PROFILE_FORM_SET_VALUE'
export const PROFILE_FORM_SUBMIT = 'PROFILE_FORM_SUBMIT'
export const PROFILE_FORM_SUBMIT_SUCCESS = 'PROFILE_FORM_SUBMIT_SUCCESS'
export const PROFILE_FORM_SUBMIT_FAILED = 'PROFILE_FORM_SUBMIT_FAILED'

export const PROFILE_LOGOUT_SUCCESS = 'PROFILE_LOGOUT_SUCCESS'
export const PROFILE_LOGOUT_FAILED = 'PROFILE_LOGOUT_FAILED'


export const setProfileValue = (field, value) => ({
    type: PROFILE_FORM_SET_VALUE, field, value
})

export const profileChange = () => (dispatch, getState) => {
    dispatch({ type: PROFILE_FORM_SUBMIT });
    fetchWithRefresh('auth/user', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(getState().profileChangeReducer.form)
    }).then(data => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_SUCCESS,
            payload: data
        });
    }).catch(err => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_FAILED,
        });
    })
}

export const profileGet = () => (dispatch, getState) => {
    dispatch({ type: PROFILE_FORM_SUBMIT });
    fetchWithRefresh('auth/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
    }).then(data => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_SUCCESS,
            payload: data
        });
    }).catch(err => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_FAILED,
        });
    })
}

export const logOut = () => (dispatch, getState) => {
    fetchWithRefresh('auth/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    }).then(() => {
        dispatch({
            type: PROFILE_LOGOUT_SUCCESS,
        });
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(setUser(null))
    }).catch(err => {
        dispatch({
            type: PROFILE_LOGOUT_FAILED,
        });
    })
}