import { AppThunk } from "../../utils/dispatch";
import { fetchWithRefresh } from "../../utils/request"
import {
    PROFILE_FORM_SET_VALUE,
    PROFILE_FORM_SUBMIT,
    PROFILE_FORM_SUBMIT_FAILED,
    PROFILE_FORM_SUBMIT_SUCCESS,
    PROFILE_LOGOUT_FAILED,
    PROFILE_LOGOUT_SUCCESS
} from "../constants";
import { setUser } from "./checkAuth"

export interface IPFSetValue {
    readonly type: typeof PROFILE_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface IPFSubmit {
    readonly type: typeof PROFILE_FORM_SUBMIT
}

export interface IPFFailed {
    readonly type: typeof PROFILE_FORM_SUBMIT_FAILED
}

export interface IPFSuccess {
    readonly type: typeof PROFILE_FORM_SUBMIT_SUCCESS;
    readonly payload: {
        user: {
            email: string,
            password: string,
            name: string
        }
    }
}

export interface IPLogoutFailed {
    readonly type: typeof PROFILE_LOGOUT_FAILED
}

export interface IPLogoutSuccess {
    readonly type: typeof PROFILE_LOGOUT_SUCCESS
}

export type TProfileActions = 
    | IPFSetValue
    | IPFSubmit
    | IPFFailed
    | IPFSuccess
    | IPLogoutFailed
    | IPLogoutSuccess


export const setProfileValue = (field: string, value: string): IPFSetValue => ({
    type: PROFILE_FORM_SET_VALUE, field, value
})

export const profileChange = (): AppThunk => (dispatch, getState) => {
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
        } as IPFSuccess);
    }).catch(err => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_FAILED,
        });
    })
}

export const profileGet = (): AppThunk => (dispatch, getState) => {
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
        } as IPFSuccess);
    }).catch(err => {
        dispatch({
            type: PROFILE_FORM_SUBMIT_FAILED,
        });
    })
}

export const logOut = (): AppThunk => (dispatch, getState) => {
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