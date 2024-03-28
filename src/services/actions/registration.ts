import { AppThunk } from "../../utils/dispatch";
import { request } from "../../utils/request"
import {
    REGISTER_FORM_SET_VALUE,
    REGISTER_FORM_SUBMIT,
    REGISTER_FORM_SUBMIT_FAILED,
    REGISTER_FORM_SUBMIT_SUCCESS
} from "../constants";

export interface IRFSetValue {
    readonly type: typeof REGISTER_FORM_SET_VALUE
    readonly field: string
    readonly value: string
}

export interface IRFSubmit {
    readonly type: typeof REGISTER_FORM_SUBMIT
}

export interface IRFFailed {
    readonly type: typeof REGISTER_FORM_SUBMIT_FAILED
}

export interface IRFSuccess {
    readonly type: typeof REGISTER_FORM_SUBMIT_SUCCESS
}

export type TRegistrationActions = 
    | IRFSetValue
    | IRFSubmit
    | IRFFailed
    | IRFSuccess


export const setFormValue = (field: string, value: string): IRFSetValue => ({
    type: REGISTER_FORM_SET_VALUE, field, value
})

export const register = (): AppThunk => (dispatch, getState) => {
    dispatch({ type: REGISTER_FORM_SUBMIT });
    request('auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(getState().registrationReducer.form)
    }).then(data => {
        dispatch({
            type: REGISTER_FORM_SUBMIT_SUCCESS,
            payload: data
        });
    }).catch(err => {
        dispatch({
            type: REGISTER_FORM_SUBMIT_FAILED,
        });
    })
}