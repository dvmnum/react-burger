import { AppThunk } from "../../utils/dispatch";
import { request } from "../../utils/request"
import {
    LOGIN_FORM_SET_VALUE,
    LOGIN_FORM_SUBMIT,
    LOGIN_FORM_SUBMIT_FAILED,
    LOGIN_FORM_SUBMIT_SUCCESS
} from "../constants"
import { setAuthChecked, setUser } from "./checkAuth"

export interface ILFSetValue {
    readonly type: typeof LOGIN_FORM_SET_VALUE;
    readonly field: string;
    readonly value: string;
}

export interface ILFSubmit {
    readonly type: typeof LOGIN_FORM_SUBMIT;
}

export interface ILFSuccess {
    readonly type: typeof LOGIN_FORM_SUBMIT_SUCCESS;
    readonly payload: {
        email: string,
        password: string
    }
}

export interface ILFFailed {
    readonly type: typeof LOGIN_FORM_SUBMIT_FAILED;
}

export type TLoginActions = 
    | ILFSetValue
    | ILFSubmit
    | ILFSuccess
    | ILFFailed

export const setLoginValue = (field: string, value: string): ILFSetValue => ({
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

export const login = (): AppThunk => (dispatch, getState) => {
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
        } as ILFSuccess);
    }).catch(err => {
        dispatch({
            type: LOGIN_FORM_SUBMIT_FAILED,
        });
    })
}