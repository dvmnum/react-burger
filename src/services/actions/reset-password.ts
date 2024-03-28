import { AppThunk } from "../../utils/dispatch";
import { fetchWithRefresh } from "../../utils/request"
import {
    PASSWORD_RESET_SET_VALUE,
    PASSWORD_RESET_SUBMIT,
    PASSWORD_RESET_SUBMIT_FAILED,
    PASSWORD_RESET_SUBMIT_SUCCESS
} from "../constants";

export interface IPRSetValue {
    readonly type: typeof PASSWORD_RESET_SET_VALUE
    readonly field: string
    readonly value: string
}

export interface IPRSubmit {
    readonly type: typeof PASSWORD_RESET_SUBMIT
}

export interface IPRFailed {
    readonly type: typeof PASSWORD_RESET_SUBMIT_FAILED
}

export interface IPRSuccess {
    readonly type: typeof PASSWORD_RESET_SUBMIT_SUCCESS
}

export type TResetPasswordActions = 
    | IPRSetValue
    | IPRSubmit
    | IPRFailed
    | IPRSuccess

export const setPasswordResetValue = (field: string, value: string) => ({
    type: PASSWORD_RESET_SET_VALUE, field, value
})

export const passwordReset = (): AppThunk => (dispatch, getState) => {
    dispatch({ type: PASSWORD_RESET_SUBMIT });
    fetchWithRefresh('password-reset/reset', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem('accessToken'),
        }, 
        body: JSON.stringify(getState().resetPasswordReducer.form)
    }).then((res) => {
        dispatch({
            type: PASSWORD_RESET_SUBMIT_SUCCESS,
        });
    }).catch(err => {
        dispatch({
            type: PASSWORD_RESET_SUBMIT_FAILED,
        });
    })
}