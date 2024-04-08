import { AppThunk } from "../../utils/dispatch";
import { fetchWithRefresh } from "../../utils/request"
import {
    PASSWORD_FORGOT_SET_EMAIL,
    PASSWORD_FORGOT_SUBMIT,
    PASSWORD_FORGOT_SUBMIT_FAILED,
    PASSWORD_FORGOT_SUBMIT_SUCCESS
} from "../constants";

export interface IPFSetEmail {
    readonly type: typeof PASSWORD_FORGOT_SET_EMAIL;
    readonly value: string;
}

export interface IPFSubmit {
    readonly type: typeof PASSWORD_FORGOT_SUBMIT;
}

export interface IPFSuccess {
    readonly type: typeof PASSWORD_FORGOT_SUBMIT_SUCCESS;
}

export interface IPFFailed {
    readonly type: typeof PASSWORD_FORGOT_SUBMIT_FAILED;
}

export type TForgorPasswordActions = 
    | IPFSetEmail
    | IPFSubmit
    | IPFSuccess
    | IPFFailed

export const setPasswordForgotValue = (value: string): IPFSetEmail => ({
    type: PASSWORD_FORGOT_SET_EMAIL, value
})

export const passwordForgot = (): AppThunk => (dispatch, getState) => {
    dispatch({ type: PASSWORD_FORGOT_SUBMIT });
    fetchWithRefresh('password-reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        }, 
        body: JSON.stringify(getState().forgotPasswordReducer.form)
    }).then(() => {
        dispatch({
            type: PASSWORD_FORGOT_SUBMIT_SUCCESS,
        });
    }).catch(() => {
        dispatch({
            type: PASSWORD_FORGOT_SUBMIT_FAILED,
        });
    })
}