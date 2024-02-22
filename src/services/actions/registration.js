import { request } from "../../utils/request"

export const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE'
export const REGISTER_FORM_SUBMIT = 'REGISTER_FORM_SUBMIT'
export const REGISTER_FORM_SUBMIT_SUCCESS = 'REGISTER_FORM_SUBMIT_SUCCESS'
export const REGISTER_FORM_SUBMIT_FAILED = 'REGISTER_FORM_SUBMIT_FAILED'

export const setFormValue = (field, value) => ({
    type: REGISTER_FORM_SET_VALUE, field, value
})

export const register = () => (dispatch, getState) => {
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